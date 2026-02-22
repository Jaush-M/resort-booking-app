"use client";

import Image from "next/image";

export default function Home() {
  const registerHandler = async () => {
    fetch(`localhost:5084/api/register`, {
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({
        name: "Test User",
        email: "test@example.com",
        password: "password123",
      }),
    });
  };

  const loginHandler = async () => {
    fetch(`localhost:5084/api/login`, {
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({
        email: "test@example.com",
        password: "password123",
      }),
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between bg-white px-16 py-32 sm:items-start dark:bg-black">
        <div className="flex gap-4">
          <button onClick={loginHandler}>register</button>
          <button onClick={registerHandler}>login</button>
        </div>
      </main>
    </div>
  );
}
