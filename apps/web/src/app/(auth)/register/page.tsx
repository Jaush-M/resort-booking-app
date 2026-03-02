"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth";
import Link from "next/link";

export default function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setMessage("");

    const form = new FormData(e.currentTarget);
    const name = form.get("name") as string;
    const email = form.get("email") as string;
    const password = form.get("password") as string;

    const { error: signUpError } = await authClient.signUp.email({
      email,
      password,
      name,
      callbackURL: "/login?verified=true", // optional: redirect after verification
    });

    setIsLoading(false);

    if (signUpError) {
      setError(signUpError.message || "Something went wrong");
      return;
    }

    // Success → show friendly message (email verification required)
    setMessage(
      "✅ Account created! Please check your email and click the verification link.",
    );
    // You can also auto-redirect after a delay if you want
    // setTimeout(() => router.push("/login"), 3000);
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-8 border rounded-xl">
      <h1 className="text-3xl font-bold mb-8 text-center">Create Account</h1>

      <form onSubmit={handleRegister} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-1">Full Name</label>
          <input
            name="name"
            type="text"
            required
            className="w-full px-4 py-3 border rounded-lg"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            name="email"
            type="email"
            required
            className="w-full px-4 py-3 border rounded-lg"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            name="password"
            type="password"
            required
            minLength={12}
            className="w-full px-4 py-3 border rounded-lg"
            placeholder="••••••••••••"
          />
          <p className="text-xs text-gray-500 mt-1">Minimum 12 characters</p>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 disabled:opacity-50"
        >
          {isLoading ? "Creating account..." : "Create Account"}
        </button>
      </form>

      {message && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg text-center">
          {message}
        </div>
      )}

      {error && (
        <div className="mt-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-center">
          {error}
        </div>
      )}

      <p className="text-center mt-8 text-sm text-gray-600">
        Already have an account?{" "}
        <Link href="/login" className="text-black underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
