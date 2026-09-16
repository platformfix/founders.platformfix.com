import { type InputHTMLAttributes, forwardRef } from "react";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className = "", ...props }, ref) => (
    <input
      ref={ref}
      className={`w-full rounded-md border border-card-border bg-card-slate px-4 py-3 text-off-white placeholder:text-cool-grey focus:border-gold focus:outline-none ${className}`}
      {...props}
    />
  ),
);
Input.displayName = "Input";
