import os
import pandas as pd

# Define global constants for the CSV path and relevant classes
TRAIN_CSV_PATH = os.getenv("TRAIN_CSV_PATH", "train_merge.csv")
RELEVANT_CLASSES = [
    "Aortic enlargement", "Pleural effusion", "Pulmonary fibrosis", "Atelectasis",
    "Cardiomegaly", "ILD", "Infiltration", "Lung Opacity", "NoduleMass"
]

def get_labels_from_csv(image_filename):
    """
    Retrieve labels for the given image filename from the CSV.
    """
    try:
        # Load the CSV into a DataFrame
        if not os.path.exists(TRAIN_CSV_PATH):
            raise FileNotFoundError(f"CSV file not found at {TRAIN_CSV_PATH}")

        train_data = pd.read_csv(TRAIN_CSV_PATH)

        # Extract base filename without extension
        base_name = os.path.splitext(os.path.basename(image_filename))[0]

        # Filter rows where `image_id` matches the base name
        filtered_data = train_data[train_data['image_id'] == base_name]
        if len(filtered_data) != 0:
            a = 1

        # Generate a list of labels for the image
        labels = []
        for _, row in filtered_data.iterrows():
            if row['class_name'] in RELEVANT_CLASSES:
                labels.append({
                    "class": row['class_name'],
                    "x": (row['x_min'] + row['x_max']) / 2,  # Calculate center x
                    "y": (row['y_min'] + row['y_max']) / 2,  # Calculate center y
                    "width": row['x_max'] - row['x_min'],    # Calculate width
                    "height": row['y_max'] - row['y_min'],   # Calculate height
                    "confidence": row.get('confidence', 0.8) * 100  # Default confidence
                })

        return (labels, a)
    except Exception as e:
        print(f"Error reading labels from CSV: {e}")
        return []