import json
import re
import os
from openai import OpenAI

client_ai = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def get_detailed_analysis_doctor(predictions):
    """
    Generate detailed analysis for doctors based on the predictions JSON
    and additional context about the chest X-ray image.
    """
    # Prompt with predictions and context
    prompt = {
        "role": "user",
        "content": f"""
        The following is a detailed analysis request for a chest X-ray image for clinical review:

        1. **Image Information**:
        - The chest X-ray image has dimensions of 512x512 pixels.
        - All bounding boxes provided in the predictions JSON below highlight detected abnormalities.
        - Confidence scores in the predictions represent the model's certainty about the findings. Abnormalities with high confidence scores (>85%) may warrant immediate attention, while lower confidence findings may require further review.

        2. **Predictions JSON**:
        ```json
        {predictions}
        ```

        Based on the provided information:
        - Analyze each abnormality in the predictions JSON.
        - Correlate the confidence scores with the severity and urgency of the findings.
        - Highlight any abnormalities that may require careful attention or additional diagnostic tests.
        - Provide a structured JSON response for the doctor as follows ```json:
        
        {{
            "analysis_for_doctor": {{
                "summary": "<General overview of the findings>",
                "total_abnormalities": "<Number of abnormalities detected>"
            }},
            "abnormalities": [
                {{
                    "name": "<Name of the abnormality>",
                    "description": "<Detailed clinical description>",
                    "potential_causes": [
                        "<Cause 1>",
                        "<Cause 2>"
                    ],
                    "confidence_score": "<Confidence score from the model>",
                    "confidence_interpretation": "<Explain confidence score and what it implies>",
                    "severity": "<Severity level: low, moderate, or high>",
                    "urgency": "<Criticality of condition and how soon it needs attention>",
                    "clinical_implications": [
                        "<Implication 1>",
                        "<Implication 2>"
                    ],
                    "recommendations": [
                        {{
                            "test_or_imaging": "<Recommended diagnostic test>",
                            "reason": "<Why this test is important>"
                        }},
                        {{
                            "specialist_referral": "<Suggested specialist>",
                            "reason": "<Why referral is recommended>"
                        }}
                    ]
                }}
            ],
            "overall_conclusions": {{
                "diagnostic_confidence": "<Overall confidence in the findings>",
                "further_review_needed": "Yes/No",
                "follow_up_actions": [
                    "<Action 1>",
                    "<Action 2>"
                ]
            }}
        }}
        Provide the response in strict JSON format, ensuring it is clearly structured and easy to interpret for clinical decision-making.
        """
    }

    try:
        response = client_ai.chat.completions.create(model="o1-mini", messages=[prompt])
        result = response.choices[0].message.content
        match = re.search(r"```json(.*?)```", result, re.S)

        if match:
            return json.loads(match.group(1).strip())
    except Exception as e:
        print(f"Error generating doctor analysis: {e}")
    return {"error": "Failed to generate analysis"}

def get_detailed_analysis_patient(predictions):
    """
    Generate detailed analysis for doctors based on the predictions JSON
    and additional context about the chest X-ray image.
    """
    # Prompt with predictions and context
    prompt = {
        "role": "user",
        "content": f"""
        The following is the detailed explanation for a chest X-ray image for a patient:

        1. **Image Information**:
        - This is a chest X-ray image with dimensions 512x512 pixels.
        - The highlighted areas in the image correspond to potential findings based on an automated analysis.

        2. **Predictions JSON**:
        ```json
        {predictions}
        ```

        Based on the provided information:
        - Analyze each abnormality in the predictions JSON.
        - Explain the findings in a way that a patient with no medical background can easily understand.
        - Emphasize that this is not a final diagnosis and should be reviewed by a qualified doctor.

        Provide a structured JSON response for the patient as follows ```json:
        
        {{
            "patient_friendly_explanation": {{
                "summary": "<General overview of the findings in simple language>",
                "total_findings": "<Number of findings highlighted>",
                "important_note": "This report is based on an automated analysis and is not a substitute for a professional medical diagnosis. Please consult your doctor for confirmation and guidance."
            }},
            "findings": [
                {{
                    "name": "<Name of the condition>",
                    "what_it_means": "<Simple explanation of what the condition is>",
                    "how_it_may_affect_you": "<Potential effects or symptoms you might notice>",
                    "confidence": "<Confidence in the finding: low, moderate, or high>",
                    "what_to_do_next": [
                        "<Action 1: e.g., schedule a follow-up appointment>",
                        "<Action 2: e.g., discuss with your doctor>"
                    ]
                }}
            ],
            "next_steps": {{
                "general_advice": "Please keep calm and wait for your doctor's guidance. This analysis is only a tool to assist and should not be used to make any medical decisions on its own.",
                "doctor_consultation": "Make an appointment with your doctor for a detailed review of these findings and any necessary follow-ups."
            }}
        }}
        Provide the response in strict JSON format.
        """
    }

    try:
        response = client_ai.chat.completions.create(model="o1-mini", messages=[prompt])
        result = response.choices[0].message.content
        match = re.search(r"```json(.*?)```", result, re.S)

        if match:
            return json.loads(match.group(1).strip())
    except Exception as e:
        print(f"Error generating patient analysis: {e}")
    return {"error": "Failed to generate analysis"}