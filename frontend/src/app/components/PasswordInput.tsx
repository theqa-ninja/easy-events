import { Visibility, VisibilityOff } from "@mui/icons-material";
// https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement
import { IconButton } from "@mui/material";
import { Field } from "formik";
import React, { FC, InputHTMLAttributes, useState } from "react";

interface PasswordInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  children?: React.ReactNode;
  placeholder?: string;
  type?: string;
}

export const PasswordInput: FC<PasswordInputProps> = ({
  name = "password",
  label = "Password",
  placeholder = "Password",
  type,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  return (
    <div className="flex flex-col mb-0 mt-4">
      {label && <label htmlFor={name}>{label}</label>}
      <div className="flex justify-between w-full p-2 border border-neutral-300 rounded-md shadow-inner active:outline-none active:ring-2 active:ring-primary-600 active:ring-offset-2 bg-background">
        <Field
          id={name}
          data-testid={name}
          name={name}
          placeholder={placeholder}
          type={showPassword ? "text" : "password"}
          className="w-full bg-transparent"
          {...props}
        />
        <IconButton
          className="text-foreground"
          aria-label="toggle password visibility"
          onClick={handleClickShowPassword}
          disableRipple
          sx={{ p: 0 }}
        >
          {showPassword ? <VisibilityOff /> : <Visibility />}
        </IconButton>
      </div>
    </div>
  );
};
