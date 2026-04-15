import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'md', fullWidth = false, children, disabled, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-xl font-medium transition-all duration-300 ease-in-out focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed';
    
    // Glassmorphism + Soft UI
    const variants = {
      primary: 'bg-gradient-to-r from-emerald-main to-[#10B981] text-white shadow-md hover:shadow-lg hover:opacity-90 active:scale-95 border border-white/20 backdrop-blur-sm',
      secondary: 'bg-glass-surface text-emerald-dark border border-white/50 backdrop-blur-md shadow-sm hover:shadow-md hover:bg-white',
      outline: 'bg-transparent border-2 border-emerald-main text-emerald-main hover:bg-emerald-main/10 backdrop-blur-sm',
      ghost: 'bg-transparent text-slate-gray hover:bg-slate-gray/10 backdrop-blur-md',
      danger: 'bg-gradient-to-r from-safety-red to-[#F87171] text-white shadow-md hover:shadow-lg border border-white/20 backdrop-blur-sm'
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-5 py-2.5 text-base',
      lg: 'px-7 py-3.5 text-lg'
    };

    const widthClass = fullWidth ? 'w-full' : '';

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';
