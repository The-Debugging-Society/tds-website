import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import SectionLabel from "../ui/section-label";
import president from "../../data/presidentMessage.json";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const isQuote = (text) => /^[“"]/.test(text) && /[”"]$/.test(text);

// Split the message: an optional lead-in line with an opening quotation, then the letter body
const paragraphs = president.message
  .split(/\n\s*\n/)
  .map((p) => p.trim())
  .filter(Boolean);

let leadIn = null;
let epigraph = null;
const body = [...paragraphs];
if (body.length) {
  const [firstLine, ...rest] = body[0].split("\n");
  const remainder = rest.join(" ").trim();
  if (isQuote(remainder)) {
    leadIn = firstLine.trim();
    epigraph = remainder;
    body.shift();
  } else if (isQuote(body[0])) {
    epigraph = body.shift();
  } else if (body.length > 1 && isQuote(body[1])) {
    // Lead-in and quotation written as separate paragraphs
    leadIn = body.shift();
    epigraph = body.shift();
  }
}

export default function PresidentMessage() {
  const sectionRef = useRef(null);
  const photoRef = useRef(null);
  const letterRef = useRef(null);

  useGSAP(
    (_, contextSafe) => {
      if (prefersReducedMotion()) return;

      // Portrait settles from a slight zoom as the section arrives
      gsap.fromTo(
        photoRef.current,
        { scale: 1.12 },
        { scale: 1, ease: "none", scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "top top", scrub: true } }
      );

      // Letter brightens word by word as it scrolls through, so it reads at the visitor's pace
      document.fonts.ready.then(
        contextSafe(() => {
          if (!letterRef.current) return;
          const split = SplitText.create(letterRef.current.querySelectorAll("[data-read]"), { type: "words" });
          gsap.fromTo(
            split.words,
            { opacity: 0.2 },
            {
              opacity: 1,
              ease: "none",
              stagger: 0.05,
              scrollTrigger: { trigger: letterRef.current, start: "top 75%", end: "bottom 60%", scrub: true },
            }
          );
        })
      );
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="president-message" className="surface w-full text-white">
      <div className="grid grid-cols-12 max-[1025px]:grid-cols-1">
        {/* Portrait: a framed photo that stays put while the letter scrolls */}
        <div className="col-span-5 max-[1025px]:col-span-1">
          <div className="sticky top-0 flex h-screen items-center pl-[4vw] pr-[5vw] max-[1025px]:static max-[1025px]:h-auto max-[1025px]:px-[5vw] max-[1025px]:pt-[14vw]">
            <figure className="w-[min(100%,56vh)] max-[1025px]:w-[55%] max-md:w-[70%]">
              <div className="aspect-[4/5] overflow-hidden rounded-xl bg-[#080c1a]">
                {president.photo && (
                  <img
                    ref={photoRef}
                    src={president.photo}
                    alt={`${president.name}, ${president.role}`}
                    className="h-full w-full object-cover object-top"
                  />
                )}
              </div>
              <figcaption className="mt-[1.4vw] max-[1025px]:mt-[3vw]">
                <p className="text-[1.9vw] font-semibold leading-none tracking-tight max-[1025px]:text-[5vw] max-md:text-[6.5vw]">
                  {president.name}
                </p>
                <p className="mt-[0.6vw] font-mono text-[0.95vw] text-[#3b82f6] max-[1025px]:mt-[1.5vw] max-[1025px]:text-[2.4vw] max-md:text-[3.4vw]">
                  {president.role}
                </p>
              </figcaption>
            </figure>
          </div>
        </div>

        {/* Letter */}
        <div
          ref={letterRef}
          className="col-span-7 py-[10vw] pr-[4vw] max-[1025px]:col-span-1 max-[1025px]:px-[5vw] max-[1025px]:py-[12vw]"
        >
          <SectionLabel path="president" className="mb-[2vw] max-[1025px]:mb-[4vw]" />
          {leadIn && (
            <p className="mb-[1vw] text-[1.2vw] text-white/50 max-[1025px]:mb-[2vw] max-[1025px]:text-[2.8vw] max-md:text-[4vw]">
              {leadIn}
            </p>
          )}
          {epigraph && (
            <h2 className="text-[2.4vw] font-semibold leading-[1.2] tracking-tight max-[1025px]:text-[5.4vw] max-md:text-[6.6vw]">
              {epigraph}
            </h2>
          )}

          <div className="mt-[4vw] space-y-6 max-[1025px]:mt-[8vw]">
            {body.length === 0 ? (
              <p className="italic text-white/40">The President&apos;s message will appear here.</p>
            ) : (
              body.map((text, i) => (
                <p
                  key={i}
                  data-read
                  className="whitespace-pre-line text-[clamp(17px,1.35vw,22px)] leading-[1.65] text-white"
                >
                  {text}
                </p>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
