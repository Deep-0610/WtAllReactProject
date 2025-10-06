import React from "react";

function ProgressTracker({ todos }) {
  const totalTasks = todos.length;
  const completedTasks = todos.filter(todo => todo.completed).length;
  const overdueTasks = todos.filter(todo =>
    todo.dueDate && new Date(todo.dueDate) < new Date() && !todo.completed
  ).length;
  const highPriorityTasks = todos.filter(todo => todo.priority === "high" && !todo.completed).length;

  const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="progress-tracker">
      <h3>Progress Overview</h3>
      <div className="stats">
        <div className="stat">
          <span className="stat-number">{totalTasks}</span>
          <span className="stat-label">Total Tasks</span>
        </div>
        <div className="stat">
          <span className="stat-number">{completedTasks}</span>
          <span className="stat-label">Completed</span>
        </div>
        <div className="stat">
          <span className="stat-number">{overdueTasks}</span>
          <span className="stat-label">Overdue</span>
        </div>
        <div className="stat">
          <span className="stat-number">{highPriorityTasks}</span>
          <span className="stat-label">High Priority</span>
        </div>
      </div>
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${completionPercentage}%` }}
        ></div>
      </div>
      <div className="progress-text">
        {completionPercentage}% Complete
      </div>
    </div>
  );
}

export default ProgressTracker;
