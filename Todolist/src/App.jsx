import React, { useState, useEffect } from "react";
import FetchDemo from "./components/FetchDemo";

function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (input.trim() === "") return;
    setTodos([
      ...todos,
      { id: Date.now(), text: input.trim(), completed: false }
    ]);
    setInput("");
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };

  return (
    <div className="app-container">
      <h1>Todo List</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Add a new task"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          aria-label="Add new todo"
        />
        <button onClick={addTodo} aria-label="Add todo">
          Add
        </button>
      </div>
      <ul className="todo-list">
        {todos.length === 0 && <li className="empty">No tasks yet</li>}
        {todos.map((todo) => (
          <li key={todo.id} className={todo.completed ? "completed" : ""}>
            <label>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleComplete(todo.id)}
              />
              <span>{todo.text}</span>
            </label>
            <button
              className="delete-btn"
              onClick={() => deleteTodo(todo.id)}
              aria-label="Delete todo"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <FetchDemo />
    </div>
  );
}

export default App;
