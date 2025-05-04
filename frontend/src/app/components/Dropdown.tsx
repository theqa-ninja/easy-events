import React from "react";
import { Field } from "formik";

type DropDownProps = {
  choices: string[];
  name: string;
  helpText?: string;
  label?: string;
};

export const DropDown: React.FC<DropDownProps> = ({
  choices,
  name,
  helpText = "Please select an option",
  label,
}: DropDownProps): JSX.Element => {
  return (
    <div className="flex flex-col mb-0 mt-4">
      {label && <label htmlFor={name}>{label}</label>}
      <Field
        name={name}
        id={name}
        as="select"
        className="block w-full p-2 border border-neutral-300 rounded-md shadow-inner active:outline-none active:ring-2 active:ring-primary-600 active:ring-offset-2 bg-background"
      >
        <option value="">{helpText}</option>
        {choices.map((choice: string, index: number): JSX.Element => {
          return (
            <option key={index} value={choice}>
              {choice}
            </option>
          );
        })}
      </Field>
    </div>
  );
};
