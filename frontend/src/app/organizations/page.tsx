import Link from "next/link";
import { doesUserHavePermissions } from "../user/users.service";
import { getOrganizations } from "./organizations.service";

export const metadata = {
  title: "Organizations",
};

const OrganizationsPage = async () => {
  const organizationsData = await getOrganizations();
  const userMayViewOrganizations = await doesUserHavePermissions(["Superadmin"]);

  return userMayViewOrganizations && organizationsData && organizationsData.length > 0 ? (
    <main className="max-w-3xl m-auto p-4">
      <h1>Organizations</h1>
      <ul>
        {organizationsData.map((organization) => (
          <li className="text-xl font-bold" key={organization.id}><Link href={`organizations/${organization.id}`}>{organization.name}</Link></li>
        ))}
      </ul>
      <nav className="flex gap-4">
        <Link href="/organizations/create">Create an organization</Link>
      </nav>
    </main>
  ) : (
    <main className="max-w-3xl m-auto p-4">
      <h1>Organizations</h1>
      <p>You need to log in to see your organizations or you do not have permission to view them.</p>
    </main>
  );
};

export default OrganizationsPage;
