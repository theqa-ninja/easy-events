import { getEvent, getSignup } from "@/app/events/events.service";
import { Event } from "@/app/events/components/Event";
import { SignupForm } from "@/app/events/components/SignupForm";
import { validateToken } from "@/app/utilities";
import Link from "next/link";

const EditSignupPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const eventData = await getEvent(id);
  const signupData = await getSignup(id);
  const loggedIn = await validateToken();

  if (!loggedIn) {
    return (
      <main className="flex flex-col items-center justify-between p-4 max-w-4xl m-auto">
        <h1>Not logged in</h1>
        <p>Please <Link href="/user/login">log in</Link> to edit your signup.</p>
      </main>
    );
  }
  return (
    <main className="flex flex-col items-center justify-between p-4 max-w-4xl m-auto">
      {eventData && <Event eventData={eventData} />}
      <h1>Edit signup</h1>
      {signupData && <SignupForm signupData={signupData} eventId={Number(id)} />}
    </main>
  );
};

export default EditSignupPage;
