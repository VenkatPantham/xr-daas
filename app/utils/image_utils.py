import os
import base64
from PIL import Image, ImageDraw, ImageFont


def draw_boxes(image_path, predictions, output_folder):
    with Image.open(image_path) as img:
        if img.mode != "RGB":
            img = img.convert("RGB")
        draw = ImageDraw.Draw(img)

        for pred in predictions:
            x, y, w, h = pred['x'], pred['y'], pred['width'], pred['height']
            label = pred['class']
            confidence = pred.get('confidence', 1.0)
            text = f"{label} ({confidence:.2f})"
            draw.rectangle([x-w/2, y-h/2, x+w/2, y+h/2], outline="red", width=2)

            bbox = draw.textbbox((0, 0), text)
            text_width = bbox[2] - bbox[0]
            text_height = bbox[3] - bbox[1]

            # Draw white background for text
            text_x = x-w/2
            text_y = y-h/2 - text_height - 4
            draw.rectangle(
                [text_x, text_y, text_x + text_width + 4, text_y + text_height + 4],
                fill="white"
            )
            draw.text((text_x + 2, text_y + 2), text, fill="red")





            # draw.text((x-w/2, y-h/2 - 10), text, fill="red")

        output_path = f"{output_folder}/labeled_{os.path.basename(image_path)}"
        img.save(output_path)
    return output_path

def encode_image_base64(file_path):
    with open(file_path, "rb") as f:
        return base64.b64encode(f.read()).decode('utf-8')