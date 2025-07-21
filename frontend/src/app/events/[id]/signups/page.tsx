import React from "react";
import { getEvent } from "@/app/events/events.service";
import { getSignups } from "@/app/events/[id]/signups.service";
import { SignupsTable } from "./SignupsTable";
import Link from "next/link";
import { doesUserHavePermissions, getUser } from "@/app/user/users.service";
import { getVolunteerRoles, IVolunteerRole } from "@/app/organizations/[id]/teams/teams.service";
export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ id: number }>;
}) => {
  const { id } = await params;
  const eventData = await getEvent(id);

  return {
    title: `Signups for ${eventData?.title}`,
  };
};

const SignupsPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const signupsData = await getSignups(id);
  const user = await getUser();
  const userMayViewSignups = await doesUserHavePermissions({
    actionAndPage: "EDIT_EVENT",
    teamId: 1
  });
  let volunteerRoles:IVolunteerRole[] = [];
  
  if (user && userMayViewSignups && user.team_permissions && user.team_permissions.length > 0) {
    volunteerRoles = await getVolunteerRoles(user.team_permissions[0].team_id);
  }

  return (
    <main className="m-auto p-4 max-w-4xl">
      {userMayViewSignups ? (
      <>
        <menu className="flex gap-4">
          <Link href={`/events/${id}`}>
            &lsaquo;&nbsp;Back to event details
          </Link>
          <Link href={`/events/${id}/check-ins`}>View check-ins</Link>
        </menu>
        <h1 className="text-center">Signups</h1>
        <h2>Adults</h2>
        <SignupsTable signupsData={signupsData.adults.signups} volunteerRoles={volunteerRoles} />
        <h2 className="mt-8">Under 18</h2>
        <SignupsTable signupsData={signupsData.teenagers.signups} volunteerRoles={volunteerRoles} />
      </>
      ) : (
      <>
        <h1 className="text-center">Signups</h1>
        <p>
          You need to log in to see signups for this event or you do not have
          permission to view this page.
        </p>
      </>
      )}
    </main>
  );
};

export default SignupsPage;
