# backend/api/routes/bookings.py
"""
Service booking API endpoints
"""

from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks, Request
from sqlalchemy.orm import Session
from typing import List, Optional
import logging

from core.database import get_db
from core.config import get_settings
from models.booking import ServiceBooking, ServiceType, ProjectStatus
from schemas.booking import (
    BookingCreate, BookingResponse, BookingUpdate, 
    BookingList, BookingStatusUpdate
)
from services.booking_service import BookingService
from services.email_service import EmailService
from utils.rate_limit import rate_limit

router = APIRouter()
logger = logging.getLogger(__name__)
settings = get_settings()

@router.post("/", response_model=BookingResponse, status_code=201)
@rate_limit(requests=5, window=3600)  # 5 requests per hour
async def create_booking(
    booking_data: BookingCreate,
    background_tasks: BackgroundTasks,
    request: Request,
    db: Session = Depends(get_db)
):
    """Create a new service booking"""
    try:
        booking_service = BookingService(db)
        email_service = EmailService()
        
        # Create booking
        booking = booking_service.create_booking(booking_data, request.client.host)
        
        # Send confirmation emails in background
        background_tasks.add_task(
            email_service.send_booking_confirmation,
            booking
        )
        background_tasks.add_task(
            email_service.send_booking_notification,
            booking
        )
        
        logger.info(f"New booking created: {booking.booking_id}")
        
        return BookingResponse.from_orm(booking)
        
    except Exception as e:
        logger.error(f"Error creating booking: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to create booking")

@router.get("/", response_model=BookingList)
async def list_bookings(
    status: Optional[ProjectStatus] = None,
    service_type: Optional[ServiceType] = None,
    limit: int = 50,
    offset: int = 0,
    db: Session = Depends(get_db)
):
    """List service bookings with filtering"""
    try:
        booking_service = BookingService(db)
        bookings, total = booking_service.get_bookings(
            status=status,
            service_type=service_type,
            limit=limit,
            offset=offset
        )
        
        return BookingList(
            bookings=[BookingResponse.from_orm(booking) for booking in bookings],
            total=total,
            limit=limit,
            offset=offset
        )
        
    except Exception as e:
        logger.error(f"Error listing bookings: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to retrieve bookings")

@router.get("/{booking_id}", response_model=BookingResponse)
async def get_booking(
    booking_id: str,
    db: Session = Depends(get_db)
):
    """Get a specific booking by ID"""
    try:
        booking_service = BookingService(db)
        booking = booking_service.get_booking_by_id(booking_id)
        
        if not booking:
            raise HTTPException(status_code=404, detail="Booking not found")
        
        return BookingResponse.from_orm(booking)
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error retrieving booking {booking_id}: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to retrieve booking")

@router.put("/{booking_id}", response_model=BookingResponse)
async def update_booking(
    booking_id: str,
    booking_update: BookingUpdate,
    db: Session = Depends(get_db)
):
    """Update a booking"""
    try:
        booking_service = BookingService(db)
        booking = booking_service.update_booking(booking_id, booking_update)
        
        if not booking:
            raise HTTPException(status_code=404, detail="Booking not found")
        
        logger.info(f"Booking updated: {booking_id}")
        return BookingResponse.from_orm(booking)
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error updating booking {booking_id}: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to update booking")

@router.patch("/{booking_id}/status", response_model=BookingResponse)
async def update_booking_status(
    booking_id: str,
    status_update: BookingStatusUpdate,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db)
):
    """Update booking status"""
    try:
        booking_service = BookingService(db)
        email_service = EmailService()
        
        booking = booking_service.update_status(booking_id, status_update.status)
        
        if not booking:
            raise HTTPException(status_code=404, detail="Booking not found")
        
        # Send status update email
        background_tasks.add_task(
            email_service.send_status_update,
            booking,
            status_update.status
        )
        
        logger.info(f"Booking status updated: {booking_id} -> {status_update.status}")
        return BookingResponse.from_orm(booking)
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error updating booking status {booking_id}: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to update booking status")

