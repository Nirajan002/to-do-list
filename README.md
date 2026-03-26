# To-Do List App

A full-stack Node.js web application for managing personal to-do tasks with user authentication, built as a learning project.

## Description

This is a secure, multi-user to-do list application that allows users to create an account, log in, and manage their personal tasks with create, read, update, and delete (CRUD) operations. It uses Express.js for the backend, EJS for templating, MongoDB for data storage, bcryptjs for secure password hashing, and vanilla CSS for styling.

## Features

- **User Authentication**: User registration and login system with password hashing
- **User Accounts**: Create personal user accounts with username and email
- **Task Management**: Create, read, update, and delete tasks
- **Task Ownership**: Each task is associated with the user who created it
- **Secure Sessions**: User context management during browser session
- **Logout Functionality**: Secure logout to clear user session
- **Responsive Web Interface**: Clean and intuitive UI
- **Input Validation**: Form validation and error handling
- **404 Error Page**: Custom error page for invalid routes

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: bcryptjs for password hashing
- **Frontend**: EJS templating, HTML, CSS
- **Development**: Nodemon for auto-restart

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (running locally on default port 27017)

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd to-do-list
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Make sure MongoDB is running on your local machine.

## Usage

1. Start the application:
   ```bash
   node index.js
   ```

   Or for development with auto-restart:
   ```bash
   npx nodemon index.js
   ```

2. Open your browser and navigate to `http://localhost:3200`

3. **First Time Users**: 
   - Click "Register" to create a new account
   - Enter username, email, and password
   - Password is securely hashed using bcryptjs

4. **Login**:
   - Enter your username and password
   - Upon successful authentication, you'll be redirected to your task list

5. **Manage Tasks**:
   - View all your personal tasks on the home page
   - Click "Add Task" to create new tasks with title and description
   - Click "Update" to edit any task
   - Click "Delete" to remove tasks
   - Click "Logout" in the navbar to end your session

## Project Structure

```
to-do-list/
├── index.js              # Main application file with routes and authentication
├── package.json          # Dependencies and scripts
├── README.md             # This file
├── public/
│   └── css/
│       ├── auth.css      # Authentication page styling
│       ├── navbar.css    # Navigation styling
│       └── style.css     # Main application styles
└── views/
    ├── 404.ejs          # 404 error page
    ├── add.ejs          # Add new task form
    ├── list.ejs         # Task list display
    ├── login.ejs        # Login form
    ├── navbar.ejs       # Navigation component
    ├── register.ejs     # User registration form
    └── update.ejs       # Update task form
```

## API Endpoints

### Authentication Routes
- `GET /register` - Show user registration form
- `POST /register` - Create new user account
- `GET /login` - Show login form
- `POST /login` - Authenticate user and create session
- `GET /logout` - Clear user session and logout

### Task Management Routes
- `GET /` - Display all tasks for the logged-in user
- `GET /add` - Show add task form
- `POST /add` - Create new task (requires authentication)
- `GET /update/:id` - Show update form for specific task
- `POST /update/:id` - Update specific task
- `GET /delete/:id` - Delete specific task (requires authentication)

## Database

The application uses MongoDB with:
- Database name: `to-do-list`
- Collections:
  - **tasks**: Stores all tasks with structure: `{ _id, task, description, owner, createdAt }`
  - **users**: Stores user credentials with structure: `{ _id, username, email, password (hashed) }`

### Security Features
- Passwords are hashed using bcryptjs (10 salt rounds)
- Tasks are scoped to individual users (owner validation)
- User session tracking to prevent unauthorized access
- Input validation on registration and login

## Contributing

This is a learning project. Feel free to fork and modify for your own learning purposes.

## License

ISC License

## Author

Nirajan Shrestha
