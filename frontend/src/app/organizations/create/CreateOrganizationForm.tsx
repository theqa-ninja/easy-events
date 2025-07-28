"use client";
import { useState } from "react";
import { Input } from "../../components/Input";
import { Button } from "@/app/components/Button";
import { IOrganization, createOrganization } from "../organizations.service";
import { IToast, Toast } from "@/app/components/Toast";

export const CreateOrganizationForm = () => {
  const [toast, setToast] = useState<IToast>();
  const handleCreateOrganization = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formEntries = Object.fromEntries(formData);
    const organization: IOrganization = {
      name: formEntries.name as string,
      description: formEntries.description as string,
    };

    try {
      createOrganization(organization)
        .then((response) => {
          if (!response.id) {
            throw new Error("Organization creation failed");
          }
          setToast({
            message: "Organization created",
            status: "success",
          });
          setTimeout(() => {
            window.location.href = `/organizations/${response.id}`;
          }, 1000);
        })
        .catch((error) => {
          setToast({ message: "Error creating organization", status: "error" });
          console.error("Error creating organization:", error);
        });
    } catch (error) {
      setToast({ message: "Error creating organization", status: "error" });
      console.error("Error creating organization:", error);
    }
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
      <form
        onSubmit={handleCreateOrganization}
        className="flex flex-col gap-4 w-100"
      >
        <Input label="Organization name" type="text" name="name" />
        <Input
          label="Description (optional)"
          type="text"
          name="description"
          placeholder="Add a brief description of your organization here"
        />
        <Button type="submit" label="Create organization" />
      </form>
    </>
  );
};
