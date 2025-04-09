import datetime
from app import mongo
from bson.objectid import ObjectId
from app.utils.objectid_utils import convert_objectid_to_str

# Function to upload X-ray image (both original and enhanced)
def save_xray_to_db(patient_id, original_image_b64, labeled_image_b64, predictions, doctor_analysis, patient_analysis):
    # Step 1: Insert the X-ray into the xray_images collection
    xray_image = {
        "patient_id": ObjectId(patient_id),
        "original_image": original_image_b64,
        "labeled_image": labeled_image_b64,
        "predictions": predictions,
        "doctor_analysis": doctor_analysis,
        "patient_analysis": patient_analysis,
        "status": "Abnormal" if predictions else "Normal",
        "date_uploaded": datetime.datetime.utcnow()
    }
    xray_image_id = mongo.db.xray_images.insert_one(xray_image).inserted_id

    # Step 2: Prepare the medical record for the patient
    new_medical_record = {
        "id": ObjectId(),
        "date_uploaded": xray_image["date_uploaded"],
        "diagnosis": ", ".join(set([abnormality["name"] for abnormality in doctor_analysis.get("abnormalities", [])])),
        "status": xray_image["status"],
        "xray_image_id": xray_image_id
    }

    # Step 3: Update the patient's medical records
    mongo.db.patients.update_one(
        {"_id": ObjectId(patient_id)},
        {
            "$push": {
                "medical_records": {
                    "$each": [new_medical_record],
                    "$position": 0  # Add to the beginning of the array
                }
            },
            "$set": {"status": xray_image["status"]}  # Update patient's overall status
        }
    )

    return convert_objectid_to_str(new_medical_record)

def get_xray_image_for_patient(current_user, patient_id, xray_image_id):
    if(current_user != patient_id):
        raise Exception("You are not authorized to access this resource.")
    return get_xray_image(patient_id, xray_image_id)
    
def get_xray_image_for_doctor(current_user, patient_id, xray_image_id):
    doctor = mongo.db.doctors.find_one({"_id": ObjectId(current_user)})
    if not doctor:
        raise Exception("Doctor not found.")
    patients = doctor.get("patients", [])
    if ObjectId(patient_id) not in patients:
        raise Exception("You are not authorized to access this resource.")
    
    return get_xray_image(patient_id, xray_image_id)
    
def get_xray_image(patient_id, xray_image_id):
    result = mongo.db.patients.find_one({
    "_id": ObjectId(patient_id),
    "medical_records": {
        "$elemMatch": {
            "xray_image_id": ObjectId(xray_image_id)
            }
        }
    })

    if result:
        xray_image = mongo.db.xray_images.find_one({"_id": ObjectId(xray_image_id)})

        if xray_image:
            return {
                "original_image": xray_image['original_image'],
                "labeled_image": xray_image['labeled_image'],
                "doctor_analysis": xray_image['doctor_analysis'],
                "patient_analysis": xray_image['patient_analysis'],
                "status": xray_image['status']
            }
        else:
            return {"error": "X-ray image not found."}
    else:
        return {"error": "The patient does not have a medical record with the given X-ray image ID."}
    