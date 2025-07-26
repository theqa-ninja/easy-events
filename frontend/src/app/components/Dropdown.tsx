import React from "react";
import { ErrorMessage } from "./ErrorMessage";

interface DropDownProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  choices: string[] | { value: string; label: string }[];
  helpText?: string;
  label?: string;
  defaultValue?: string;
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
  errorMessage?: string;
}
export const DropDown = ({
  choices,
  name,
  helpText = "Please select an option",
  label,
  defaultValue,
  onChange,
  errorMessage,
}: DropDownProps) => {
  return (
    <div className="flex flex-col mb-0">
      {label && <label htmlFor={name}>{label}</label>}
      <select
        name={name}
        id={name}
        className="rounded-md not-dark:bg-white dark:bg-slate-900 border-1 border-slate-300 p-2"
        defaultValue={defaultValue}
        onChange={onChange}
      >
        <option value="">{helpText}</option>
        {choices.map(
          (
            choice: string | { value: string; label: string },
            index: number
          ) => {
            if (choice instanceof Object) {
              return (
                <option key={index} value={choice.value}>
                  {choice.label}
                </option>
              );
            }
            return (
              <option key={index} value={choice} selected={defaultValue === choice}>
                {choice}
              </option>
            );
          }
        )}
      </select>
      <ErrorMessage message={errorMessage} />
    </div>
  );
};
