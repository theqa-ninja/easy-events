import React from "react";
import { CreateOrganizationForm } from "./CreateOrganizationForm";

export const metadata = {
  title: "Create an organization",
};

const CreateOrganizationPage = async () => {
  return (
    <>
      <h1>Create an organization</h1>
      <CreateOrganizationForm />
    </>
  );
};

export default CreateOrganizationPage;
