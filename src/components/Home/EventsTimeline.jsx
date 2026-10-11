import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import TextReveal from "../ui/text-reveal";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const BRAND_BLUE = "#0b64d0";
// Vertical spacing of timeline rows, in vw (desktop)
const ROW_VW = 6;
// Each event gets one unit of scroll: hold, transition, hold
const HOLD = 0.2;
const MOVE = 0.6;

const events = [
  {
    name: "AI: Ethics & Security Conclave",
    tags: ["Conclave", "NSUT"],
    description:
      "Industry speakers and hands-on sessions for students who want to understand technology beyond just using it.",
    image: "/events/AIEthics.jpeg",
    // The file has a black strip down its right edge; scale from the left to crop it out
    imageStyle: { transform: "scale(1.03)", transformOrigin: "left center" },
  },
  {
    name: "Matiks League 2026",
    tags: ["Online league", "7 days"],
    description:
      "A week of quick daily challenges that build logic, speed and focus, with prizes for the top players.",
    image: "/events/Matiks26.png",
  },
  {
    name: "CTRL+ALT+HACK",
    tags: ["Hackathon", "24 hours"],
    description:
      "SpaceCon's 24-hour hackathon. Teams ideate, design and prototype with Generative AI, machine learning and Web3.",
    image: "/events/hackathon.jpeg",
  },
  {
    name: "Data Sphere",
    tags: ["Data analytics", "SpaceCon"],
    description:
      "Draw insights from a real dataset, then present them as a story. A test of analysis and communication in equal parts.",
    image: "/events/datasphere.jpeg",
  },
  {
    name: "Web-a-Thon",
    tags: ["Frontend", "SpaceCon"],
    description:
      "Design and build a website around a space-themed problem statement, judged on design, creativity, responsiveness and code.",
    image: "/events/webthon.jpeg",
  },
];

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function EventsTimeline() {
  const sectionRef = useRef(null);
  const bandRef = useRef(null);
  const progressRef = useRef(null);
  const dotRefs = useRef([]);
  const posterRefs = useRef([]);
  const copyRefs = useRef([]);
  const [reduceMotion] = useState(prefersReducedMotion);

  useGSAP(
    () => {
      const steps = events.length - 1;
      const posters = posterRefs.current;
      const copies = copyRefs.current;
      const dots = dotRefs.current;

      gsap.set(progressRef.current, { scaleY: 0 });
      gsap.set(dots[0], { backgroundColor: "#ffffff", borderColor: "#ffffff" });
      gsap.set(dots.slice(1), { backgroundColor: BRAND_BLUE, borderColor: "rgba(255,255,255,0.5)" });
      gsap.set(copies.slice(1), { autoAlpha: 0, yPercent: 20 });
      // Explicit start value: tweening from the default `filter: none` starts at brightness(0), i.e. black
      gsap.set(posters, { filter: "brightness(1)" });
      gsap.set(posters.slice(1), reduceMotion ? { autoAlpha: 0 } : { yPercent: 100 });

      // One scroll "step" per event: the next poster slides up over the current one, which dims,
      // while the description swaps and the timeline fills. Each step holds still at both ends
      // (instead of ScrollTrigger snap, which fights Lenis) so every event gets a moment at rest.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "10% top",
          end: "bottom bottom",
          scrub: true,
        },
      });

      for (let i = 0; i < steps; i += 1) {
        const t = i + HOLD;
        tl.to(progressRef.current, { scaleY: (i + 1) / steps, ease: "power2.inOut", duration: MOVE }, t);
        if (reduceMotion) {
          tl.to(posters[i + 1], { autoAlpha: 1, ease: "none", duration: MOVE }, t);
        } else {
          tl.to(posters[i + 1], { yPercent: 0, ease: "power2.inOut", duration: MOVE }, t);
          tl.to(posters[i], { filter: "brightness(0.3)", ease: "power2.inOut", duration: MOVE }, t);
        }
        tl.to(copies[i], { autoAlpha: 0, yPercent: -20, ease: "power2.in", duration: MOVE * 0.45 }, t)
          .to(copies[i + 1], { autoAlpha: 1, yPercent: 0, ease: "power2.out", duration: MOVE * 0.45 }, t + MOVE * 0.55)
          .set(dots[i + 1], { backgroundColor: "#ffffff", borderColor: "#ffffff" }, t + MOVE);
      }
      // Pad the end so the last event holds too
      tl.set({}, {}, steps);

      // Entry: a blue band rises out of the hero and curves its top edge as it goes
      if (!reduceMotion) {
        gsap.fromTo(
          bandRef.current,
          { clipPath: "ellipse(150% 100% at 50% 100%)", yPercent: 0 },
          {
            clipPath: "ellipse(60% 100% at 50% 100%)",
            yPercent: window.innerWidth > 1024 ? -70 : -50,
            ease: "none",
            scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "30% bottom", scrub: true },
          }
        );
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="events-showcase"
      className="relative h-[420vh] w-full pt-[8vw] text-white max-[1025px]:pt-[30vw]"
    >
      <div
        ref={bandRef}
        aria-hidden="true"
        className="surface-blue-band absolute left-0 top-0 z-[2] h-[50vh] w-full will-change-[clip-path]"
      />

      <div
        className="surface-blue-panel sticky top-0 z-[3] flex h-screen w-full flex-col items-center justify-center gap-[4vw] overflow-hidden px-[4vw] max-[1025px]:gap-[6vw] max-[1025px]:px-[5vw]"
        
      >
        <TextReveal stagger={0.015}>
          <h2 className="text-center text-[5.5vw] font-semibold leading-[1.1] tracking-tight max-[1025px]:text-[7vw] max-md:text-[9vw]">
            Events We&apos;ve Hosted
          </h2>
        </TextReveal>

        <div className="flex w-full items-center justify-between gap-[4vw] max-[1025px]:flex-col max-[1025px]:gap-[6vw]">
          <div className="relative w-[28%] max-[1025px]:hidden">
            <div
              aria-hidden="true"
              className="absolute left-[4px] w-px bg-white/20"
              style={{ top: `${ROW_VW / 2}vw`, height: `${(events.length - 1) * ROW_VW}vw` }}
            />
            <div
              ref={progressRef}
              aria-hidden="true"
              className="absolute left-[4px] w-px origin-top bg-white"
              style={{ top: `${ROW_VW / 2}vw`, height: `${(events.length - 1) * ROW_VW}vw` }}
            />
            <ol>
              {events.map((event, i) => (
                <li key={event.name} className="relative flex items-center gap-[1.2vw]" style={{ height: `${ROW_VW}vw` }}>
                  <span
                    ref={(el) => {
                      dotRefs.current[i] = el;
                    }}
                    aria-hidden="true"
                    className="size-[10px] shrink-0 rounded-full border"
                  />
                  <div>
                    <h3 className="text-[1.5vw] font-normal leading-tight">{event.name}</h3>
                    <p className="mt-[0.3vw] font-mono text-[0.85vw] text-white/75">{event.tags.join(" • ")}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="relative aspect-[5/6] h-[min(34vw,58vh)] shrink-0 overflow-hidden rounded-xl max-[1025px]:h-auto max-[1025px]:w-[50vw] max-md:w-[68vw]">
            {events.map((event, i) => (
              <div
                key={event.name}
                ref={(el) => {
                  posterRefs.current[i] = el;
                }}
                className="absolute inset-0"
                style={{ zIndex: i + 1 }}
              >
                <img src={event.image} alt={`${event.name} poster`} loading="lazy" className="h-full w-full object-cover" style={event.imageStyle} />
              </div>
            ))}
          </div>

          {/* All descriptions share one grid cell, so the block sizes to the longest and they swap in place */}
          <div className="grid w-[30%] max-[1025px]:w-full max-[1025px]:text-center">
            {events.map((event, i) => (
              <div
                key={event.name}
                ref={(el) => {
                  copyRefs.current[i] = el;
                }}
                className="[grid-area:1/1]"
              >
                <p className="mb-[1.5vw] hidden text-[4.5vw] font-medium leading-tight max-[1025px]:block max-md:text-[5.5vw]">
                  {event.name}
                </p>
                <p className="text-[1.25vw] leading-[1.6] text-white/85 max-[1025px]:text-[3vw] max-md:text-[4vw]">
                  {event.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
