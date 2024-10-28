'use client';

import React, { forwardRef } from 'react';
import GlobalIcon from './GlobalIcon';

interface IGlobalInputField
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  type?: string;
  label?: string;
  placeholder?: string;
  error?: string;
}

const GlobalInputField = forwardRef<HTMLInputElement, IGlobalInputField>(
  ({ name, type, label, placeholder, error, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label
            htmlFor={name}
            className="text-sm text-content-primary font-semibold"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          type={type ?? 'text'}
          name={name}
          className={`h-[39px] p-3 rounded-lg bg-background-secondary border outline-none text-content-primary placeholder:text-content-placeholder
           ${
             error
               ? 'border-accent-red'
               : 'border-border-primary hover:border-content-primary focus:border-accent-brand'
           }`}
          placeholder={placeholder ?? label ?? name}
          {...props}
        />
        {error && (
          <p className="flex items-center gap-1 ">
            <GlobalIcon name={'error'} className="text-accent-red" />
            <span className="text-xs text-content-body">{error}</span>
          </p>
        )}
      </div>
    );
  }
);

GlobalInputField.displayName = 'GlobalInputField';

export default GlobalInputField;
