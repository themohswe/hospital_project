from flask import Flask
from config import DevelopmentConfig
from . import db

def create_app(config_class=DevelopmentConfig):
    app = Flask(__name__)
    app.config.from_object(config_class)

    db.init_app(app)

    from .main.routes import main_bp
    from .auth.routes import auth_bp
    from .patient.routes import patient_bp

    app.register_blueprint(main_bp)
    app.register_blueprint(auth_bp)
    app.register_blueprint(patient_bp)

    return app




