"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function RegisterTeacher() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    fullname: "",
    password: "",
    employeeId: "",
    phoneNumber: "",
    schoolId: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [schools, setSchools] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const res = await fetch("/api/auth/register/school");
        if (!res.ok) throw new Error("Failed to fetch schools");
        const data = await res.json();
        setSchools(data.schools);
      } catch (err: any) {
        console.error(err);
        setError(err.message);
      }
    };

    fetchSchools();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/register/teacher", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Pendaftaran gagal");
      }

      setSuccess("Pendaftaran berhasil! Silakan cek email untuk verifikasi.");
      setForm({
        email: "",
        fullname: "",
        password: "",
        employeeId: "",
        phoneNumber: "",
        schoolId: "",
      });

      setTimeout(() => router.push("/auth/login"), 3000);
    } catch (err: any) {
      console.log(err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-[#75B7AA] p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <div className="flex items-center mb-6">
          <button
            onClick={() => router.back()}
            className="text-[#75B7AA] hover:text-[#629b8f] mr-4"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-2xl font-semibold text-[#75B7AA]">
              Create Your Account
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Choose your role to get started
            </p>
          </div>
        </div>

        <div className="flex gap-4 mb-8">
          <Link
            href="/auth/register/student"
            className="flex-1 border border-[#75B7AA] text-[#75B7AA] py-3 rounded-lg text-center font-medium hover:bg-[#75B7AA]/5 transition-colors"
          >
            Register as Student
          </Link>
          <button className="flex-1 bg-[#75B7AA] text-white py-3 rounded-lg font-medium">
            Register as Teacher
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-black">
          <input
            type="text"
            name="fullname"
            placeholder="Full name"
            value={form.fullname}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#75B7AA]"
            required
          />
          <input
            type="text"
            name="employeeId"
            placeholder="NIP"
            value={form.employeeId}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#75B7AA]"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#75B7AA]"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#75B7AA]"
            required
          />
          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            value={form.phoneNumber}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#75B7AA]"
            required
          />
          <select
            name="schoolId"
            value={form.schoolId}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#75B7AA]"
            required
          >
            <option value="">Select your school</option>
            {schools.map((school) => (
              <option key={school.id} value={school.id}>
                {school.name}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="w-full bg-[#75B7AA] text-white py-3 rounded-lg hover:bg-[#629b8f] transition-colors font-medium disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        {error && (
          <p className="text-red-500 text-sm text-center mt-4">{error}</p>
        )}
        {success && (
          <p className="text-green-500 text-sm text-center mt-4">{success}</p>
        )}

        <div className="text-center mt-6 text-gray-600">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-[#75B7AA] hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
