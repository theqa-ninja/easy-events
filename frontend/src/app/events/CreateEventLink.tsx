import Link from "next/link";
import { doesUserHavePermissions } from "../user/users.service";

export const CreateEventLink = async ({teamId} : {teamId?: number}) => {
  const userMayCreateEvents = await doesUserHavePermissions({
    actionAndPage: "CREATE_EVENT",
    teamId: teamId,
  });

  return (
    <>
      {userMayCreateEvents && (
        <Link className="border py-1 px-2 rounded-md" href={`/events/create`}>
          + Create an event
        </Link>
      )}
    </>
  );
}