# XR-DaaS

XR-DaaS (X-Ray Diagnostics as a Service) is a platform that provides AI-powered diagnostics for chest X-rays. It includes a frontend for user interaction and a backend for data processing and AI integration.

## Project Structure

```
XR-DaaS/
├── CONTRIBUTING.md       # Contribution guidelines
├── package.json          # Project metadata and dependencies
├── README.md             # Main project documentation
├── backend/              # Backend API server
│   ├── README.md         # Backend-specific documentation
│   ├── requirements.txt  # Python dependencies
│   ├── run.py            # Entry point for the backend server
│   ├── train_merge.csv   # Training data for AI models
│   ├── XR-DAAS.postman_collection.json # Postman API collection
│   └── src/              # Source code for the backend
│       ├── __init__.py
│       ├── config.py
│       ├── models/       # MongoDB models
│       ├── routes/       # API routes
│       ├── services/     # Business logic and AI integrations
│       └── utils/        # Utility functions
├── frontend/             # Frontend application
│   ├── README.md         # Frontend-specific documentation
│   ├── package.json      # Frontend dependencies
│   ├── public/           # Static assets
│   └── src/              # Source code for the frontend
│       ├── components/   # Reusable UI components
│       ├── hooks/        # Custom React hooks
│       ├── pages/        # Page components/routes
│       ├── redux/        # Redux state management
│       ├── styles/       # Global styles
│       └── utils/        # Utility functions
```

## Features

- **Frontend**:

  - User-friendly interface built with React.
  - Role-based dashboards for doctors and patients.
  - X-ray upload and visualization.
  - AI-assisted diagnostics display.

- **Backend**:
  - RESTful API built with Flask.
  - MongoDB for data storage.
  - AI integrations using Roboflow and OpenAI APIs.
  - JWT-based authentication and secure API key management.

## Development

### Prerequisites

- Node.js and npm (for the frontend)
- Python 3.x and pip (for the backend)
- MongoDB Atlas account (or local MongoDB instance)

### Setup

1. Clone the repository:

   ```
   git clone https://github.com/your-repo/xr-daas.git
   cd xr-daas
   ```

2. Install dependencies:

   - Frontend:
     ```
     cd frontend
     npm install
     ```
   - Backend:
     ```
     cd backend
     pip install -r requirements.txt
     ```

3. Configure environment variables:
   - Frontend: Create a `.env` file in the `frontend` directory with `REACT_APP_` prefixed variables.
   - Backend: Create a `.env` file in the `backend` directory with database and API keys.

### Run the Application

- Start the backend server:

  ```
  cd backend
  python run.py
  ```

- Start the frontend development server:
  ```
  cd frontend
  npm start
  ```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
