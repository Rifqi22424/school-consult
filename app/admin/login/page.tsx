"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      if (data.user.role === "ADMIN") {
        localStorage.setItem("token", data.token);
        router.push("/admin/dashboard"); // Redirect ke dashboard admin
      } else {
        setError("Hanya admin yang bisa masuk.");
      }
    } else {
      setError(data.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Admin Login</h1>
      <form onSubmit={handleLogin} className="flex flex-col gap-3 mt-5">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2">
          Login
        </button>
      </form>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
