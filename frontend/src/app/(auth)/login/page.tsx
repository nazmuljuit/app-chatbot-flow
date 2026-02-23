"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import API from "@/src/services/api";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // FIXED: Using axios correctly - POST request with data object
      const response = await API.post("/auth/login", {
        email: email,
        password: password
      });

      // Axios automatically parses JSON, response.data contains the parsed data
      const data = response.data;

      // Check if login was successful (axios throws on non-2xx status codes automatically)
      localStorage.setItem("token", data.token);

      // Use replace instead of push to prevent history stack issues
      router.replace("/dashboard/flows/1");
      
    } catch (err: any) {
      console.error("Login error:", err);
      
      // Handle axios error response
      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        setError(err.response.data.error || err.response.data.message || "Login failed");
      } else if (err.request) {
        // The request was made but no response was received
        setError("No response from server. Please check if backend is running.");
      } else {
        // Something happened in setting up the request that triggered an Error
        setError(err.message || "An unexpected error occurred");
      }
      
      setLoading(false); // Only set loading false on error
    }
    
    // Don't set loading false here if redirect is successful
    // The component will unmount anyway
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-xl shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">
          Login
        </h2>

        {error && (
          <p className="text-red-500 mb-2">{error}</p>
        )}

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 mb-3 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 mb-3 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={loading}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white p-2 rounded disabled:bg-blue-300"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}