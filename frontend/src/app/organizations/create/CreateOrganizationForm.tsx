"use client";
import { Input } from "../../components/Input";
import { Button } from "@/app/components/Button";
import { IOrganization, createOrganization } from "../organizations.service";

export const CreateOrganizationForm = () => {
  const handleCreateOrganization = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formEntries = Object.fromEntries(formData);
    const organization: IOrganization = {
      name: formEntries.name as string,
      description: formEntries.description as string,
    };

    try {
      createOrganization(organization);
    } catch (error) {
      console.error("Error creating organization:", error);
    }
  };

  return (
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
  );
};
