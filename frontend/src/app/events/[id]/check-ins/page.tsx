import React from "react";
import { getCheckIns } from "@/app/events/events.service";
import { CheckInsTable } from "./CheckInsTable";
import Link from "next/link";

const EventDetails = async ({
  params,
}: {
  params: Promise<{ id: number }>;
}) => {
  const { id } = await params;
  const checkInsData = await getCheckIns(id);
  if ('error' in checkInsData || 'message' in checkInsData) {
    return (
      <>
        <h1 className="text-center">Check-ins</h1>
        <p>
          You need to log in to see check-ins for this event or you do not
          have permission to view this page.
        </p>
      </>
    );
  }
  return (
    <>
      {checkInsData && (
        <>
          <nav className="flex gap-2">
            <span className="text-secondary">&lsaquo;</span>
            <Link href="/events">Events</Link>
            <span className="text-secondary">&lsaquo;</span>
            <Link href={`/events/${id}`}>
              Event details
            </Link>
            <span className="text-secondary">&lsaquo;</span>
            <Link href={`/events/${id}/signups`}>
              Signups
            </Link>
          </nav>
          <h1 className="text-center">Check-ins</h1>
          <h2>Adults</h2>
          <CheckInsTable checkInsData={checkInsData.adults} />
          <h2 className="mt-8">Under 18</h2>
          <CheckInsTable checkInsData={checkInsData.teenagers} />
          <nav className="flex gap-2">
            <span className="text-secondary">&lsaquo;</span>
            <Link href="/events">Events</Link>
            <span className="text-secondary">&lsaquo;</span>
            <Link href={`/events/${id}`}>
              Event details
            </Link>
            <span className="text-secondary">&lsaquo;</span>
            <Link href={`/events/${id}/signups`}>
              Signups
            </Link>
          </nav>
        </>
      )}
    </>
  );
};

export default EventDetails;
