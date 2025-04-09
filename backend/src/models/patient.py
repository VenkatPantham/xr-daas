import datetime
from src import mongo
from bson.objectid import ObjectId
from src.utils.password_utils import hash_password
from src.utils.objectid_utils import convert_objectid_to_str

# Example function to create a patient (with hashed password)
def create_patient(name, age, gender, email, password):
    hashed_password = hash_password(password)  # Hash the password
    patient = {
        "name": name,
        "age": age,
        "gender": gender,
        "email": email,
        "password": hashed_password,  # Store the hashed password
        "medical_records": [],
        "risk_factors": [],
    }
    
    # Insert patient into the database
    patient_id = mongo.db.patients.insert_one(patient).inserted_id
    return str(patient_id)

# Function to find a patient by email (for login)
def find_patient_by_email(email):
    return mongo.db.patients.find_one({"email": email})

def find_patient_by_id(id):
    patient = mongo.db.patients.find_one({"_id": ObjectId(id)})
    result =  {
            "id": str(patient["_id"]),
            "name": patient["name"],
            "age": patient["age"],
            "gender": patient["gender"],
            "email": patient["email"],
            "phone": patient["phone"],
            "status": patient["status"],
            "medical_records": convert_objectid_to_str(patient["medical_records"]),
            "risk_factors": convert_objectid_to_str(patient["risk_factors"]),
        }
    return result