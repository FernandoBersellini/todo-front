'use client'

import { useState } from "react";
import { SquarePen } from 'lucide-react';
import EditModal from "./EditModal";

interface TodoProps {
    id: number;
    title: string;
    description: string;
    createdAt: string;
    handleDeleteTodo: (id: number) => void;
    handleEditTodo: (id: number, title: string, description: string) => void;
}

export default function Todo({ id, title, description, createdAt, handleDeleteTodo, handleEditTodo }: TodoProps) {
    const [isDone, setIsDone] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

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
            <div className="flex justify-between mt-5">
                <div className="flex gap-3">
                    <button
                        onClick={() => setIsDone(!isDone)}
                        className="w-20 bg-green-700 text-white px-2 py-1 rounded-lg cursor-pointer transition hover:bg-green-800">
                        {isDone ? "Undo" : "Done"}
                    </button>
                    {!isDone && (
                        <button onClick={() => handleDeleteTodo(id)} className="w-20 bg-red-700 text-white px-2 py-1 rounded-lg cursor-pointer transition hover:bg-red-800">Delete</button>
                    )} 
                </div>
                <div>
                    {!isDone && (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="flex items-center gap-2 bg-blue-700 text-white px-2 py-1 rounded-lg cursor-pointer transition hover:bg-blue-800">
                            <SquarePen /> Edit
                        </button>
                    )}
                </div>
            </div>
            {isEditing && (
                <EditModal
                    id={id}
                    currentTitle={title}
                    currentDescription={description}
                    onClose={() => setIsEditing(false)}
                    onEditTodo={handleEditTodo}
                />
            )}
        </div>
    );
}