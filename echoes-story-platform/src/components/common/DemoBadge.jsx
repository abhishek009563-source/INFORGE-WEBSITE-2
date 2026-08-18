import React from 'react';
import { Info } from 'lucide-react';

const DemoBadge = ({ text = 'Public Demo Data', size = 'sm', className = '' }) => {
  const sizeClasses = {
    xs: 'text-[10px] px-2 py-0.5',
    sm: 'text-xs px-2.5 py-1',
    md: 'text-sm px-3 py-1.5',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium rounded-full bg-brand-purple/10 border border-brand-purple/30 text-brand-purple ${sizeClasses[size]} ${className}`}
    >
      <Info className="w-3.5 h-3.5 text-brand-purple shrink-0" />
      <span>{text}</span>
    </span>
  );
};

export default DemoBadge;
