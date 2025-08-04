import { doesUserHavePermissions } from "@/app/user/users.service";
import { CreateTeamForm } from "./CreateTeamForm";
import { getOrganization } from "@/app/organizations/organizations.service";
import Link from "next/link";

export const metadata = {
  title: "Create a team",
};

const CreateTeamPage = async ({
  params,
}: {
  params: Promise<{ id: number }>;
}) => {
  const { id } = await params;
  const userMayViewTeams = await doesUserHavePermissions({
    actionAndPage: "CREATE_TEAM",
    orgId: id,
  });
  const organizationData = await getOrganization(id);
  return (
    <>
      <nav className="flex gap-2">
        <span className="text-secondary">&lsaquo;</span>
        <Link href={`/organizations`}>Organizations</Link>
        <span className="text-secondary">&lsaquo;</span>
        <Link href={`/organizations/${id}`}>{organizationData.name}</Link>
        <span className="text-secondary">&lsaquo;</span>
        <Link href={`/organizations/${id}/teams`}>Teams</Link>
      </nav>
      {userMayViewTeams ? (
        <div>
          <h1>Create a team for {organizationData.name}</h1>
          <CreateTeamForm orgId={id} />
        </div>
      ) : (
        <p>You need to log in to create a team or you do not have permission.</p>
      )}
    </>
  );
};

export default CreateTeamPage;
