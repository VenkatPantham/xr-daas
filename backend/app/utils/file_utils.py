import os
from werkzeug.utils import secure_filename

def save_uploaded_file(file, upload_folder):
    filename = secure_filename(file.filename)
    file_path = os.path.join(upload_folder, filename)
    os.makedirs(upload_folder, exist_ok=True)
    file.save(file_path)
    return file_path

def cleanup_folder(folder_path):
    for filename in os.listdir(folder_path):
        file_path = os.path.join(folder_path, filename)
        os.unlink(file_path)