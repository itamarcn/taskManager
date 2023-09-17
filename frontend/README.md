# Task Management Application

This is a Task Management Application with a frontend and backend built using Angular and NestJS.

## Prerequisites

Before running the application, ensure you have the following prerequisites installed:

- Node.js and npm: https://nodejs.org/
- Angular CLI: Install globally using `npm install -g @angular/cli`
- NestJS CLI: Install globally using `npm install -g @nestjs/cli`

## Backend Setup

1. Navigate to the backend directory:
cd backend

2. Install dependencies:
npm install

3. Configure Environment:

Create a `.env` file based on `.env.example` and set your environment variables.

4. Run the Backend Server:
npm start

The server will start at `http://localhost:5000`.

5. Running Tests:

To run tests for the backend, use the following command:
npm run test

## Frontend Setup

1. Navigate to the frontend directory:
cd frontend

2. Install dependencies:
npm install

3. Run the Frontend Development Server:
ng serve

The frontend will be accessible at `http://localhost:4200`.

## Usage

- Access the frontend application at `http://localhost:4200` in your web browser.
- Use the Task Management Application to create, manage, and complete tasks.
- The backend API is available at `http://localhost:5000` and serves as the data source for the frontend.
