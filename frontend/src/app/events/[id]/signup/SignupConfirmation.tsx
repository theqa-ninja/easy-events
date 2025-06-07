import Link from "next/link";
import { ISignup } from "../../events.service";

export const SignupConfirmation = ({
  signup,
  eventId,
}: {
  signup: ISignup;
  eventId: number;
}) => {
  return (
    <div className="text-left w-full mt-5">
      <h2>Signup Confirmation</h2>
      <p>
        Hi <b>{signup?.user_name}</b>, thank you for signing up. Please check
        your email for confirmation as well as more info about the event.
      </p>
      <p>
        Here's your contact info on file:
        <br />
        {signup?.user_email} {signup?.user_phone_number}
        <br />
        You are {signup?.user_is_over_18 ? "over 18" : "under 18"}
      </p>
      <p>
        Your notes:
        <br />
        {signup?.notes}
      </p>
      <p>Thanks for volunteering!</p>
      <Link href="/events">Back to events</Link> |{" "}
      <Link href={`/events/${eventId}/signup/edit`}>Edit your signup</Link>
    </div>
  );
};
