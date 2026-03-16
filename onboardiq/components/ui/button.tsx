import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function Button({ className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-xl bg-[#1F4959] px-3 py-2 text-sm font-medium text-white transition hover:opacity-90',
        className
      )}
      {...props}
    />
  );
}
