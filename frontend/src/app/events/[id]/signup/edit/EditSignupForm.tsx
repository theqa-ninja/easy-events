"use client";
import { useState } from "react";
import { object, string } from "yup";
import { validateOnBlur } from "@/app/utilities";
import { editSignup, ISignup } from "@/app/events/[id]/signups.service";
import { IUser } from "@/app/user/users.service";
import { Input } from "@/app/components/Input";
import { Textarea } from "@/app/components/Textarea";
import { Button } from "@/app/components/Button";
import { IToast, Toast } from "@/app/components/Toast";

export const EditSignupForm = ({
  signupData,
  eventId,
}: {
  user?: IUser;
  signupData?: ISignup;
  eventId: number;
}) => {
  const [toast, setToast] = useState<IToast>();
  const [errors, setErrors] = useState<{ [name: string]: string }>({});
  const signupSchema = object({
    name: string().required("Name is required"),
    email: string().email("Invalid email").required("Email is required"),
    is_over_18: string().required("Age is required"),
  });

  const errorKeyValuePairs = [
    { name: "name", value: "User's name" },
    { name: "email", value: "User's email" },
  ];

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    validateOnBlur(event, signupSchema, setErrors);
  };

  const submitSignup = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formEntries = Object.fromEntries(formData);
    const body = JSON.stringify(formEntries);

    try {
      signupSchema.validateSync(formEntries, {
        abortEarly: false,
      });
      setErrors({});
      editSignup(eventId, Number(signupData?.id), JSON.parse(body))
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
            throw new Error(message.join() || "Edit signup failed");
          }
          setToast({
            message: "Your signup has been edited successfully!",
            status: "success",
          });
        })
        .catch((error) => {
          console.error(error);
          setToast({
            message: "Something went wrong, and failed to edit your signup.",
            status: "error",
          });
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
  return (
    <>
      {toast && (
        <Toast
          message={toast.message}
          status={toast.status}
          onClose={() => setToast(undefined)}
        />
      )}
      <form onSubmit={submitSignup} className="flex flex-col gap-4 w-100">
        <Input
          type="text"
          name="name"
          placeholder="Name"
          defaultValue={signupData?.name}
          onBlur={handleChange}
          errorMessage={errors.name}
        />
        <Input
          type="email"
          name="email"
          placeholder="Email"
          defaultValue={signupData?.email}
          onBlur={handleChange}
          errorMessage={errors.email}
        />
        <Input
          type="tel"
          name="phone_number"
          placeholder="Phone number"
          defaultValue={signupData?.phone_number}
        />
        Are you over 18 years old?
        <div className="flex gap-4">
          <Input
            type="radio"
            name="is_over_18"
            value="true"
            label="Yes"
            onBlur={handleChange}
            defaultChecked={signupData?.is_over_18 === true}
            errorMessage={errors.is_over_18}
          />
          <Input
            type="radio"
            name="is_over_18"
            value="false"
            label="No"
            onBlur={handleChange}
            defaultChecked={signupData?.is_over_18 === false}
            errorMessage={errors.is_over_18}
          />
        </div>
        <Textarea
          name="notes"
          placeholder="notes..."
          defaultValue={signupData?.notes}
        />
        <Button type="submit" label="Save changes" />
      </form>
    </>
  );
};
