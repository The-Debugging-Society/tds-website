import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import TextReveal from "../ui/text-reveal";
import PillButton from "../ui/pill-button";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const AboutSection = () => {
  const sectionRef = useRef(null);
  const statementRef = useRef(null);

  // Statement brightens word by word as it scrolls through, so it reads at the visitor's pace
  useGSAP(
    (_, contextSafe) => {
      if (prefersReducedMotion()) return;
      document.fonts.ready.then(
        contextSafe(() => {
          if (!statementRef.current) return;
          const split = SplitText.create(statementRef.current, { type: "words" });
          gsap.fromTo(
            split.words,
            { opacity: 0.18 },
            {
              opacity: 1,
              ease: "none",
              stagger: 0.1,
              scrollTrigger: { trigger: statementRef.current, start: "top 80%", end: "bottom 45%", scrub: true },
            }
          );
        })
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="about"
      style={{ "--glow-pos": "72% 55%", "--glow-size": "50% 60%" }}
      className="surface w-full px-[4vw] py-[9vw] text-white max-[1025px]:px-[5vw] max-[1025px]:py-[16vw]"
    >
      <TextReveal stagger={0.015}>
        <h2 className="text-[4vw] font-semibold leading-[1.1] tracking-tight max-[1025px]:text-[7vw] max-md:text-[9vw]">
          About Us
        </h2>
      </TextReveal>

      <p
        ref={statementRef}
        className="mt-[3vw] w-[85%] text-[3.4vw] font-medium leading-[1.2] tracking-tight max-[1025px]:mt-[6vw] max-[1025px]:w-full max-[1025px]:text-[5.6vw] max-md:text-[7.4vw]"
      >
        The Debugging Society is a coding society at NSUT, started to develop a passion for coding through
        regular assignments, weekly quizzes and a network of people who care about technology.
      </p>

      <div className="mt-[4vw] flex items-end justify-between gap-[4vw] max-[1025px]:mt-[8vw] max-[1025px]:flex-col max-[1025px]:items-start max-[1025px]:gap-[6vw]">
        <div className="w-[40%] max-[1025px]:w-[80%] max-md:w-full">
          <TextReveal splitBy="lines">
            <p className="text-[1.25vw] leading-[1.6] text-white/75 max-[1025px]:text-[2.6vw] max-md:text-[4.2vw]">
              From DSA and competitive programming to web and Android development, we teach, code and compete
              together.
            </p>
          </TextReveal>
        </div>
        <PillButton to="/about">More about us</PillButton>
      </div>
    </section>
  );
};

export default AboutSection;
