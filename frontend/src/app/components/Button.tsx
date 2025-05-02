import React, { type ButtonHTMLAttributes, type CSSProperties, type FC } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * How to self-align the button
   */
  alignSelf?: 'start' | 'end' | 'center';
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
  iconDirection?: 'top' | 'bottom' | 'left' | 'right';
  /**
   * Button text
   */
  label: string;
  /**
   * Optional click handler
   */
  onClick?: () => void;
  /**
   * Is this the principal call to action on the page?
   */
  variant?: 'primary' | 'secondary';
  /**
   * How large should the button be?
   */
  size?: 'small' | 'medium' | 'large';
}

/**
 * Primary UI component for user interaction
 */
export const Button: FC<ButtonProps> = ({
  alignSelf = 'center',
  backgroundColor,
  icon,
  iconDirection = 'left',
  label,
  variant = 'secondary',
  size = 'medium',
  ...props
}) => {
  const main =
    'flex items-center gap-2 justify-center leading-none shadow-sm shadow-primary-700 active:outline-none active:ring-2 active:ring-primary-600 active:ring-offset-2 cursor-pointer';
  const mode =
    variant === 'primary'
      ? 'text-primary-100 bg-primary-700 hover:bg-primary-900 hover:dark:bg-primary-800 px-3 py-2 rounded-md'
      : 'text-primary-700 bg-primary-100 hover:bg-primary-200 px-3 py-2 rounded-md border border-1 border-primary-600';
  const buttonSize =
    size === 'small'
      ? 'text-sm px-2 py-1'
      : size === 'medium'
      ? 'text-md px-3 py-2'
      : 'text-lg px-5 py-3';
  const direction =
    iconDirection === 'left'
      ? 'flex-row'
      : iconDirection === 'right'
      ? 'flex-row-reverse'
      : iconDirection === 'top'
      ? 'flex-col'
      : 'flex-col-reverse';
  const alignment =
    alignSelf === 'center'
      ? 'self-center'
      : alignSelf === 'end'
      ? 'self-end'
      : 'self-start';
  const bgColor: CSSProperties = backgroundColor
    ? {
        backgroundColor: backgroundColor,
      }
    : {};
  const disabled =
    'disabled:bg-neutral-300 disabled:cursor-not-allowed disabled:text-neutral-800 disabled:active:ring-0 disabled:active:ring-offset-0';
  return (
    <button
      type="button"
      className={[main, mode, buttonSize, direction, alignment, disabled].join(
        ' ',
      )}
      style={bgColor}
      {...props}
    >
      {icon && icon}
      {label}
    </button>
  );
};
