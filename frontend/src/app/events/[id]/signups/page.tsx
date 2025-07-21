import React from "react";
import { getEvent } from "@/app/events/events.service";
import { getSignups, ISignups } from "@/app/events/[id]/signups.service";
import { SignupsTable } from "./SignupsTable";
import Link from "next/link";
import { getVolunteerRoles } from "@/app/organizations/[id]/teams/teams.service";
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

const SignupsPage = async ({ params }: { params: Promise<{ id: number }> }) => {
  const { id } = await params;
  const signupsData = await getSignups(id);
  console.log(signupsData);
  if ('errors' in signupsData || 'message' in signupsData) {
    return (
      <main className="m-auto p-4 max-w-4xl">
        <menu className="flex gap-4">
          <Link href={`/events/${id}`}>
            &lsaquo;&nbsp;Back to event details
          </Link>
        </menu>
        <h1 className="text-center">Signups</h1>
        <p>
          You need to log in to see signups for this event or you do not have
          permission to view this page.
        </p>
      </main>
    );
  }
  const eventData = await getEvent(id);
  const volunteerRoles = await getVolunteerRoles(eventData.team_id);

  return (
    <main className="m-auto p-4 max-w-4xl">
      {signupsData ? (
      <>
        <menu className="flex gap-4">
          <Link href={`/events/${id}`}>
            &lsaquo;&nbsp;Back to event details
          </Link>
          <Link href={`/events/${id}/check-ins`}>View check-ins</Link>
        </menu>
        <h1 className="text-center">Signups</h1>
        <h2>Adults</h2>
        <SignupsTable signupsData={(signupsData as ISignups).adults.signups} volunteerRoles={volunteerRoles} />
        <h2 className="mt-8">Under 18</h2>
        <SignupsTable signupsData={(signupsData as ISignups).teenagers.signups} volunteerRoles={volunteerRoles} />
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
