import React from 'react';
import { clsx } from 'clsx';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  fullWidth?: boolean;
}

export function InputField({ fullWidth, className, ...props }: InputFieldProps) {
  return (
    <input
      {...props}
      className={clsx(
        'input-field',
        fullWidth && 'md:col-span-2',
        className
      )}
    />
  );
}