# Contributing to XR-DaaS

Thank you for your interest in contributing to the XR-DaaS project! This document provides guidelines and instructions for contributing.

## Code of Conduct

Please read and follow our [Code of Conduct](CODE_OF_CONDUCT.md).

## Development Setup

1. Fork the repository
2. Clone your fork: `git clone https://github.com/yourusername/xr-daas.git`
3. Create a branch: `git checkout -b your-feature-branch`
4. Set up the development environment as described in the main README.md

## Development Workflow

1. Make your changes
2. Ensure tests pass and linting rules are followed: `npm test && npm run lint`
3. Commit your changes using conventional commit messages:
   - `feat: add new feature`
   - `fix: fix a bug`
   - `docs: update documentation`
   - `refactor: refactor code without changing behavior`
4. Push to your branch: `git push origin your-feature-branch`
5. Create a pull request

## Pull Request Guidelines

- Fill in the provided PR template
- Include tests for new features or bug fixes
- Update documentation if necessary
- Ensure all CI checks pass

## Code Style

- We use ESLint and Prettier for code formatting
- Run `npm run lint` to check your code
- Run `npm run format` to automatically format your code

## Monorepo Structure

Please maintain the separation of concerns:

- Frontend code belongs in the `frontend` directory
- Backend code belongs in the `backend` directory
- Shared code goes in the `shared` directory

## Need Help?

If you have questions or need help, please open an issue with the "question" label.

Thank you for contributing!
