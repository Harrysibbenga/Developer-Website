# backend/api/routes/admin.py
"""
Admin endpoints for managing bookings and contacts
"""

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime, timedelta
import logging

from core.database import get_db
from services.booking_service import BookingService
from services.contact_service import ContactService
from schemas.admin import (
    AdminStats, BookingSummary, ContactSummary,
    RevenueStats, ActivityLog
)

router = APIRouter()
logger = logging.getLogger(__name__)

@router.get("/stats", response_model=AdminStats)
async def get_admin_stats(
    days: int = Query(30, description="Number of days to include in stats"),
    db: Session = Depends(get_db)
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
async def get_booking_summary(
    limit: int = Query(20, description="Number of recent bookings"),
    db: Session = Depends(get_db)
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
async def get_contact_summary(
    limit: int = Query(20, description="Number of recent contacts"),
    db: Session = Depends(get_db)
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