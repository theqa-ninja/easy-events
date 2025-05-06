import { type FC, type InputHTMLAttributes } from "react";

interface BinaryRadioInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  idA?: string;
  idB?: string;
  labelA?: string;
  labelB?: string;
  labelSize?: string;
  question: string;
  type?: string;
}

export const BinaryRadioInput: FC<BinaryRadioInputProps> = ({
  name,
  idA,
  idB,
  labelA,
  labelB,
  labelSize = "text-md",
  question,
  type = "radio",
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
          className="block w-full p-2 border border-neutral-300 rounded-md shadow-inner active:outline-none active:ring-2 active:ring-primary-600 active:ring-offset-2 bg-background"
          {...props}
        />
      </div>
    </div>
  );
};
