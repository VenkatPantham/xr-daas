from bson import ObjectId

# Recursive function to convert all ObjectIds in a document to strings
def convert_objectid_to_str(document):
    if isinstance(document, dict):  # If the document is a dictionary
        return {key: convert_objectid_to_str(value) for key, value in document.items()}
    elif isinstance(document, list):  # If the document is a list
        return [convert_objectid_to_str(item) for item in document]
    elif isinstance(document, ObjectId):  # If the value is an ObjectId
        return str(document)
    else:
        return document  # Return the value as is