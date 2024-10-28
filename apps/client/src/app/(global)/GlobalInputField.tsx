'use client';

import React, { forwardRef } from 'react';
import GlobalIcon, { IconName } from './GlobalIcon';

interface IGlobalInputField
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  type?: string;
  label?: string;
  placeholder?: string;
  icon?: IconName;
  error?: string;
  className?: string;
}

const GlobalInputField = forwardRef<HTMLInputElement, IGlobalInputField>(
  (
    { name, type, label, placeholder, icon, error, className, ...props },
    ref
  ) => {
    return (
      <div className={`flex flex-col gap-1 ${className}`}>
        {label && (
          <label
            htmlFor={name}
            className="text-sm text-content-primary font-semibold"
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {icon && (
            <GlobalIcon
              name={icon}
              className="absolute left-3 text-content-placeholder"
            />
          )}
          <input
            ref={ref}
            type={type ?? 'text'}
            name={name}
            className={`w-full h-[39px] py- rounded-lg bg-background-secondary border outline-none text-xs text-content-primary placeholder:text-content-placeholder
              ${icon ? 'ps-[32px] pe-3' : 'px-3'} 
              ${
                error
                  ? 'border-accent-red'
                  : 'border-border-primary hover:border-content-primary focus:border-accent-brand'
              }`}
            placeholder={placeholder ?? label ?? name}
            {...props}
          />
        </div>
        {error && (
          <p className="flex items-center gap-1 ">
            <GlobalIcon name={IconName.ERROR} className="text-accent-red" />
            <span className="text-xs text-content-body">{error}</span>
          </p>
        )}
      </div>
    );
  }
);

GlobalInputField.displayName = 'GlobalInputField';

export default GlobalInputField;
