# backend/models/contact.py
"""
Contact inquiry model for general inquiries
"""

from sqlalchemy import Column, String, Text, Enum, Float, DateTime
from sqlalchemy.dialects.postgresql import UUID
import enum

from .base import BaseModel
from .booking import GUID

class InquiryType(str, enum.Enum):
    GENERAL = "general"
    TECHNICAL = "technical"
    PARTNERSHIP = "partnership"
    COLLABORATION = "collaboration"
    SUPPORT = "support"
    MEDIA = "media"

class InquiryStatus(str, enum.Enum):
    NEW = "new"
    READ = "read"
    REPLIED = "replied"
    RESOLVED = "resolved"
    SPAM = "spam"

class ContactInquiry(BaseModel):
    """Contact inquiry model"""
    __tablename__ = "contact_inquiries"
    
    # Contact details
    first_name = Column(String(100), nullable=False)
    last_name = Column(String(100), nullable=False)
    email = Column(String(255), nullable=False, index=True)
    phone = Column(String(20), nullable=True)
    company = Column(String(200), nullable=True)
    
    # Inquiry details
    subject = Column(String(300), nullable=False)
    message = Column(Text, nullable=False)
    inquiry_type = Column(Enum(InquiryType), default=InquiryType.GENERAL)
    
    # Management
    status = Column(Enum(InquiryStatus), default=InquiryStatus.NEW)
    priority = Column(String(20), default="normal")
    
    # Response tracking
    response = Column(Text, nullable=True)
    responded_at = Column(DateTime, nullable=True)
    
    # Spam detection
    spam_score = Column(Float, default=0.0)
    ip_address = Column(String(45), nullable=True)  # IPv6 compatible
    user_agent = Column(String(500), nullable=True)
    
    def __repr__(self):
        return f"<ContactInquiry {self.id}: {self.subject}>"