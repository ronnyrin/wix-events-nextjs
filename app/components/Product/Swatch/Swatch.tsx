import React from 'react';
import { Button, ButtonProps } from 'flowbite-react';
interface SwatchProps {
  active?: boolean;
  children?: any;
  variant?: 'size' | 'color' | string;
  color?: string;
  label?: string | null;
}

const Swatch: React.FC<Omit<ButtonProps, 'variant'> & SwatchProps> = ({
  active,
  color = '',
  label = null,
  variant = 'size',
  ...props
}) => {
  variant = variant?.toLowerCase();

  if (label) {
    label = label?.toLowerCase();
  }

  return (
    <Button
      role="option"
      size="sm"
      color="light"
      className={`${color ? 'w-[20px]' : ''} ${
        active && !color ? 'bg-gray-200' : ''
      }`}
      aria-selected={active}
      aria-label={variant && label ? `${variant} ${label}` : 'Variant Swatch'}
      pill={true}
      {...(label && color && { title: label })}
      style={color ? { backgroundColor: color } : {}}
      {...props}
    >
      {color && active && (
        <span>
          <svg
            className="w-3 h-3 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
        </span>
      )}
      {!color ? label : null}
    </Button>
  );
};

export default React.memo(Swatch);
