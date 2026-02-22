"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import API from "@/src/services/api";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await API.post("/auth/register", {
        name,
        email,
        password,
      });

      setSuccess("Registration successful! Redirecting...");

      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch (err: any) {
      setError(
        err.response?.data?.error || "Registration failed"
      );
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleRegister}
        className="bg-white p-6 rounded-xl shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">
          Create Account
        </h2>

        {error && (
          <p className="text-red-500 mb-2">{error}</p>
        )}

        {success && (
          <p className="text-green-600 mb-2">{success}</p>
        )}

        <input
          type="text"
          placeholder="Full Name"
          className="w-full border p-2 mb-3 rounded"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          required
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 mb-3 rounded"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 mb-3 rounded"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-500 text-white p-2 rounded"
        >
          {loading ? "Creating..." : "Register"}
        </button>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-blue-500 underline"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}