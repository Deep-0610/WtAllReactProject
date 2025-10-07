import React, { useMemo } from "react";
import { useTodo } from "./context/TodoContext";
import TaskForm from "./components/TaskForm";
import TaskItem from "./components/TaskItem";
import Filters from "./components/Filters";
import SearchBar from "./components/SearchBar";
import ProgressTracker from "./components/ProgressTracker";
import DarkModeToggle from "./components/DarkModeToggle";
import { exportToJSON, exportToCSV, importFromJSON, importFromCSV } from "./utils/exportImport";
import { getDateFilter } from "./utils/dateUtils";

function App() {
  const { state, dispatch } = useTodo();

  const filteredTodos = useMemo(() => {
    return state.todos.filter((todo) => {
      // Search filter
      if (state.searchTerm && !todo.text.toLowerCase().includes(state.searchTerm.toLowerCase())) {
        return false;
      }
      // Completed filter
      if (!state.filters.showCompleted && todo.completed) {
        return false;
      }
      // Priority filter
      if (state.filters.priority && todo.priority !== state.filters.priority) {
        return false;
      }
      // Category filter
      if (state.filters.category && !todo.category.toLowerCase().includes(state.filters.category.toLowerCase())) {
        return false;
      }
      // Due date filter
      if (state.filters.dueDateFilter && !getDateFilter(todo.dueDate, state.filters.dueDateFilter)) {
        return false;
      }
      return true;
    });
  }, [state.todos, state.searchTerm, state.filters]);

  const handleAddTodo = (todoData) => {
    dispatch({ type: "ADD_TODO", payload: todoData });
  };

  const handleUpdateTodo = (id, updates) => {
    dispatch({ type: "UPDATE_TODO", payload: { id, updates } });
  };

  const handleDeleteTodo = (id) => {
    dispatch({ type: "DELETE_TODO", payload: id });
  };

  const handleToggleComplete = (id) => {
    const todo = state.todos.find(t => t.id === id);
    if (todo) {
      dispatch({ type: "UPDATE_TODO", payload: { id, updates: { completed: !todo.completed } } });
    }
  };

  const handleFilterChange = (newFilters) => {
    dispatch({ type: "SET_FILTERS", payload: newFilters });
  };

  const handleClearFilters = () => {
    dispatch({ type: "CLEAR_FILTERS" });
  };

  const handleSearchChange = (term) => {
    dispatch({ type: "SET_SEARCH_TERM", payload: term });
  };

  const handleToggleDarkMode = () => {
    dispatch({ type: "TOGGLE_DARK_MODE" });
  };

  const handleExportJSON = () => {
    exportToJSON(state.todos);
  };

  const handleExportCSV = () => {
    exportToCSV(state.todos);
  };

  const handleImportJSON = (event) => {
    const file = event.target.files[0];
    if (file) {
      importFromJSON(file).then((todos) => {
        dispatch({ type: "SET_TODOS", payload: todos });
      }).catch((error) => {
        alert("Error importing JSON: " + error.message);
      });
    }
  };

  const handleImportCSV = (event) => {
    const file = event.target.files[0];
    if (file) {
      importFromCSV(file).then((todos) => {
        dispatch({ type: "SET_TODOS", payload: todos });
      }).catch((error) => {
        alert("Error importing CSV: " + error.message);
      });
    }
  };

  return (
    <div className={`app-container ${state.isDarkMode ? "dark-mode" : ""}`}>
      <header className="app-header">
        <h1>Advanced Todo List</h1>
        <DarkModeToggle isDarkMode={state.isDarkMode} onToggle={handleToggleDarkMode} />
      </header>
      <ProgressTracker todos={state.todos} />
      <div className="controls">
        <SearchBar searchTerm={state.searchTerm} onSearchChange={handleSearchChange} />
        <Filters
          filters={state.filters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
        />
        <div className="export-import">
          <button onClick={handleExportJSON}>Export JSON</button>
          <button onClick={handleExportCSV}>Export CSV</button>
          <label>
            Import JSON
            <input type="file" accept=".json" onChange={handleImportJSON} style={{ display: "none" }} />
          </label>
          <label>
            Import CSV
            <input type="file" accept=".csv" onChange={handleImportCSV} style={{ display: "none" }} />
          </label>
        </div>
      </div>
      <TaskForm onAdd={handleAddTodo} />
      <div className="todo-list">
        {filteredTodos.length === 0 ? (
          <p className="empty">No tasks match your filters.</p>
        ) : (
          filteredTodos.map((todo) => (
            <TaskItem
              key={todo.id}
              task={todo}
              onToggleComplete={handleToggleComplete}
              onDelete={handleDeleteTodo}
              onUpdate={handleUpdateTodo}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default App;
