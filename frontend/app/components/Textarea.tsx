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
    <>
      {label && (
        <label htmlFor={name} className="mb-3 block">
          {label}
        </label>
      )}
      <textarea
        id={name}
        name={name}
        className="block w-full h-32 p-2 border border-neutral-300 rounded-md shadow-inner active:outline-none active:ring-2 active:ring-primary-600 active:ring-offset-2 dark:bg-neutral-800"
        placeholder={placeholder}
      >
        {value}
      </textarea>
    </>
  );
};
