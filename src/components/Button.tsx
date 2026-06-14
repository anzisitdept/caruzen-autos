import Link from "next/link";

type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'dark' | 'outline-yellow';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  href?: string;
  disabled?: boolean;
};

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  onClick,
  type = 'button',
  href,
  disabled,
}: ButtonProps) {

  const base = 'inline-flex items-center justify-center font-heading font-black tracking-[0.04em] uppercase rounded-md transition-all duration-200 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed';

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const variants = {
    // ✅ YELLOW bg + BLACK text — primary CTA on dark/black sections
    primary:
      'bg-[#eece00] text-[#000000] border-2 border-[#eece00] hover:bg-[#000000] hover:text-[#eece00] hover:border-[#eece00]',

    // ✅ Transparent + WHITE border — secondary CTA on dark/black sections
    secondary:
      'bg-transparent text-[#ffffff] border-2 border-[#ffffff] hover:bg-[#eece00] hover:text-[#000000] hover:border-[#eece00]',

    // ✅ BLACK bg + WHITE text — CTA on yellow or white/light sections
    dark:
      'bg-[#000000] text-[#ffffff] border-2 border-[#000000] hover:bg-[#eece00] hover:text-[#000000] hover:border-[#eece00]',

    // ✅ Transparent + YELLOW border + YELLOW text — ghost on dark sections
    'outline-yellow':
      'bg-transparent text-[#eece00] border-2 border-[#eece00] hover:bg-[#eece00] hover:text-[#000000]',
  };

  const classes = `${base} ${sizes[size]} ${variants[variant]} ${className}`;

  if (href) {
    return <Link href={href} className={classes}>{children}</Link>;
  }

  return (
    <button type={type} onClick={onClick} className={classes} disabled={disabled}>
      {children}
    </button>
  );
}
