import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'md', fullWidth = false, children, disabled, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-full font-medium transition-all duration-300 ease-out focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed';
    
    // macOS Liquid Glassmorphism Effect
    const variants = {
      primary: 'bg-white/15 hover:bg-white/25 text-white backdrop-blur-[12px] border border-white/20 shadow-[0_4px_6px_rgba(0,0,0,0.1),inset_0_1px_1px_rgba(255,255,255,0.5)] hover:shadow-[0_6px_12px_rgba(0,0,0,0.15),inset_0_1px_1px_rgba(255,255,255,0.6)] hover:-translate-y-0.5 active:scale-95',
      secondary: 'bg-white/10 hover:bg-white/20 text-white backdrop-blur-[12px] border border-white/20 shadow-[0_4px_6px_rgba(0,0,0,0.05),inset_0_1px_1px_rgba(255,255,255,0.2)] hover:shadow-[0_6px_12px_rgba(0,0,0,0.1),inset_0_1px_1px_rgba(255,255,255,0.3)] hover:-translate-y-0.5 active:scale-95',
      outline: 'bg-transparent border border-white/30 text-white hover:bg-white/10 backdrop-blur-[12px] shadow-[0_4px_6px_rgba(0,0,0,0.05)] hover:shadow-[0_6px_12px_rgba(0,0,0,0.1)] hover:-translate-y-0.5 active:scale-95',
      ghost: 'bg-transparent text-white hover:bg-white/15 backdrop-blur-[12px] hover:-translate-y-0.5 active:scale-95',
      danger: 'bg-red-500/20 hover:bg-red-500/30 text-white backdrop-blur-[12px] border border-red-500/20 shadow-[0_4px_6px_rgba(0,0,0,0.1),inset_0_1px_1px_rgba(255,255,255,0.5)] hover:shadow-[0_6px_12px_rgba(0,0,0,0.15),inset_0_1px_1px_rgba(255,255,255,0.6)] hover:-translate-y-0.5 active:scale-95'
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
