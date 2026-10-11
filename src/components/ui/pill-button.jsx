import { Link } from "react-router-dom";

/**
 * Pill link (internal `to` or external `href`) with two hover effects: each letter rolls up to reveal a copy of itself
 * (a text-shadow sitting 1.3em below), and the small dot on the left scales up to flood
 * the button with `fillColor`. Uses plain `transform` values rather than Tailwind's
 * translate/scale utilities, which rely on CSS properties some browsers drop.
 */
export default function PillButton({
  to,
  href,
  children,
  bgColor = "#ffffff",
  textColor = "#0a1128",
  fillColor = "#0a1128",
  hoverTextColor = "#ffffff",
  className = "",
}) {
  const label = String(children);
  // Internal routes use react-router; `href` is for external links, which open in a new tab
  const Tag = href ? "a" : Link;
  const linkProps = href ? { href, target: "_blank", rel: "noopener noreferrer" } : { to };

  return (
    <Tag
      {...linkProps}
      aria-label={label}
      className={`group relative inline-flex h-[3.5vw] min-h-12 w-fit items-center gap-[0.9vw] overflow-hidden whitespace-nowrap rounded-full px-[2vw] text-[1.15vw] font-medium no-underline max-[1025px]:gap-[1.6vw] max-[1025px]:px-[3.5vw] max-[1025px]:text-[2.4vw] max-md:gap-3 max-md:px-6 max-md:text-[4.2vw] ${className}`}
      style={{ backgroundColor: bgColor, "--pill-text": textColor, "--pill-hover-text": hoverTextColor }}
    >
      <span aria-hidden="true" className="relative z-10 flex size-[0.5vw] min-h-2 min-w-2 shrink-0 items-center justify-center">
        <span
          className="absolute inset-0 rounded-full transition-transform duration-[400ms] [transform:scale(1)] group-hover:[transform:scale(120)] motion-reduce:transition-none"
          style={{ backgroundColor: fillColor, transitionTimingFunction: "cubic-bezier(0.785, 0.135, 0.15, 0.86)" }}
        />
      </span>

      <span
        aria-hidden="true"
        className="relative z-20 block h-[1.3em] overflow-hidden leading-[1.3] text-[var(--pill-text)] transition-colors duration-[600ms] group-hover:text-[var(--pill-hover-text)] motion-reduce:transition-none"
      >
        {[...label].map((char, i) => (
          <span
            key={i}
            className="relative inline-block transition-transform duration-[600ms] [transform:translateY(0)] group-hover:[transform:translateY(-1.3em)] motion-reduce:transition-none"
            style={{
              textShadow: "0 1.3em currentColor",
              transitionDelay: `${i * 0.01}s`,
              transitionTimingFunction: "cubic-bezier(0.625, 0.05, 0, 1)",
              whiteSpace: char === " " ? "pre" : undefined,
            }}
          >
            {char}
          </span>
        ))}
      </span>

      {/* Balances the dot so the label sits optically centred */}
      <span aria-hidden="true" className="block w-[0.5vw] min-w-2 shrink-0" />
    </Tag>
  );
}
