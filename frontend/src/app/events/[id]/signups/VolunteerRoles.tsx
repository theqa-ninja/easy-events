"use client";
import { DropDown } from "@/app/components/Dropdown";
import { IVolunteerRole } from "@/app/organizations/[id]/teams/teams.service";
import { editSignup, ISignup } from "@/app/events/[id]/signups.service";
import { IToast, Toast } from "@/app/components/Toast";
import { useState } from "react";

export const VolunteerRoles = ({
  volunteerRoles,
  signup,
}: {
  volunteerRoles: IVolunteerRole[];
  signup: ISignup;
}) => {
  const [toast, setToast] = useState<IToast>();
  const volunteerRolesChoices: { value: string; label: string }[] =
    volunteerRoles.map((role) => {
      return {
        value: String(role.id),
        label: role.role,
      };
    });

  const handleOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (!event.target.value) {
      return;
    }
    editSignup(Number(signup.event_id), Number(signup.id), {
      ...signup,
      volunteer_role_id: Number(event.target.value),
    })
      .then((response) => {
        if (!response.id) {
          throw new Error("Failed to update volunteer role");
        }
        setToast({
          status: "success",
          message: "Volunteer role updated",
        });
      })
      .catch((error) => {
        setToast({ status: "error", message: error.message });
      });
  };

  return (
    <>
      {toast && (
        <Toast
          message={toast.message}
          status={toast.status}
          onClose={() => setToast(undefined)}
        />
      )}
      <form>
        <DropDown
          name="volunteer_role_id"
          choices={volunteerRolesChoices}
          helpText="Assign a role"
          defaultValue={String(signup.volunteer_role_id)}
          onChange={handleOnChange}
        />
      </form>
    </>
  );
};
