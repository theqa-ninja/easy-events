import { doesUserHavePermissions } from "@/app/user/users.service";
import { getTeam, IVolunteerRole } from "../teams.service";
import { Card } from "@/app/components/Card";
import TeamName from "./TeamName";
import VolunteerRole from "./VolunteerRole";

const TeamPage = async ({
  params,
}: {
  params: Promise<{ id: number; teamId: number }>;
}) => {
  // fetch the current user's team details
  const { id, teamId } = await params;
  const teamData = await getTeam(id, teamId);
  const userMayEditTeams = await doesUserHavePermissions({
    actionAndPage: "EDIT_TEAM",
    teamId: teamId,
    orgId: id,
  });

  // team data to display
  const teamRoles = teamData?.volunteer_roles;

  console.log("Team Data:", teamData);

  return userMayEditTeams && teamData ? (
    <Card>
      <div className="flex pb-6">
        <TeamName
          originalTeamName={teamData?.name}
          organizationId={Number(teamData?.organization_id)}
          teamId={Number(teamData?.id)}
        />
      </div>
      <h2>Volunteer roles</h2>
      {teamRoles
        ?.sort((a, b) => a.id - b.id)
        .map((role: IVolunteerRole) => (
          <VolunteerRole
            key={role.id}
            roleId={role.id}
            roleName={role.role}
            teamId={Number(teamData?.id)}
          />
        ))}
    </Card>
  ) : (
    <>
      <h1>Access Denied</h1>
      <p>You do not have permission to view this team.</p>
    </>
  );
};

export default TeamPage;
