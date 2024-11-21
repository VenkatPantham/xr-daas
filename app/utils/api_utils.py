import os
import requests

ROBOFLOW_API_URL = "https://detect.roboflow.com/chest-xray-yolo/6"
ROBOFLOW_API_KEY = os.getenv("ROBOFLOW_API_KEY")

def send_to_roboflow(image_path):
    """
    Send the image to the Roboflow API and return predictions.
    """
    try:
        with open(image_path, "rb") as image_file:
            response = requests.post(
                f"{ROBOFLOW_API_URL}?api_key={ROBOFLOW_API_KEY}&format=json",
                files={"file": image_file},
            )
        if response.status_code == 200:
            return response.json()
        else:
            print(f"Error from Roboflow API: {response.status_code} - {response.text}")
            return None
    except Exception as e:
        print(f"Error communicating with Roboflow API: {e}")
        return None