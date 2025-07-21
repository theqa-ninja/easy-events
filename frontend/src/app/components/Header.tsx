import Link from "next/link";
import { doesUserHavePermissions, getUser } from "@/app/user/users.service";

export default async function Header() {
  const user = await getUser();
  const userMayCreateEvents = await doesUserHavePermissions({
    actionAndPage: "CREATE_EVENT",
    teamId: 1
  });

  return (
    <header className="p-4 not-dark:bg-slate-200 dark:bg-slate-700">
      <nav className="flex justify-between">
        <div className="flex gap-4">
          <Link href="/">Home</Link>
          <Link href="/events">Events</Link>
          {userMayCreateEvents && (
            <Link href="/events/create">Create an event</Link>
          )}
          <Link href="/organizations/create">Create an organization</Link>
        </div>
        {user && user.email ? (
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
