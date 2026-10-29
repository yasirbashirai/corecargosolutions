import Link from "next/link";
import { IconArrow } from "./icons";

type Variant = "primary" | "secondary" | "ghost" | "light";

const styles: Record<Variant, string> = {
  primary: "bg-brand-gradient text-white shadow-lg shadow-brand/25 hover:shadow-xl hover:shadow-brand/30",
  secondary: "bg-azure-gradient text-white shadow-lg shadow-azure/25 hover:shadow-xl",
  ghost: "border border-white/40 text-white hover:bg-white/10 backdrop-blur",
  light: "bg-white text-brand hover:bg-mist",
};

/** Brand button rendered as a Next.js link. */
export default function Button({
  href,
  children,
  variant = "primary",
  arrow = true,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  arrow?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 ${styles[variant]} ${className}`}
    >
      {children}
      {arrow && <IconArrow className="h-4 w-4 transition-transform group-hover:translate-x-1" />}
    </Link>
  );
}
