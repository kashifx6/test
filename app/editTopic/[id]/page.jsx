import EditTopicForm from "@/components/EditTopicForm";

const getTopicById = async (id) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/topics/${id}`, {
            cache: 'no-store',
        });
        if (res.ok) {
            const topic = await res.json();
            return topic;
        } else {
            throw new Error("Failed to fetch topic");
        }
        
    } catch (error) {
        console.error("Error loading topic", error);
        return {};
    }
};

export default async function EditTopic({params}) {
    const { id } = params;
    const topic = await getTopicById(id);
    const { title, description } = topic;

    console.log("id in edit topic", id);
    return (
        <EditTopicForm id={id} title={title} description={description} />
    );
}