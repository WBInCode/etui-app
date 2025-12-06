import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          // Base styles
          'inline-flex items-center justify-center font-medium transition-all duration-200',
          'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          // Variants
          {
            'bg-primary text-primary-foreground hover:bg-primary/90 active:scale-[0.98]':
              variant === 'primary',
            'bg-secondary text-secondary-foreground hover:bg-secondary/80 active:scale-[0.98]':
              variant === 'secondary',
            'bg-transparent text-foreground hover:bg-accent': variant === 'ghost',
            'border border-border bg-transparent text-foreground hover:bg-accent':
              variant === 'outline',
          },
          // Sizes
          {
            'h-8 px-3 text-sm rounded-md': size === 'sm',
            'h-10 px-4 text-base rounded-lg': size === 'md',
            'h-12 px-6 text-lg rounded-xl': size === 'lg',
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
