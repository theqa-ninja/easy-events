import Link from "next/link";

export default function Header() {
  return (
    <header style={{ padding: "1rem", backgroundColor: "#eee" }}>
      <nav className="flex justify-between">
        <div className="flex gap-4">
          <Link href="/">Home</Link>
          <Link href="/events">Events</Link>
        </div>
        <div className="flex gap-4">
          <Link href="/user/login">Login</Link>
          <Link href="/user/register">Create an account</Link>
        </div>
      </nav>
    </header>
  );
}
