import { Fragment } from "react";
import { ISignup } from "@/app/events/events.service";
import Link from "next/link";

export const CheckInsTable = ({
  checkInsData,
}: {
  checkInsData: ISignup[];
}) => {
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
                  {signup.user_name}
                </Link>
                <span className="block break-all">{signup.user_email}</span>
                <span className="block">{signup.user_phone_number}</span>
              </td>
              <td>{signup.checked_in_at}</td>
              <td>{signup.cancelled_at}</td>
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
