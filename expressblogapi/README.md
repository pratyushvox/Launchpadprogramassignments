# Express Blog API

A simple REST API for managing blog posts built with Express.js and TypeScript.

## Features

- Create new blog posts
- Read all blog posts
- Read single blog post by ID
- Update existing blog posts
- Delete blog posts
- In-memory storage (no database required)

## Technologies Used

- Node.js
- Express.js
- TypeScript
- In-memory storage


## API Endpoints

### Health Check
- **GET** `/health` - Check if API is running

### Blog Operations
- **GET** `/api/blogs` - Get all blog posts
- **GET** `/api/blogs/:id` - Get single blog post
- **POST** `/api/blogs` - Create new blog post
- **PATCH** `/api/blogs/:id` - Update blog post
- **DELETE** `/api/blogs/:id` - Delete blog post

## API Usage Examples

### Create a Blog Post
```bash
POST http://localhost:3000/api/blogs
Content-Type: application/json

<img width="656" height="357" alt="image" src="https://github.com/user-attachments/assets/1c0704d1-ac50-4cd3-8d9e-5f8d96b5668c" />

```

### Get All Blogs
```bash
GET http://localhost:3000/api/blogs
<img width="1414" height="714" alt="image" src="https://github.com/user-attachments/assets/6bc61dbf-0484-4f2e-b4bb-c3bf2f752adf" />


```

### Get Single Blog
```bash
GET http://localhost:3000/api/blogs/1
<img width="1344" height="408" alt="image" src="https://github.com/user-attachments/assets/a7b54f34-0e29-44b2-9906-3bc6a816bec4" />

```

### Update Blog
```bash
PATCH http://localhost:3000/api/blogs/1
Content-Type: application/json

{
  "title": "Updated Blog Title"
}
```
<img width="1374" height="513" alt="image" src="https://github.com/user-attachments/assets/1309fccd-84c8-4095-9df6-6c32af7fd8c1" />


### Delete Blog
```bash
DELETE http://localhost:3000/api/blogs/2

<img width="1321" height="227" alt="image" src="https://github.com/user-attachments/assets/e2a3766a-49fe-4c83-a30d-8af1b5dd6624" />

```

## Response Format

All responses follow this format:
```json
{
  "message": "Success message",
  "data": {} // or [] for lists
}
```

## Project Structure

```
src/
├── index.ts        # Main server file
├── types.ts        # TypeScript interfaces
├── storage.ts      # In-memory data storage
├── service.ts      # Business logic
├── controller.ts   # HTTP request handlers
└── routes.ts       # API routes
```

## Testing

Use Thunder Client in VS Code or any HTTP client to test the API endpoints.



## Author

Created as part of Express.js learning assignment.

## License

This project is for educational purposes.
