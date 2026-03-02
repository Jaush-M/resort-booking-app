import Link from "next/link";

export default function Home() {
  return (
    <div className="flex gap-4 items-center justify-center h-screen">
      <Link href="/login">Login</Link>
      <Link href="/register">Register</Link>
    </div>
  );
}
