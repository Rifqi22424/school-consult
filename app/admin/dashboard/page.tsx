"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateSchool() {
  const [form, setForm] = useState({ name: "", address: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/register/school", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Gagal menambahkan sekolah");
      }

      setSuccess("Sekolah berhasil ditambahkan!");
      setForm({ name: "", address: "" });

    } catch (err: any) {nv
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Tambah Sekolah</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-5 w-80">
        <input
          type="text"
          name="name"
          placeholder="Nama Sekolah"
          value={form.name}
          onChange={handleChange}
          className="border p-2"
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Alamat"
          value={form.address}
          onChange={handleChange}
          className="border p-2"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2"
          disabled={loading}
        >
          {loading ? "Menyimpan..." : "Simpan"}
        </button>
      </form>

      {error && <p className="text-red-500 mt-3">{error}</p>}
      {success && <p className="text-green-500 mt-3">{success}</p>}
    </div>
  );
}
