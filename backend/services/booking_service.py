# backend/services/booking_service.py
"""
Business logic for service bookings
"""

from sqlalchemy.orm import Session
from sqlalchemy import and_, func, desc
from typing import List, Optional, Tuple
from datetime import datetime, timedelta
import uuid
import logging

from models.booking import ServiceBooking, ServiceType, ProjectStatus, ProjectComplexity
from schemas.booking import BookingCreate, BookingUpdate
from core.config import get_settings

logger = logging.getLogger(__name__)
settings = get_settings()

class BookingService:
    """Service for managing bookings"""
    
    def __init__(self, db: Session):
        self.db = db
    
    def create_booking(self, booking_data: BookingCreate, client_ip: str = None) -> ServiceBooking:
        """Create a new service booking"""
        try:
            # Calculate project complexity
            complexity = self._calculate_complexity(
                booking_data.technologies,
                booking_data.features,
                booking_data.description
            )
            
            # Estimate hours and cost
            estimated_hours, estimated_cost = self._estimate_project(
                booking_data.service_type,
                complexity,
                len(booking_data.features)
            )
            
            # Create booking
            booking = ServiceBooking(
                booking_id=str(uuid.uuid4()),
                service_type=booking_data.service_type,
                project_name=booking_data.project_name,
                description=booking_data.description,
                timeline=booking_data.timeline,
                budget_range=booking_data.budget_range,
                technologies=booking_data.technologies,
                features=booking_data.features,
                complexity=complexity,
                estimated_hours=estimated_hours,
                estimated_cost=estimated_cost,
                first_name=booking_data.first_name,
                last_name=booking_data.last_name,
                email=booking_data.email,
                phone=booking_data.phone,
                company=booking_data.company,
                client_notes=booking_data.client_notes,
                status=ProjectStatus.PENDING,
                priority=self._determine_priority(booking_data.budget_range, booking_data.timeline)
            )
            
            self.db.add(booking)
            self.db.commit()
            self.db.refresh(booking)
            
            logger.info(f"Created booking {booking.booking_id} for {booking.email}")
            return booking
            
        except Exception as e:
            self.db.rollback()
            logger.error(f"Error creating booking: {str(e)}")
            raise
    
    def get_bookings(
        self,
        status: Optional[ProjectStatus] = None,
        service_type: Optional[ServiceType] = None,
        limit: int = 50,
        offset: int = 0
    ) -> Tuple[List[ServiceBooking], int]:
        """Get bookings with filtering and pagination"""
        try:
            query = self.db.query(ServiceBooking).filter(ServiceBooking.is_active == True)
            
            # Apply filters
            if status:
                query = query.filter(ServiceBooking.status == status)
            if service_type:
                query = query.filter(ServiceBooking.service_type == service_type)
            
            # Get total count
            total = query.count()
            
            # Apply pagination and ordering
            bookings = query.order_by(desc(ServiceBooking.created_at)).offset(offset).limit(limit).all()
            
            return bookings, total
            
        except Exception as e:
            logger.error(f"Error getting bookings: {str(e)}")
            raise
    
    def get_booking_by_id(self, booking_id: str) -> Optional[ServiceBooking]:
        """Get a booking by ID"""
        try:
            return self.db.query(ServiceBooking).filter(
                and_(
                    ServiceBooking.booking_id == booking_id,
                    ServiceBooking.is_active == True
                )
            ).first()
        except Exception as e:
            logger.error(f"Error getting booking {booking_id}: {str(e)}")
            raise
    
    def update_booking(self, booking_id: str, booking_update: BookingUpdate) -> Optional[ServiceBooking]:
        """Update a booking"""
        try:
            booking = self.get_booking_by_id(booking_id)
            if not booking:
                return None
            
            # Update fields
            update_data = booking_update.dict(exclude_unset=True)
            for field, value in update_data.items():
                setattr(booking, field, value)
            
            # Recalculate complexity if relevant fields changed
            if any(field in update_data for field in ['technologies', 'features', 'description']):
                booking.complexity = self._calculate_complexity(
                    booking.technologies,
                    booking.features,
                    booking.description
                )
                
                # Recalculate estimates
                booking.estimated_hours, booking.estimated_cost = self._estimate_project(
                    booking.service_type,
                    booking.complexity,
                    len(booking.features)
                )
            
            self.db.commit()
            self.db.refresh(booking)
            
            return booking
            
        except Exception as e:
            self.db.rollback()
            logger.error(f"Error updating booking {booking_id}: {str(e)}")
            raise
    
    def update_status(self, booking_id: str, status: ProjectStatus) -> Optional[ServiceBooking]:
        """Update booking status"""
        try:
            booking = self.get_booking_by_id(booking_id)
            if not booking:
                return None
            
            booking.status = status
            
            # Set quote sent timestamp if status is quoted
            if status == ProjectStatus.QUOTED and not booking.quote_sent_at:
                booking.quote_sent_at = datetime.utcnow()
                booking.quote_valid_until = datetime.utcnow() + timedelta(days=30)
            
            self.db.commit()
            self.db.refresh(booking)
            
            return booking
            
        except Exception as e:
            self.db.rollback()
            logger.error(f"Error updating booking status {booking_id}: {str(e)}")
            raise
    
    def _calculate_complexity(
        self, 
        technologies: List[str], 
        features: List[str], 
        description: str
    ) -> ProjectComplexity:
        """Calculate project complexity based on requirements"""
        score = 0
        
        # Technology complexity
        score += len(technologies) * 2
        
        # Feature complexity
        complex_features = [
            "Real-time Features", "Payment Processing", "Data Analytics",
            "Third-party Integrations", "File Upload/Storage"
        ]
        score += sum(5 for feature in features if feature in complex_features)
        score += len(features) * 2
        
        # Description complexity (longer = more complex)
        if len(description) > 500:
            score += 10
        elif len(description) > 200:
            score += 5
        
        # Determine complexity level
        if score < 20:
            return ProjectComplexity.SIMPLE
        elif score < 40:
            return ProjectComplexity.MEDIUM
        else:
            return ProjectComplexity.COMPLEX
    
    def _estimate_project(
        self,
        service_type: ServiceType,
        complexity: ProjectComplexity,
        feature_count: int
    ) -> Tuple[float, float]:
        """Estimate project hours and cost"""
        # Base hours by service type
        base_hours = {
            ServiceType.BUSINESS_WEBSITES: 20,
            ServiceType.WEB_APPLICATIONS: 40,
            ServiceType.DATA_AUTOMATION: 24,
            ServiceType.DIGITAL_TRANSFROMATION: 50,
            ServiceType.CONSULTATION: 8
        }
        
        # Complexity multipliers
        complexity_multipliers = {
            ProjectComplexity.SIMPLE: 1.0,
            ProjectComplexity.MEDIUM: 1.5,
            ProjectComplexity.COMPLEX: 2.5
        }
        
        # Calculate hours
        hours = base_hours[service_type] * complexity_multipliers[complexity]
        hours += feature_count * 3  # 3 hours per feature
        
        # Calculate cost (£75/hour base rate)
        hourly_rate = 75
        cost = hours * hourly_rate
        
        return round(hours, 1), round(cost, 2)
    
    def _determine_priority(self, budget_range: str, timeline: str) -> str:
        """Determine booking priority"""
        urgent_timelines = ["ASAP (Rush job)", "Within 2 weeks"]
        high_budgets = ["£10,000+", "£5,000 - £10,000"]
        
        if timeline in urgent_timelines or budget_range in high_budgets:
            return "high"
        elif timeline == "Within 1 month" or budget_range == "£2,500 - £5,000":
            return "normal"
        else:
            return "low"
    
    def get_stats(self, start_date: datetime, end_date: datetime) -> dict:
        """Get booking statistics for a date range"""
        try:
            query = self.db.query(ServiceBooking).filter(
                and_(
                    ServiceBooking.created_at >= start_date,
                    ServiceBooking.created_at <= end_date,
                    ServiceBooking.is_active == True
                )
            )
            
            total_bookings = query.count()
            new_bookings = query.filter(ServiceBooking.status == ProjectStatus.PENDING).count()
            completed_bookings = query.filter(ServiceBooking.status == ProjectStatus.COMPLETED).count()
            
            # Service type breakdown
            service_types = self.db.query(
                ServiceBooking.service_type,
                func.count(ServiceBooking.id)
            ).filter(
                and_(
                    ServiceBooking.created_at >= start_date,
                    ServiceBooking.created_at <= end_date,
                    ServiceBooking.is_active == True
                )
            ).group_by(ServiceBooking.service_type).all()
            
            # Calculate conversion rate
            quoted = query.filter(ServiceBooking.status.in_([
                ProjectStatus.QUOTED, ProjectStatus.ACCEPTED, 
                ProjectStatus.IN_PROGRESS, ProjectStatus.COMPLETED
            ])).count()
            conversion_rate = (quoted / total_bookings * 100) if total_bookings > 0 else 0
            
            return {
                "total_bookings": total_bookings,
                "new_bookings": new_bookings,
                "completed_bookings": completed_bookings,
                "pending_bookings": total_bookings - completed_bookings,
                "by_service_type": dict(service_types),
                "conversion_rate": round(conversion_rate, 2)
            }
            
        except Exception as e:
            logger.error(f"Error getting booking stats: {str(e)}")
            raise
    
    def get_revenue_stats(self, start_date: datetime, end_date: datetime) -> dict:
        """Get revenue statistics"""
        try:
            query = self.db.query(ServiceBooking).filter(
                and_(
                    ServiceBooking.created_at >= start_date,
                    ServiceBooking.created_at <= end_date,
                    ServiceBooking.is_active == True
                )
            )
            
            # Total quoted amount
            total_quoted = self.db.query(func.sum(ServiceBooking.quote_amount)).filter(
                and_(
                    ServiceBooking.created_at >= start_date,
                    ServiceBooking.created_at <= end_date,
                    ServiceBooking.quote_amount.isnot(None),
                    ServiceBooking.is_active == True
                )
            ).scalar() or 0
            
            # Accepted projects
            accepted_query = query.filter(ServiceBooking.status.in_([
                ProjectStatus.ACCEPTED, ProjectStatus.IN_PROGRESS, ProjectStatus.COMPLETED
            ]))
            
            total_accepted = self.db.query(func.sum(ServiceBooking.quote_amount)).filter(
                and_(
                    ServiceBooking.created_at >= start_date,
                    ServiceBooking.created_at <= end_date,
                    ServiceBooking.status.in_([
                        ProjectStatus.ACCEPTED, ProjectStatus.IN_PROGRESS, ProjectStatus.COMPLETED
                    ]),
                    ServiceBooking.quote_amount.isnot(None),
                    ServiceBooking.is_active == True
                )
            ).scalar() or 0
            
            # Completed projects
            total_completed = self.db.query(func.sum(ServiceBooking.quote_amount)).filter(
                and_(
                    ServiceBooking.created_at >= start_date,
                    ServiceBooking.created_at <= end_date,
                    ServiceBooking.status == ProjectStatus.COMPLETED,
                    ServiceBooking.quote_amount.isnot(None),
                    ServiceBooking.is_active == True
                )
            ).scalar() or 0
            
            # Average project size
            avg_project_size = self.db.query(func.avg(ServiceBooking.estimated_cost)).filter(
                and_(
                    ServiceBooking.created_at >= start_date,
                    ServiceBooking.created_at <= end_date,
                    ServiceBooking.estimated_cost.isnot(None),
                    ServiceBooking.is_active == True
                )
            ).scalar() or 0
            
            return {
                "total_quoted": float(total_quoted),
                "total_accepted": float(total_accepted),
                "total_completed": float(total_completed),
                "average_project_size": float(avg_project_size),
                "monthly_recurring": float(total_completed) / max(1, (end_date - start_date).days / 30)
            }
            
        except Exception as e:
            logger.error(f"Error getting revenue stats: {str(e)}")
            raise
    
    def get_recent_bookings(self, limit: int = 20) -> List[ServiceBooking]:
        """Get recent bookings"""
        try:
            return self.db.query(ServiceBooking).filter(
                ServiceBooking.is_active == True
            ).order_by(desc(ServiceBooking.created_at)).limit(limit).all()
        except Exception as e:
            logger.error(f"Error getting recent bookings: {str(e)}")
            raise

