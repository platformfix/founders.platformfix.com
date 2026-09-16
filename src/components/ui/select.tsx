import { type SelectHTMLAttributes, forwardRef } from "react";

export const Select = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement>>(
  ({ className = "", children, ...props }, ref) => (
    <select
      ref={ref}
      className={`w-full rounded-md border border-card-border bg-card-slate px-4 py-3 text-off-white focus:border-gold focus:outline-none ${className}`}
      {...props}
    >
      {children}
    </select>
  ),
);
Select.displayName = "Select";
