Blog App REST API
A REST API design for a blogging platform with authentication, posts, comments, and likes functionality.

Overview

This project contains REST API endpoints for a blog application that allows users to:

Register and authenticate
Create and manage blog posts
Comment on posts
Like/unlike posts
Manage user profiles

API Base URL
https://api.blogapp.com/v1
Main Features
Authentication

User registration and login
Password reset functionality
JWT token-based authentication

Posts

Create, read, update, delete blog posts
Search and filter posts
Get posts by specific users

Comments

Add comments to posts
Edit and delete comments
View all comments by a user

Likes

Like and unlike posts
View like counts
See posts liked by users

Quick Examples
Register User
bashPOST /v1/auth/register
{
  "username": "pratyush_khadka",
  "email": "pratyush.khadka@gmail.com", 
  "password": "SecurePass123!",
  "firstName": "Pratyush",
  "lastName": "Khadka"
}
Create Post
bashPOST /v1/posts
Authorization: Bearer <token>
{
  "title": "My Blog Post",
  "content": "Post content here...",
  "tags": ["programming", "api"]
}
Add Comment
bashPOST /v1/posts/1/comments
Authorization: Bearer <token>
{
  "content": "Great post!"
}
Documentation
Complete API documentation with all endpoints and examples is available in the api-specification.md file.
Course Assignment
This API design was created as part of the "REST API Design and Best Practices" course.


