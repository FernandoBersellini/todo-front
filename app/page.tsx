'use client'

import Todo from "@/components/Todo";
import { mockTodos } from "@/utils/mockTodo";
import TodoForm from "@/components/TodoForm";
import { useState } from "react";

export default function Home() {
  const [todos, setTodos] = useState<any[]>([]);

  const handleAddTodo = (newTodo: any) => {
    setTodos([newTodo, ...todos]);
  };

  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
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
          <Todo key={todo.id} id={todo.id} title={todo.title} description={todo.description} createdAt={todo.createdAt} handleDeleteTodo={handleDeleteTodo} />
        ))}
      </div>
    </div>
  );
}
