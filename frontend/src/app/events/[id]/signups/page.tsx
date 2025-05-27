import React from "react";
import { getSignups } from "@/app/events/events.service";
import { SignupsTable } from "@/app/events/components/SignupsTable";

const EventDetails = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const signupsData = await getSignups(id);

  return (
    <main className="flex flex-col items-center justify-between p-4">
      <h1>Signups</h1>
      <h2>Adults</h2>
      <SignupsTable signupsData={signupsData.adults.signups} />
      <h2 className="mt-8">Under 18</h2>
      <SignupsTable signupsData={signupsData.under_18.signups} />
    </main>
  );
};

export default EventDetails;
