"use client";

import {HiOutlineTrash} from 'react-icons/hi';
import { useRouter } from "next/navigation";

export default function RemoveBtn({ topicId }) {
    const router = useRouter();

    const handleRemove = async () => {
        const confirmed = confirm("Are you sure you want to delete this topic?");
        if (!confirmed) {
            return;
        }
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/topics?id=${topicId}`, {
                method: "DELETE",
            });
            if (res.ok) {
                alert("Topic deleted successfully");
                router.refresh();
            } else {
                throw new Error("Failed to delete topic");
            }
        } catch (error) {
            console.error("Error deleting topic", error);
        }
    }

    return (
        <button onClick={handleRemove} className='text-red-500'>
            <HiOutlineTrash size={24} />
        </button>
    );
    }