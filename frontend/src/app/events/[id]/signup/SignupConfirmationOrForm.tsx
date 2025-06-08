"use client";
import { IUser } from "@/app/user/users.service";
import { IEvent, ISignup } from "@/app/events/events.service";
import { SignupConfirmation } from "./SignupConfirmation";
import { SignupForm } from "./SignupForm";
import { findLocalSignup } from "@/app/utilities";
import { useState, useEffect } from "react";

export const SignupConfirmationOrForm = ({
  signup,
  eventData,
  signupData,
  id,
}: {
  signup: ISignup;
  eventData: IEvent;
  signupData: IUser;
  id: number;
}) => {
  const [confirmationData, setConfirmationData] = useState(signup);
  const [isSignedUp, setIsSignedUp] = useState(false);
  const localSignup = findLocalSignup(id);
  const signedUp = (signup: ISignup) => {
    if (signup?.user_email) {
      setConfirmationData(signup);
      setIsSignedUp(true);
      return true;
    } else {
      if (localSignup) {
        setConfirmationData(localSignup);
        setIsSignedUp(true);
        return true;
      }
      setIsSignedUp(false);
      return false;
    }
  };

  useEffect(() => {
    signedUp(signup);
  }, [signup]);

  return isSignedUp ? (
    <SignupConfirmation signup={confirmationData} eventId={Number(id)} />
  ) : (
    eventData && <SignupForm user={signupData} eventId={Number(id)} />
  );
};
