# backend/tests/test_bookings.py
"""
Test cases for booking endpoints
"""

import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import tempfile
import os

from main import app
from core.database import get_db
from models.base import Base

# Create test database
SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db

@pytest.fixture(scope="module")
def client():
    Base.metadata.create_all(bind=engine)
    with TestClient(app) as c:
        yield c
    Base.metadata.drop_all(bind=engine)

def test_create_booking(client):
    """Test creating a booking"""
    booking_data = {
        "service_type": "businessWebsites",
        "project_name": "Test Website",
        "description": "A test website for unit testing purposes with detailed requirements",
        "timeline": "Within 1 month",
        "budget_range": "£2,500 - £5,000",
        "technologies": ["Python", "Django", "Vue.js"],
        "features": ["User Authentication", "Database Integration"],
        "first_name": "John",
        "last_name": "Doe",
        "email": "john.doe@example.com",
        "phone": "+44123456789",
        "company": "Test Company"
    }
    
    response = client.post("/api/bookings/", json=booking_data)
    assert response.status_code == 201
    
    data = response.json()
    assert data["project_name"] == "Test Website"
    assert data["service_type"] == "webDevelopment"
    assert data["email"] == "john.doe@example.com"
    assert "booking_id" in data

def test_get_bookings(client):
    """Test retrieving bookings"""
    response = client.get("/api/bookings/")
    assert response.status_code == 200
    
    data = response.json()
    assert "bookings" in data
    assert "total" in data
    assert isinstance(data["bookings"], list)

def test_health_check(client):
    """Test health check endpoint"""
    response = client.get("/api/health/")
    assert response.status_code == 200
    
    data = response.json()
    assert data["status"] == "healthy"

