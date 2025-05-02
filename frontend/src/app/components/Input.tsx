import { type FC, type InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  placeholder?: string;
  type?: string;
}

export const Input: FC<InputProps> = ({
  label,
  name,
  placeholder,
  type,
  ...props
}) => {
  return (
    <div className={type === 'radio' || type === 'checkbox' ? "flex flex-row-reverse gap-2 justify-end w-auto [&>input]:w-auto" : "flex flex-col"}>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        id={name}
        data-testid={name}
        name={name}
        placeholder={placeholder}
        type={type}
        className="block w-full p-2 border border-neutral-300 rounded-md shadow-inner active:outline-none active:ring-2 active:ring-primary-600 active:ring-offset-2 bg-background"
        {...props}
      />
    </div>
  );
};
