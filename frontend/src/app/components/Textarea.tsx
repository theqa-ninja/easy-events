import { type FC, type TextareaHTMLAttributes } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /**
   * Textarea label
   */
  label?: string;
  /**
   * Textarea name, also represents the id
   */
  name: string;
  /**
   * Textarea placeholder text
   */
  placeholder?: string;
  /**
   * Textarea value the user enters
   */
  value?: string;
}

export const Textarea: FC<TextareaProps> = ({
  label,
  name,
  placeholder,
  value,
}) => {
  return (
    <div>
      {label && (
        <label htmlFor={name}>
          {label}
        </label>
      )}
      <textarea
        id={name}
        name={name}
        className="w-full rounded-md bg-background-100 border-1 border-fuchsia-800 p-2"
        placeholder={placeholder}
      >
        {value}
      </textarea>
    </div>
  );
};
