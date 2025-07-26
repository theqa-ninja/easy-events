import { Fragment } from "react";
import { ISignup } from "@/app/events/[id]/signups.service";
import Link from "next/link";
import { formatDateTime } from "@/app/utilities";
import { getVolunteerRoles } from "@/app/organizations/[id]/teams/teams.service";
import { getEvent } from "@/app/events/events.service";
import { Card } from "@/app/components/Card";

export const CheckInsTable = async ({
  checkInsData,
}: {
  checkInsData: ISignup[];
}) => {
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
  };
  const event = await getEvent(Number(checkInsData[0].event_id));
  const teamId = event?.team_id;
  const volunteerRoles = await getVolunteerRoles(Number(teamId));
  const volunteerRole = (volunteerRoleId: number) => {
    const role = volunteerRoles.find((role) => role.id === volunteerRoleId);
    return role ? role.role : "";
  };
  return checkInsData && checkInsData.length > 0 ? (
    Object.values(checkInsData).map((signup) => (
      <Card key={signup.id} classNames="mb-4">
        <div className="flex justify-between">
          <div className="flex flex-col gap-2">
            <Link href={`/events/${signup.event_id}/signups/${signup.id}`} className="text-xl">
              {signup.name}
            </Link>
            {volunteerRoles && signup.volunteer_role_id && (
              <span className="block">
                {volunteerRole(signup.volunteer_role_id)}
              </span>
            )}
          </div>
          <div className="w-31">
            {signup.checked_in_at && (
              <>
                <b>Checked in at: </b>{" "}
                {formatDateTime(signup.checked_in_at, timeOptions)}
              </>
            )}
            {signup.cancelled_at && (
              <>
                <b>Cancelled at: </b>{" "}
                {formatDateTime(signup.cancelled_at, timeOptions)}
              </>
            )}
          </div>
        </div>
        <div>
          {signup.notes && <b>Notes from volunteer: </b>}
          {signup.notes}
        </div>
      </Card>
    ))
  ) : (
    <p className="mb-5">No check-ins yet.</p>
  );
};
