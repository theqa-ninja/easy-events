import React from "react";
import { ErrorMessage } from "./ErrorMessage";

interface DropDownProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  choices: string[] | { value: string; label: string }[];
  name: string;
  helpText?: string;
  label?: string;
  defaultValue?: string;
  errorMessage?: string;
};
export const DropDown = ({
  choices,
  name,
  helpText = "Please select an option",
  label,
  defaultValue,
  errorMessage
}: DropDownProps) => {
  return (
    <div className="flex flex-col mb-0 mt-4">
      {label && <label htmlFor={name}>{label}</label>}
      <select
        name={name}
        id={name}
        className="block w-full p-2 border border-neutral-300 rounded-md shadow-inner active:outline-none active:ring-2 active:ring-primary-600 active:ring-offset-2 bg-background"
        defaultValue={defaultValue}
      >
        <option value="">{helpText}</option>
        {choices.map((choice: string | { value: string; label: string }, index: number) => {
          if (choice instanceof Object) {
            return (
              <option key={index} value={choice.value}>
                {choice.label}
              </option>
            );
          }
          return (
            <option key={index} value={choice}>
              {choice}
            </option>
          );
        })}
      </select>
      <ErrorMessage message={errorMessage} />
    </div>
  );
};
