document.addEventListener('DOMContentLoaded', () => {
  const todoList = document.getElementById('todo-list');
  const newTodoInput = document.getElementById('new-todo');
  const addButton = document.getElementById('add-button');

  // Fetch and display todos
  fetchTodos();

  // Add new todo
  addButton.addEventListener('click', addTodo);
  newTodoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  });

  // Fetch all todos from API
  async function fetchTodos() {
    try {
      const response = await fetch('/api/todos');
      const todos = await response.json();
      renderTodos(todos);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  }

  // Render todos in the list
  function renderTodos(todos) {
    todoList.innerHTML = '';
    todos.forEach(todo => {
      const li = document.createElement('li');
      li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
      li.innerHTML = `
        <input type="checkbox" class="todo-checkbox" ${todo.completed ? 'checked' : ''} data-id="${todo.id}">
        <span class="todo-text">${todo.text}</span>
        <button class="delete-btn" data-id="${todo.id}">Delete</button>
      `;
      todoList.appendChild(li);
    });

    // Add event listeners to checkboxes and delete buttons
    document.querySelectorAll('.todo-checkbox').forEach(checkbox => {
      checkbox.addEventListener('change', toggleTodoStatus);
    });

    document.querySelectorAll('.delete-btn').forEach(button => {
      button.addEventListener('click', deleteTodo);
    });
  }

  // Add a new todo
  async function addTodo() {
    const text = newTodoInput.value.trim();
    if (!text) return;

    try {
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text })
      });

      if (response.ok) {
        newTodoInput.value = '';
        fetchTodos();
      }
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  }

  // Toggle todo completed status
  async function toggleTodoStatus(e) {
    const id = e.target.dataset.id;
    const completed = e.target.checked;

    try {
      await fetch(`/api/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ completed })
      });
      fetchTodos();
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  }

  // Delete a todo
  async function deleteTodo(e) {
    const id = e.target.dataset.id;

    try {
      await fetch(`/api/todos/${id}`, {
        method: 'DELETE'
      });
      fetchTodos();
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  }
});