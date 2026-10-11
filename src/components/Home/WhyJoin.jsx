import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { IconCalendarRepeat, IconMessages, IconTrophy, IconUsersGroup } from "@tabler/icons-react";
import TextReveal from "../ui/text-reveal";
import SectionLabel from "../ui/section-label";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const ACCENT = "#3b82f6";

const reasons = [
  {
    title: "Weekly practice",
    icon: IconCalendarRepeat,
    description: "Regular assignments and weekly quizzes keep your DSA and competitive programming sharp.",
  },
  {
    title: "Events to compete in",
    icon: IconTrophy,
    description: "Hackathons, data challenges and design sprints like CTRL+ALT+HACK, Data Sphere and Web-a-Thon.",
  },
  {
    title: "Interview preparation",
    icon: IconMessages,
    description: "Focused guidance on data structures, algorithms, C++ and Java for placement season.",
  },
  {
    title: "Alumni network",
    icon: IconUsersGroup,
    description: "Connect with like-minded students and TDS alumni who have been where you are.",
  },
];

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function WhyJoin() {
  const sectionRef = useRef(null);
  const listRef = useRef(null);
  const rowRefs = useRef([]);
  const lineRefs = useRef([]);

  useGSAP(
    () => {
      gsap.set(lineRefs.current, { scaleX: 0, transformOrigin: "left center" });
      if (prefersReducedMotion()) return;

      gsap.fromTo(
        rowRefs.current,
        { autoAlpha: 0, y: 40 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: { trigger: listRef.current, start: "top 80%", once: true },
        }
      );
    },
    { scope: sectionRef }
  );

  // Hover line: wipes in from the left, and on leave exits to the right rather than retracting
  const sweep = (i, enter) => {
    const line = lineRefs.current[i];
    if (!line) return;
    gsap.killTweensOf(line);
    gsap.set(line, { transformOrigin: enter ? "left center" : "right center" });
    gsap.to(line, { scaleX: enter ? 1 : 0, duration: prefersReducedMotion() ? 0 : 0.55, ease: "power2.out" });
  };

  return (
    <section
      ref={sectionRef}
      id="why-join"
      style={{ "--glow-pos": "18% 22%", "--glow-size": "45% 45%" }}
      className="surface relative w-full px-[4vw] py-[10vw] text-white max-[1025px]:px-[5vw] max-[1025px]:py-[16vw]"
    >
      <div className="grid grid-cols-12 gap-[4vw] max-[1025px]:grid-cols-1 max-[1025px]:gap-[8vw]">
        <div className="col-span-5 max-[1025px]:col-span-1">
          {/* Heading stays put while the reasons scroll past */}
          <div className="sticky top-[8vw] max-[1025px]:static">
            <SectionLabel path="why-join" className="mb-[1.2vw] max-[1025px]:mb-[3vw]" />
            <TextReveal stagger={0.015}>
              <h2 className="text-[5.5vw] font-semibold leading-[1.05] tracking-tight max-[1025px]:text-[7vw] max-md:text-[11vw]">
                Why Join TDS?
              </h2>
            </TextReveal>
          </div>
        </div>

        <ol ref={listRef} className="col-span-7 max-[1025px]:col-span-1">
          {reasons.map((reason, i) => (
            <li
              key={reason.title}
              ref={(el) => {
                rowRefs.current[i] = el;
              }}
              onMouseEnter={() => sweep(i, true)}
              onMouseLeave={() => sweep(i, false)}
              className="relative py-[2.5vw] max-[1025px]:py-[6vw]"
            >
              <h3 className="flex items-center gap-[1vw] text-[2.2vw] font-medium leading-tight max-[1025px]:gap-[2.5vw] max-[1025px]:text-[4.5vw] max-md:text-[6vw]">
                <reason.icon aria-hidden="true" className="size-[0.9em] shrink-0 text-[#3b82f6]" stroke={1.5} />
                {reason.title}
              </h3>
              <p className="mt-[1vw] max-w-[44ch] text-[1.25vw] leading-[1.6] text-white/75 max-[1025px]:mt-[2vw] max-[1025px]:text-[2.8vw] max-md:text-[4vw]">
                {reason.description}
              </p>
              <div aria-hidden="true" className="absolute bottom-0 left-0 h-px w-full bg-white/15">
                <span
                  ref={(el) => {
                    lineRefs.current[i] = el;
                  }}
                  className="absolute inset-0 will-change-transform"
                  style={{ backgroundColor: ACCENT }}
                />
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
