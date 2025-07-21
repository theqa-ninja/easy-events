import { Fragment } from "react";
import { ISignup } from "@/app/events/[id]/signups.service";
import Link from "next/link";
import { CheckedInAt } from "./CheckedInAt";
import { IVolunteerRole } from "@/app/organizations/[id]/teams/teams.service";
import { VolunteerRoles } from "./VolunteerRoles";

export const SignupsTable = async ({
  signupsData,
  volunteerRoles,
}: {
  signupsData: ISignup[];
  volunteerRoles: IVolunteerRole[];
}) => {
  return signupsData && signupsData.length > 0 ? (
    <table className="w-full mb-5">
      <thead>
        <tr className="bg-foreground-100 border-b-1 border-primary-900 text-left *:py-2 *:text-nowrap">
          <th>Contact</th>
          <th className="w-25">Checked-in</th>
        </tr>
      </thead>
      <tbody>
        {Object.values(signupsData).map((signup) => (
          <Fragment key={signup.id}>
            <tr className="*:py-2 *:align-top">
              <td className="font-bold">
                <Link href={`/events/${signup.event_id}/signups/${signup.id}`}>
                  {signup.name}
                </Link>
              </td>
              <td>
                <CheckedInAt
                  id={Number(signup.event_id)}
                  signup={signup}
                  signupId={Number(signup.id)}
                />
              </td>
            </tr>
            <tr>
              <td colSpan={2} className={signup.notes && "py-2"}>
                {signup.notes && <b>Notes from volunteer: </b>}
                {signup.notes}
              </td>
            </tr>
            <tr className="border-b-1 border-primary-900">
              <td className="text-right py-2" colSpan={2}>
                <VolunteerRoles volunteerRoles={volunteerRoles} signup={signup} />
              </td>
            </tr>
          </Fragment>
        ))}
      </tbody>
    </table>
  ) : (
    <p>No signups yet</p>
  );
};
