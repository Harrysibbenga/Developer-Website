# backend/schemas/booking.py
"""
Pydantic schemas for service bookings
"""

from pydantic import BaseModel, EmailStr, validator
from typing import List, Optional
from datetime import datetime
from enum import Enum

from models.booking import ServiceType, ProjectStatus, ProjectComplexity

class BookingCreate(BaseModel):
    """Schema for creating a new booking"""
    service_type: ServiceType
    project_name: str
    description: str
    timeline: str
    budget_range: str
    technologies: List[str] = []
    features: List[str] = []
    first_name: str
    last_name: str
    email: EmailStr
    phone: Optional[str] = None
    company: Optional[str] = None
    client_notes: Optional[str] = None
    
    @validator('project_name')
    def validate_project_name(cls, v):
        if len(v.strip()) < 3:
            raise ValueError('Project name must be at least 3 characters')
        return v.strip()
    
    @validator('description')
    def validate_description(cls, v):
        if len(v.strip()) < 20:
            raise ValueError('Description must be at least 20 characters')
        return v.strip()
    
    @validator('first_name', 'last_name')
    def validate_names(cls, v):
        if len(v.strip()) < 2:
            raise ValueError('Name must be at least 2 characters')
        return v.strip().title()

class BookingUpdate(BaseModel):
    """Schema for updating a booking"""
    project_name: Optional[str] = None
    description: Optional[str] = None
    timeline: Optional[str] = None
    budget_range: Optional[str] = None
    technologies: Optional[List[str]] = None
    features: Optional[List[str]] = None
    complexity: Optional[ProjectComplexity] = None
    estimated_hours: Optional[float] = None
    estimated_cost: Optional[float] = None
    notes: Optional[str] = None
    quote_amount: Optional[float] = None
    quote_valid_until: Optional[datetime] = None

class BookingStatusUpdate(BaseModel):
    """Schema for updating booking status"""
    status: ProjectStatus
    notes: Optional[str] = None

class BookingResponse(BaseModel):
    """Schema for booking responses"""
    id: int
    booking_id: str
    service_type: ServiceType
    project_name: str
    description: str
    timeline: str
    budget_range: str
    technologies: List[str]
    features: List[str]
    complexity: Optional[ProjectComplexity]
    estimated_hours: Optional[float]
    estimated_cost: Optional[float]
    first_name: str
    last_name: str
    email: str
    phone: Optional[str]
    company: Optional[str]
    status: ProjectStatus
    priority: str
    notes: Optional[str]
    client_notes: Optional[str]
    quote_amount: Optional[float]
    quote_valid_until: Optional[datetime]
    quote_sent_at: Optional[datetime]
    created_at: datetime
    updated_at: datetime
    is_active: bool
    
    class Config:
        from_attributes = True

class BookingList(BaseModel):
    """Schema for paginated booking list"""
    bookings: List[BookingResponse]
    total: int
    limit: int
    offset: int

