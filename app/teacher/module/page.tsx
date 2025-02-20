"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import MDEditor from "@uiw/react-md-editor";
import { ArrowLeft } from "lucide-react";

export default function CreateModule() {
  const router = useRouter();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      setError("Token tidak ditemukan. Silakan login ulang.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/module", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description, content }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Gagal menambahkan module.");
      }

      alert("Module berhasil ditambahkan!");
      router.push("/pages/student/module/list-module");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 flex items-center">
          <button
            onClick={() => router.back()}
            className="text-[#75B7AA] hover:text-[#629b8f] mr-4"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-2xl font-semibold text-[#75B7AA]">
              Tambah Module
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Buat modul baru untuk siswa
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Judul Module
              </label>
              <input
                type="text"
                placeholder="Masukkan judul module"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#75B7AA] text-gray-600"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Deskripsi
              </label>
              <input
                type="text"
                placeholder="Masukkan deskripsi singkat"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#75B7AA] text-gray-600"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Konten Module
              </label>
              <MDEditor
                value={content}
                onChange={setContent}
                className="border border-gray-300 rounded-lg overflow-hidden"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#75B7AA] text-white py-3 rounded-lg hover:bg-[#629b8f] transition-colors font-medium disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Menyimpan..." : "Simpan Module"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
