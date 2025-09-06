# backend/services/email_service.py
"""
Email service for sending notifications and confirmations
"""

import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email import encoders
import logging
from typing import Optional
from jinja2 import Environment, FileSystemLoader
import os

from core.config import get_settings
from models.booking import ServiceBooking
from models.contact import ContactInquiry
from models.newsletter import NewsletterSubscription

logger = logging.getLogger(__name__)
settings = get_settings()

class EmailService:
    """Service for sending emails"""
    
    def __init__(self):
        self.smtp_host = settings.SMTP_HOST
        self.smtp_port = settings.SMTP_PORT
        self.smtp_username = settings.SMTP_USERNAME
        self.smtp_password = settings.SMTP_PASSWORD
        self.from_email = settings.SMTP_FROM_EMAIL
        self.from_name = settings.SMTP_FROM_NAME
        
        # Setup Jinja2 for email templates
        template_dir = os.path.join(os.path.dirname(__file__), "../templates/email")
        self.jinja_env = Environment(loader=FileSystemLoader(template_dir))
    
    def send_email(
        self, 
        to_email: str, 
        subject: str, 
        html_content: str, 
        text_content: str = None,
        attachments: list = None
    ) -> bool:
        """Send an email"""
        try:
            msg = MIMEMultipart('alternative')
            msg['Subject'] = subject
            msg['From'] = f"{self.from_name} <{self.from_email}>"
            msg['To'] = to_email
            
            # Add text version
            if text_content:
                text_part = MIMEText(text_content, 'plain')
                msg.attach(text_part)
            
            # Add HTML version
            html_part = MIMEText(html_content, 'html')
            msg.attach(html_part)
            
            # Add attachments
            if attachments:
                for attachment in attachments:
                    with open(attachment['path'], 'rb') as file:
                        part = MIMEBase('application', 'octet-stream')
                        part.set_payload(file.read())
                        encoders.encode_base64(part)
                        part.add_header(
                            'Content-Disposition',
                            f'attachment; filename= {attachment["name"]}'
                        )
                        msg.attach(part)
            
            # Send email
            with smtplib.SMTP(self.smtp_host, self.smtp_port) as server:
                server.starttls()
                server.login(self.smtp_username, self.smtp_password)
                server.send_message(msg)
            
            logger.info(f"Email sent successfully to {to_email}")
            return True
            
        except Exception as e:
            logger.error(f"Failed to send email to {to_email}: {str(e)}")
            return False
    
    def send_booking_confirmation(self, booking: ServiceBooking) -> bool:
        """Send booking confirmation to client"""
        try:
            template = self.jinja_env.get_template('booking_confirmation.html')
            
            html_content = template.render(
                booking=booking,
                business_name=settings.BUSINESS_NAME,
                business_email=settings.BUSINESS_EMAIL,
                business_phone=settings.BUSINESS_PHONE
            )
            
            subject = f"Booking Confirmation - {booking.project_name}"
            
            return self.send_email(booking.email, subject, html_content)
            
        except Exception as e:
            logger.error(f"Error sending booking confirmation: {str(e)}")
            return False
    
    def send_booking_notification(self, booking: ServiceBooking) -> bool:
        """Send booking notification to business"""
        try:
            template = self.jinja_env.get_template('booking_notification.html')
            
            html_content = template.render(
                booking=booking,
                admin_url=f"https://admin.{settings.BUSINESS_EMAIL.split('@')[1]}"
            )
            
            subject = f"New Booking: {booking.project_name} - {booking.service_type}"
            
            return self.send_email(settings.BUSINESS_EMAIL, subject, html_content)
            
        except Exception as e:
            logger.error(f"Error sending booking notification: {str(e)}")
            return False
    
    def send_contact_confirmation(self, contact: ContactInquiry) -> bool:
        """Send contact confirmation to inquirer"""
        try:
            template = self.jinja_env.get_template('contact_confirmation.html')
            
            html_content = template.render(
                contact=contact,
                business_name=settings.BUSINESS_NAME,
                business_email=settings.BUSINESS_EMAIL
            )
            
            subject = f"Thank you for contacting {settings.BUSINESS_NAME}"
            
            return self.send_email(contact.email, subject, html_content)
            
        except Exception as e:
            logger.error(f"Error sending contact confirmation: {str(e)}")
            return False
    
    def send_contact_notification(self, contact: ContactInquiry) -> bool:
        """Send contact notification to business"""
        try:
            template = self.jinja_env.get_template('contact_notification.html')
            
            html_content = template.render(
                contact=contact,
                admin_url=f"https://admin.{settings.BUSINESS_EMAIL.split('@')[1]}"
            )
            
            subject = f"New Contact: {contact.subject}"
            
            return self.send_email(settings.BUSINESS_EMAIL, subject, html_content)
            
        except Exception as e:
            logger.error(f"Error sending contact notification: {str(e)}")
            return False
    
    def send_newsletter_confirmation(self, subscription: NewsletterSubscription) -> bool:
        """Send newsletter confirmation"""
        try:
            template = self.jinja_env.get_template('newsletter_confirmation.html')
            
            # Generate confirmation link (you'd implement this with a token)
            confirmation_url = f"https://{settings.BUSINESS_EMAIL.split('@')[1]}/newsletter/confirm/{subscription.id}"
            
            html_content = template.render(
                subscription=subscription,
                confirmation_url=confirmation_url,
                business_name=settings.BUSINESS_NAME
            )
            
            subject = f"Confirm your subscription to {settings.BUSINESS_NAME} newsletter"
            
            return self.send_email(subscription.email, subject, html_content)
            
        except Exception as e:
            logger.error(f"Error sending newsletter confirmation: {str(e)}")
            return False
    
    def send_status_update(self, booking: ServiceBooking, new_status: str) -> bool:
        """Send booking status update to client"""
        try:
            template = self.jinja_env.get_template('status_update.html')
            
            html_content = template.render(
                booking=booking,
                new_status=new_status,
                business_name=settings.BUSINESS_NAME,
                business_email=settings.BUSINESS_EMAIL
            )
            
            subject = f"Project Update: {booking.project_name} - {new_status.title()}"
            
            return self.send_email(booking.email, subject, html_content)
            
        except Exception as e:
            logger.error(f"Error sending status update: {str(e)}")
            return False