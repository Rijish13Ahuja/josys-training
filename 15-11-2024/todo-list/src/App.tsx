import React, { useState } from "react";
import TodoItem from "./components/TodoItem";

type Todo = {
  id: number;
  task: string;
  completed: boolean;
};

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTask, setNewTask] = useState<string>("");

  const addTodo = () => {
    if (newTask.trim()) {
      const newTodo: Todo = { id: Date.now(), task: newTask, completed: false };
      setTodos((prev) => [...prev, newTodo]);
      setNewTask("");
    }
  };

  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const removeTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>ToDoList App</h1>
      <div>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter a task"
        />
        <button onClick={addTodo}>Add Task</button>
      </div>
      <div style={{ marginTop: "20px" }}>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            toggleTodo={toggleTodo}
            removeTodo={removeTodo}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
