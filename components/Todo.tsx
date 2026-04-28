'use client'

import { useState } from "react";

interface TodoProps {
    id: number;
    title: string;
    description: string;
    createdAt: string;
    handleDeleteTodo: (id: number) => void;
}

export default function Todo({id, title, description, createdAt, handleDeleteTodo }: TodoProps) {
    const [isDone, setIsDone] = useState(false);

    const formatDate = (date: string) => {
        const dateObj = new Date(date);
        const day = dateObj.getDate();
        const month = dateObj.getMonth() + 1;
        const year = dateObj.getFullYear();
        return `${day}/${month}/${year}`;
    }
   
    return (
        <div className="w-2/5 border border-gray-200 rounded-lg p-4">
            <div>
                <span className="flex justify-between">
                    <h1 className="font-bold" style={{ textDecoration: isDone ? "line-through" : "none" }}>{title}</h1>
                    <p className="text-gray-500" style={{ textDecoration: isDone ? "line-through" : "none" }}>Created at: {formatDate(createdAt)}</p>
                </span>
                <p className="text-gray-500" style={{ textDecoration: isDone ? "line-through" : "none" }}>{description}</p>
            </div>
            <div className="flex gap-2 mt-5">
                <button
                    onClick={() => setIsDone(!isDone)}
                    className="bg-green-700 text-white px-2 py-1 rounded-lg cursor-pointer transition hover:bg-green-800">
                    {isDone ? "Undo" : "Done"}
                </button>
                {!isDone && (
                    <button onClick={() => handleDeleteTodo(id)} className="bg-red-700 text-white px-2 py-1 rounded-lg cursor-pointer transition hover:bg-red-800">Delete</button>
                )}
            </div>
        </div>
    );
}