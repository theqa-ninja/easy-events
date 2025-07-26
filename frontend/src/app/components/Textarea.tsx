import { type TextareaHTMLAttributes } from "react";
import { ErrorMessage } from "./ErrorMessage";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
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
        className="w-full rounded-md not-dark:bg-white dark:bg-black border-1 not-dark:border-slate-300 dark:border-slate-700 p-2"
        placeholder={placeholder}
        {...props}
      >
        {value}
      </textarea>
      {errorMessage && <ErrorMessage message={errorMessage} />}
    </div>
  );
};
