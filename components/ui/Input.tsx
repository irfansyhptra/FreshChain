import React, { InputHTMLAttributes } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', label, error, helperText, icon, ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1.5 focus-within:text-emerald-main text-slate-gray">
        {label && (
          <label className="text-sm font-semibold tracking-wide text-emerald-dark" htmlFor={props.id}>
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-gray/70">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={`flex h-11 w-full rounded-xl border bg-white/60 backdrop-blur-md px-4 py-2 text-sm text-emerald-dark transition-all duration-300 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-gray/60 focus-visible:outline-none focus-visible:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]
            ${error ? 'border-safety-red/50 focus-visible:ring-2 focus-visible:ring-safety-red' : 'border-white/50 focus-visible:ring-2 focus-visible:ring-emerald-main/20 focus-visible:border-emerald-main'}
            ${icon ? 'pl-10' : ''} ${className}`}
            {...props}
          />
        </div>
        {error && <span className="text-xs text-safety-red mt-0.5">{error}</span>}
        {helperText && !error && <span className="text-xs text-slate-gray mt-0.5">{helperText}</span>}
      </div>
    );
  }
);
Input.displayName = 'Input';
