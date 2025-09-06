# backend/utils/logger.py
"""
Logging configuration for the application
"""

import logging
import logging.config
from datetime import datetime
import os
import sys

from core.config import get_settings

settings = get_settings()

def setup_logging():
    """Setup application logging"""
    
    # Create logs directory if it doesn't exist
    log_dir = "logs"
    if not os.path.exists(log_dir):
        os.makedirs(log_dir)
    
    # Logging configuration
    LOGGING_CONFIG = {
        'version': 1,
        'disable_existing_loggers': False,
        'formatters': {
            'standard': {
                'format': '%(asctime)s [%(levelname)s] %(name)s: %(message)s',
                'datefmt': '%Y-%m-%d %H:%M:%S'
            },
            'detailed': {
                'format': '%(asctime)s [%(levelname)s] %(name)s:%(lineno)d: %(message)s',
                'datefmt': '%Y-%m-%d %H:%M:%S'
            },
            'json': {
                'format': '{"timestamp": "%(asctime)s", "level": "%(levelname)s", "logger": "%(name)s", "message": "%(message)s"}',
                'datefmt': '%Y-%m-%d %H:%M:%S'
            }
        },
        'handlers': {
            'console': {
                'level': settings.LOG_LEVEL,
                'class': 'logging.StreamHandler',
                'formatter': 'standard',
                'stream': sys.stdout
            },
            'file': {
                'level': 'INFO',
                'class': 'logging.handlers.RotatingFileHandler',
                'formatter': 'detailed',
                'filename': f'{log_dir}/app.log',
                'maxBytes': 10485760,  # 10MB
                'backupCount': 5
            },
            'error_file': {
                'level': 'ERROR',
                'class': 'logging.handlers.RotatingFileHandler',
                'formatter': 'detailed',
                'filename': f'{log_dir}/errors.log',
                'maxBytes': 10485760,  # 10MB
                'backupCount': 5
            }
        },
        'loggers': {
            '': {  # Root logger
                'handlers': ['console', 'file', 'error_file'],
                'level': settings.LOG_LEVEL,
                'propagate': False
            },
            'uvicorn': {
                'handlers': ['console'],
                'level': 'INFO',
                'propagate': False
            },
            'sqlalchemy.engine': {
                'handlers': ['file'],
                'level': 'WARNING' if not settings.DATABASE_ECHO else 'INFO',
                'propagate': False
            }
        }
    }
    
    # Apply logging configuration
    logging.config.dictConfig(LOGGING_CONFIG)
    
    # Log startup information
    logger = logging.getLogger(__name__)
    logger.info("=" * 50)
    logger.info("Harry Sibbenga Web Services API Starting")
    logger.info(f"Environment: {settings.ENVIRONMENT}")
    logger.info(f"Log Level: {settings.LOG_LEVEL}")
    logger.info(f"Timestamp: {datetime.utcnow().isoformat()}")
    logger.info("=" * 50)

