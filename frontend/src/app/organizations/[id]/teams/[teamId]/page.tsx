import { doesUserHavePermissions } from "@/app/user/users.service";
import { getTeam, IVolunteerRole } from "../teams.service";
import { Card } from "@/app/components/Card";
import Link from "next/link";

const TeamPage = async ({
  params,
}: {
  params: Promise<{ id: number; teamId: number }>;
}) => {
  // fetch the current user's team details
  const { id, teamId } = await params;
  const teamData = await getTeam(id, teamId);
  const userMayViewTeams = await doesUserHavePermissions({
    actionAndPage: "VIEW_TEAM",
    teamId: teamId,
    orgId: id,
  });

  // team data to display
  const teamName = teamData?.name;
  const teamRoles = teamData?.volunteer_roles;

  console.log("Team Data:", teamData);

  return userMayViewTeams && teamData ? (
    <Card>
      <h1>{teamName}</h1>
      <p>Here you can edit your team name and volunteer roles.</p>
      <h2>Volunteer roles</h2>
      <div className="flex flex-col gap-2">
        {teamRoles &&
          teamRoles.map((role: IVolunteerRole) => (
            <span key={role.id}>{role.role}</span>
          ))}
      </div>
      <Link href={`/organizations/${id}/teams/${teamId}/edit`}>Edit team</Link>
    </Card>
  ) : (
    <>
      <h1>Access Denied</h1>
      <p>You do not have permission to view this team.</p>
    </>
  );
};

export default TeamPage;
