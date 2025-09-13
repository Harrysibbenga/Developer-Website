# backend/services/contact_service.py
"""
Business logic for contact inquiries
"""

from sqlalchemy.orm import Session
from sqlalchemy import and_, func, desc
from typing import List, Optional, Tuple
from datetime import datetime, timedelta
import logging

from models.contact import ContactInquiry, InquiryType, InquiryStatus
from models.newsletter import NewsletterSubscription
from schemas.contact import ContactCreate

logger = logging.getLogger(__name__)

class ContactService:
    """Service for managing contact inquiries"""
    
    def __init__(self, db: Session):
        self.db = db
    
    def create_inquiry(
        self, 
        contact_data: ContactCreate, 
        ip_address: str = None,
        user_agent: str = None
    ) -> ContactInquiry:
        """Create a new contact inquiry"""
        try:
            # Calculate spam score
            spam_score = self._calculate_spam_score(contact_data, ip_address)
            
            # Determine initial status
            status = InquiryStatus.SPAM if spam_score > 0.8 else InquiryStatus.NEW
            
            inquiry = ContactInquiry(
                first_name=contact_data.first_name,
                last_name=contact_data.last_name,
                email=contact_data.email,
                phone=contact_data.phone,
                company=contact_data.company,
                subject=contact_data.subject,
                message=contact_data.message,
                inquiry_type=contact_data.inquiry_type,
                status=status,
                priority=self._determine_priority(contact_data),
                spam_score=spam_score,
                ip_address=ip_address,
                user_agent=user_agent
            )
            
            self.db.add(inquiry)
            self.db.commit()
            self.db.refresh(inquiry)
            
            logger.info(f"Created contact inquiry {inquiry.id} from {inquiry.email}")
            return inquiry
            
        except Exception as e:
            self.db.rollback()
            logger.error(f"Error creating contact inquiry: {str(e)}")
            raise
    
    def get_inquiries(
        self,
        status: Optional[InquiryStatus] = None,
        inquiry_type: Optional[InquiryType] = None,
        limit: int = 50,
        offset: int = 0
    ) -> Tuple[List[ContactInquiry], int]:
        """Get contact inquiries with filtering"""
        try:
            query = self.db.query(ContactInquiry).filter(ContactInquiry.is_active == True)
            
            # Apply filters
            if status:
                query = query.filter(ContactInquiry.status == status)
            if inquiry_type:
                query = query.filter(ContactInquiry.inquiry_type == inquiry_type)
            
            # Get total count
            total = query.count()
            
            # Apply pagination
            inquiries = query.order_by(desc(ContactInquiry.created_at)).offset(offset).limit(limit).all()
            
            return inquiries, total
            
        except Exception as e:
            logger.error(f"Error getting contact inquiries: {str(e)}")
            raise
    
    def _calculate_spam_score(self, contact_data: ContactCreate, ip_address: str = None) -> float:
        """Calculate spam probability score"""
        score = 0.0
        
        # Check for spam keywords
        spam_keywords = [
            'viagra', 'casino', 'lottery', 'prize', 'winner', 'congratulations',
            'urgent', 'immediate', 'act now', 'limited time', 'free money'
        ]
        
        text_to_check = f"{contact_data.subject} {contact_data.message}".lower()
        
        for keyword in spam_keywords:
            if keyword in text_to_check:
                score += 0.3
        
        # Check for suspicious patterns
        if len(contact_data.message) < 20:
            score += 0.2
        
        if contact_data.message.count('http') > 2:
            score += 0.4
        
        if len(contact_data.first_name.split()) or len(contact_data.last_name.split()) < 2:
            score += 0.1
        
        # Check recent submissions from same IP
        if ip_address:
            recent_count = self.db.query(ContactInquiry).filter(
                and_(
                    ContactInquiry.ip_address == ip_address,
                    ContactInquiry.created_at > datetime.utcnow() - timedelta(hours=1)
                )
            ).count()
            
            if recent_count > 3:
                score += 0.5
        
        return min(score, 1.0)
    
    def _determine_priority(self, contact_data: ContactCreate) -> str:
        """Determine inquiry priority"""
        urgent_keywords = ['urgent', 'asap', 'immediate', 'emergency', 'critical']
        subject_lower = contact_data.subject.lower()
        
        if any(keyword in subject_lower for keyword in urgent_keywords):
            return "high"
        elif contact_data.inquiry_type == InquiryType.TECHNICAL:
            return "high"
        elif contact_data.inquiry_type == InquiryType.PARTNERSHIP:
            return "high"
        else:
            return "normal"
    
    def get_stats(self, start_date: datetime, end_date: datetime) -> dict:
        """Get contact statistics"""
        try:
            query = self.db.query(ContactInquiry).filter(
                and_(
                    ContactInquiry.created_at >= start_date,
                    ContactInquiry.created_at <= end_date,
                    ContactInquiry.is_active == True
                )
            )
            
            total_inquiries = query.count()
            new_inquiries = query.filter(ContactInquiry.status == InquiryStatus.NEW).count()
            resolved_inquiries = query.filter(ContactInquiry.status == InquiryStatus.RESOLVED).count()
            spam_inquiries = query.filter(ContactInquiry.status == InquiryStatus.SPAM).count()
            
            # Type breakdown
            inquiry_types = self.db.query(
                ContactInquiry.inquiry_type,
                func.count(ContactInquiry.id)
            ).filter(
                and_(
                    ContactInquiry.created_at >= start_date,
                    ContactInquiry.created_at <= end_date,
                    ContactInquiry.is_active == True
                )
            ).group_by(ContactInquiry.inquiry_type).all()
            
            spam_rate = (spam_inquiries / total_inquiries * 100) if total_inquiries > 0 else 0
            
            return {
                "total_inquiries": total_inquiries,
                "new_inquiries": new_inquiries,
                "resolved_inquiries": resolved_inquiries,
                "by_type": dict(inquiry_types),
                "spam_rate": round(spam_rate, 2)
            }
            
        except Exception as e:
            logger.error(f"Error getting contact stats: {str(e)}")
            raise
    
    def get_recent_contacts(self, limit: int = 20) -> List[ContactInquiry]:
        """Get recent contact inquiries"""
        try:
            return self.db.query(ContactInquiry).filter(
                ContactInquiry.is_active == True
            ).order_by(desc(ContactInquiry.created_at)).limit(limit).all()
        except Exception as e:
            logger.error(f"Error getting recent contacts: {str(e)}")
            raise
    
    def subscribe_newsletter(self, email: str) -> NewsletterSubscription:
        """Subscribe to newsletter"""
        try:
            # Check if already subscribed
            existing = self.db.query(NewsletterSubscription).filter(
                NewsletterSubscription.email == email
            ).first()
            
            if existing:
                if existing.unsubscribed_at:
                    # Resubscribe
                    existing.unsubscribed_at = None
                    existing.subscribed_at = datetime.utcnow()
                    existing.confirmed = False
                    self.db.commit()
                    self.db.refresh(existing)
                    return existing
                else:
                    # Already subscribed
                    return existing
            
            # Create new subscription
            subscription = NewsletterSubscription(email=email)
            self.db.add(subscription)
            self.db.commit()
            self.db.refresh(subscription)
            
            return subscription
            
        except Exception as e:
            self.db.rollback()
            logger.error(f"Error subscribing to newsletter: {str(e)}")
            raise
    
    def get_subscription(self, email: str) -> Optional[NewsletterSubscription]:
        """Get newsletter subscription by email"""
        try:
            return self.db.query(NewsletterSubscription).filter(
                NewsletterSubscription.email == email
            ).first()
        except Exception as e:
            logger.error(f"Error getting subscription for {email}: {str(e)}")
            raise

    def confirm_subscription(self, email: str) -> Optional[NewsletterSubscription]:
        """Confirm newsletter subscription"""
        try:
            subscription = self.db.query(NewsletterSubscription).filter(
                NewsletterSubscription.email == email,
                NewsletterSubscription.unsubscribed_at == None
            ).first()
            
            if subscription and not subscription.confirmed:
                subscription.confirmed = True
                subscription.confirmed_at = datetime.utcnow()
                self.db.commit()
                return subscription
            
            return subscription
            
        except Exception as e:
            self.db.rollback()
            logger.error(f"Error confirming subscription for {email}: {str(e)}")
            raise

    def unsubscribe_newsletter(self, email: str) -> Optional[NewsletterSubscription]:
        """Unsubscribe from newsletter"""
        try:
            subscription = self.db.query(NewsletterSubscription).filter(
                NewsletterSubscription.email == email,
                NewsletterSubscription.unsubscribed_at == None
            ).first()
            
            if subscription:
                subscription.unsubscribed_at = datetime.utcnow()
                self.db.commit()
                return subscription
            
            return subscription
            
        except Exception as e:
            self.db.rollback()
            logger.error(f"Error unsubscribing {email} from newsletter: {str(e)}")
            raise

    def submit_newsletter_feedback(self, email: str, feedback: str) -> Optional[NewsletterSubscription]:
        """Submit feedback for newsletter"""
        try:
            subscription = self.db.query(NewsletterSubscription).filter(
                NewsletterSubscription.email == email
            ).first()
            
            if subscription:
                subscription.feedback = feedback
                subscription.feedback_at = datetime.utcnow()
                self.db.commit()
                return True
            
            return False
            
        except Exception as e:
            self.db.rollback()
            logger.error(f"Error submitting newsletter feedback for {email}: {str(e)}")
            return False
