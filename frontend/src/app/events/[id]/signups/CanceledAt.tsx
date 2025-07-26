"use client";
import { Switch } from "@/app/components/Switch";
import { editSignup, ISignup } from "@/app/events/[id]/signups.service";
import { formatDateTime } from "@/app/utilities";
import { useEffect, useState } from "react";

export const CancelledAt = ({
  id,
  signupId,
  signup,
}: {
  id: number;
  signupId: number;
  signup: ISignup;
}) => {
  const [cancelledAt, setCancelledAt] = useState<string>();
  const handleChangeCancelledAt = async (event: any) => {
    const checked = event.target.checked;
    const body = {
      ...signup,
      cancelled_at: checked ? new Date().toISOString() : null,
    }
    editSignup(id, signupId, body).then((response) => {
      body.cancelled_at ? setCancelledAt(formatDateTime(body.cancelled_at, options)) : setCancelledAt("");
    })
  }

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  useEffect(() => {
    signup.cancelled_at ? setCancelledAt(formatDateTime(signup.cancelled_at, options)) : setCancelledAt("");
  }, [signup.cancelled_at]);

  return (
    <>
    {cancelledAt ? <span><b>Cancelled at:</b> {cancelledAt}</span> : <b>Not cancelled</b>}
    <Switch
      id={`${signup.id}-cancelled`}
      defaultChecked={signup.cancelled_at != null}
      defaultValue={signup.cancelled_at || new Date().toISOString()}
      onChange={handleChangeCancelledAt}
    />
    </>
  );
};
