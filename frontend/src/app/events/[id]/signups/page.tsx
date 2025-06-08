import React from "react";
import { getSignups, getEvent } from "@/app/events/events.service";
import { SignupsTable } from "./SignupsTable";
import Link from "next/link";
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
}

const SignupsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const signupsData = await getSignups(id);

  return (
    <main className="m-auto p-4">
      <Link href={`/events/${id}`}>&lsaquo;&nbsp;Back to event details</Link>
      <h1 className="text-center">Signups</h1>
      <h2>Adults</h2>
      <SignupsTable signupsData={signupsData.adults.signups} />
      <h2 className="mt-8">Under 18</h2>
      <SignupsTable signupsData={signupsData.under_18.signups} />
    </main>
  );
};

export default SignupsPage;
