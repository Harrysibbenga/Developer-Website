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
    request: Request,  # Move Request to first parameter
    contact_data: ContactCreate,
    background_tasks: BackgroundTasks,
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
# @rate_limit(requests=20, window=3600)  # Add rate limiting
async def list_contacts(
    request: Request,  # Add Request parameter
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
    
@router.get("/{contact_id}", response_model=ContactResponse)
# @rate_limit(requests=10, window=3600)  # Add rate limiting
async def get_contact(
    request: Request,  # Add Request parameter
    contact_id: int,
    db: Session = Depends(get_db)
):
    """Get contact inquiry by ID"""
    try:
        contact_service = ContactService(db)
        
        contact = contact_service.get_inquiry_by_id(contact_id)
        
        if not contact:
            raise HTTPException(status_code=404, detail="Contact not found")
        
        return ContactResponse.from_orm(contact)
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error getting contact inquiry: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to retrieve contact")
    

@router.patch("/{contact_id}/status", response_model=ContactResponse)
# @rate_limit(requests=10, window=3600)
async def update_contact_status(
    request: Request,
    contact_id: int,
    status_data: dict,  # {"status": "new|responded|resolved"}
    db: Session = Depends(get_db)
):
    """Update contact inquiry status"""
    try:
        contact_service = ContactService(db)
        
        contact = contact_service.update_inquiry_status(contact_id, status_data.get("status"))
        
        if not contact:
            raise HTTPException(status_code=404, detail="Contact not found")
        
        logger.info(f"Contact status updated: {contact_id} -> {status_data.get('status')}")
        return ContactResponse.from_orm(contact)
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error updating contact status: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to update contact status")
    

@router.post("/newsletter", response_model=NewsletterResponse, status_code=201)
@rate_limit(requests=5, window=3600)  # 5 subscriptions per hour
async def subscribe_newsletter(
    request: Request,  # Add Request parameter
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
    
@router.get("/newsletter/subscriber/{email}", response_model=NewsletterResponse)
@rate_limit(requests=10, window=3600)  # Add rate limiting
async def get_newsletter_subscriber(
    request: Request,  # Add Request parameter
    email: str,
    db: Session = Depends(get_db)
):
    """Get newsletter subscriber info"""
    try:
        contact_service = ContactService(db)
        
        subscription = contact_service.get_subscription(email)
        
        if not subscription:
            raise HTTPException(status_code=404, detail="Subscriber not found")
        
        return NewsletterResponse.from_orm(subscription)
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error getting subscriber info: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to retrieve subscriber info")
    
@router.post("/newsletter/confirm", status_code=200, response_model=NewsletterResponse)
@rate_limit(requests=10, window=3600)  # Add rate limiting
async def confirm_newsletter_subscription(
    request: Request,  # Add Request parameter
    email: str,
    db: Session = Depends(get_db)
):
    """Confirm newsletter subscription"""
    try:
        contact_service = ContactService(db)
        
        # Capture the return value
        subscription = contact_service.confirm_subscription(email)
        
        if not subscription:
            raise HTTPException(status_code=404, detail="Subscription not found")
        
        logger.info(f"Newsletter subscription confirmed: {email}")
        
        return NewsletterResponse.from_orm(subscription)
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error confirming subscription: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to confirm subscription")
    
@router.post("/newsletter/unsubscribe", status_code=200, response_model=NewsletterResponse)
@rate_limit(requests=10, window=3600)  # Add rate limiting
async def unsubscribe_newsletter(
    request: Request,  # Add Request parameter
    email: str,
    db: Session = Depends(get_db)
):
    """Unsubscribe from newsletter"""
    try:
        contact_service = ContactService(db)
        
        # Capture the return value
        subscription = contact_service.unsubscribe_newsletter(email)
        
        if not subscription:
            raise HTTPException(status_code=404, detail="Active subscription not found")
        
        logger.info(f"Newsletter unsubscription: {email}")
        
        return NewsletterResponse.from_orm(subscription)
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error unsubscribing from newsletter: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to unsubscribe")