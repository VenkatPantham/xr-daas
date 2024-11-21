import os
from flask import Flask
from flask_pymongo import PyMongo
from flask_jwt_extended import JWTManager
from flask_cors import CORS  # Import CORS
from .config import Config

# Initialize extensions
mongo = PyMongo()
jwt = JWTManager()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Determine if the app is running in production
    # is_production = os.getenv('FLASK_ENV') == 'production'
    is_production = True
    secure_flag = is_production

    # Enable CORS for all routes and specific origins
    CORS(app, supports_credentials=True)

    # Initialize extensions with the app
    mongo.init_app(app)
    jwt.init_app(app)

    # Register blueprints for routes
    from .routes.auth_routes import auth_bp
    from .routes.doctor_routes import doctor_bp
    from .routes.patient_routes import patient_bp

    app.register_blueprint(auth_bp)
    app.register_blueprint(doctor_bp)
    app.register_blueprint(patient_bp)

    # Make 'secure_flag' accessible in routes (optional)
    app.config['SECURE_FLAG'] = secure_flag

    return app