import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { FaEdit, FaTrash, FaPlus, FaMinus } from "react-icons/fa";

function TaskItem({ task, onToggleComplete, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const [editDueDate, setEditDueDate] = useState(task.dueDate);
  const [editPriority, setEditPriority] = useState(task.priority);
  const [editCategory, setEditCategory] = useState(task.category);
  const [newSubtask, setNewSubtask] = useState("");

  const handleSave = () => {
    onUpdate(task.id, {
      text: editText.trim(),
      dueDate: editDueDate,
      priority: editPriority,
      category: editCategory,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditText(task.text);
    setEditDueDate(task.dueDate);
    setEditPriority(task.priority);
    setEditCategory(task.category);
    setIsEditing(false);
  };

  const addSubtask = () => {
    if (newSubtask.trim() === "") return;
    const updatedSubtasks = [...task.subtasks, { id: Date.now(), text: newSubtask.trim(), completed: false }];
    onUpdate(task.id, { subtasks: updatedSubtasks });
    setNewSubtask("");
  };

  const toggleSubtask = (subtaskId) => {
    const updatedSubtasks = task.subtasks.map(subtask =>
      subtask.id === subtaskId ? { ...subtask, completed: !subtask.completed } : subtask
    );
    onUpdate(task.id, { subtasks: updatedSubtasks });
  };

  const deleteSubtask = (subtaskId) => {
    const updatedSubtasks = task.subtasks.filter(subtask => subtask.id !== subtaskId);
    onUpdate(task.id, { subtasks: updatedSubtasks });
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high": return "#dc3545";
      case "normal": return "#ffc107";
      case "low": return "#28a745";
      default: return "#6c757d";
    }
  };

  return (
    <div className={`task-item ${task.completed ? "completed" : ""}`} style={{ borderLeftColor: getPriorityColor(task.priority) }}>
      <div className="task-header">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggleComplete(task.id)}
          aria-label="Toggle complete"
        />
        {isEditing ? (
          <div className="edit-form">
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              aria-label="Edit task text"
            />
            <DatePicker
              selected={editDueDate}
              onChange={(date) => setEditDueDate(date)}
              placeholderText="Due date"
            />
            <select
              value={editPriority}
              onChange={(e) => setEditPriority(e.target.value)}
            >
              <option value="low">Low</option>
              <option value="normal">Normal</option>
              <option value="high">High</option>
            </select>
            <input
              type="text"
              value={editCategory}
              onChange={(e) => setEditCategory(e.target.value)}
              placeholder="Category"
            />
            <button onClick={handleSave}>Save</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        ) : (
          <div className="task-content">
            <span className="task-text">{task.text}</span>
            {task.dueDate && (
              <span className="due-date">
                Due: {new Date(task.dueDate).toLocaleDateString()}
              </span>
            )}
            {task.category && (
              <span className="category">{task.category}</span>
            )}
          </div>
        )}
        <div className="task-actions">
          <button onClick={() => setIsEditing(!isEditing)} aria-label="Edit task">
            <FaEdit />
          </button>
          <button onClick={() => onDelete(task.id)} aria-label="Delete task">
            <FaTrash />
          </button>
        </div>
      </div>
      <div className="subtasks">
        {task.subtasks.map(subtask => (
          <div key={subtask.id} className={`subtask ${subtask.completed ? "completed" : ""}`}>
            <input
              type="checkbox"
              checked={subtask.completed}
              onChange={() => toggleSubtask(subtask.id)}
            />
            <span>{subtask.text}</span>
            <button onClick={() => deleteSubtask(subtask.id)} aria-label="Delete subtask">
              <FaMinus />
            </button>
          </div>
        ))}
        <div className="add-subtask">
          <input
            type="text"
            placeholder="Add subtask"
            value={newSubtask}
            onChange={(e) => setNewSubtask(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addSubtask()}
          />
          <button onClick={addSubtask} aria-label="Add subtask">
            <FaPlus />
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskItem;
