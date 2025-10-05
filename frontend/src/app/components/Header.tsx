import Link from "next/link";
import { doesUserHavePermissions, getUser } from "@/app/user/users.service";

export default async function Header() {
  const user = await getUser();

  return (
    <header className="p-4 not-dark:bg-white dark:bg-slate-800 z-1 sticky top-0 shadow-md">
      <nav className="flex justify-between items-center">
        <div className="flex gap-4">
          <Link href="/">Home</Link>
          <Link href="/events">Events</Link>
          <Link href="/organizations">Organizations</Link>
        </div>
        {user && user["email"] ? (
          <div className="flex gap-4">
            Logged in as {user.email}
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
