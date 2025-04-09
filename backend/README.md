# XR-DaaS Backend

This directory contains the backend API server for the XR-DaaS project.

## Technology Stack

- RESTful API
- MongoDB (Atlas)
- JWT Authentication
- AI Integrations:
  - Roboflow for chest X-ray analysis
  - OpenAI API for advanced AI capabilities
- Machine learning model training and inference

## Directory Structure

```
backend/
├── src/
│   ├── models/      # MongoDB models
│   ├── routes/      # API routes
│   ├── services/    # Business logic and AI integrations
│   └── utils/       # Utility functions
```

## API Features

- User authentication and authorization
- XR session management
- Medical image processing and analysis
- AI-powered diagnostics
- Training data management

## Development

Run the development server:

```
cd backend
npm run dev
```

The API will be available at `http://localhost:5000` by default.

## AI Integration

The backend integrates with:

- Roboflow API for chest X-ray analysis (YOLO model)
- OpenAI API for advanced capabilities
- Local machine learning using training data from CSV files

## Database

MongoDB Atlas is used as the database. Connection strings and credentials are managed in the root `.env` file.

## Security

- JWT-based authentication
- Secure API key management
- Environment variable based configuration

## Routes

- **Authentication**: Endpoints for doctor and patient login.
- **Patient Management**: Endpoints for registering patients, fetching patient data, and uploading X-rays.
- **X-ray Processing**: Endpoints for analyzing and retrieving X-ray images.

## Models

- **Doctor**: MongoDB model for storing doctor information.
- **Patient**: MongoDB model for storing patient information.
- **XrayImage**: MongoDB model for storing X-ray image data.

## Services

- **XrayService**: Handles AI-powered X-ray analysis using Roboflow and OpenAI APIs.

## Utilities

- **PasswordUtils**: Provides password hashing and verification.
- **ObjectIdUtils**: Converts MongoDB ObjectIds to strings for JSON serialization.
