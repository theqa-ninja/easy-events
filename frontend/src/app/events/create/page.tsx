import React from "react";
import { CreateEventForm } from "./CreateEventForm";
import { getUser } from "@/app/user/users.service";

const CreateEventPage = async () => {
  const user = await getUser();
  return (
    <main className="flex flex-col items-center justify-between p-4 max-w-4xl m-auto">
      <h1>Create an event</h1>
      <CreateEventForm />
    </main>
  );
};

export default CreateEventPage;
