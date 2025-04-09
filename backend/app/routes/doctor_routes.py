from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models.doctor import create_doctor, get_patients_for_doctor, get_patients_by_id
from app.models.xray_image import get_xray_image_for_doctor

doctor_bp = Blueprint('doctor_bp', __name__)

# Doctor Registration Route
@doctor_bp.route('/doctor/register', methods=['POST'])
def register_doctor_route():
    data = request.get_json()

    name = data.get('name')
    email = data.get('email')
    password = data.get('password')
    specialty = data.get('specialty')
    hospital_affiliation = data.get('hospital_affiliation')

    if not all([name, email, password, specialty, hospital_affiliation]):
        return jsonify({"error": "Missing required fields"}), 400

    doctor_id = create_doctor(name, email, password, specialty, hospital_affiliation)

    return jsonify({"message": "Doctor created successfully", "doctor_id": doctor_id}), 201

@doctor_bp.route('/doctor/patients', methods=['GET'])
@jwt_required()
def get_patients_route():
    try:
        current_user = get_jwt_identity()
        patients = get_patients_for_doctor(current_user)
        return jsonify(patients), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400


@doctor_bp.route('/doctor/patient/<patient_id>', methods=['GET'])
@jwt_required()
def get_patient_route(patient_id):
    try:
        current_user = get_jwt_identity()
        patient = get_patients_by_id(current_user, patient_id)
        return jsonify(patient), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400
    
@doctor_bp.route('/doctor/patient/<patient_id>/xray/<xray_image_id>', methods=['GET'])
@jwt_required()
def get_xray_route(patient_id, xray_image_id):
    try:
        current_user = get_jwt_identity()
        xray_data = get_xray_image_for_doctor(current_user, patient_id, xray_image_id)
        return jsonify(xray_data), 200  # Return the image data and metadata
    except Exception as e:
        return jsonify({"error": str(e)}), 400