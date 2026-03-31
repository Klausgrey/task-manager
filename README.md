# Task Manager

A task management application built with Node.js and Express, powered by MongoDB.

## Features

- User registration and login with JWT authentication
- Project creation and management with team members
- Task creation with status tracking (undone, in-progress, done)
- Secure password hashing with bcrypt
- MongoDB integration with Mongoose ODM

## Prerequisites

- Node.js
- MongoDB
- Environment variables configured (.env file)

## Installation

```bash
npm install
```

## Environment Setup

Create a `.env` file in the root directory with the following variables:

```
JWT_SECRET=your_jwt_secret_key
MONGO_URI=your_mongodb_connection_string
```

## Available Dependencies

- **Express** - Web framework for Node.js
- **Mongoose** - MongoDB object modeling
- **JWT (jsonwebtoken)** - Token-based authentication
- **bcrypt** - Password hashing
- **dotenv** - Environment variable management

## API Endpoints

- `POST /register` - Register a new user
- `POST /login` - User login and token generation
- Additional endpoints available with JWT authentication

## Project Structure

- `app.js` - Main application file with route definitions
- `middleware/auth.js` - JWT token verification middleware
- `models/user.js` - User schema and model
- `models/projects.js` - Project schema with team member support
- `models/task.js` - Task schema with status management

## Database Models

### User

- username (String, required)
- password (String, required, hashed)
- date (Date, default: now)

### Project

- title (String, required)
- ownerId (ObjectId reference to User)
- members (Array of ObjectId references to Users)

### Task

- title (String, required)
- description (String, required)
- projectId (ObjectId reference to Project)
- status (String: "undone", "in-progress", "done")

