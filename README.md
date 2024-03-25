# Blog api

This project is part of the Odin Project's NodeJS Course. The object of this project was to practice creating a RESTful API only backend application.

## Description

This main purpose of building this project was to practice using CRUD operations to build a RESTful API.

## Getting Started

### Prerequisites

Before running the server, you will need to have these installed on your system:

- Node.js
- MongoDB

### Installation

1. Clone the repository:
`git clone <https://github.com/your-username/blog-api.git>`

2. Navigate to the project directory:
 `cd blog-api`

3. Install dependencies:
 `npm install`

4. Create an .env file with your mongo connection string and a secret

5. Start the server:
 `npm start`

The server will start running at <http://localhost:3000> by default.

Once you have the server is running, you can use <http://localhost:3000> or an HTTP client (e.g., cURL, Postman) to interact with the API endpoints.

## Endpoints

### Posts

GET api/post/all: Get all blog posts\
GET api/post/:postId: Get a specific blog post by ID\
POST api/post/create: Create a new blog post\
PUT api/post/:postId: Update a blog post by ID\
DELETE api/post/delete/:postId: Delete a blog post by ID\
GET api/post/:postId/comments: Get all comments for a specific blog post

### Comments

POST api/comment/create: Create a new blog post\
DELETE api/delete/:commentId: Delete a specific comment by ID

### Users

GET api/user/all: Get all users\
GET api/user/:userId: Get a specific user by ID\
POST api/user/create: Create a new user\
PUT api/user/update/:userId: Update a user by ID\
DELETE api/user/delete/:userId: Delete a user by ID\
POST api/user/login: Login user
