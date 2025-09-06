# backend/core/config.py
"""
Configuration management for the web services backend
"""

from pydantic_settings import BaseSettings
from pydantic import EmailStr, validator
from typing import List, Optional
import os
from functools import lru_cache

class Settings(BaseSettings):
    """Application settings"""
    
    # Environment
    ENVIRONMENT: str = "development"
    DEBUG: bool = True
    
    # Database
    DATABASE_URL: str = "sqlite:///./web_services.db"
    DATABASE_ECHO: bool = False
    
    # Security
    SECRET_KEY: str = "your-super-secret-key-change-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # CORS
    ALLOWED_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://localhost:4321",
        "https://harrysibbenga-dev.vercel.app",
        "https://harrysibbenga.dev"
    ]
    
    ALLOWED_HOSTS: List[str] = [
        "localhost",
        "127.0.0.1",
        "harrysibbenga-backend.railway.app",
        "api.harrysibbenga.dev"
    ]
    
    # Email Configuration
    SMTP_HOST: str = "smtp.gmail.com"
    SMTP_PORT: int = 587
    SMTP_USERNAME: str = ""
    SMTP_PASSWORD: str = ""
    SMTP_FROM_EMAIL: EmailStr = "sibbengaharry@gmail.com"
    SMTP_FROM_NAME: str = "Harry Sibbenga Web Services"
    
    # Business Configuration
    BUSINESS_EMAIL: EmailStr = "sibbengaharry@gmail.com"
    BUSINESS_NAME: str = "Harry Sibbenga Web Development Services"
    BUSINESS_PHONE: str = "07802738966"
    BUSINESS_ADDRESS: str = "118 Vellan Ave, Fishermead, Milton Keynes, MK6 2SW"
    
    # Rate Limiting
    RATE_LIMIT_REQUESTS: int = 100
    RATE_LIMIT_WINDOW: int = 3600  # 1 hour
    
    # File Upload
    MAX_FILE_SIZE: int = 10 * 1024 * 1024  # 10MB
    ALLOWED_FILE_TYPES: List[str] = [".pdf", ".doc", ".docx", ".txt", ".jpg", ".png"]
    
    # External APIs
    GOOGLE_ANALYTICS_ID: Optional[str] = None
    RECAPTCHA_SECRET_KEY: Optional[str] = None
    
    # Logging
    LOG_LEVEL: str = "INFO"
    LOG_FORMAT: str = "%(asctime)s - %(name)s - %(levelname)s - %(message)s"
    
    @validator("ENVIRONMENT")
    def validate_environment(cls, v):
        if v not in ["development", "staging", "production"]:
            raise ValueError("ENVIRONMENT must be development, staging, or production")
        return v
    
    @validator("ALLOWED_ORIGINS", pre=True)
    def parse_cors_origins(cls, v):
        if isinstance(v, str):
            return [origin.strip() for origin in v.split(",")]
        return v
    
    @validator("ALLOWED_HOSTS", pre=True)
    def parse_allowed_hosts(cls, v):
        if isinstance(v, str):
            return [host.strip() for host in v.split(",")]
        return v
    
    @property
    def is_development(self) -> bool:
        return self.ENVIRONMENT == "development"
    
    @property
    def is_production(self) -> bool:
        return self.ENVIRONMENT == "production"
    
    @property
    def database_url_sync(self) -> str:
        """Get synchronous database URL"""
        if self.DATABASE_URL.startswith("postgresql://"):
            return self.DATABASE_URL.replace("postgresql://", "postgresql+psycopg2://")
        return self.DATABASE_URL
    
    @property
    def database_url_async(self) -> str:
        """Get asynchronous database URL"""
        if self.DATABASE_URL.startswith("postgresql://"):
            return self.DATABASE_URL.replace("postgresql://", "postgresql+asyncpg://")
        return self.DATABASE_URL
    
    class Config:
        env_file = ".env"
        case_sensitive = True

@lru_cache()
def get_settings() -> Settings:
    """Get cached settings instance"""
    return Settings()

# Development settings
class DevelopmentSettings(Settings):
    ENVIRONMENT: str = "development"
    DEBUG: bool = True
    DATABASE_ECHO: bool = True
    LOG_LEVEL: str = "DEBUG"

# Production settings
class ProductionSettings(Settings):
    ENVIRONMENT: str = "production"
    DEBUG: bool = False
    DATABASE_ECHO: bool = False
    LOG_LEVEL: str = "INFO"
    
    # Override security settings for production
    SECRET_KEY: str = os.getenv("SECRET_KEY", "")
    SMTP_PASSWORD: str = os.getenv("SMTP_PASSWORD", "")
    
    @validator("SECRET_KEY")
    def validate_secret_key(cls, v):
        if not v or len(v) < 32:
            raise ValueError("SECRET_KEY must be set and at least 32 characters long in production")
        return v

def get_settings_for_environment(environment: str = None) -> Settings:
    """Get settings for specific environment"""
    env = environment or os.getenv("ENVIRONMENT", "development")
    
    if env == "production":
        return ProductionSettings()
    else:
        return DevelopmentSettings()