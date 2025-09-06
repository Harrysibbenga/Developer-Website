# backend/README.md
"""
# Harry Sibbenga Web Development Services - Backend API

A production-ready FastAPI backend for handling service bookings, contact inquiries, and business management for web development services.

## 🚀 Features

### **Core Functionality**
- **Service Booking System**: Multi-step project inquiry process
- **Contact Management**: General inquiries and newsletter subscriptions  
- **Quote Calculator**: Automatic project estimation based on complexity
- **Email Notifications**: Automated confirmations and notifications
- **Admin Dashboard**: Statistics and management endpoints

### **Technical Features**
- **FastAPI Framework**: Modern, fast Python web framework
- **SQLAlchemy ORM**: Robust database abstraction layer
- **Pydantic Validation**: Comprehensive input validation and serialization
- **Email Service**: SMTP integration with HTML templates
- **Rate Limiting**: Request throttling for API protection
- **Health Monitoring**: Kubernetes-ready health checks

### **Production Ready**
- **Database Migrations**: Alembic integration for schema management
- **Comprehensive Logging**: Structured logging with rotation
- **Error Handling**: Custom exception handling and reporting
- **Security**: Input validation, CORS protection, rate limiting
- **Testing**: Comprehensive test suite with pytest

## 🛠 Tech Stack

- **Framework**: FastAPI 0.104+
- **Database**: SQLAlchemy with PostgreSQL/SQLite support
- **Validation**: Pydantic 2.0+ with email validation
- **Email**: SMTP with Jinja2 templating
- **Testing**: pytest with async support
- **Deployment**: Docker, Railway, Heroku compatible

## 📁 Project Structure

```
backend/
├── main.py                     # FastAPI application entry point
├── core/
│   ├── config.py              # Configuration management
│   └── database.py            # Database setup and sessions
├── models/
│   ├── base.py                # Base model with common fields
│   ├── booking.py             # Service booking model
│   ├── contact.py             # Contact inquiry model
│   └── newsletter.py          # Newsletter subscription model
├── schemas/
│   ├── booking.py             # Booking Pydantic schemas
│   ├── contact.py             # Contact Pydantic schemas
│   └── admin.py               # Admin dashboard schemas
├── services/
│   ├── booking_service.py     # Booking business logic
│   ├── contact_service.py     # Contact management logic
│   └── email_service.py       # Email sending service
├── api/
│   └── routes/
│       ├── bookings.py        # Booking API endpoints
│       ├── contact.py         # Contact API endpoints
│       ├── admin.py           # Admin management endpoints
│       └── health.py          # Health check endpoints
├── utils/
│   ├── logger.py              # Logging configuration
│   └── rate_limit.py          # Rate limiting decorator
├── templates/
│   └── email/                 # Email HTML templates
├── tests/
│   ├── test_bookings.py       # Booking endpoint tests
│   └── test_contact.py        # Contact endpoint tests
├── alembic/                   # Database migrations
├── requirements.txt           # Python dependencies
├── Dockerfile                 # Container configuration
├── docker-compose.yml         # Local development setup
└── README.md                  # This documentation
```

## 🚀 Quick Start

### **Prerequisites**
- Python 3.11+
- PostgreSQL (or SQLite for development)
- SMTP email account (Gmail recommended)

### **Installation**

1. **Clone and setup**
```bash
git clone <repository-url>
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

2. **Environment Configuration**
```bash
cp .env.example .env
# Edit .env with your settings
```

3. **Database Setup**
```bash
# Initialize database
alembic upgrade head

# Or for SQLite development
python -c "from core.database import init_db; init_db()"
```

4. **Start Development Server**
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Visit `http://localhost:8000/docs` for API documentation.

## ⚙️ Configuration

### **Environment Variables**

Key configuration options in `.env`:

```env
# Environment
ENVIRONMENT=development
DEBUG=True

# Database  
DATABASE_URL=postgresql://user:pass@localhost/dbname
# or for SQLite: sqlite:///./web_services.db

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_FROM_EMAIL=your-email@gmail.com

# Business Information
BUSINESS_EMAIL=sibbengaharry@gmail.com
BUSINESS_NAME=Harry Sibbenga Web Development Services
BUSINESS_PHONE=07802738966

# Security
SECRET_KEY=your-super-secret-key-minimum-32-characters
ALLOWED_ORIGINS=http://localhost:4321,https://yourdomain.com
```

### **Email Setup (Gmail)**

1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password: Google Account → Security → App Passwords
3. Use the app password in `SMTP_PASSWORD`

## 📊 API Endpoints

### **Service Bookings**
- `POST /api/bookings/` - Create service booking
- `GET /api/bookings/` - List bookings (with filters)
- `GET /api/bookings/{id}` - Get specific booking
- `PUT /api/bookings/{id}` - Update booking
- `PATCH /api/bookings/{id}/status` - Update booking status

### **Contact Management**
- `POST /api/contact/` - Submit contact inquiry
- `GET /api/contact/` - List contact inquiries
- `POST /api/contact/newsletter` - Newsletter subscription

### **Admin Dashboard**
- `GET /api/admin/stats` - Business statistics
- `GET /api/admin/bookings/summary` - Recent bookings
- `GET /api/admin/contacts/summary` - Recent contacts

### **Health Monitoring**
- `GET /api/health/` - Basic health check
- `GET /api/health/detailed` - Detailed system health
- `GET /api/health/liveness` - Kubernetes liveness probe
- `GET /api/health/readiness` - Kubernetes readiness probe

## 🧪 Testing

### **Run Tests**
```bash
# Run all tests
pytest

# Run with coverage
pytest --cov=. --cov-report=html

# Run specific test file
pytest tests/test_bookings.py -v
```

### **Test Database**
Tests use a separate SQLite database that's created and destroyed for each test session.

## 📈 Business Logic

### **Service Booking Flow**
1. Client submits booking form
2. System calculates project complexity and estimates
3. Confirmation emails sent to client and business
4. Admin reviews and updates status
5. Status updates trigger notification emails

### **Project Complexity Calculation**
- **Simple**: Basic requirements, few technologies
- **Medium**: Multiple features, standard complexity
- **Complex**: Advanced features, multiple integrations

### **Quote Estimation**
- Base hours by service type
- Complexity multipliers applied
- Feature count adjustments
- £75/hour base rate

### **Rate Limiting**
- Booking submissions: 5 per hour per IP
- Contact forms: 3 per hour per IP
- General API: 100 requests per hour per IP

## 🚀 Deployment

### **Railway Deployment**

1. **Install Railway CLI**
```bash
npm install -g @railway/cli
```

2. **Deploy**
```bash
railway login
railway init
railway up
```

3. **Environment Variables**
Set production environment variables in Railway dashboard.

### **Docker Deployment**

```bash
# Build image
docker build -t web-services-backend .

# Run container
docker run -p 8000:8000 --env-file .env web-services-backend
```

### **Manual Deployment**

For VPS or traditional hosting:

```bash
# Install dependencies
pip install -r requirements.txt

# Run with Gunicorn
gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
```

## 📧 Email Templates

HTML email templates located in `templates/email/`:

- `booking_confirmation.html` - Client booking confirmation
- `booking_notification.html` - Business booking notification  
- `contact_confirmation.html` - Contact inquiry confirmation
- `contact_notification.html` - Business contact notification
- `newsletter_confirmation.html` - Newsletter subscription confirmation
- `status_update.html` - Project status updates

## 🔧 Database Management

### **Migrations**

```bash
# Create new migration
alembic revision --autogenerate -m "Description"

# Apply migrations
alembic upgrade head

# Rollback migration
alembic downgrade -1
```

### **Database Models**

- **ServiceBooking**: Project inquiries and bookings
- **ContactInquiry**: General contact form submissions
- **NewsletterSubscription**: Email newsletter subscriptions

## 📊 Monitoring & Logging

### **Logging**
- Application logs: `logs/app.log`
- Error logs: `logs/errors.log`
- Log rotation: 10MB files, 5 backups
- JSON formatting available for production

### **Health Monitoring**
- Database connectivity checks
- System resource monitoring
- Response time tracking
- Error rate monitoring

## 🔒 Security Features

### **Input Validation**
- Pydantic schema validation
- Email format validation
- Phone number validation
- XSS prevention

### **Rate Limiting**
- Per-IP request limiting
- Endpoint-specific limits
- Automatic cleanup of old entries

### **Spam Protection**
- Keyword-based detection
- Frequency analysis
- IP-based scoring
- Automatic flagging

## 🤝 Contributing

### **Development Setup**
```bash
# Install development dependencies
pip install -r requirements-dev.txt

# Install pre-commit hooks
pre-commit install

# Run code formatting
black .
isort .

# Run linting
flake8 .
```

### **Adding New Features**
1. Create new model in `models/`
2. Add Pydantic schemas in `schemas/`
3. Implement business logic in `services/`
4. Create API endpoints in `api/routes/`
5. Add tests in `tests/`
6. Update documentation

## 📞 Support

For questions or issues:
- **Email**: sibbengaharry@gmail.com
- **LinkedIn**: [Harry Sibbenga](https://www.linkedin.com/in/harry-m-sibbenga-9b8584119/)
- **GitHub**: [Harrysibbenga](https://github.com/Harrysibbenga)

---

**Built with ❤️ using FastAPI, SQLAlchemy, and modern Python practices**
"""

