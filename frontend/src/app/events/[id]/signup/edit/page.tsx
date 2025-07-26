import { getEvent } from "@/app/events/events.service";
import { getSignup } from "@/app/events/[id]/signups.service";
import { Event } from "@/app/events/Event";
import { EditSignupForm } from "./EditSignupForm";
export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ id: number }>;
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
  params: Promise<{ id: number }>;
}) => {
  const { id } = await params;
  const eventData = await getEvent(id);
  const signupData = await getSignup(id);
  return (
    <>
      {eventData && <h1>{eventData.title}</h1>}
      {eventData && <Event eventData={eventData} />}
      <h1>Edit signup</h1>
      <EditSignupForm signupData={signupData} eventId={Number(id)} eventCloseTime={eventData?.close_time} />
    </>
  );
};

export default EditSignupPage;
