import React from 'react';

export const Button = ({ className, variant = 'solid', children, ...props }) => {
  const baseStyles = 'rounded-lg text-white font-semibold transition duration-200';
  const solidStyles = 'bg-blue-600 hover:bg-blue-700';
  const outlineStyles = 'bg-transparent border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white';

  const variantStyles = variant === 'outline' ? outlineStyles : solidStyles;

  return (
    <button {...props} className={`${baseStyles} ${variantStyles} ${className}`}>
      {children}
    </button>
  );
};
