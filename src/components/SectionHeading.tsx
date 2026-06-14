type SectionHeadingProps = {
  label?: string;       // small uppercase label above title
  title: string;        // main H2
  subtitle?: string;    // optional paragraph below
  theme?: 'light' | 'dark'; // light = black text, dark = white text
  align?: 'left' | 'center';
  className?: string;   // layout shifts custom classes
};

export default function SectionHeading({
  label,
  title,
  subtitle,
  theme = 'light',
  align = 'left',
  className = '',
}: SectionHeadingProps) {
  const alignClass = align === 'center' ? 'items-center text-center' : 'items-start text-left';
  const titleColor = theme === 'dark' ? 'text-[#ffffff]' : 'text-[#000000]';
  const subtitleColor = theme === 'dark' ? 'text-[#cccccc]' : 'text-[#555555]';

  return (
    <div className={`flex flex-col ${alignClass} mb-10 ${className}`}>
      {label && (
        <p className="font-heading font-bold text-[11px] uppercase tracking-[0.22em] text-[#eece00] mb-2">
          {label}
        </p>
      )}
      <h2 className={`font-heading font-extrabold text-[40px] md:text-[48px] leading-[1.05] tracking-[-0.01em] ${titleColor}`}>
        {title}
      </h2>
      {/* YELLOW ACCENT BAR — always yellow, always visible */}
      <div className="mt-3.5 h-[4px] w-[64px] bg-[#eece00] rounded-full" />
      {subtitle && (
        <p className={`font-body font-normal text-[15px] leading-[1.75] mt-4 ${subtitleColor} max-w-2xl`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
