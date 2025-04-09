from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from src.models.patient import create_patient, find_patient_by_id
from src.models.xray_image import get_xray_image_for_patient
from src.services.xray_service import process_xray_upload

patient_bp = Blueprint('patient_bp', __name__)

@patient_bp.route('/patient/register', methods=['POST'])
def register_patient_route():
    data = request.get_json()

    name = data.get('name')
    age = data.get('age')
    gender = data.get('gender')
    email = data.get('email')
    password = data.get('password')

    if not all([name, age, gender, email, password]):
        return jsonify({"error": "Missing required fields"}), 400

    patient_id = create_patient(name, age, gender, email, password)

    return jsonify({"message": "Patient created successfully", "patient_id": patient_id}), 201

@patient_bp.route('/patient', methods=['GET'])
@jwt_required()
def get_patient_route():
    try:
        current_user = get_jwt_identity()
        patients = find_patient_by_id(current_user)
        return jsonify(patients), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@patient_bp.route('/patient/xray/upload', methods=['POST'])
@jwt_required()
def upload_xray_route():
    current_user = get_jwt_identity()
    file = request.files.get('file')
    if not file or file.filename == '':
        return jsonify({"error": "No file provided"}), 400
    try:
        result = process_xray_upload(current_user, file)
        return jsonify(result), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Fetch X-ray image by ID
@patient_bp.route('/patient/<patient_id>/xray/<xray_image_id>', methods=['GET'])
@jwt_required()
def get_xray_route(patient_id, xray_image_id):
    try:
        current_user = get_jwt_identity()
        xray_data = get_xray_image_for_patient(current_user, patient_id, xray_image_id)
        return jsonify(xray_data), 200  # Return the image data and metadata
    except Exception as e:
        return jsonify({"error": str(e)}), 400