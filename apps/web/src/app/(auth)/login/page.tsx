"use client";

import { authClient } from "@/lib/auth";

export default function Login() {
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = form.get("email") as string;
    const password = form.get("password") as string;

    const { error } = await authClient.signIn.email({
      email,
      password,
      callbackURL: "/dashboard", // auto-redirect after success
    });

    if (error) {
      alert(error.message); // or use toast
      return;
    }

    // Cookie is set automatically by server → redirect
    // window.location.href = "/dashboard";
  };

  return (
    <form onSubmit={handleLogin}>
      <input name="email" type="email" required />
      <input name="password" type="password" required />
      <button type="submit">Login</button>
    </form>
  );
}
