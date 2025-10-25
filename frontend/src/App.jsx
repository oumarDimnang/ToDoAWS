import { useState, useEffect } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import "./App.css";

// Use environment variable for API URL, fallback to localhost for development
const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api/todos";

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch todos from API
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL);
      const data = await response.json();

      if (data.success) {
        setTodos(data.data);
        setError(null);
      }
    } catch (err) {
      setError("Failed to fetch todos. Make sure the backend is running.");
      console.error("Error fetching todos:", err);
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async (todoData) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todoData),
      });

      const data = await response.json();

      if (data.success) {
        setTodos([data.data, ...todos]);
        setError(null);
      }
    } catch (err) {
      setError("Failed to add todo.");
      console.error("Error adding todo:", err);
    }
  };

  const toggleTodo = async (id) => {
    try {
      const todo = todos.find((t) => t._id === id);
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed: !todo.completed }),
      });

      const data = await response.json();

      if (data.success) {
        setTodos(todos.map((t) => (t._id === id ? data.data : t)));
        setError(null);
      }
    } catch (err) {
      setError("Failed to update todo.");
      console.error("Error updating todo:", err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.success) {
        setTodos(todos.filter((t) => t._id !== id));
        setError(null);
      }
    } catch (err) {
      setError("Failed to delete todo.");
      console.error("Error deleting todo:", err);
    }
  };

  return (
    <div className="app">
      <div className="container">
        <h1 className="app-title">📝 Todo App</h1>

        {error && <div className="error-message">{error}</div>}

        <TodoForm onAdd={addTodo} />

        {loading ? (
          <div className="loading">Loading todos...</div>
        ) : (
          <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
        )}

        {todos.length > 0 && (
          <div className="stats">
            Total: {todos.length} | Completed:{" "}
            {todos.filter((t) => t.completed).length}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
