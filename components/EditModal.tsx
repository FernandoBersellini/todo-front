'use client'

import { useState } from "react";
import { X } from "lucide-react";

interface EditModalProps {
    id: number;
    currentTitle: string;
    currentDescription: string;
    onClose: () => void;
    onEditTodo: (id: number, title: string, description: string) => void;
}

export default function EditModal({ id, currentTitle, currentDescription, onClose, onEditTodo }: EditModalProps) {
    const [title, setTitle] = useState(currentTitle);
    const [description, setDescription] = useState(currentDescription);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await fetch(`http://localhost:8000/api/todos/${id}/`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, description }),
        });
        onEditTodo(id, title, description);
        onClose();
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={onClose}
        >
            <div
                className="bg-black border border-gray-200 rounded-lg p-6 w-full max-w-md shadow-lg"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-4">
                    <h2 className="font-bold text-xl">Edit Todo</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800 cursor-pointer">
                        <X size={20} />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="border border-gray-200 rounded-lg p-2"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="border border-gray-200 rounded-lg p-2"
                    />
                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-1 rounded-lg border border-gray-300 cursor-pointer hover:bg-gray-100 transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-1 bg-blue-700 text-white rounded-lg cursor-pointer hover:bg-blue-800 transition"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}