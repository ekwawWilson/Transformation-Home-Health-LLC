import { ButtonHTMLAttributes } from 'react';
import Loading from './Loading';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const baseClasses = 'font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2';

  const variantClasses = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 shadow-md hover:shadow-lg',
    secondary: 'bg-secondary-600 text-white hover:bg-secondary-700 shadow-md hover:shadow-lg',
    outline: 'bg-white text-primary-600 border-2 border-primary-600 hover:bg-primary-50',
    danger: 'bg-red-600 text-white hover:bg-red-700 shadow-md hover:shadow-lg',
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const disabledClasses = 'opacity-50 cursor-not-allowed';

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${
        (disabled || isLoading) ? disabledClasses : ''
      } ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? <Loading size="sm" /> : children}
    </button>
  );
}
