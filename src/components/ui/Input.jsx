import React from 'react';
import { clsx } from 'clsx';
import { AlertCircle } from 'lucide-react';

export const Input = React.forwardRef(({
  label,
  helperText,
  error,
  leftIcon,
  rightIcon,
  className = '',
  id,
  isDisabled = false,
  type = 'text',
  placeholder,
  ...props
}, ref) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="flex flex-col space-y-1.5 w-full">
      {label && (
        <label 
          htmlFor={inputId}
          className="text-xs font-mono uppercase tracking-wider text-cx-400 font-medium select-none"
        >
          {label}
        </label>
      )}

      <div className="relative flex items-center">
        {leftIcon && (
          <div className="absolute left-3 text-cx-500 pointer-events-none shrink-0">
            {leftIcon}
          </div>
        )}

        <input
          ref={ref}
          id={inputId}
          type={type}
          disabled={isDisabled}
          placeholder={placeholder}
          className={clsx(
            "w-full bg-cx-900 border border-cx-700 text-cx-0 placeholder-cx-500 rounded-cx-md px-3.5 py-2.5 text-sm transition-all duration-150 focus:outline-none focus:border-cx-0 focus:ring-1 focus:ring-cx-0 disabled:opacity-40 disabled:cursor-not-allowed",
            leftIcon && "pl-10",
            rightIcon && "pr-10",
            error && "border-cx-0 ring-1 ring-cx-0",
            className
          )}
          {...props}
        />

        {rightIcon && (
          <div className="absolute right-3 text-cx-500 pointer-events-none shrink-0">
            {rightIcon}
          </div>
        )}
      </div>

      {error ? (
        <div className="flex items-center space-x-1 text-xs text-cx-300 font-mono mt-1">
          <AlertCircle className="w-3.5 h-3.5 shrink-0 text-cx-0" />
          <span>{error}</span>
        </div>
      ) : helperText ? (
        <p className="text-xs text-cx-500 font-sans">{helperText}</p>
      ) : null}
    </div>
  );
});

Input.displayName = 'Input';

export const Textarea = React.forwardRef(({
  label,
  helperText,
  error,
  className = '',
  id,
  isDisabled = false,
  rows = 4,
  ...props
}, ref) => {
  const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="flex flex-col space-y-1.5 w-full">
      {label && (
        <label 
          htmlFor={textareaId}
          className="text-xs font-mono uppercase tracking-wider text-cx-400 font-medium select-none"
        >
          {label}
        </label>
      )}

      <textarea
        ref={ref}
        id={textareaId}
        rows={rows}
        disabled={isDisabled}
        className={clsx(
          "w-full bg-cx-900 border border-cx-700 text-cx-0 placeholder-cx-500 rounded-cx-md px-3.5 py-2.5 text-sm transition-all duration-150 focus:outline-none focus:border-cx-0 focus:ring-1 focus:ring-cx-0 disabled:opacity-40 disabled:cursor-not-allowed resize-y",
          error && "border-cx-0 ring-1 ring-cx-0",
          className
        )}
        {...props}
      />

      {error ? (
        <div className="flex items-center space-x-1 text-xs text-cx-300 font-mono mt-1">
          <AlertCircle className="w-3.5 h-3.5 shrink-0 text-cx-0" />
          <span>{error}</span>
        </div>
      ) : helperText ? (
        <p className="text-xs text-cx-500 font-sans">{helperText}</p>
      ) : null}
    </div>
  );
});

Textarea.displayName = 'Textarea';
