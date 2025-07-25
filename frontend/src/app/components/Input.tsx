import { type FC, type InputHTMLAttributes } from "react";
import { ErrorMessage } from "./ErrorMessage";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  labelSize?: string;
  errorMessage?: string;
  validationSchema?: any;
}

export const Input = ({
  label,
  labelSize = "text-md",
  name,
  placeholder,
  type,
  errorMessage,
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
        className="rounded-md not-dark:bg-white dark:bg-slate-900 border-1 border-slate-300 p-2"
        {...props}
      />
      <ErrorMessage message={errorMessage} />
    </div>
  );
};
