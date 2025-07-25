"use client";
import { Switch } from "@/app/components/Switch";
import { editSignup, ISignup } from "@/app/events/[id]/signups.service";
import { formatDateTime } from "@/app/utilities";
import { useEffect, useState } from "react";

export const CanceledAt = ({
  id,
  signupId,
  signup,
  onDataChange,
}: {
  id: number;
  signupId: number;
  signup: ISignup;
  onDataChange?: any;
}) => {
  const [canceledAt, setCanceledAt] = useState<string>();
  const handleChangeCancelledAt = async (event: any) => {
    const checked = event.target.checked;
    const body = {
      ...signup,
      cancelled_at: checked ? new Date().toISOString() : null,
    }
    onDataChange(body);
    editSignup(id, signupId, body).then((response) => {
      body.cancelled_at ? setCanceledAt(formatDateTime(body.cancelled_at, options)) : setCanceledAt("");
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
    signup.cancelled_at ? setCanceledAt(formatDateTime(signup.cancelled_at, options)) : setCanceledAt("");
  }, [signup.cancelled_at]);

  return (
    <>
    {canceledAt}
    <Switch
      id={`${signup.id}-cancelled`}
      defaultChecked={signup.cancelled_at != null}
      defaultValue={signup.cancelled_at || new Date().toISOString()}
      onChange={handleChangeCancelledAt}
    />
    </>
  );
};
