import React from "react";
import { CreateEventForm } from "./CreateEventForm";
import { doesUserHavePermissions } from "@/app/user/users.service";
import { getEventTeams } from "@/app/events/events.service";

export const metadata = {
  title: "Create an event",
};

const CreateEventPage = async () => {
  const userMayCreateEvents = await doesUserHavePermissions({
    actionAndPage: "CREATE_EVENT",
    teamId: 1,
  });

  const teams = await getEventTeams();

  return (
    <>
      <h1>Create an event</h1>
      {userMayCreateEvents ? (
        <CreateEventForm teams={teams} />
      ) : (
        <p>
          You need to log in to create an event, or you do not have permission
          to create an event.
        </p>
      )}
    </>
  );
};

export default CreateEventPage;
