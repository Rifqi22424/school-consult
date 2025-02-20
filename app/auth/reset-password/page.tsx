"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ArrowLeft } from "lucide-react"

export default function ResetPassword() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    const res = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, newPassword }),
    })

    const data = await res.json()

    if (res.ok) {
      setSuccess("Password has been reset successfully")
      setTimeout(() => router.push("/auth/login"), 2000)
    } else {
      setError(data.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-[#75B7AA] p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <div className="flex items-center mb-6">
          <button onClick={() => router.back()} className="text-[#75B7AA] hover:text-[#629b8f] mr-4">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Create a new password</h1>
            <p className="text-gray-500 text-sm mt-1">
              Create a password with at least 6 letters and numbers.
            </p>
          </div>
        </div>

        <form onSubmit={handleResetPassword} className="space-y-4 text-black">
          <input
            type="password"
            placeholder="New password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#75B7AA]"
            required
          />
          <input
            type="password"
            placeholder="Konfirmasi password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#75B7AA]"
            required
          />

          <button
            type="submit"
            className="w-full bg-[#75B7AA] text-white py-3 rounded-lg hover:bg-[#629b8f] transition-colors font-medium mt-6"
          >
            Continue
          </button>
        </form>

        {error && <p className="text-red-500 text-sm text-center mt-4">{error}</p>}
        {success && <p className="text-green-500 text-sm text-center mt-4">{success}</p>}
      </div>
    </div>
  )
}

