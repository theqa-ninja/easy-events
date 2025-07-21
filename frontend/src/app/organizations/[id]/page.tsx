import { doesUserHavePermissions } from "@/app/user/users.service";
import { getTeams } from "./teams/teams.service";
import { getOrganization } from "../organizations.service";
import Link from "next/link";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ id: number }>;
}) => {
  const { id } = await params;
  return {
    title: `Organization ${id}`,
  };
};

const OrganizationPage = async ({
  params,
}: {
  params: Promise<{ id: number }>;
}) => {
  const { id } = await params;
  const organizationData = await getOrganization(id);
  const teamsData = await getTeams(id);
  const userMayViewTeams = await doesUserHavePermissions({
    actionAndPage: "VIEW_TEAM",
    teamId: 1,
  });

  return userMayViewTeams && teamsData && organizationData ? (
    <main className="max-w-3xl m-auto p-4">
      <Link href="/organizations">&lsaquo; Back to organizations</Link>
      <h1>{organizationData.name}</h1>
      <h2>Teams</h2>
      <ul>
        {teamsData.map((team) => (
          <li className="text-xl font-bold" key={team.id}>
            {team.name}
          </li>
        ))}
      </ul>
    </main>
  ) : (
    <main className="max-w-3xl m-auto p-4">
      <Link href="/organizations">&lsaquo; Back to organizations</Link>
      <h1>{organizationData.name}</h1>
      <p>
        You need to log in to see your teams or you do not have permission to
        view them.
      </p>
    </main>
  );
};

export default OrganizationPage;
