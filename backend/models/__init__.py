# backend/models/__init__.py
"""
Database models for the web services application
"""

from .base import Base, BaseModel
from .booking import ServiceBooking, ServiceType, ProjectStatus, ProjectComplexity
from .contact import ContactInquiry, InquiryType, InquiryStatus
from .newsletter import NewsletterSubscription

__all__ = [
    "Base",
    "BaseModel", 
    "ServiceBooking",
    "ServiceType",
    "ProjectStatus", 
    "ProjectComplexity",
    "ContactInquiry",
    "InquiryType",
    "InquiryStatus",
    "NewsletterSubscription"
]