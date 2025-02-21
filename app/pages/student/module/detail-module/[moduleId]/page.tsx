"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { ArrowLeft } from "lucide-react";

export default function ModuleDetail() {
  const { moduleId } = useParams(); // Ambil moduleId dari URL

  const [module, setModule] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

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
    <div className="text-gray-600 p-8 flex items-start">
      <button
        onClick={() => router.back()}
        className="text-[#75B7AA] hover:text-[#629b8f] mr-4"
      >
        <ArrowLeft className="h-5 w-5" />
      </button>
      <div>
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
    </div>
  );
}
