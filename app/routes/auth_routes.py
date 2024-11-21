from flask import Blueprint, request, jsonify, make_response
from flask_jwt_extended import create_access_token
from app.models.doctor import find_doctor_by_email
from app.models.patient import find_patient_by_email
from app.utils.password_utils import check_password
from datetime import timedelta

auth_bp = Blueprint('auth_bp', __name__)

# Login for Doctor
@auth_bp.route('/login/doctor', methods=['POST'])
def doctor_login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    doctor = find_doctor_by_email(email)
    if doctor and check_password(doctor['password'], password):
        # Generate JWT token if the password is correct
        id = str(doctor['_id'])
        access_token = create_access_token(identity=id, expires_delta=timedelta(hours=1))
        
        # Create the response and set the JWT token as a cookie
        response = make_response(jsonify({
            "id": id,
            "name": doctor['name'],
            "email": doctor['email'],
            "token": access_token
        }))
        return response
    return jsonify(message="Invalid credentials"), 401

# Login for Patient
@auth_bp.route('/login/patient', methods=['POST'])
def patient_login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    patient = find_patient_by_email(email)
    if patient and check_password(patient['password'], password):
        # Generate JWT token if the password is correct
        id = str(patient['_id'])
        access_token = create_access_token(identity=id, expires_delta=timedelta(hours=1))
        
        # Create the response and set the JWT token as a cookie
        response = make_response(jsonify({
            "id": id,
            "name": patient['name'],
            "email": patient['email'],
            "token": access_token
        }))
        return response
    return jsonify(message="Invalid credentials"), 401