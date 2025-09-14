# backend/utils/rate_limit.py
"""
Redis-based rate limiting decorator for API endpoints
"""

import time
import redis
from functools import wraps
from fastapi import HTTPException, Request
from typing import Optional, Tuple, Dict
import logging
import json

logger = logging.getLogger(__name__)

class RedisRateLimitStore:
    def __init__(self, redis_url: str = "redis://localhost:6379", db: int = 1):
        """
        Initialize Redis rate limit store
        
        Args:
            redis_url: Redis connection URL
            db: Redis database number (use separate DB for rate limiting)
        """
        try:
            self.redis = redis.from_url(redis_url, db=db, decode_responses=True)
            # Test connection
            self.redis.ping()
            logger.info(f"Connected to Redis for rate limiting: {redis_url}")
        except redis.ConnectionError as e:
            logger.error(f"Failed to connect to Redis: {e}")
            raise
    
    def get_and_increment(self, key: str, window: int, max_requests: int) -> Tuple[bool, int, int]:
        """
        Thread-safe get and increment operation using Redis
        Returns: (allowed, current_count, remaining_requests)
        """
        try:
            # Use Redis pipeline for atomic operations
            pipe = self.redis.pipeline()
            pipe.incr(key)
            pipe.expire(key, window)
            results = pipe.execute()
            
            current_count = results[0]
            
            if current_count > max_requests:
                remaining = 0
                allowed = False
            else:
                remaining = max_requests - current_count
                allowed = True
            
            return allowed, current_count, remaining
            
        except redis.RedisError as e:
            logger.error(f"Redis error in rate limiting: {e}")
            # Fail open - allow request if Redis is down
            return True, 1, max_requests - 1
    
    def get_reset_time(self, key: str) -> int:
        """Get the reset time for a rate limit key"""
        try:
            ttl = self.redis.ttl(key)
            if ttl > 0:
                return int(time.time()) + ttl
            return int(time.time())
        except redis.RedisError:
            return int(time.time())
    
    def get_stats(self) -> Dict[str, int]:
        """Get rate limiting statistics"""
        try:
            # Get all rate limit keys
            keys = self.redis.keys("rate_limit:*")
            active_ips = set()
            
            for key in keys:
                if ":" in key:
                    parts = key.split(":")
                    if len(parts) >= 3:  # rate_limit:ip:endpoint
                        active_ips.add(parts[2])
            
            return {
                "total_entries": len(keys),
                "active_ips": len(active_ips)
            }
        except redis.RedisError as e:
            logger.error(f"Redis error getting stats: {e}")
            return {"total_entries": 0, "active_ips": 0}

# Initialize Redis store (will be configured in main app)
rate_limit_store: Optional[RedisRateLimitStore] = None

def init_rate_limiter(redis_url: str = "redis://localhost:6379"):
    """Initialize the rate limiter with Redis connection"""
    global rate_limit_store
    rate_limit_store = RedisRateLimitStore(redis_url)

def rate_limit(requests: int = 100, window: int = 3600, per_ip: bool = True, key_prefix: str = "rate_limit"):
    """
    Redis-based rate limiting decorator
    
    Args:
        requests: Number of requests allowed
        window: Time window in seconds
        per_ip: If True, rate limit per IP. If False, global rate limit
        key_prefix: Redis key prefix
    """
    def decorator(func):
        @wraps(func)
        async def wrapper(*args, **kwargs):
            global rate_limit_store
            
            # Skip if Redis not initialized
            if rate_limit_store is None:
                logger.warning("Rate limiter not initialized, skipping rate limiting")
                return await func(*args, **kwargs)
            
            # Find request object
            request: Optional[Request] = None
            
            if args and isinstance(args[0], Request):
                request = args[0]
            else:
                for key, value in kwargs.items():
                    if isinstance(value, Request):
                        request = value
                        break
            
            if not request:
                logger.warning("No Request object found, skipping rate limiting")
                return await func(*args, **kwargs)
            
            # Create rate limit key
            if per_ip:
                client_ip = request.client.host if request.client else "unknown"
                endpoint = f"{request.method}:{request.url.path}"
                rate_limit_key = f"{key_prefix}:{client_ip}:{endpoint}"
            else:
                endpoint = f"{request.method}:{request.url.path}"
                rate_limit_key = f"{key_prefix}:global:{endpoint}"
            
            # Check rate limit
            allowed, current_count, remaining = rate_limit_store.get_and_increment(
                rate_limit_key, window, requests
            )
            
            if not allowed:
                reset_time = rate_limit_store.get_reset_time(rate_limit_key)
                
                logger.warning(
                    f"Rate limit exceeded for {client_ip if per_ip else 'global'} "
                    f"on {endpoint}. Count: {current_count}/{requests}"
                )
                
                raise HTTPException(
                    status_code=429,
                    detail={
                        "error": "Rate limit exceeded",
                        "message": f"Maximum {requests} requests per {window} seconds",
                        "retry_after": reset_time - int(time.time()),
                        "reset_time": reset_time
                    },
                    headers={
                        "X-RateLimit-Limit": str(requests),
                        "X-RateLimit-Remaining": "0",
                        "X-RateLimit-Reset": str(reset_time),
                        "Retry-After": str(reset_time - int(time.time()))
                    }
                )
            
            # Execute the function
            response = await func(*args, **kwargs)
            
            # Add rate limit headers
            if hasattr(response, 'headers'):
                reset_time = rate_limit_store.get_reset_time(rate_limit_key)
                response.headers["X-RateLimit-Limit"] = str(requests)
                response.headers["X-RateLimit-Remaining"] = str(remaining)
                response.headers["X-RateLimit-Reset"] = str(reset_time)
            
            return response
        
        return wrapper
    return decorator

def get_rate_limit_stats() -> Dict[str, int]:
    """Get rate limiting statistics"""
    if rate_limit_store:
        return rate_limit_store.get_stats()
    return {"total_entries": 0, "active_ips": 0}