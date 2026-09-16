import { type ButtonHTMLAttributes, forwardRef } from "react";

type Variant = "primary" | "budget";

export const Button = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; active?: boolean }
>(({ className = "", variant = "primary", active = false, ...props }, ref) => {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors focus-visible:outline-2 focus-visible:outline-gold disabled:opacity-50";
  const variants: Record<Variant, string> = {
    primary: "bg-gold text-navy px-6 py-3 hover:opacity-90",
    budget: active
      ? "border border-gold bg-gold/10 text-off-white px-4 py-3 text-left"
      : "border border-card-border bg-card-slate text-off-white px-4 py-3 text-left hover:border-gold/60",
  };
  return <button ref={ref} className={`${base} ${variants[variant]} ${className}`} {...props} />;
});
Button.displayName = "Button";
