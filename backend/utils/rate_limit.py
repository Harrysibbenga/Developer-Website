# backend/utils/rate_limit.py
"""
Rate limiting decorator for API endpoints
"""

import time
from functools import wraps
from fastapi import HTTPException, Request
from typing import Dict, Tuple
import logging

logger = logging.getLogger(__name__)

# In-memory store for rate limiting (use Redis in production)
rate_limit_store: Dict[str, Tuple[int, float]] = {}

def rate_limit(requests: int = 100, window: int = 3600):
    """
    Rate limiting decorator
    
    Args:
        requests: Number of requests allowed
        window: Time window in seconds
    """
    def decorator(func):
        @wraps(func)
        async def wrapper(*args, **kwargs):
            # Extract request object
            request = None
            for arg in args:
                if isinstance(arg, Request):
                    request = arg
                    break
            
            if not request:
                # If no request object found, skip rate limiting
                return await func(*args, **kwargs)
            
            # Create rate limit key
            client_ip = request.client.host
            endpoint = f"{request.method}:{request.url.path}"
            rate_limit_key = f"{client_ip}:{endpoint}"
            
            current_time = time.time()
            
            # Check rate limit
            if rate_limit_key in rate_limit_store:
                request_count, window_start = rate_limit_store[rate_limit_key]
                
                # Reset window if expired
                if current_time - window_start > window:
                    rate_limit_store[rate_limit_key] = (1, current_time)
                else:
                    # Check if limit exceeded
                    if request_count >= requests:
                        logger.warning(f"Rate limit exceeded for {client_ip} on {endpoint}")
                        raise HTTPException(
                            status_code=429,
                            detail=f"Rate limit exceeded. Maximum {requests} requests per {window} seconds."
                        )
                    
                    # Increment request count
                    rate_limit_store[rate_limit_key] = (request_count + 1, window_start)
            else:
                # First request for this key
                rate_limit_store[rate_limit_key] = (1, current_time)
            
            # Clean up old entries periodically
            if len(rate_limit_store) > 1000:  # Cleanup threshold
                cleanup_time = current_time - window
                keys_to_remove = [
                    key for key, (_, start_time) in rate_limit_store.items()
                    if start_time < cleanup_time
                ]
                for key in keys_to_remove:
                    del rate_limit_store[key]
            
            return await func(*args, **kwargs)
        
        return wrapper
    return decorator

