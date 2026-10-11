import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import TextReveal from "../ui/text-reveal";
import SectionLabel from "../ui/section-label";
import president from "../../data/presidentMessage.json";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Paragraphs are separated by a blank line in the JSON message
const paragraphs = president.message
  .split(/\n\s*\n/)
  .map((p) => p.trim())
  .filter(Boolean);
// Longer messages get a smaller size so the block still fits beside the portrait
const isLong = president.message.split(/\s+/).length > 90;

export default function PresidentMessage() {
  const sectionRef = useRef(null);
  const frameRef = useRef(null);
  const photoRef = useRef(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      // Portrait wipes up into view, then drifts slightly against the scroll for depth
      gsap.fromTo(
        frameRef.current,
        { clipPath: "inset(100% 0% 0% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: { trigger: frameRef.current, start: "top 80%", once: true },
        }
      );
      gsap.fromTo(
        photoRef.current,
        { yPercent: -5 },
        {
          yPercent: 5,
          ease: "none",
          scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: true },
        }
      );
    },
    { scope: sectionRef }
  );

  const quoteSize = isLong
    ? "text-[1.6vw] max-[1025px]:text-[3.2vw] max-md:text-[4.4vw]"
    : "text-[2vw] max-[1025px]:text-[4vw] max-md:text-[5.2vw]";

  return (
    <section
      ref={sectionRef}
      id="president-message"
      style={{ "--glow-pos": "22% 50%", "--glow-size": "40% 60%" }}
      className="surface w-full px-[4vw] py-[8vw] text-white max-[1025px]:px-[5vw] max-[1025px]:py-[14vw]"
    >
      <div className="grid grid-cols-12 items-center gap-[5vw] max-[1025px]:grid-cols-1 max-[1025px]:gap-[10vw]">
        <div className="col-span-5 max-[1025px]:col-span-1 max-[1025px]:w-[60%] max-md:w-[80%]">
          <div ref={frameRef} className="relative aspect-[4/5] overflow-hidden rounded-xl bg-[#080c1a]">
            {president.photo ? (
              <img
                ref={photoRef}
                src={president.photo}
                alt={`${president.name}, ${president.role}`}
                className="absolute -top-[6%] left-0 h-[112%] w-full max-w-none object-cover"
              />
            ) : (
              <div
                ref={photoRef}
                className="absolute inset-0 flex items-center justify-center text-[12vw] font-semibold text-white/10 max-[1025px]:text-[30vw]"
              >
                {president.name.charAt(0)}
              </div>
            )}
          </div>
        </div>

        <div className="col-span-7 max-[1025px]:col-span-1">
          <SectionLabel path="president" className="mb-[1.2vw] max-[1025px]:mb-[3vw]" />
          <TextReveal stagger={0.015}>
            <h2 className="text-[4vw] font-semibold leading-[1.1] tracking-tight max-[1025px]:text-[7vw] max-md:text-[9vw]">
              From the President
            </h2>
          </TextReveal>

          <div className="mt-[2.5vw] max-[1025px]:mt-[5vw]">
            {paragraphs.length > 0 ? (
              <TextReveal splitBy="lines" className="space-y-[1.2vw] max-[1025px]:space-y-[3vw]">
                {paragraphs.map((text, i) => (
                  <p key={i} className={`${quoteSize} leading-[1.45] text-white/90`}>
                    {i === 0 && "“"}
                    {text}
                    {i === paragraphs.length - 1 && "”"}
                  </p>
                ))}
              </TextReveal>
            ) : (
              <p className="text-[1.25vw] italic text-white/40 max-[1025px]:text-[3vw] max-md:text-[4vw]">
                The President&apos;s message will appear here.
              </p>
            )}
          </div>

          <div className="mt-[3vw] border-t border-white/15 pt-[1.5vw] max-[1025px]:mt-[6vw] max-[1025px]:pt-[4vw]">
            <p className="text-[1.6vw] font-medium text-[#3b82f6] max-[1025px]:text-[4vw] max-md:text-[5.5vw]">
              {president.name}
            </p>
            <p className="mt-[0.3vw] text-[1.1vw] text-white/70 max-[1025px]:mt-[1vw] max-[1025px]:text-[2.6vw] max-md:text-[3.8vw]">
              {president.role}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
