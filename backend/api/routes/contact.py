# backend/api/routes/contact.py
"""
Contact inquiry API endpoints
"""

from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks, Request
from sqlalchemy.orm import Session
from typing import List, Optional
import logging

from core.database import get_db
from models.contact import ContactInquiry, InquiryType, InquiryStatus
from schemas.contact import (
    ContactCreate, ContactResponse, ContactList,
    NewsletterSubscribe, NewsletterResponse
)
from services.contact_service import ContactService
from services.email_service import EmailService
from utils.rate_limit import rate_limit

router = APIRouter()
logger = logging.getLogger(__name__)

@router.post("/", response_model=ContactResponse, status_code=201)
@rate_limit(requests=3, window=3600)  # 3 requests per hour
async def create_contact(
    contact_data: ContactCreate,
    background_tasks: BackgroundTasks,
    request: Request,
    db: Session = Depends(get_db)
):
    """Submit a contact inquiry"""
    try:
        contact_service = ContactService(db)
        email_service = EmailService()
        
        # Create contact inquiry
        contact = contact_service.create_inquiry(
            contact_data, 
            request.client.host,
            request.headers.get("user-agent", "")
        )
        
        # Send emails in background
        background_tasks.add_task(
            email_service.send_contact_confirmation,
            contact
        )
        background_tasks.add_task(
            email_service.send_contact_notification,
            contact
        )
        
        logger.info(f"New contact inquiry: {contact.id} from {contact.email}")
        
        return ContactResponse.from_orm(contact)
        
    except Exception as e:
        logger.error(f"Error creating contact inquiry: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to submit inquiry")

@router.get("/", response_model=ContactList)
async def list_contacts(
    status: Optional[InquiryStatus] = None,
    inquiry_type: Optional[InquiryType] = None,
    limit: int = 50,
    offset: int = 0,
    db: Session = Depends(get_db)
):
    """List contact inquiries"""
    try:
        contact_service = ContactService(db)
        contacts, total = contact_service.get_inquiries(
            status=status,
            inquiry_type=inquiry_type,
            limit=limit,
            offset=offset
        )
        
        return ContactList(
            contacts=[ContactResponse.from_orm(contact) for contact in contacts],
            total=total,
            limit=limit,
            offset=offset
        )
        
    except Exception as e:
        logger.error(f"Error listing contacts: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to retrieve contacts")

@router.post("/newsletter", response_model=NewsletterResponse, status_code=201)
@rate_limit(requests=5, window=3600)  # 5 subscriptions per hour
async def subscribe_newsletter(
    subscription_data: NewsletterSubscribe,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db)
):
    """Subscribe to newsletter"""
    try:
        contact_service = ContactService(db)
        email_service = EmailService()
        
        # Create or update subscription
        subscription = contact_service.subscribe_newsletter(subscription_data.email)
        
        # Send confirmation email
        background_tasks.add_task(
            email_service.send_newsletter_confirmation,
            subscription
        )
        
        logger.info(f"Newsletter subscription: {subscription_data.email}")
        
        return NewsletterResponse.from_orm(subscription)
        
    except Exception as e:
        logger.error(f"Error subscribing to newsletter: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to subscribe")