import os
from src.utils.csv_utils import get_labels_from_csv
from src.utils.file_utils import save_uploaded_file, cleanup_folder
from src.utils.image_utils import draw_boxes, encode_image_base64
from src.utils.api_utils import send_to_roboflow
from src.utils.analysis_utils import get_detailed_analysis_doctor, get_detailed_analysis_patient
from src.models.xray_image import save_xray_to_db

def process_xray_upload(patient_id, file):
    upload_folder = os.getenv('UPLOAD_FOLDER', 'uploads')
    file_path = save_uploaded_file(file, upload_folder)

    # Try to retrieve labels from CSV
    labels, a = get_labels_from_csv(file.filename)
    
    if a==1:
        predictions = labels
    else:
        # Fall back to Roboflow API if labels are not found in CSV
        predictions = send_to_roboflow(file_path).get('predictions', [])

    # Draw bounding boxes on the image
    labeled_image_path = draw_boxes(file_path, predictions, upload_folder)

    # Encode images to Base64
    original_image_b64 = encode_image_base64(file_path)
    labeled_image_b64 = encode_image_base64(labeled_image_path)

    # Generate analyses
    detailed_analysis_doctor = get_detailed_analysis_doctor(predictions)
    detailed_analysis_patient = get_detailed_analysis_patient(predictions)

    # Save metadata and images to the database
    xray_data = save_xray_to_db(
        patient_id,
        original_image_b64,
        labeled_image_b64,
        predictions,
        detailed_analysis_doctor,
        detailed_analysis_patient
    )

    cleanup_folder(upload_folder)  # Remove temporary files

    return xray_data