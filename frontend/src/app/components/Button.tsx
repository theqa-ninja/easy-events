import React, {
  type ButtonHTMLAttributes,
  type CSSProperties,
  type FC,
} from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * How to self-align the button
   */
  alignSelf?: "start" | "end" | "center";
  /**
   * What background color to use
   */
  backgroundColor?: string;
  /**
   * Icon to display
   */
  icon?: React.ReactNode;
  /**
   * Where to put the icon in relation to the text
   * top, bottom, left, right
   */
  iconDirection?: "top" | "bottom" | "left" | "right";
  /**
   * Button text
   */
  label: string;
  /**
   * Optional click handler
   */
  onClick?: (event?: any) => void;
  /**
   * Is this the principal call to action on the page?
   */
  variant?: "primary" | "secondary";
  /**
   * How large should the button be?
   */
  size?: "small" | "medium" | "large";
  classNames?: string;
}

/**
 * Primary UI component for user interaction
 */
export const Button: FC<ButtonProps> = ({
  alignSelf = "center",
  backgroundColor,
  icon,
  iconDirection = "left",
  label,
  variant = "secondary",
  size = "medium",
  classNames,
  ...props
}) => {
  const main =
    "flex m-2 items-center gap-2 justify-center leading-none shadow-sm shadow-primary active:outline-none active:ring-2 active:ring-primary-600 active:ring-offset-2 cursor-pointer";
  const mode =
    variant === "primary"
      ? "text-white bg-primary hover:bg-primary px-3 py-2 rounded-md"
      : "text-primary bg-background hover:bg-secondary hover:text-black px-3 py-2 rounded-md border border-1 border-primary";
  const buttonSize =
    size === "small"
      ? "text-sm px-2 py-1"
      : size === "medium"
      ? "text-md px-3 py-2"
      : "text-lg px-5 py-3";
  const direction =
    iconDirection === "left"
      ? "flex-row"
      : iconDirection === "right"
      ? "flex-row-reverse"
      : iconDirection === "top"
      ? "flex-col"
      : "flex-col-reverse";
  const alignment =
    alignSelf === "center"
      ? "self-center"
      : alignSelf === "end"
      ? "self-end"
      : "self-start";
  const bgColor: CSSProperties = backgroundColor
    ? {
        backgroundColor: backgroundColor,
      }
    : {};
  const disabled =
    "disabled:bg-neutral-300 disabled:cursor-not-allowed disabled:text-neutral-800 disabled:active:ring-0 disabled:active:ring-offset-0";
  return (
    <button
      type="button"
      className={[
        main,
        mode,
        buttonSize,
        direction,
        alignment,
        disabled,
        classNames,
      ].join(" ")}
      style={bgColor}
      {...props}
    >
      {icon && icon}
      {label}
    </button>
  );
};
