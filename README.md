# Backend API Documentation

## Overview
Node.js/Express backend with MongoDB integration, JWT authentication, and RESTful APIs.

## Project Structure
```
backend/
├── controllers/          # Request handlers
├── middleware/          # Custom middleware
├── models/             # Mongoose models
├── routes/             # API routes
├── validation/         # Input validation schemas
├── server.js          # Main server file
└── .env              # Environment variables
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user

### User Profile
- `GET /api/user/profile` - Get user profile (protected)
- `PUT /api/user/profile` - Update user profile (protected)

### Notes CRUD
- `POST /api/notes` - Create note (protected)
- `GET /api/notes` - Get all user notes with search/filter (protected)
- `GET /api/notes/:id` - Get specific note (protected)
- `PUT /api/notes/:id` - Update note (protected)
- `DELETE /api/notes/:id` - Delete note (protected)

## Security Features
- Password hashing with bcrypt
- JWT-based authentication
- Protected routes with middleware
- Input validation with Joi
- Error handling middleware
- CORS enabled

## Database Schema

### User Model
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  timestamps: true
}
```

### Note Model
```javascript
{
  title: String (required),
  content: String (required),
  category: String (default: 'General'),
  userId: ObjectId (required, ref: 'User'),
  timestamps: true
}
```