import React from "react";
import { getEvent, getSignup, ISignup } from "../../events.service";
import { Event } from "../../components/Event";
import { SignupForm } from "../../components/SignupForm";
import { cookies } from "next/headers";

const EventDetails = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const eventData = await getEvent(id);
  const signupData = await getSignup(id);
  const userId = signupData && signupData?.user_id || 1;
  const signup: ISignup = {
      event_id: Number(id),
      user_id: Number(userId),
      user_name: signupData && signupData?.user_name || '',
      user_email: signupData && signupData?.user_email || '',
      user_phone_number: signupData && signupData?.user_phone_number || '',
      user_is_over_18: signupData && signupData?.user_is_over_18 || false,
      notes: signupData && signupData?.notes || '',
  };

  return (
    <main className="flex flex-col items-center justify-between p-4 max-w-4xl m-auto">
      {eventData && <Event eventData={eventData} />}
      {eventData && <SignupForm signup={signup} eventId={eventData.id} />}
    </main>
  );
};

export default EventDetails;
