# To-Do List App

A simple Node.js web application for managing to-do tasks, built as a learning project.

## Description

This is a full-stack to-do list application that allows users to create, read, update, and delete tasks. It uses Express.js for the backend, EJS for templating, MongoDB for data storage, and vanilla CSS for styling.

## Features

- View all tasks in a list
- Add new tasks with title and description
- Update existing tasks
- Delete tasks
- Responsive web interface
- 404 error page for invalid routes

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
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

3. Use the web interface to:
   - View all tasks on the home page
   - Click "Add Task" to create new tasks
   - Click "Update" next to any task to edit it
   - Click "Delete" to remove tasks

## Project Structure

```
to-do-list/
├── index.js              # Main application file
├── package.json          # Dependencies and scripts
├── README.md             # This file
├── public/
│   └── css/
│       ├── navbar.css    # Navigation styling
│       └── style.css     # Main application styles
└── views/
    ├── 404.ejs          # 404 error page
    ├── add.ejs          # Add new task form
    ├── list.ejs         # Task list display
    ├── navbar.ejs       # Navigation component
    └── update.ejs       # Update task form
```

## API Endpoints

- `GET /` - Display all tasks
- `GET /add` - Show add task form
- `POST /add` - Create new task
- `GET /update/:id` - Show update form for specific task
- `POST /update/:id` - Update specific task
- `GET /delete/:id` - Delete specific task

## Database

The application uses MongoDB with:
- Database name: `to-do-list`
- Collection name: `tasks`
- Document structure: `{ _id, task, description }`

## Contributing

This is a learning project. Feel free to fork and modify for your own learning purposes.

## License

ISC License

## Author

Nirajan Shrestha
