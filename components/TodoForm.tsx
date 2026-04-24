'use client'

import { useState } from "react";

type TodoFormProps = {
    onAddTodo: (todo: { id: number, title: string, description: string, createdAt: string }) => void;
};

export default function TodoForm({ onAddTodo }: TodoFormProps) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onAddTodo({
            id: Date.now(),
            title,
            description,
            createdAt: new Date().toISOString().split('T')[0],
        });
        setTitle("");
        setDescription("");
    };
    
    return (
        <div className="w-2/5 border border-gray-200 rounded-lg p-4">
            <h1 className="font-bold">Add a new todo</h1>
            <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-5">
                <input type="text" placeholder="Title" className="border border-gray-200 rounded-lg p-2" value={title} onChange={(e) => setTitle(e.target.value)} />
                <input type="text" placeholder="Description" className="border border-gray-200 rounded-lg p-2" value={description} onChange={(e) => setDescription(e.target.value)} />
                <button type="submit" className="bg-green-700 text-white px-2 py-1 rounded-lg cursor-pointer transition hover:bg-green-800">Add</button>
            </form>
        </div>
    );
}