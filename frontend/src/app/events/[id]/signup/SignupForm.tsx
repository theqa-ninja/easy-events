"use client";
import React, { JSX, useState } from "react";
import { object, string } from "yup";
import { validateOnBlur } from "@/app/utilities";
import { createSignup, ISignup } from "@/app/events/[id]/signups.service";
import { IUser } from "@/app/user/users.service";
import { Input } from "@/app/components/Input";
import { Textarea } from "@/app/components/Textarea";
import { Button } from "@/app/components/Button";
import { Toast } from "@/app/components/Toast";
import { SignupConfirmation } from "../signup-confirmation/SignupConfirmation";

export const SignupForm = ({
  user,
  eventId,
}: {
  user?: IUser;
  signupData?: ISignup;
  eventId: number;
}) => {
  const [signup, setSignup] = useState<ISignup[]>();
  const [toast, setToast] = useState<{
    message: string;
    status: "success" | "error";
  }>();
  const [errors, setErrors] = useState<{ [name: string]: string }>({});
  const signupSchema = object({
    name: string().required("Name is required"),
    email: string().email("Invalid email").required("Email is required"),
    is_over_18: string().required("Age is required"),
  });

  const errorKeyValuePairs = [
    { name: "user_name", value: "User's name" },
    { name: "user_email", value: "User's email" },
  ];

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    validateOnBlur(event, signupSchema, setErrors);
  };

  const [additionalVolunteers, setAdditionalVolunteers] = useState<
    JSX.Element[]
  >([]);
  const removeVolunteer = (event: any) => {
    const volunteerToRemove = event.currentTarget.parentElement;
    if (additionalVolunteers && volunteerToRemove) {
      setAdditionalVolunteers(
        additionalVolunteers.filter(
          (volunteer) => volunteer !== volunteerToRemove
        )
      );
    }
  };

  const addAnotherVolunteer = (errors: { [name: string]: string }) => {
    if (additionalVolunteers) {
      setAdditionalVolunteers((previousVolunteer) => [
        ...previousVolunteer,
        <div
          className="flex flex-col gap-4 w-100 relative"
          key={`volunteer-${additionalVolunteers.length}`}
        >
          {additionalVolunteers.length > 0 && <hr className="!mb-2" />}
          <Button
            type="button"
            label="- Remove volunteer"
            onClick={(event: any) => removeVolunteer(event)}
            size="small"
            classNames="absolute bottom-0 right-0 mr-0 mb-0 ml-0"
          />
          <Input
            type="text"
            name={`name_${additionalVolunteers.length}`}
            label="Name"
            placeholder="Name"
            onBlur={handleChange}
            errorMessage={errors.name}
          />
          Are they over 18 years old?
          <div className="flex gap-4">
            <Input
              type="radio"
              name={`is_over_18_${additionalVolunteers.length}`}
              value="true"
              label="Yes"
              onBlur={handleChange}
              errorMessage={errors.is_over_18}
            />
            <Input
              type="radio"
              name={`is_over_18_${additionalVolunteers.length}`}
              value="false"
              label="No"
              onBlur={handleChange}
              errorMessage={errors.is_over_18}
            />
          </div>
        </div>,
      ]);
    }
  };

  const handleCreateSignup = (formEntries: any, body: string, signupEntries: ISignup[]) => {
    try {
      signupSchema.validateSync(formEntries, {
        abortEarly: false,
      });
      createSignup(eventId, JSON.parse(body))
        .then(async (response) => {
          if (!response.id) {
            const errorData: any = await response;
            const message = Object.keys(errorData).map(
              (key) =>
                (errorKeyValuePairs.find((pair) => pair.name === key)?.value ||
                  "") +
                " " +
                errorData[key]
            );
            throw new Error(message.join() || "Signup failed");
          }
          setSignup(signupEntries);
          setToast({
            message:
              "Signup successful, please check your email for confirmation.",
            status: "success",
          });
        })
        .catch((error) => {
          setToast({ message: error.message, status: "error" });
        });
    } catch (validationError: any) {
      const formattedError = validationError.inner.reduce(
        (acc: any, err: any) => {
          acc[err.path] = err.message;
          return acc;
        },
        {}
      );
      setErrors(formattedError);
    }
  };

  const submitSignup = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formEntries = Object.fromEntries(formData);
    const hasAdditionalVolunteers = additionalVolunteers.length > 0;
    let body:ISignup;
    const signupEntries: ISignup[] = [];
    if (hasAdditionalVolunteers) {
      body = {
        name: formEntries["name"] as string,
        email: formEntries["email"] as string,
        phone_number: formEntries["phone_number"] as string,
        is_over_18: formEntries["is_over_18"] === "true",
        notes: formEntries["notes"] as string,
      };

      signupEntries.push(body);
      handleCreateSignup(formEntries, JSON.stringify(body), signupEntries);

      additionalVolunteers.map((volunteer) => {
        body = {
          name: formEntries[
            `name_${volunteer.key && volunteer.key.split("-")[1]}`
          ] as string,
          email: formEntries["email"] as string,
          is_over_18: formEntries[
            `is_over_18_${volunteer.key && volunteer.key.split("-")[1]}`
          ] === "true",
        };
        signupEntries.push(body);
        handleCreateSignup(formEntries, JSON.stringify(body), signupEntries);
      });
    } else {
      body = {
        name: formEntries["name"] as string,
        email: formEntries["email"] as string,
        phone_number: formEntries["phone_number"] as string,
        is_over_18: formEntries["is_over_18"] === "true",
        notes: formEntries["notes"] as string,
      };
      signupEntries.push(body);
      handleCreateSignup(formEntries, JSON.stringify(body), signupEntries);
    }
  };
  return (
    <>
      {toast && (
        <Toast
          message={toast.message}
          status={toast.status}
          duration={10000}
          onClose={() => setToast(undefined)}
        />
      )}
      {signup ? (
        <SignupConfirmation signup={signup} eventId={eventId} />
      ) : (
        <form onSubmit={submitSignup} className="flex flex-col gap-4 w-100">
          <h2 className="mt-5">Signup</h2>
          <Input
            type="text"
            name="name"
            label="Name"
            placeholder="Name"
            defaultValue={user?.name}
            onBlur={handleChange}
            errorMessage={errors.name}
          />
          <Input
            type="email"
            name="email"
            label="Email"
            placeholder="Email"
            defaultValue={user?.email}
            onBlur={handleChange}
            errorMessage={errors.email}
          />
          <Input
            type="tel"
            name="phone_number"
            label="Phone number"
            placeholder="Phone number"
            defaultValue={user?.phone_number}
          />
          Are you over 18 years old?
          <div className="flex gap-4">
            <Input
              type="radio"
              name="is_over_18"
              value="true"
              label="Yes"
              onBlur={handleChange}
              defaultChecked={user?.is_over_18 === true}
              errorMessage={errors.is_over_18}
            />
            <Input
              type="radio"
              name="is_over_18"
              value="false"
              label="No"
              onBlur={handleChange}
              defaultChecked={user?.is_over_18 === false}
              errorMessage={errors.is_over_18}
            />
          </div>
          <Textarea name="notes" placeholder="notes..." />
          {additionalVolunteers.length > 0 && (
            <div id="additionalVolunteers">
              <h3>Additional Volunteers</h3>
              {additionalVolunteers.map((volunteer) => volunteer)}
            </div>
          )}
          <Button
            id="add-volunteer"
            type="button"
            label="+ Add another volunteer to your group"
            onClick={() => addAnotherVolunteer(errors)}
          />
          <Button type="submit" label="Sign up" />
        </form>
      )}
    </>
  );
};
