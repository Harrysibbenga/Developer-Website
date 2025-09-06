# backend/schemas/admin.py
"""
Pydantic schemas for admin endpoints
"""

from pydantic import BaseModel
from typing import List, Dict, Any
from datetime import datetime

from models.booking import ServiceType, ProjectStatus
from models.contact import InquiryType, InquiryStatus

class BookingStats(BaseModel):
    """Booking statistics"""
    total_bookings: int
    new_bookings: int
    completed_bookings: int
    pending_bookings: int
    by_service_type: Dict[ServiceType, int]
    by_status: Dict[ProjectStatus, int]
    average_project_value: Optional[float]
    conversion_rate: float

class ContactStats(BaseModel):
    """Contact statistics"""
    total_inquiries: int
    new_inquiries: int
    resolved_inquiries: int
    by_type: Dict[InquiryType, int]
    by_status: Dict[InquiryStatus, int]
    spam_rate: float

class RevenueStats(BaseModel):
    """Revenue statistics"""
    total_quoted: float
    total_accepted: float
    total_completed: float
    average_project_size: float
    monthly_recurring: float

class AdminStats(BaseModel):
    """Combined admin statistics"""
    period_days: int
    start_date: datetime
    end_date: datetime
    bookings: BookingStats
    contacts: ContactStats
    revenue: RevenueStats

class BookingSummary(BaseModel):
    """Summary of a booking for admin view"""
    booking_id: str
    project_name: str
    client_name: str
    service_type: ServiceType
    status: ProjectStatus
    estimated_cost: Optional[float]
    created_at: datetime

class ContactSummary(BaseModel):
    """Summary of a contact for admin view"""
    id: int
    name: str
    email: str
    subject: str
    inquiry_type: InquiryType
    status: InquiryStatus
    created_at: datetime

class ActivityLog(BaseModel):
    """Activity log entry"""
    timestamp: datetime
    action: str
    entity_type: str
    entity_id: str
    details: Dict[str, Any]