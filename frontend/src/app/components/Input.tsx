import { type FC, type InputHTMLAttributes } from "react";
import { ErrorMessage } from "./ErrorMessage";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  labelSize?: string;
  errorMessage?: string;
  validationSchema?: any;
  onClick?: (event?: any) => void;
}

export const Input = ({
  label,
  labelSize = "text-md",
  name,
  placeholder,
  type,
  errorMessage,
  validationSchema,
  onClick,
  ...props
}: InputProps) => {
  return (
    <div
      className={
        type === "radio" || type === "checkbox"
          ? "flex flex-row-reverse gap-2 justify-end w-auto [&>input]:w-auto"
          : "flex flex-col"
      }
    >
      {label && (
        <label className={labelSize} htmlFor={name}>
          {label}
        </label>
      )}
      <input
        id={name}
        data-testid={name}
        name={name}
        placeholder={placeholder}
        type={type}
        className="rounded-md bg-background border-1 not-dark:border-slate-300 dark:border-slate-700 p-2"
        onClick={onClick}
        {...props}
      />
      <ErrorMessage message={errorMessage} />
    </div>
  );
};
