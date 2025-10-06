import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function TaskForm({ onAdd }) {
  const [text, setText] = useState("");
  const [dueDate, setDueDate] = useState(null);
  const [priority, setPriority] = useState("normal");
  const [category, setCategory] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() === "") return;
    onAdd({
      text: text.trim(),
      dueDate,
      priority,
      category,
      completed: false,
      subtasks: [],
      id: Date.now(),
    });
    setText("");
    setDueDate(null);
    setPriority("normal");
    setCategory("");
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add a new task"
        value={text}
        onChange={(e) => setText(e.target.value)}
        aria-label="Task text"
      />
      <DatePicker
        selected={dueDate}
        onChange={(date) => setDueDate(date)}
        placeholderText="Due date"
        aria-label="Due date"
      />
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        aria-label="Priority"
      >
        <option value="low">Low Priority</option>
        <option value="normal">Normal Priority</option>
        <option value="high">High Priority</option>
      </select>
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        aria-label="Category"
      />
      <button type="submit" aria-label="Add task">
        Add
      </button>
    </form>
  );
}

export default TaskForm;
