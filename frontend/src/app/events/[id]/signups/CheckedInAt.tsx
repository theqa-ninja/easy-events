"use client";
import { Switch } from "@/app/components/Switch";
import { editSignup, ISignup } from "@/app/events/[id]/signups.service";
import { formatDateTime } from "@/app/utilities";
import { useEffect, useState } from "react";

export const CheckedInAt = ({
  id,
  signup,
}: {
  id: number;
  signup: ISignup;
}) => {
  const [checkedInAt, setCheckedInAt] = useState<string>();
  const handleChangeCancelledAt = async (event: any) => {
    const checked = event.target.checked;
    const body = {
      ...signup,
      checked_in_at: checked ? new Date().toISOString() : null,
    }
    editSignup(id.toString(), body).then((response) => {
      body.checked_in_at ? setCheckedInAt(formatDateTime(body.checked_in_at, options)) : setCheckedInAt("");
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
    signup.checked_in_at && setCheckedInAt(formatDateTime(signup.checked_in_at, options));
  }, [checkedInAt]);

  return (
    <>
    {checkedInAt}
    <Switch
      id={`${signup.id}-cancelled`}
      defaultChecked={signup.checked_in_at != null}
      defaultValue={signup.checked_in_at || new Date().toISOString()}
      onChange={handleChangeCancelledAt}
    />
    </>
  );
};
