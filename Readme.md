# Student Forum API Backend

This is a backend application for a Student Forum built using Node.js, Express.js, and MongoDB. The application supports user management, question and answer creation, comment moderation, and more.

## Features

- User management (Student and Teacher roles)
- CRUD operations for questions and answers
- Commenting on questions and answers
- Moderation functionalities for deleting questions, answers, and comments

## Installation

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18.x or higher)
- [MongoDB](https://www.mongodb.com/) (v4.x or higher)
- [Docker](https://www.docker.com/) (optional, for containerized setup)



### API Endpoints

- **Users**
  - `POST /api/users/user` - Create a new user
  - `GET /api/users/user` - Get all users

- **Questions**
  - `POST /api/questions` - Create a new question
  - `GET /api/questions` - Get all questions
  - `GET /api/questions/:id` - Get a question by ID
  - `PUT /api/questions/:id/update-answer` - Update question to mark correct answer

- **Answers**
  - `POST /api/answers` - Create a new answer
  - `GET /api/answers/:questionId` - Get all answers for a specific question

- **Comments**
  - `POST /api/comments` - Create a new comment

- **Moderations**
  - `DELETE /api/moderations/questions/:id` - Delete a question by ID
  - `DELETE /api/moderations/answers/:id` - Delete an answer by ID
  - `DELETE /api/moderations/comments/:id` - Delete a comment by ID

## Docker Setup

To run the application with Docker, follow these steps:

1. **Build and start the containers:**

   ```bash
   docker-compose up --build
   ```

   This will start the application and a MongoDB container. The application will be accessible at `http://localhost:3000`.

2. **Run tests (optional):**

   ```bash
   docker-compose run test
   ```

## Environment Variables

- `PORT` - The port on which the server will run (default: `5000`).
- `MONGO_URI` - The connection string for MongoDB.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

