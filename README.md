# Blog API

This is a RESTful API for a blogging platform built with Node.js and Express.js. The API allows users to register, login, create, update, and delete their own blogs. Users can also view other users' blogs and write comments on them.

## Features

- User registration and authentication (login/logout)
- Create, update, and delete blogs
- View other users' blogs and comments
- Write comments on blogs

## Technologies

- Node.js
- Express.js
- MongoDB (or any other preferred database)
- JSON Web Tokens (JWT) for authentication
- bcrypt for password hashing

## Installation

1. Clone the repository:

```bash
   git clone https://github.com/jmlhsynv/blogs-api.git
   cd blogs-api
```

2. Install the dependencies:

```bash
   npm install
```

3. Configure the environment variables:

- Create a `.env` file in the root directory.
- Specify the required environment variables in the `.env` file, such as database connection details, JWT secret, etc.

```bash
    PORT=5000
    MONGO_URL=my_mongodb_url
    SECRET_TOKEN="mysecrettoken"
```

4. Start the server:

```bash
   npm start
```

## API Documentation

The API documentation is generated using Swagger Autogen. The Swagger documentation can be found in the `swagger-output.json` file. You can use tools like Swagger UI or Postman to visualize and explore the API endpoints.

To view the API documentation, open the `swagger-output.json` file in a Swagger UI viewer or import it into Postman.

## Usage

Once the server is running, you can interact with the API using a tool like Postman or cURL. Here are some example requests:

- User registration:

```bash
   POST /register
    body: {
        "username": "example_user",
        "email": "user@example.com",
        "password": "Password123"
    }
```

- User login:

```bash
   POST /login
    body: {
    "email": "user@example.com",
    "password": "Password123"
    }
```

- Create a blog:

```bash
   POST /blogs
    headers: {
        "Authorization": "Bearer <token>"
    }
    body: {
        "title": "My Blog",
        "description": "Lorem ipsum dolor sit amet..."
        "img": "<file>"
    }
```

- Update a blog:

```bash
   PATCH /blogs/:id
    headers: {
        "Authorization": "Bearer <token>"
    }
    body: {
        "title": "Updated Blog Title",
    }
```

- Update a blog:

```bash
   DELETE /blogs/:id
    headers: {
        "Authorization": "Bearer <token>"
    }
```

- Update a blog:

```bash
   GET /blogs

```

- Write a comment:

```bash
   POST /blogs/:id/comments
    headers: {
        "Authorization": "Bearer <token>"
    }
    body: {
        "content": "Great blog!"
    }

```

Please note that <token> in the request headers represents the JWT token obtained during user login.

## API Endpoints

- POST /register: Register a new user.
- POST /login: User login and token generation.
- POST /refresh: User refresh token generation.
- GET /user: Get user details.
- GET /user/blogs: Get user's blogs.
- GET /user/comments: Get user's comments.
- GET /blogs: Get all blogs.
- POST /blogs: Create a new blog.
- GET /blogs/:id : Get a specific blog.
- PUT /blogs/:id : Update a specific blog.
- DELETE /blogs/:id : Delete a specific blog.
- POST /blogs/:id/comments: Add a comment to a blog.
- GET /users/:id : Get a specific user details.
- GET /users/:id/blogs: Get a specific user's blogs.
- GET /users/:id/comments: Get a specific user's comments.
