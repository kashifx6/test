"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditTopicForm({ id, title, description }) {

    const router = useRouter();

    const [newTitle, setNewTitle] = useState(title);
    const [newDescription, setNewDescription] = useState(description);


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newTitle || !newDescription) {
            alert("Please enter a title and description");
            return;
        }
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/topics/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title: newTitle, description: newDescription }),
            });
            if (res.ok) {
                alert("Topic updated successfully");
                router.refresh();
                router.push("/");
            } else {
                throw new Error("Failed to update topic");
            }
        } catch (error) {
            console.error("Error updating topic", error);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input 
            onChange={(e) => setNewTitle(e.target.value)}
            value={newTitle}
            className="border border-slate-500 px-8 py-2" 
            type="text" 
            placeholder="Topic Title" />

            <input 
            onChange={(e) => setNewDescription(e.target.value)}
            value={newDescription}
            className="border border-slate-500 px-8 py-2" 
            type="text" 
            placeholder="Topic Description" />

            <button 
            className="bg-green-500 text-white px-8 py-2 w-fit" 
            type="submit">
                Edit Topic
            </button>
        </form>
    );
}