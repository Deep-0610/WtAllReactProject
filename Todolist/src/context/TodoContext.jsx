import React, { createContext, useReducer, useContext, useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const TodoContext = createContext();

const initialState = {
  todos: [],
  filters: {
    showCompleted: true,
    priority: "",
    category: "",
    dueDateFilter: "",
  },
  searchTerm: "",
  isDarkMode: false,
};

function todoReducer(state, action) {
  switch (action.type) {
    case "SET_TODOS":
      return { ...state, todos: action.payload };
    case "ADD_TODO":
      return { ...state, todos: [...state.todos, action.payload] };
    case "UPDATE_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id ? { ...todo, ...action.payload.updates } : todo
        ),
      };
    case "DELETE_TODO":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    case "SET_FILTERS":
      return { ...state, filters: { ...state.filters, ...action.payload } };
    case "CLEAR_FILTERS":
      return { ...state, filters: initialState.filters };
    case "SET_SEARCH_TERM":
      return { ...state, searchTerm: action.payload };
    case "TOGGLE_DARK_MODE":
      return { ...state, isDarkMode: !state.isDarkMode };
    default:
      return state;
  }
}

export function TodoProvider({ children }) {
  const [storedTodos, setStoredTodos] = useLocalStorage("todos", []);
  const [state, dispatch] = useReducer(todoReducer, { ...initialState, todos: storedTodos });

  useEffect(() => {
    setStoredTodos(state.todos);
  }, [state.todos, setStoredTodos]);

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
}

export function useTodo() {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodo must be used within a TodoProvider");
  }
  return context;
}
