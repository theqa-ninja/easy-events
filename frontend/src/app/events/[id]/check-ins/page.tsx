import React from "react";
import { getCheckIns } from "../../events.service";
import { CheckInsTable } from "../../components/CheckInsTable";

const EventDetails = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const checkInsData = await getCheckIns(id);

  return (
    <main className="flex flex-col items-center justify-between p-4">
      <h1>Check-ins</h1>
      <h2>Adults</h2>
      <CheckInsTable checkInsData={checkInsData.adults} />
      <h2 className="mt-8">Under 18</h2>
      <CheckInsTable checkInsData={checkInsData.under_18} />
    </main>
  );
};

export default EventDetails;
