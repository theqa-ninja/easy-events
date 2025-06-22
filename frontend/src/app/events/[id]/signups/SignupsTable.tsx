import { Fragment } from "react";
import { ISignup } from "@/app/events/[id]/signups.service";
import Link from "next/link";
import { Switch } from "@/app/components/Switch";
import { DropDown } from "@/app/components/Dropdown";

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
                {signup.checked_in_at}
                <Switch
                  id={`${signup.id}-checkin`}
                  defaultChecked={signup.checked_in_at != null}
                  defaultValue={
                    signup.checked_in_at || new Date().toISOString()
                  }
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
              <th className="text-left py-2">
                Assign a role
              </th>
              <td className="text-left py-2">
                <DropDown name="volunteer_role_id" choices={["Attendee", "Volunteer"]} />
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
