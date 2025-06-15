import React from "react";
import { getCheckIns } from "@/app/events/events.service";
import { CheckInsTable } from "./CheckInsTable";
import Link from "next/link";
import { doesUserHavePermissions } from "@/app/user/users.service";

const EventDetails = async ({
  params,
}: {
  params: Promise<{ id: number }>;
}) => {
  const { id } = await params;
  const checkInsData = await getCheckIns(id);
  const userMayViewCheckIns = await doesUserHavePermissions([
    "Admin",
    "Event Coordinator",
  ]);

  return (
    <main className="m-auto p-4 max-w-4xl">
      {userMayViewCheckIns ? (
        <>
          <menu className="flex gap-4">
            <Link href={`/events/${id}`}>
              &lsaquo;&nbsp;Back to event details
            </Link>
            <Link href={`/events/${id}/signups`}>View signups</Link>
          </menu>
          <h1 className="text-center">Check-ins</h1>
          <h2>Adults</h2>
          <CheckInsTable checkInsData={checkInsData.adults} />
          <h2 className="mt-8">Under 18</h2>
          <CheckInsTable checkInsData={checkInsData.under_18} />
        </>
      ) : (
        <>
          <h1 className="text-center">Check-ins</h1>
          <p>
            You need to log in to see check-ins for this event or you do not
            have permission to view this page.
          </p>
        </>
      )}
    </main>
  );
};

export default EventDetails;
