import React from "react";
import { CreateEventForm } from "./CreateEventForm";
import { doesUserHavePermissions } from "@/app/user/users.service";
import { getEventTeams } from "@/app/events/events.service";

export const metadata = {
  title: "Create an event",
};

const CreateEventPage = async () => {
  const userMayCreateEvents = await doesUserHavePermissions([
    "Superadmin",
    "Admin",
    "Event Coordinator",
  ]);

  const teams = await getEventTeams();

  return (
    <main className="flex flex-col items-center justify-between p-4 max-w-4xl m-auto">
      <h1>Create an event</h1>
      {userMayCreateEvents ? (
        <CreateEventForm teams={teams} />
      ) : (
        <p>
          You need to log in to create an event, or you do not have permission
          to create an event.
        </p>
      )}
    </main>
  );
};

export default CreateEventPage;
