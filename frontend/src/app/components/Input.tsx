import { type FC, type InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  labelSize?: string;
  placeholder?: string;
  type?: string;
}

export const Input: FC<InputProps> = ({
  label,
  labelSize = "text-md",
  name,
  placeholder,
  type,
  ...props
}) => {
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
        className="rounded-md bg-slate-100 border-1 border-fuchsia-800 p-2"
        {...props}
      />
    </div>
  );
};
