import { doesUserHavePermissions } from "@/app/user/users.service";
import { getTeams } from "./teams.service";

export const metadata = {
  title: "Teams",
};

const TeamsPage = async ({
  params,
}: {
  params: Promise<{ id: number }>;
}) => {
  const { id } = await params;
  const teamsData = await getTeams(id);
  const userMayViewTeams = await doesUserHavePermissions({
    actionAndPage: "VIEW_TEAM",
    orgId: id,
  });

  return userMayViewTeams && teamsData && teamsData.length > 0 ? (
    <main className="flex flex-col items-center justify-between p-4">
      <h1>Teams</h1>
      <ul>
        {teamsData.map((team) => (
          <li className="text-xl font-bold" key={team.id}>
            {team.name}
          </li>
        ))}
      </ul>
    </main>
  ) : (
    <main className="flex flex-col items-center justify-between p-4">
      <h1>Teams</h1>
      <p>
        You need to log in to see your teams or you do not have permission to
        view them.
      </p>
    </main>
  );
};

export default TeamsPage;
