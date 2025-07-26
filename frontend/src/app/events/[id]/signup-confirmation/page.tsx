import React from "react";
import { getEvent } from "@/app/events/events.service";
import { getSignup, ISignup } from "@/app/events/[id]/signups.service";
import { Event } from "@/app/events/Event";
import { SignupConfirmation } from "./SignupConfirmation";
import { Card } from "@/app/components/Card";
export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ id: number }>;
}) => {
  const { id } = await params;
  const eventData = await getEvent(id);

  return {
    title: `Signup for ${eventData?.title}`,
  };
};

const SignupConfirmationPage = async ({
  params,
}: {
  params: Promise<{ id: number }>;
}) => {
  const { id } = await params;
  const eventData = await getEvent(id);
  const signupData = await getSignup(id);
  const signup: ISignup = {
    event_id: Number(id),
    user_id: Number(signupData && signupData?.user_id),
    name: signupData?.name || "",
    email: signupData?.email || "",
    phone_number: signupData?.phone_number || "",
    is_over_18: signupData?.is_over_18 || false,
    notes: signupData?.notes || "",
  };

  return (
    <>
      {eventData && (
        <Card>
          <h1>Signup confirmation for {eventData.title}</h1>
          <Event eventData={eventData} />
        </Card>
      )}
      <SignupConfirmation primarySignup={signup} eventId={Number(id)} />
    </>
  );
};

export default SignupConfirmationPage;
