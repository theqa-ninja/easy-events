import { getEvent, getSignup } from "@/app/events/events.service";
import { Event } from "@/app/events/components/Event";
import { SignupForm } from "@/app/events/components/SignupForm";
export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const eventData = await getEvent(id);

  return {
    title: `Edit your signup for ${eventData?.title}`,
  };
}

const EditSignupPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const eventData = await getEvent(id);
  const signupData = await getSignup(id);
  return (
    <main className="flex flex-col items-center justify-between p-4 max-w-4xl m-auto">
      {eventData && <Event eventData={eventData} />}
      <h1>Edit signup</h1>
      {signupData && <SignupForm signupData={signupData} eventId={Number(id)} />}
    </main>
  );
};

export default EditSignupPage;
