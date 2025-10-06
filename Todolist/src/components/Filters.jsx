import React from "react";

function Filters({ filters, onFilterChange, onClearFilters }) {
  const handleFilterChange = (key, value) => {
    onFilterChange({ ...filters, [key]: value });
  };

  return (
    <div className="filters">
      <h3>Filters</h3>
      <div className="filter-group">
        <label>
          <input
            type="checkbox"
            checked={filters.showCompleted}
            onChange={(e) => handleFilterChange("showCompleted", e.target.checked)}
          />
          Show completed
        </label>
      </div>
      <div className="filter-group">
        <label>Priority:</label>
        <select
          value={filters.priority}
          onChange={(e) => handleFilterChange("priority", e.target.value)}
        >
          <option value="">All</option>
          <option value="high">High</option>
          <option value="normal">Normal</option>
          <option value="low">Low</option>
        </select>
      </div>
      <div className="filter-group">
        <label>Category:</label>
        <input
          type="text"
          placeholder="Filter by category"
          value={filters.category}
          onChange={(e) => handleFilterChange("category", e.target.value)}
        />
      </div>
      <div className="filter-group">
        <label>Due date:</label>
        <select
          value={filters.dueDateFilter}
          onChange={(e) => handleFilterChange("dueDateFilter", e.target.value)}
        >
          <option value="">All</option>
          <option value="overdue">Overdue</option>
          <option value="today">Due today</option>
          <option value="thisWeek">This week</option>
          <option value="thisMonth">This month</option>
        </select>
      </div>
      <button onClick={onClearFilters} className="clear-filters">
        Clear Filters
      </button>
    </div>
  );
}

export default Filters;
