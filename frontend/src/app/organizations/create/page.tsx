import React from "react";
import { CreateOrganizationForm } from "./CreateOrganizationForm";

export const metadata = {
  title: "Create an organization",
};

const CreateOrganizationPage = async () => {
  return (
    <main className="flex flex-col items-center justify-between p-4 max-w-4xl m-auto">
      <h1>Create an organization</h1>
      <CreateOrganizationForm />
    </main>
  );
};

export default CreateOrganizationPage;
