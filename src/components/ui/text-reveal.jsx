import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

/**
 * Masked text reveal. Headings rise in character by character, paragraphs line by line.
 * `start` gates the animation (used by the hero intro); `animateOnScroll` ties it to a ScrollTrigger.
 */
export default function TextReveal({
  children,
  splitBy = "chars",
  stagger,
  duration = 0.5,
  delay = 0,
  start = true,
  animateOnScroll = true,
  className = "",
}) {
  const ref = useRef(null);

  useGSAP(
    (_, contextSafe) => {
      const el = ref.current;
      if (!el || !start) return;

      const scrollTrigger = animateOnScroll ? { trigger: el, start: "top 85%", once: true } : undefined;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.fromTo(el, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.8, ease: "power2.out", delay, scrollTrigger });
        return;
      }

      // Split only after fonts load, otherwise line breaks are measured with the fallback font
      document.fonts.ready.then(
        contextSafe(() => {
          if (!ref.current) return;
          const targets = Array.from(el.children);
          const parts = [];
          targets.forEach((target) => {
            if (splitBy === "lines") {
              const split = SplitText.create(target, { type: "lines", mask: "lines", reduceWhiteSpace: false });
              parts.push(...split.lines);
              return;
            }
            const split = SplitText.create(target, { type: "lines,chars", mask: "chars", reduceWhiteSpace: false });
            // Give each mask a little breathing room so overhangs and descenders aren't clipped
            split.masks.forEach((mask) => {
              mask.style.padding = "0.08em 0.04em";
              mask.style.margin = "-0.08em -0.04em";
            });
            parts.push(...split.chars);
          });

          gsap.set(el, { autoAlpha: 1 });
          gsap.fromTo(
            parts,
            { yPercent: 100, willChange: "transform" },
            {
              yPercent: 0,
              duration,
              stagger: stagger ?? (splitBy === "lines" ? 0.1 : 0.03),
              ease: "power3.out",
              delay,
              scrollTrigger,
            }
          );
        })
      );
    },
    { scope: ref, dependencies: [start, splitBy, stagger, duration, delay, animateOnScroll] }
  );

  return (
    <div ref={ref} className={`invisible ${className}`}>
      {children}
    </div>
  );
}
