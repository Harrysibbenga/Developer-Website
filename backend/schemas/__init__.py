# backend/schemas/__init__.py
"""
Pydantic schemas for the web services API
"""

from .booking import (
    BookingCreate, BookingUpdate, BookingStatusUpdate,
    BookingResponse, BookingList
)
from .contact import (
    ContactCreate, ContactResponse, ContactList,
    NewsletterSubscribe, NewsletterResponse
)
from .admin import (
    AdminStats, BookingStats, ContactStats, RevenueStats,
    BookingSummary, ContactSummary, ActivityLog
)

__all__ = [
    # Booking schemas
    "BookingCreate",
    "BookingUpdate", 
    "BookingStatusUpdate",
    "BookingResponse",
    "BookingList",
    
    # Contact schemas
    "ContactCreate",
    "ContactResponse",
    "ContactList",
    "NewsletterSubscribe",
    "NewsletterResponse",
    
    # Admin schemas
    "AdminStats",
    "BookingStats",
    "ContactStats", 
    "RevenueStats",
    "BookingSummary",
    "ContactSummary",
    "ActivityLog"
]