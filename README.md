# Simple Todo App

A basic todo application built with Node.js, Express, and vanilla JavaScript.

## Features

- Create new todo items
- View all todo items
- Mark todos as completed
- Delete todo items

## Installation

1. Make sure you have Node.js installed
2. Clone this repository
3. Install dependencies:

```bash
npm install
```

## Running the App

Start the server:

```bash
npm start
```

The app will be available at http://localhost:3000

## API Endpoints

- `GET /api/todos` - Get all todos
- `GET /api/todos/:id` - Get a specific todo
- `POST /api/todos` - Create a new todo
- `PUT /api/todos/:id` - Update a todo
- `DELETE /api/todos/:id` - Delete a todo