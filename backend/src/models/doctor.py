import datetime
from src import mongo
from bson.objectid import ObjectId
from src.utils.password_utils import hash_password
from src.utils.objectid_utils import convert_objectid_to_str


def create_doctor(name, email, password, specialty, hospital_affiliation):
    hashed_password = hash_password(password)  # Hash the password
    doctor = {
        "name": name,
        "email": email,
        "password": hashed_password,  # Store the hashed password
        "specialty": specialty,
        "hospital_affiliation": hospital_affiliation,
        "patients": [],  # Initial empty list of patients
    }
    
    doctor_id = mongo.db.doctors.insert_one(doctor).inserted_id
    return str(doctor_id)

def find_doctor_by_email(email):
    return mongo.db.doctors.find_one({"email": email})

def get_patients_for_doctor(doctor_id):
    doctor = mongo.db.doctors.find_one({"_id": ObjectId(doctor_id)})

    if not doctor:
        raise Exception("Doctor not found.")
    
    patient_ids = doctor.get("patients", [])
    
    patients = mongo.db.patients.find({"_id": {"$in": patient_ids}})
    
    patient_list = []
    for patient in patients:
        patient_data = {
            "id": str(patient["_id"]),
            "name": patient["name"],
            "age": patient["age"],
            "gender": patient["gender"],
            "status": patient["status"],
        }

        patient_list.append(patient_data)

    return patient_list

def get_patients_by_id(doctor_id, patient_id):
    result = mongo.db.doctors.find_one({
        "_id": ObjectId(doctor_id),
        "patients": ObjectId(patient_id)
    })
    if result:
        patient = mongo.db.patients.find_one({"_id": ObjectId(patient_id)})
        if patient:
            return {
                "id": str(patient["_id"]),
                "name": patient["name"],
                "age": patient["age"],
                "gender": patient["gender"],
                "email": patient["email"],
                "phone": patient["phone"],
                "status": patient["status"],
                "medical_records": convert_objectid_to_str(patient['medical_records']),
                "risk_factors": convert_objectid_to_str(patient['risk_factors'])
            }
        else:
            return {"error": "Patient details not found."}
    else:
        return {"error": "The patient is not associated with the given doctor ID."}