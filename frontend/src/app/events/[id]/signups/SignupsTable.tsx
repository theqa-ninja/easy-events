import { Fragment } from "react";
import { ISignup } from "@/app/events/events.service";
import Link from "next/link";
import { Switch } from "@/app/components/Switch";

export const SignupsTable = ({ signupsData }: { signupsData: ISignup[] }) => {
  return (
    <table className="w-full table-fixed">
      <thead>
        <tr className="bg-foreground-100 border-b-1 border-primary-900 text-left *:p-2">
          <th>Name</th>
          <th>Email</th>
          <th>Phone number</th>
          <th>Checked in</th>
          <th>Cancelled</th>
        </tr>
      </thead>
      <tbody>
        {signupsData &&
          Object.values(signupsData).map((signup) => (
            <Fragment key={signup.id}>
              <tr className="*:p-2">
                <td className="font-bold">
                  <Link
                    href={`/events/${signup.event_id}/signups/${signup.id}`}
                  >
                    {signup.user_name}
                  </Link>
                </td>
                <td>{signup.user_email}</td>
                <td>{signup.user_phone_number}</td>
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
                <td>
                  {signup.cancelled_at}
                  <Switch
                    id={`${signup.id}-cancelled`}
                    defaultChecked={signup.checked_in_at != null}
                    defaultValue={
                      signup.checked_in_at || new Date().toISOString()
                    }
                  />
                </td>
              </tr>
              <tr className="border-b-1 border-primary-900">
                <td colSpan={5}>
                  {signup.notes && <b>Notes from volunteer: </b>}
                  {signup.notes}
                </td>
              </tr>
            </Fragment>
          ))}
      </tbody>
    </table>
  );
};
