import Link from "next/link";
import RemoveBtn from "./RemoveBtn";
import { HiPencilAlt } from "react-icons/hi";

const getTopics = async () => {
  try {
    console.log("API URL", process.env.NEXT_PUBLIC_API_URL);
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/topics`, {
      cache: 'no-store',
    });
    if (!res.ok) {
      throw new Error("Failed to fetch topics");
    }
    const topics = await res.json();
    console.log("Topics", topics);
    return topics;
  } catch (error) {
    console.error("Error loading topics", error);
    return [];
  }
};

export default async function TopicsList() {
  const topics = await getTopics();

  if (!topics.length) {
    return <div>No topics available.</div>;
  }

  return (
    <>
      {topics.map((topic) => (
        <div key={topic._id} className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start">
          <div>
            <h2 className="font-bold text-2xl">{topic.title}</h2>
            <div>{topic.description}</div>
          </div>
          <div className="flex gap-2">
            <RemoveBtn topicId={topic._id} />
            <Link href={`/editTopic/${topic._id}`}>
              <HiPencilAlt size={24} />
            </Link>   
          </div>
        </div>
      ))}
    </>
  );
}
