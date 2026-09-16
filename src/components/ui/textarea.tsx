import { type TextareaHTMLAttributes, forwardRef } from "react";

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className = "", ...props }, ref) => (
    <textarea
      ref={ref}
      className={`w-full min-h-[140px] rounded-md border border-card-border bg-card-slate px-4 py-3 text-off-white placeholder:text-cool-grey focus:border-gold focus:outline-none ${className}`}
      {...props}
    />
  ),
);
Textarea.displayName = "Textarea";
