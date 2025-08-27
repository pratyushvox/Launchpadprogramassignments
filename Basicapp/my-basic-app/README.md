

Product Management Dashboard
A modern React-based product management system built with TypeScript, React Query, and a clean UI design. This application provides a complete CRUD interface for managing products with features like search, filtering, pagination, and category management.
🚀 Features

Product Management: Full CRUD operations (Create, Read, Update, Delete)
Search & Filter: Real-time product search and category filtering
Pagination: Client-side pagination for better performance
Responsive Design: Mobile-first responsive design using Tailwind CSS
Authentication: Simple login/logout functionality
Data Fetching: Efficient data management with React Query
Type Safety: Full TypeScript implementation
Modern UI: Clean and intuitive user interface with shadcn/ui components

🛠️ Tech Stack

Frontend Framework: React 18 with TypeScript
State Management: React Query (TanStack Query) for server state
Styling: Tailwind CSS
UI Components: shadcn/ui component library
HTTP Client: Native Fetch API
Icons: Lucide React
Notifications: React Hot Toast
Routing: React Router DOM

📁 Project Structure
src/
├── Components/
│   ├── products/
│   │   ├── ProductList.tsx      # Main product listing component
│   │   ├── ProductTable.tsx     # Product table with actions
│   │   └── ProductForm.tsx      # Create/Edit product form
│   └── UI/                      # Reusable UI components
├── hooks/
│   ├── useProducts.ts           # Product management hook
│   └── useAuth.ts               # Authentication hook
├── services/
│   ├── api.ts                   # Base API configuration
│   ├── productService.ts        # Product API service
│   └── authService.ts           # Authentication service
├── types/
│   └── index.ts                 # TypeScript type definitions
└── pages/
    ├── Dashboard.tsx            # Main dashboard page
    └── Login.tsx                # Login page
🏗️ Architecture
State Management

React Query: Handles all server state including caching, synchronization, and background updates
Local State: React hooks for component-specific state management

Data Flow

API Layer: RESTful API integration with FakeStore API
Service Layer: Abstracted API calls with error handling
Hook Layer: Custom hooks for business logic and state management
Component Layer: Presentational and container components

Key Patterns

Custom Hooks: Encapsulate business logic and API interactions
Compound Components: Complex UI components broken into smaller, reusable parts
Error Boundaries: Graceful error handling throughout the application
Loading States: Comprehensive loading and error state management

🎯 Core Features Breakdown
Product Management

View Products: Paginated list with images, details, and actions
Search Products: Real-time search by product title
Filter by Category: Dynamic category filtering
Create Product: Modal form for adding new products
Edit Product: In-place editing with pre-populated forms
Delete Product: Confirmation dialog for safe deletion

Authentication

Login: Simple username/password authentication
Session Management: Automatic logout and route protection
User Feedback: Toast notifications for auth actions

Data Features

Client-side Pagination: Efficient handling of large datasets
Optimistic Updates: Immediate UI updates with server synchronization
Cache Management: Intelligent caching with React Query
Error Handling: Comprehensive error states and recovery

login page :
<img width="1013" height="730" alt="image" src="https://github.com/user-attachments/assets/77f9c85f-6753-4f8d-8bcf-d999839d411f" />

dashboard page : 
<img width="1773" height="904" alt="image" src="https://github.com/user-attachments/assets/24793a6c-df6a-4f90-ad08-1f7139c5c4be" />

