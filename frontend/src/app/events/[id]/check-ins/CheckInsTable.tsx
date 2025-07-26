import { Fragment } from "react";
import { ISignup } from "@/app/events/[id]/signups.service";
import Link from "next/link";
import { formatDateTime } from "@/app/utilities";
import { getVolunteerRoles } from "@/app/organizations/[id]/teams/teams.service";
import { getEvent } from "@/app/events/events.service";

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
  }
  return checkInsData && checkInsData.length > 0 ? (
    <table className="w-full mb-5">
      <thead>
        <tr className="bg-foreground-100 border-b-1 border-primary-900 text-left *:py-2 *:text-nowrap">
          <th>Contact</th>
          <th className="w-25">Checked-in</th>
          <th className="w-20">Cancelled</th>
        </tr>
      </thead>
      <tbody>
        {Object.values(checkInsData).map((signup) => (
          <Fragment key={signup.id}>
            <tr className="*:py-2 *:align-top">
              <td className="font-bold">
                <Link href={`/events/${signup.event_id}/signups/${signup.id}`}>
                  {signup.name}
                </Link>
                {volunteerRoles && signup.volunteer_role_id && (
                  <span className="block">
                    {volunteerRole(signup.volunteer_role_id)}
                  </span>
                )}
              </td>
              <td>
                {signup.checked_in_at &&
                  formatDateTime(signup.checked_in_at, timeOptions)}
              </td>
              <td>
                {signup.cancelled_at &&
                  formatDateTime(signup.cancelled_at, timeOptions)}
              </td>
            </tr>
            <tr className="border-b-1 border-primary-900">
              <td colSpan={3} className={signup.notes && "py-2"}>
                {signup.notes && <b>Notes from volunteer: </b>}
                {signup.notes}
              </td>
            </tr>
          </Fragment>
        ))}
      </tbody>
    </table>
  ) : (
    <p className="mb-5">No check-ins yet.</p>
  );
};
