import Link from "next/link";
import { getUser } from "@/app/user/users.service";

export default async function Header() {
  const user = await getUser();

  return (
    <header style={{ padding: "1rem", backgroundColor: "#eee" }}>
      <nav className="flex justify-between">
        <div className="flex gap-4">
          <Link href="/">Home</Link>
          <Link href="/events">Events</Link>
          <Link href="/events/create">Create an event</Link>
        </div>
        { user && user.email ? (
          <div className="flex gap-4">
            <p>Logged in as {user.email}</p>
            <Link href="/user/logout">Logout</Link>
          </div>
        ) : (
          <div className="flex gap-4">
            <Link href="/user/login">Login</Link>
            <Link href="/user/create-account">Create an account</Link>
          </div>
        )}
      </nav>
    </header>
  );
}
