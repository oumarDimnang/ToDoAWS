# Todo App

A full-stack todo application with Node.js/Express backend and React frontend.

## Backend Structure

- **Models**: MongoDB schemas with Mongoose
- **Controllers**: Business logic for CRUD operations
- **Routes**: API endpoint definitions

## Setup Instructions

### Backend Setup

1. Navigate to backend directory:

```bash
cd backend
```

2. Install dependencies (if needed):

```bash
npm install
```

3. Make sure MongoDB is running locally, or update the `MONGODB_URI` in `.env` file

4. Start the server:

```bash
npm start
# or for development with auto-reload (requires nodemon):
# npm install -g nodemon
# npm run dev
```

Backend will run on http://localhost:5000

### Frontend Setup

1. Navigate to frontend directory:

```bash
cd frontend
```

2. Install dependencies (if needed):

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

Frontend will run on http://localhost:5173

## API Endpoints

- `GET /api/todos` - Get all todos
- `GET /api/todos/:id` - Get single todo
- `POST /api/todos` - Create new todo
- `PUT /api/todos/:id` - Update todo
- `DELETE /api/todos/:id` - Delete todo

## Features

- ✅ Add new todos with title and description
- ✅ Mark todos as complete/incomplete
- ✅ Delete todos
- ✅ View todo statistics
- ✅ Beautiful gradient UI
- ✅ Responsive design
