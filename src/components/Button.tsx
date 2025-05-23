import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 shadow-md hover:shadow-xl transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400';
  
  // Updated variants with proper contrast
  const variants = {
    // Primary: dark blue with white text (good contrast >5.5:1)
    primary: 'bg-brand-blue text-white hover:bg-[#004C99]',
    
    // Secondary: gold with navy text (good contrast ~9:1)
    secondary: 'bg-brand-gold text-[#0F1C2E] hover:bg-[#f0d28c]',
    
    // Outline: ensure proper contrast on hover
    outline: 'border-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white'
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md:'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  const width = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${width} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
