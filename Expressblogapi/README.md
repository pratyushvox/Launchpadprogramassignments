# Blog API Project

This project is a **backend system for a blog application** built using **Node.js, Express, TypeScript, and MongoDB**. It implements **user authentication**, **role-based access control**, and **CRUD operations** for blog posts. The project was developed as part of a task to create a functional blog system with different permissions for **admin** and **blogger** roles.

---

## **Project Description**

The main goal of this project is to provide a backend service where:

- Users can **register** and **login** securely.
- **Admins** have full control over all posts in the system.
- **Bloggers** can create and manage only their own posts.
- Input validation ensures that all data entered by users meets the expected format.
- JWT-based authentication secures all routes that require a logged-in user.
- Passwords are **hashed** before storing in the database.

This system demonstrates the implementation of:

- **Role-based access control**
- **JWT authentication**
- **Express middleware**
- **Mongoose models and schemas**
- **Data validation using Yup**

---

## **User Roles**

### Admin
- The admin account is identified by the **email `admin@example.com`**.
- Admin can **create, read, update, and delete all posts** in the system.
- Admin’s password is set during registration.
- Admin has higher privileges than bloggers.

### Blogger
- Any other registered email becomes a blogger.
- Bloggers can **create posts** and **manage only their own posts**.
- Bloggers cannot access or modify other users’ posts.

---

## **Features Implemented**

1. **Authentication**
   - Register and login users with hashed passwords.
   - JWT token generation for session management.
   
2. **Post Management**
   - CRUD operations (Create, Read, Update, Delete) for blog posts.
   - Admin sees all posts; bloggers see only their own.
   - Posts store **author, createdBy, and updatedBy** fields.

3. **Validation**
   - Input validation using **Yup** for all endpoints.
   - Ensures required fields are provided and formatted correctly.

4. **Authorization**
   - Middleware checks user roles and restricts access accordingly.

---

## **Project Structure**

src/
├─ controllers/
│ ├─ authController.ts # Handles register and login
│ └─ postController.ts # Handles post CRUD
├─ middleware/
│ ├─ auth.ts # JWT verification and role authorization
│ └─ validation.ts # Request body validation
├─ models/
│ ├─ User.ts # User schema and password hashing
│ └─ Post.ts # Post schema
├─ routes/
│ ├─ auth.ts # Authentication routes
│ └─ posts.ts # Post routes
├─ utils/
│ └─ validationSchemas.ts # Yup schemas for validation
├─ config/
│ └─ db.ts # MongoDB connection
└─ index.ts # Entry point

testing  test the API using **Postman** or **Thunder Client**:

