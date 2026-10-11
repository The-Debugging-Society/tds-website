import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrambleTextPlugin);

/**
 * Terminal-style path label that sits above a section heading, e.g. `~/tds/events`.
 * Decodes in from random characters when it scrolls into view.
 */
export default function SectionLabel({ path, className = "", animateOnScroll = true }) {
  const ref = useRef(null);
  const text = `~/tds/${path}`;

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.fromTo(
        ref.current,
        { scrambleText: { text: " ", chars: "01" } },
        {
          scrambleText: { text, chars: "01<>/{}_", speed: 0.6, revealDelay: 0.1 },
          duration: 1.1,
          ease: "none",
          scrollTrigger: animateOnScroll ? { trigger: ref.current, start: "top 90%", once: true } : undefined,
        }
      );
    },
    { scope: ref }
  );

  return (
    <p
      className={`font-mono text-[0.95vw] text-[#3b82f6] max-[1025px]:text-[2.2vw] max-md:text-[3.4vw] ${className}`}
      aria-label={text}
    >
      <span ref={ref} aria-hidden="true">
        {text}
      </span>
    </p>
  );
}
