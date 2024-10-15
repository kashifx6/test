'use client';


import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddTopic() {
    const [Title, setTitle] = useState("");
    const [Description, setDescription] = useState("");

    const router = useRouter();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!Title || !Description) {
            alert("Please enter a title and description");
            return;
        }
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/topics`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title: Title, description: Description }),
            });
            if (res.ok) {
                router.push("/");
            } else {
                throw new Error("Failed to add topic");
            }
        } catch (error) {
            console.error("Error adding topic", error);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input 
            onChange={(e) => setTitle(e.target.value)} 
            value={Title}
            className="border border-slate-500 px-8 py-2" 
            type="text" 
            placeholder="Topic Title" />
            
            <input 
            onChange={(e) => setDescription(e.target.value)} 
            value={Description}
            className="border border-slate-500 px-8 py-2" 
            type="text" 
            placeholder="Topic Description" />
            
            <button 
            className="bg-green-500 text-white px-8 py-2 w-fit" 
            type="submit">
                Add Topic
            </button>
        </form>
    );
}