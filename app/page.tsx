'use client'

import Todo from "@/components/Todo";
import TodoForm from "@/components/TodoForm";
import { useState, useEffect } from "react";

async function getTodos() {
  const response = await fetch("http://localhost:8000/api/todos");
  const data = await response.json();
  return data;
}

async function deleteTodo(id: number) {
  const response = await fetch(`http://localhost:8000/api/todos/${id}/`, {
    method: "DELETE",
  });
  const data = await response.json();
  return data;
}

export default function Home() {
  const [todos, setTodos] = useState<any[]>([]);

  useEffect(() => {
    getTodos().then(data => setTodos(data));
  }, []);

  const handleAddTodo = (newTodo: any) => {
    setTodos([newTodo, ...todos]);
  };

  const handleDeleteTodo = (id: number) => {
    deleteTodo(id);
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleEditTodo = (id: number, title: string, description: string) => {
    setTodos(todos.map((todo) => todo.id === id ? { ...todo, title, description } : todo));
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col items-center gap-5">
        <h1 className="font-bold text-center text-4xl">Todo tracker</h1>
        <p className="text-center text-gray-500">Track your tasks and stay organized</p>
        <TodoForm onAddTodo={handleAddTodo} />
      </div>
      
      <div className="flex flex-col items-center gap-5 mt-10">
        {todos.map((todo) => (
          <Todo key={todo.id} id={todo.id} title={todo.title} description={todo.description} createdAt={todo.created_at} handleDeleteTodo={handleDeleteTodo} handleEditTodo={handleEditTodo} />
        ))}
      </div>
    </div>
  );
}
