import { type FC, type TextareaHTMLAttributes } from "react";
import { ErrorMessage } from "./ErrorMessage";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  name: string;
  placeholder?: string;
  value?: string;
  errorMessage?: string;
  validationSchema?: any;
}

export const Textarea = ({
  label,
  name,
  placeholder,
  value,
  errorMessage,
  validationSchema,
  ...props
}: TextareaProps) => {
  return (
    <div>
      {label && <label htmlFor={name}>{label}</label>}
      <textarea
        id={name}
        name={name}
        className="w-full rounded-md bg-background-100 border-1 border-fuchsia-800 p-2"
        placeholder={placeholder}
        {...props}
      >
        {value}
      </textarea>
      {errorMessage && <ErrorMessage message={errorMessage} />}
    </div>
  );
};
