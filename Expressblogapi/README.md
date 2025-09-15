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

Registering the admin
<img width="975" height="433" alt="image" src="https://github.com/user-attachments/assets/47f8a8d2-2c59-46ba-83bf-a5c2e9007043" />

Registering the blogger 


<img width="975" height="332" alt="image" src="https://github.com/user-attachments/assets/9926ebb0-6f0f-4ba6-8599-d2690354d071" />


Login admin

<img width="975" height="445" alt="image" src="https://github.com/user-attachments/assets/4cce6683-5e43-4214-8d1b-e659c37d4ad7" />
Login blogger

<img width="975" height="423" alt="image" src="https://github.com/user-attachments/assets/9b9c8f8f-5187-4089-b86e-c734cb701ea7" />

Posting by admin 

<img width="975" height="446" alt="image" src="https://github.com/user-attachments/assets/6215075c-bc8a-468e-bca1-a270a6a1b607" />


Posting by blogger 

<img width="975" height="393" alt="image" src="https://github.com/user-attachments/assets/9fcb047c-d840-41b1-81fa-0e15f37ffa4c" />

Getting all post by admin 

<img width="975" height="531" alt="image" src="https://github.com/user-attachments/assets/22504a7a-54b2-4cbe-82f6-f499db497302" />

Getting single post  by admin 

<img width="975" height="427" alt="image" src="https://github.com/user-attachments/assets/9d91203b-94e2-4d58-9e18-3fb6f5e26ae4" />

Getting the post of respective blogger by blogger 

<img width="975" height="422" alt="image" src="https://github.com/user-attachments/assets/30347d8d-29e5-4920-9316-b80bccb02e32" />

Updating the post by admin 

<img width="975" height="470" alt="image" src="https://github.com/user-attachments/assets/1f5454ff-2fdc-4bc2-ba9f-cd9ecc776081" />

Updating only their post by blogger 

<img width="975" height="489" alt="image" src="https://github.com/user-attachments/assets/8147c8ee-60ad-4cae-a461-0995b5c65322" />


Post deleted successfully by admin

<img width="975" height="269" alt="image" src="https://github.com/user-attachments/assets/fe5e1497-ca74-436b-82ee-e35596d1e830" />


Deleting the post of blooger by that respective blogger

<img width="975" height="295" alt="image" src="https://github.com/user-attachments/assets/a03f8ef7-b6d7-4bf3-a62f-86defb108792" />

















