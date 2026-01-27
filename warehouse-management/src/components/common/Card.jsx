import React from 'react';

const Card = ({ 
  children, 
  title, 
  className = '',
  padding = 'p-6',
  onClick
}) => {
  return (
    <div 
      className={`bg-white rounded-lg shadow-sm border border-gray-200 ${padding} ${className} ${onClick ? 'cursor-pointer hover:shadow-md transition-shadow' : ''}`}
      onClick={onClick}
    >
      {title && (
        <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
      )}
      {children}
    </div>
  );
};

export default Card;