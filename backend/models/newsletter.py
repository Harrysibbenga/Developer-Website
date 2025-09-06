# backend/models/newsletter.py
"""
Newsletter subscription model
"""

from sqlalchemy import Column, String, Boolean, DateTime
from sqlalchemy.sql import func

from .base import BaseModel

class NewsletterSubscription(BaseModel):
    """Newsletter subscription model"""
    __tablename__ = "newsletter_subscriptions"
    
    email = Column(String(255), nullable=False, unique=True, index=True)
    subscribed_at = Column(DateTime(timezone=True), server_default=func.now())
    confirmed = Column(Boolean, default=False)
    confirmed_at = Column(DateTime(timezone=True), nullable=True)
    unsubscribed_at = Column(DateTime(timezone=True), nullable=True)
    
    # Preferences
    weekly_updates = Column(Boolean, default=True)
    project_announcements = Column(Boolean, default=True)
    technical_articles = Column(Boolean, default=True)
    
    def __repr__(self):
        return f"<NewsletterSubscription {self.email}>"