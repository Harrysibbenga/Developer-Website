# backend/models/booking.py
"""
Service booking model for project inquiries
"""

from sqlalchemy import Column, String, Text, Float, JSON, Enum
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.types import TypeDecorator, CHAR
import uuid
import enum
from datetime import datetime

from .base import BaseModel

class ServiceType(str, enum.Enum):
    WEB_DEVELOPMENT = "webDevelopment"
    DATA_PROCESSING = "dataProcessing"
    REALTIME_SYSTEMS = "realtimeSystems"
    CONSULTATION = "consultation"

class ProjectStatus(str, enum.Enum):
    PENDING = "pending"
    REVIEWED = "reviewed"
    QUOTED = "quoted"
    ACCEPTED = "accepted"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    CANCELLED = "cancelled"

class ProjectComplexity(str, enum.Enum):
    SIMPLE = "simple"
    MEDIUM = "medium"
    COMPLEX = "complex"

class GUID(TypeDecorator):
    """Platform-independent GUID type."""
    impl = CHAR
    cache_ok = True

    def load_dialect_impl(self, dialect):
        if dialect.name == 'postgresql':
            return dialect.type_descriptor(UUID())
        else:
            return dialect.type_descriptor(CHAR(32))

    def process_bind_param(self, value, dialect):
        if value is None:
            return value
        elif dialect.name == 'postgresql':
            return str(value)
        else:
            if not isinstance(value, uuid.UUID):
                return "%.32x" % uuid.UUID(value).int
            else:
                return "%.32x" % value.int

    def process_result_value(self, value, dialect):
        if value is None:
            return value
        else:
            if not isinstance(value, uuid.UUID):
                return uuid.UUID(value)
            else:
                return value

class ServiceBooking(BaseModel):
    """Service booking model"""
    __tablename__ = "service_bookings"
    
    # Unique identifier
    booking_id = Column(GUID(), default=uuid.uuid4, unique=True, index=True)
    
    # Service details
    service_type = Column(Enum(ServiceType), nullable=False)
    project_name = Column(String(200), nullable=False)
    description = Column(Text, nullable=False)
    timeline = Column(String(100), nullable=False)
    budget_range = Column(String(100), nullable=False)
    
    # Technical requirements
    technologies = Column(JSON, default=list)  # List of preferred technologies
    features = Column(JSON, default=list)      # List of required features
    complexity = Column(Enum(ProjectComplexity), nullable=True)
    estimated_hours = Column(Float, nullable=True)
    estimated_cost = Column(Float, nullable=True)
    
    # Client information
    first_name = Column(String(100), nullable=False)
    last_name = Column(String(100), nullable=False)
    email = Column(String(255), nullable=False, index=True)
    phone = Column(String(20), nullable=True)
    company = Column(String(200), nullable=True)
    
    # Project management
    status = Column(Enum(ProjectStatus), default=ProjectStatus.PENDING)
    priority = Column(String(20), default="normal")  # low, normal, high, urgent
    
    # Communication
    notes = Column(Text, nullable=True)  # Internal notes
    client_notes = Column(Text, nullable=True)  # Notes from client
    
    # Quote information
    quote_amount = Column(Float, nullable=True)
    quote_valid_until = Column(DateTime, nullable=True)
    quote_sent_at = Column(DateTime, nullable=True)
    
    def __repr__(self):
        return f"<ServiceBooking {self.booking_id}: {self.project_name}>"

