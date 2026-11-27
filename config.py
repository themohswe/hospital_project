import os
from datetime import timedelta

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
class Config:
    SECRET_KEY = os.environ.get("SECRET_KEY", "dev-only-change-me")
    DATABASE = os.path.join(BASE_DIR, "database", "carehub.db")
    PERMANENT_SESSION_LIFETIME = timedelta(minutes=30)

class DevelopmentConfig(Config):
    DEBUG = True

class ProductionConfig(Config):
    DEBUG = False