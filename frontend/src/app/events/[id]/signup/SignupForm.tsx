"use client";
import React, { JSX, useState } from "react";
import { object, string } from "yup";
import { validateOnBlur } from "@/app/utilities";
import { createSignup, ISignup } from "@/app/events/[id]/signups.service";
import { IUser } from "@/app/user/users.service";
import { Input } from "@/app/components/Input";
import { Textarea } from "@/app/components/Textarea";
import { Button } from "@/app/components/Button";
import { IToast, Toast } from "@/app/components/Toast";
import { SignupConfirmation } from "../signup-confirmation/SignupConfirmation";
import { Card } from "@/app/components/Card";

export const SignupForm = ({
  user,
  eventId,
  remainingAdults,
  remainingTeenagers,
}: {
  user?: IUser;
  signupData?: ISignup;
  eventId: number;
  remainingAdults: number;
  remainingTeenagers: number;
}) => {
  const [primarySignup, setPrimarySignup] = useState<ISignup>();
  const [additionalSignups, setAdditionalSignups] = useState<ISignup[]>();
  const [toast, setToast] = useState<IToast>();
  const [errors, setErrors] = useState<{ [name: string]: string }>({});
  const [numberOfRemainingAdults, setNumberOfRemainingAdults] =
    useState(remainingAdults);
  const [numberOfRemainingTeenagers, setNumberOfRemainingTeenagers] =
    useState(remainingTeenagers);
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

  const handleIsOver18Change = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === "true") {
      setNumberOfRemainingAdults(numberOfRemainingAdults - 1);
      if (numberOfRemainingAdults < 1) {
        setToast({
          status: "error",
          message: "Signups are full for adults.",
        });
      }
    } else if (event.target.value === "false") {
      setNumberOfRemainingTeenagers(numberOfRemainingTeenagers - 1);
      if (numberOfRemainingTeenagers < 1) {
        setToast({
          status: "error",
          message: "Signups are full for teenagers.",
        });
      }
    }
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
    if (
      additionalVolunteers &&
      (numberOfRemainingAdults > 0 || numberOfRemainingTeenagers > 0)
    ) {
      setAdditionalVolunteers((previousVolunteer) => [
        ...previousVolunteer,
        <div
          className="flex flex-col gap-4 w-auto relative"
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
              onClick={handleIsOver18Change}
              errorMessage={errors.is_over_18}
              disabled={numberOfRemainingAdults < 1}
            />
            <Input
              type="radio"
              name={`is_over_18_${additionalVolunteers.length}`}
              value="false"
              label="No"
              onBlur={handleChange}
              onClick={handleIsOver18Change}
              errorMessage={errors.is_over_18}
              disabled={numberOfRemainingTeenagers < 1}
            />
          </div>
        </div>,
      ]);
    } else {
      setToast({
        message: "Signups are full for adults and teenagers.",
        status: "error",
      });
    }
  };

  const handleCreateSignup = (
    formEntries: any,
    body: string,
    additionalSignupEntries?: ISignup[]
  ) => {
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
          const bodyObject = JSON.parse(body);
          if (bodyObject.primary_contact) {
            setPrimarySignup(response);
          } else {
            additionalSignupEntries &&
              setAdditionalSignups(additionalSignupEntries);
          }
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
    let body: ISignup;
    const additionalSignupEntries: ISignup[] = [];
    if (hasAdditionalVolunteers) {
      additionalVolunteers.map((volunteer) => {
        body = {
          name: formEntries[
            `name_${volunteer.key && volunteer.key.split("-")[1]}`
          ] as string,
          email: formEntries["email"] as string,
          is_over_18:
            formEntries[
              `is_over_18_${volunteer.key && volunteer.key.split("-")[1]}`
            ] === "true",
        };
        additionalSignupEntries.push(body);
        handleCreateSignup(
          formEntries,
          JSON.stringify(body),
          additionalSignupEntries
        );
      });
      body = {
        name: formEntries["name"] as string,
        email: formEntries["email"] as string,
        phone_number: formEntries["phone_number"] as string,
        is_over_18: formEntries["is_over_18"] === "true",
        notes: formEntries["notes"] as string,
        primary_contact: true,
      };

      handleCreateSignup(formEntries, JSON.stringify(body));
    } else {
      body = {
        name: formEntries["name"] as string,
        email: formEntries["email"] as string,
        phone_number: formEntries["phone_number"] as string,
        is_over_18: formEntries["is_over_18"] === "true",
        notes: formEntries["notes"] as string,
        primary_contact: true,
      };
      handleCreateSignup(formEntries, JSON.stringify(body));
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
      {primarySignup ? (
        <SignupConfirmation
          primarySignup={primarySignup}
          additionalSignups={additionalSignups}
          eventId={eventId}
        />
      ) : (
        <Card classNames="max-w-100">
          <form onSubmit={submitSignup} className="flex flex-col gap-4">
            <h2>Signup</h2>
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
                onClick={handleIsOver18Change}
                defaultChecked={user?.is_over_18 === true}
                errorMessage={errors.is_over_18}
              />
              <Input
                type="radio"
                name="is_over_18"
                value="false"
                label="No"
                onBlur={handleChange}
                onClick={handleIsOver18Change}
                defaultChecked={user?.is_over_18 === false}
                errorMessage={errors.is_over_18}
              />
            </div>
            <Textarea name="notes" placeholder="notes..." />
            {additionalVolunteers.length > 0 && (
              <div id="additionalVolunteers">
                <h3>Additional Volunteers</h3>
                {additionalVolunteers.map((volunteer) => volunteer)}
                <p className="mt-4 mb-0">
                  <b>{numberOfRemainingAdults} adult slots remaining</b><br />
                  <b>{numberOfRemainingTeenagers} teenager slots remaining</b>
                </p>
              </div>
            )}
            {numberOfRemainingAdults > 0 || numberOfRemainingTeenagers > 0 ? (
              <Button
                id="add-volunteer"
                type="button"
                label="+ Add another volunteer to your group"
                onClick={() => addAnotherVolunteer(errors)}
              />
            ) : (
              "That's all the volunteers you can add for this event. Please contact us if you have a bigger group."
            )}
            <Button type="submit" label="Sign up" />
          </form>
        </Card>
      )}
    </>
  );
};
