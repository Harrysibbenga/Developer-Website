# backend/api/routes/health.py
"""
Health check endpoints
"""

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import text
from datetime import datetime
import psutil
import os

from core.database import get_db
from core.config import get_settings
from utils.rate_limit import get_rate_limit_stats

router = APIRouter()
settings = get_settings()

@router.get("/")
async def health_check():
    """Basic health check"""
    return {
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat(),
        "service": "Harry Sibbenga Web Services API",
        "version": "1.0.0"
    }

@router.get("/detailed")
async def detailed_health_check(db: Session = Depends(get_db)):
    """Detailed health check with database and system info"""
    health_info = {
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat(),
        "service": "Harry Sibbenga Web Services API",
        "version": "1.0.0",
        "environment": settings.ENVIRONMENT,
        "checks": {}
    }
    
    # Database check
    try:
        db.execute(text("SELECT 1"))
        health_info["checks"]["database"] = {"status": "healthy"}
    except Exception as e:
        health_info["checks"]["database"] = {
            "status": "unhealthy",
            "error": str(e)
        }
        health_info["status"] = "unhealthy"
    
    # System metrics
    try:
        health_info["checks"]["system"] = {
            "status": "healthy",
            "cpu_percent": psutil.cpu_percent(interval=1),
            "memory_percent": psutil.virtual_memory().percent,
            "disk_percent": psutil.disk_usage('/').percent
        }
    except Exception as e:
        health_info["checks"]["system"] = {
            "status": "error",
            "error": str(e)
        }
    
    return health_info

@router.get("/liveness")
async def liveness_probe():
    """Kubernetes liveness probe"""
    return {"status": "alive", "timestamp": datetime.utcnow().isoformat()}

@router.get("/readiness")
async def readiness_probe(db: Session = Depends(get_db)):
    """Kubernetes readiness probe"""
    try:
        # Test database connection
        db.execute(text("SELECT 1"))
        return {"status": "ready", "timestamp": datetime.utcnow().isoformat()}
    except Exception:
        return {"status": "not ready", "timestamp": datetime.utcnow().isoformat()}

@router.get("/rate-limit-stats")
async def rate_limit_stats():
    """Get rate limiting statistics"""
    return get_rate_limit_stats()