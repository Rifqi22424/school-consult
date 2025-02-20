"use client";

import { useState } from "react";

export default function UpdateStudentPage() {
  const [form, setForm] = useState({
    email: "",
    fullname: "",
    password: "",
    studentId: "",
    grade: "",
    schoolId: "",
    phoneNumber: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;

    console.log(token);

    if (!token) return;

    const response = await fetch("/api/user/student", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });

    const data = await response.json();
    if (response.ok) {
      alert("Profile updated successfully");
    } else {
      console.log(data);

      alert(`Error: ${data.message}`);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-xl font-bold">Update Student Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-2 border"
        />
        <input
          type="text"
          name="fullname"
          placeholder="Full Name"
          value={form.fullname}
          onChange={handleChange}
          className="w-full p-2 border"
        />
        <input
          type="password"
          name="password"
          placeholder="New Password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-2 border"
        />
        <input
          type="text"
          name="studentId"
          placeholder="Student ID"
          value={form.studentId}
          onChange={handleChange}
          className="w-full p-2 border"
        />
        <input
          type="text"
          name="grade"
          placeholder="Grade"
          value={form.grade}
          onChange={handleChange}
          className="w-full p-2 border"
        />
        <input
          type="text"
          name="schoolId"
          placeholder="School ID"
          value={form.schoolId}
          onChange={handleChange}
          className="w-full p-2 border"
        />
        <input
          type="text"
          name="phoneNumber"
          placeholder="Phone Number"
          value={form.phoneNumber}
          onChange={handleChange}
          className="w-full p-2 border"
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2">
          Update Profile
        </button>
      </form>
    </div>
  );
}
