import { ISignup } from "../events.service";
import { Fragment } from "react";

export const CheckInsTable = ({ checkInsData }: { checkInsData: ISignup[] }) => {
  return (
    <table className="w-full table-fixed">
      <thead>
        <tr className="bg-foreground-100">
          <th>Name</th>
          <th>Email</th>
          <th>Phone number</th>
          <th>Checked in at</th>
          <th>Cancelled at</th>
        </tr>
      </thead>
      <tbody>
        {checkInsData &&
          Object.values(checkInsData).map((signup) => (
            <Fragment key={signup.id}>
              <tr>
                <td className="font-bold">{signup.user_name}</td>
                <td>{signup.user_email}</td>
                <td>{signup.user_phone_number}</td>
                <td>{signup.checked_in_at}</td>
                <td>{signup.cancelled_at}</td>
              </tr>
              <tr className="border-b-1 border-primary-900">
                <td colSpan={5}>{signup.notes && <b>Notes from volunteer: </b>}{signup.notes}</td>
              </tr>
            </Fragment>
          ))}
      </tbody>
    </table>
  );
};
