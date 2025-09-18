# backend/schemas/contact.py
"""
Pydantic schemas for contact inquiries
"""

from pydantic import BaseModel, EmailStr, validator
from typing import List, Optional
from datetime import datetime

from models.contact import InquiryType, InquiryStatus

class ContactResponseData(BaseModel):
    message: str
    mark_as_replied: bool = True

class ContactCreate(BaseModel):
    """Schema for creating a contact inquiry"""
    first_name: str
    last_name: str
    email: EmailStr
    phone: Optional[str] = None
    company: Optional[str] = None
    subject: str
    message: str
    inquiry_type: InquiryType = InquiryType.GENERAL
    
    @validator('first_name', 'last_name')
    def validate_name(cls, v):
        if len(v.strip()) < 2:
            raise ValueError('Name must be at least 2 characters')
        return v.strip()
    
    @validator('subject')
    def validate_subject(cls, v):
        if len(v.strip()) < 5:
            raise ValueError('Subject must be at least 5 characters')
        return v.strip()
    
    @validator('message')
    def validate_message(cls, v):
        if len(v.strip()) < 10:
            raise ValueError('Message must be at least 10 characters')
        return v.strip()

class ContactResponse(BaseModel):
    """Schema for contact inquiry responses"""
    id: int
    first_name: str
    last_name: str
    email: str
    phone: Optional[str]
    company: Optional[str]
    subject: str
    message: str
    inquiry_type: InquiryType
    status: InquiryStatus
    priority: str
    response: Optional[str]
    responded_at: Optional[datetime]
    spam_score: float
    created_at: datetime
    updated_at: datetime
    is_active: bool
    
    class Config:
        from_attributes = True

class ContactList(BaseModel):
    """Schema for paginated contact list"""
    contacts: List[ContactResponse]
    total: int
    limit: int
    offset: int

class NewsletterSubscribe(BaseModel):
    """Schema for newsletter subscription"""
    email: EmailStr

class NewsletterResponse(BaseModel):
    """Schema for newsletter subscription response"""
    id: int
    email: str
    subscribed_at: datetime
    confirmed: bool
    confirmed_at: Optional[datetime]
    weekly_updates: bool
    project_announcements: bool
    technical_articles: bool
    
    class Config:
        from_attributes = True

