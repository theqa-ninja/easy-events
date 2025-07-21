"use client";
import { useState } from "react";
import { Input } from "@/app/components/Input";
import { IUser, editUser } from "@/app/user/users.service";
import { object, ref, string } from "yup";
import { Button } from "@/app/components/Button";
import { validateOnBlur } from "@/app/utilities";
import Link from "next/link";
import { IToast, Toast } from "@/app/components/Toast";

export const AccountForm = ({ user }: { user: IUser }) => {
  const [errors, setErrors] = useState<{ [name: string]: string }>({});
  const [toast, setToast] = useState<IToast>();

  const accountSchema = object({
    name: string().required("Name is required"),
    email: string().email("Invalid email").required("Email is required"),
    is_over_18: string().required("Age is required"),
  });

  const handleChangeMain = (event: React.ChangeEvent<HTMLInputElement>) => {
    validateOnBlur(event, accountSchema, setErrors);
  };

  const handleSubmitMainAccount = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formDataEntries = Object.fromEntries(formData);
    const body = JSON.stringify(formDataEntries);
    try {
      await accountSchema.validate(formDataEntries, {
        abortEarly: false,
      });
      await editUser(user.id, JSON.parse(body)).then(async (response) => {
        if (response) {
          setToast({
            message: "User updated successfully.",
            status: "success",
          });
        }
      })
      .catch((error) => {
        setToast({
          message: "User update failed.",
          status: "error",
        });
      })

    } catch (error: any) {
      const validationErrors: { [name: string]: string } = {};
      error.inner.forEach((err: any) => {
        validationErrors[err.path] = err.message;
      });
      setErrors(validationErrors);
    }
  };

  return (
    <div className="max-w-xl mb-5">
      {toast && (
        <Toast
          message={toast.message}
          status={toast.status}
          onClose={() => setToast(undefined)}
        />
      )}
      <h2>Main Info</h2>
      <form onSubmit={handleSubmitMainAccount} className="flex flex-col gap-4">
        <Input
          type="text"
          name="name"
          label="Name"
          placeholder="Name"
          defaultValue={user?.name}
          onBlur={handleChangeMain}
          errorMessage={errors.name}
        />
        <Input
          type="email"
          name="email"
          label="Email"
          placeholder="Email"
          defaultValue={user?.email}
          onBlur={handleChangeMain}
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
            onBlur={handleChangeMain}
            defaultChecked={user?.is_over_18 === true}
            errorMessage={errors.is_over_18}
          />
          <Input
            type="radio"
            name="is_over_18"
            value="false"
            label="No"
            onBlur={handleChangeMain}
            defaultChecked={user?.is_over_18 === false}
            errorMessage={errors.is_over_18}
          />
        </div>
        <div className="flex justify-end">
          <Button type="submit" label="Save" />
        </div>
      </form>
      <hr />
      <h2>Change password</h2>
      Follow this link to <Link href="/user/reset-password">reset your password</Link> in order to change it in the most secure way possible.
    </div>
  );
};
