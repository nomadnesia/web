import React from 'react';
import { Check, X } from 'lucide-react';

import { cn } from '@/lib/utils';

interface PillProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isSelected: boolean;
}

const Pill = React.forwardRef<HTMLButtonElement, PillProps>(
  ({ children, isSelected, ...props }, ref) => {
    const [isHovering, setIsHovering] = React.useState(false);
    return (
      <button
        className={cn(
          'border-[1px] flex flex-row gap-[5px] items-center w-fit text-[12px] transition border-black/20 rounded-md py-[2px] px-[6px]',
          {
            'bg-black/90 text-white hover:bg-black/70': isSelected,
            'hover:bg-black/5 text-black/60': !isSelected,
          },
        )}
        type="button"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        {...props}
      >
        {isSelected ? isHovering ? <X size={12} /> : <Check size={12} /> : null}
        <span>{children}</span>
      </button>
    );
  },
);

Pill.displayName = 'Pill';

export { Pill };
