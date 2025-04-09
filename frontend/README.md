# XR-DaaS Frontend

This directory contains the frontend application for the XR-DaaS project.

## Technology Stack

- React
- JavaScript/TypeScript
- CSS/SCSS
- RESTful API integration
- Medical imaging visualization

## Directory Structure

```
frontend/
├── public/          # Static assets
├── src/
│   ├── components/  # Reusable UI components
│   ├── hooks/       # Custom React hooks
│   ├── pages/       # Page components/routes
│   ├── redux/       # Redux store and slices
│   ├── styles/      # Global styles
│   └── utils/       # Utility functions
```

## API Integration

The frontend connects to the backend API, which defaults to:

- Development: `http://127.0.0.1:5000`
- Production options are configured in the .env file

## Features

- XR streaming interface
- Medical image visualization and analysis
- AI-assisted diagnostics display
- Interactive reporting

## Development

Run the development server:

```
cd frontend
npm run start
```

Build for production:

```
npm run build
```

## Configuration

Frontend-specific environment variables are managed in the root `.env` file with the `REACT_APP_` prefix.
