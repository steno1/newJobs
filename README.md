// you can view this site at https://findjobs.onrender.com/
   App Documentation

   Introduction

This documentation provides an overview of findJobApp, including its features, functionality, and technical implementation.
The app allows users to create and manage profiles, add job listings, view their own job listings, search for jobs, and track job statistics.
It includes authentication and security features, utilizes context API for state management, and employs various libraries and technologies for enhanced functionality.

   Table of Contents
   Requirements
   Installation
   Architecture
   Features
   API Endpoints
   Authentication
   Error Handling
   Pagination
   Security
   State Management
   
Requirements;
To run the application, ensure you have the following dependencies installed:

Node.js (v12 or higher)
MongoDB

Installation;

Clone the repository from GitHub.
Navigate to the project root directory.
Install the required dependencies by running the following command:
npm install
Create a .env file in the project root and configure the following environment variables:
PORT=3000
MONGODB_URI=mongodb://localhost:27017/your-database-name
JWT_SECRET=your-jwt-secret
Ensure you replace your-database-name with the name of your MongoDB database and your-jwt-secret with a secure secret key.
Start the application by running the following command:

npm start
The application will be accessible at http://localhost:3000.

Architecture;

The application follows a client-server architecture, with the frontend built using React and the backend implemented with Node.js and MongoDB.
The frontend communicates with the backend via a set of RESTful API endpoints.

The project structure is organized as follows:

client/: Contains the React frontend code.
/: Contains the Node.js backend code.
/routes/: Defines the API routes.
/controllers/: Implements the logic for handling API requests.
/models/: Defines the Mongoose models for MongoDB.
/middleware/: Contains error handling middleware.

Features;

The application offers the following features:

User Management:

User Registration: Users can create an account with their email and password.
User Login: Registered users can log in to access their profiles and job listings.

Profile Management:

Create Profile: Users can create their profile by providing relevant information.
Edit Profile: Users can edit their profile information, such as name, contact details, etc.
Delete Profile: Users can delete their profile and associated job listings.

Job Management:

Add Job: Users can add job listings, including details like company, position, location, status, and job type.
View Jobs: Users can view the jobs they have created.
Search Jobs: Users can search for jobs based on specific criteria.

Job Statistics:

Stats Page: Displays job statistics, including the number of pending, declined, and scheduled interviews.
Bar Chart: Shows the number of registered users in the last six months.
Error Handling:

Middleware: Error middleware is implemented to handle and respond to errors gracefully.

Pagination:

Jobs List: Job listings are paginated, allowing users to view a limited number of jobs per page and navigate through the pages.
Security:

Password Hashing: User passwords are securely hashed using bcrypt.js before storing them in the database.
Authentication Tokens: JSON Web Tokens (JWT) are used to authenticate users and ensure secure communication between the client and server.
State Management:

Context API: The application utilizes the Context API provided by React to manage and share state between components efficiently.

Authentication;
The application implements authentication using JWT (JSON Web Tokens). When a user registers or logs in, a token is generated and sent back to the client.
The client includes this token in the headers of subsequent requests to authenticate the user. The server verifies the token and allows access to protected routes.

Error Handling;
Error handling is implemented using middleware. When an error occurs during a request, the error middleware intercepts it and 
sends an appropriate error response to the client. This ensures that errors are handled consistently and gracefully throughout the application.

Pagination;
The application incorporates pagination to manage large datasets efficiently. For example, when retrieving job listings, the results are divided into pages,
with a specific number of jobs displayed per page. Users can navigate through the pages to view different sets of jobs.

Security;
To enhance security, the application employs the following measures:

Password Hashing: User passwords are hashed using bcrypt.js before being stored in the database. This ensures that passwords are not stored
in plain text and adds an additional layer of protection against unauthorized access.

JWT: JSON Web Tokens are used for authentication. The tokens are securely generated and verified to ensure the integrity and authenticity of user requests.

State Management;
The application utilizes the Context API provided by React for state management. The Context API allows sharing state between components without the need for prop drilling,
making it easier to manage and update application-wide state.


