# backend/api/routes/admin.py
"""
Admin endpoints for managing bookings and contacts
"""

from fastapi import APIRouter, Depends, HTTPException, Query, Request
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
from typing import List
import os
import logging
from jose import JWTError, jwt
from passlib.context import CryptContext
from datetime import datetime, timedelta
from core.database import get_db
from services.booking_service import BookingService
from services.contact_service import ContactService
from utils.rate_limit import rate_limit
from schemas.admin import (
    AdminStats, BookingSummary, ContactSummary,
    RevenueStats, ActivityLog, AuthResponse, AdminLogin
)

security = HTTPBearer()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

router = APIRouter()
logger = logging.getLogger(__name__)

ADMIN_USERS = {
    "admin@example.com": {
        "email": "admin@example.com",
        "hashed_password": pwd_context.hash("admin123"),  # Hash the password
        "role": "admin"
    }
}

def create_access_token(email: str) -> str:
    """Create JWT access token"""
    expire = datetime.utcnow() + timedelta(hours=24)
    to_encode = {"sub": email, "exp": expire, "role": "admin"}
    secret_key = os.getenv("SECRET_KEY", "your-secret-key-change-in-production")
    return jwt.encode(to_encode, secret_key, algorithm="HS256")

def verify_admin_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """Verify admin JWT token"""
    try:
        secret_key = os.getenv("SECRET_KEY", "your-secret-key-change-in-production")
        payload = jwt.decode(credentials.credentials, secret_key, algorithms=["HS256"])
        email: str = payload.get("sub")
        role: str = payload.get("role")
        
        if email is None or role != "admin" or email not in ADMIN_USERS:
            raise HTTPException(status_code=401, detail="Invalid authentication")
            
        return {"email": email, "role": role}
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid authentication token")
    

@router.post("/auth/login", response_model=AuthResponse)
async def admin_login(credentials: AdminLogin):
    """Admin login endpoint"""
    user = ADMIN_USERS.get(credentials.email)
    
    if not user or not pwd_context.verify(credentials.password, user["hashed_password"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    access_token = create_access_token(credentials.email)
    return AuthResponse(
        access_token=access_token,
        token_type="bearer",
        user={"email": user["email"], "role": user["role"]}
    )

@router.get("/stats", response_model=AdminStats)
@rate_limit(requests=30, window=3600)  # 30 requests per hour for stats
async def get_admin_stats(
    request: Request,  # Add Request parameter
    days: int = Query(30, description="Number of days to include in stats"),
    db: Session = Depends(get_db),
    current_user: dict = Depends(verify_admin_token)
):
    """Get administrative statistics"""
    try:
        booking_service = BookingService(db)
        contact_service = ContactService(db)
        
        end_date = datetime.utcnow()
        start_date = end_date - timedelta(days=days)
        
        # Get booking stats
        booking_stats = booking_service.get_stats(start_date, end_date)
        
        # Get contact stats
        contact_stats = contact_service.get_stats(start_date, end_date)
        
        # Calculate revenue stats
        revenue_stats = booking_service.get_revenue_stats(start_date, end_date)
        
        return AdminStats(
            period_days=days,
            start_date=start_date,
            end_date=end_date,
            bookings=booking_stats,
            contacts=contact_stats,
            revenue=revenue_stats
        )
        
    except Exception as e:
        logger.error(f"Error getting admin stats: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to retrieve statistics")

@router.get("/bookings/summary", response_model=List[BookingSummary])
@rate_limit(requests=50, window=3600)  # 50 requests per hour for summaries
async def get_booking_summary(
    request: Request,  # Add Request parameter
    limit: int = Query(20, description="Number of recent bookings"),
    db: Session = Depends(get_db),
    current_user: dict = Depends(verify_admin_token)
):
    """Get recent booking summary"""
    try:
        booking_service = BookingService(db)
        bookings = booking_service.get_recent_bookings(limit)
        
        return [
            BookingSummary(
                booking_id=booking.booking_id,
                project_name=booking.project_name,
                client_name=f"{booking.first_name} {booking.last_name}",
                service_type=booking.service_type,
                status=booking.status,
                estimated_cost=booking.estimated_cost,
                created_at=booking.created_at
            )
            for booking in bookings
        ]
        
    except Exception as e:
        logger.error(f"Error getting booking summary: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to retrieve booking summary")

@router.get("/contacts/summary", response_model=List[ContactSummary])
@rate_limit(requests=50, window=3600)  # 50 requests per hour for summaries
async def get_contact_summary(
    request: Request,  # Add Request parameter
    limit: int = Query(20, description="Number of recent contacts"),
    db: Session = Depends(get_db),
    current_user: dict = Depends(verify_admin_token)
):
    """Get recent contact summary"""
    try:
        contact_service = ContactService(db)
        contacts = contact_service.get_recent_contacts(limit)
        
        return [
            ContactSummary(
                id=contact.id,
                name=contact.name,
                email=contact.email,
                subject=contact.subject,
                inquiry_type=contact.inquiry_type,
                status=contact.status,
                created_at=contact.created_at
            )
            for contact in contacts
        ]
        
    except Exception as e:
        logger.error(f"Error getting contact summary: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to retrieve contact summary")