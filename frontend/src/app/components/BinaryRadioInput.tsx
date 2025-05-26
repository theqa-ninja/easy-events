import { type FC, type InputHTMLAttributes } from "react";
import { ErrorMessage } from "./ErrorMessage";

interface BinaryRadioInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  idA?: string;
  idB?: string;
  labelA?: string;
  labelB?: string;
  valueA?: string;
  valueB?: string;
  labelSize?: string;
  question: string;
  type?: string;
  errorMessage?: string;
}

export const BinaryRadioInput: FC<BinaryRadioInputProps> = ({
  name,
  idA,
  idB,
  labelA,
  labelB,
  valueA,
  valueB,
  labelSize = "text-md",
  question,
  type = "radio",
  errorMessage,
  ...props
}) => {
  return (
    <div className="flex flex-col">
      {question && (
        <label className={labelSize} htmlFor={name}>
          {question}
        </label>
      )}
      <div className="flex flex-row-reverse gap-2 justify-end w-auto [&>input]:w-auto">
        {labelA && (
          <label className={labelSize} htmlFor={idA}>
            {labelA}
          </label>
        )}
        <input
          id={idA}
          data-testid={name}
          name={name}
          type={type}
          defaultValue={valueA}
          className="block w-full p-2 border border-neutral-300 rounded-md shadow-inner active:outline-none active:ring-2 active:ring-primary-600 active:ring-offset-2 bg-background"
          {...props}
        />
        {labelB && (
          <label className={labelSize} htmlFor={idB}>
            {labelB}
          </label>
        )}
        <input
          id={idB}
          data-testid={name}
          name={name}
          type={type}
          defaultValue={valueB}
          className="block w-full p-2 border border-neutral-300 rounded-md shadow-inner active:outline-none active:ring-2 active:ring-primary-600 active:ring-offset-2 bg-background"
          {...props}
        />
      </div>
      {errorMessage && <ErrorMessage message={errorMessage} />}
    </div>
  );
};
