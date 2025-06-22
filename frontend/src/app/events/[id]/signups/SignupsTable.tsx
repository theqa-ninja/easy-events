import { Fragment } from "react";
import { ISignup } from "@/app/events/[id]/signups.service";
import Link from "next/link";
import { Switch } from "@/app/components/Switch";
import { DropDown } from "@/app/components/Dropdown";
import { CheckedInAt } from "./CheckedInAt";

export const SignupsTable = ({ signupsData }: { signupsData: ISignup[] }) => {
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
                <CheckedInAt id={signup.event_id} signup={signup} />
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
                {/* TODO: Add volunteer roles here instead of hardcoding placeholders, and include ids */}
                <DropDown name="volunteer_role_id" choices={["Attendee", "Volunteer"]} helpText="Assign a role" />
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
