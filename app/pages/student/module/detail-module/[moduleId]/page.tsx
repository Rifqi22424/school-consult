"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ReactMarkdown from "react-markdown";

export default function ModuleDetail() {
  const { moduleId } = useParams(); // Ambil moduleId dari URL

  const [module, setModule] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!moduleId) return;

    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    fetch(`/api/module/${moduleId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setModule(data);
        }
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setError("Failed to load module details");
      })
      .finally(() => setLoading(false));
  }, [moduleId]);

  if (loading) return <p className="text-gray-600 p-8">Loading...</p>;
  if (error) return <p className="text-red-500 p-8">{error}</p>;

  return (
    <div className="text-gray-600 p-8">
      <h1 className="text-2xl font-bold max-w-lg break-words">
        {module.title}
      </h1>
      <h2 className="text-xl font-semibold max-w-lg break-words">
        {module.description || "No description"}
      </h2>
      <p className="text-gray-500">
        By: {module.teacher?.user?.fullname || "Unknown"}
      </p>
      <ReactMarkdown className="prose break-words max-w-5xl">
        {module.content}
      </ReactMarkdown>
    </div>
  );
}
