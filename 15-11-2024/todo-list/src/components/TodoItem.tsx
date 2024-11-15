import React from "react";

type TodoProps = {
  todo: {
    id: number;
    task: string;
    completed: boolean;
  };
  toggleTodo: (id: number) => void;
  removeTodo: (id: number) => void;
};

const TodoItem: React.FC<TodoProps> = ({ todo, toggleTodo, removeTodo }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        margin: "10px 0",
        padding: "10px",
        border: "1px solid #ddd",
        borderRadius: "8px",
      }}
    >
      <span
        onClick={() => toggleTodo(todo.id)}
        style={{
          textDecoration: todo.completed ? "line-through" : "none",
          cursor: "pointer",
        }}
      >
        {todo.task}
      </span>
      <button
        style={{ marginLeft: "10px", color: "red", cursor: "pointer" }}
        onClick={() => removeTodo(todo.id)}
      >
        Delete
      </button>
    </div>
  );
};

export default TodoItem;
