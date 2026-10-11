import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLenis } from "lenis/react";
import TextReveal from "../ui/text-reveal";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Event posters only; muted in MarqueeColumn so the wall reads as texture behind the hero card
const columnOne = ["/events/hackathon.jpeg", "/events/datasphere.jpeg", "/events/AIEthics.jpeg"];
const columnTwo = ["/events/webthon.jpeg", "/events/aihorizon.jpeg", "/events/Matiks26.png"];

// One plain TDS navy fade; the logo carries the colour
const heroBackground = {
  backgroundColor: "#0a1128",
  backgroundImage: "linear-gradient(180deg, #1b2f6e 0%, #13235a 45%, #0a1128 100%)",
};

const PHOTO_OPACITY = 0.45;

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function MarqueeColumn({ images, className }) {
  return (
    <div className={`flex h-fit w-1/2 flex-col ${className}`}>
      {[...images, ...images].map((src, i) => (
        <div key={i} className="pb-[2.5vw]">
          <img
            src={src}
            alt=""
            loading="lazy"
            className="h-[27vw] w-full rounded-md object-cover opacity-30 brightness-75 grayscale max-[1025px]:h-[45vw] max-md:h-[55vw]"
          />
        </div>
      ))}
    </div>
  );
}

function Hero() {
  const sectionRef = useRef(null);
  const panelRef = useRef(null);
  const wallRef = useRef(null);
  const logoRevealRef = useRef(null);
  const logoRef = useRef(null);
  const textRef = useRef(null);
  const photoRef = useRef(null);
  const lenisRef = useRef(null);
  const introDone = useRef(false);
  const [reduceMotion] = useState(prefersReducedMotion);
  const [showHeadline, setShowHeadline] = useState(reduceMotion);
  const [showLabels, setShowLabels] = useState(reduceMotion);
  const lenis = useLenis();

  // Lock scrolling while the intro plays. Lenis can mount after the hero, so re-check when it appears.
  useEffect(() => {
    lenisRef.current = lenis;
    if (!introDone.current && !reduceMotion) lenis?.stop();
  }, [lenis, reduceMotion]);

  // Intro: logo wipes in diagonally, then headline, side labels, and finally the navbar drops in
  useGSAP(
    () => {
      const reveal = logoRevealRef.current;
      const photo = photoRef.current;
      if (reduceMotion) {
        gsap.set(reveal, { "--reveal": "125%", opacity: 1 });
        gsap.set(photo, { opacity: PHOTO_OPACITY });
        introDone.current = true;
        return;
      }

      const header = document.getElementById("site-header");
      const finishIntro = () => {
        introDone.current = true;
        lenisRef.current?.start();
      };

      gsap.set(header, { yPercent: -50, autoAlpha: 0 });
      gsap
        .timeline()
        .fromTo(photo, { opacity: 0 }, { opacity: PHOTO_OPACITY, duration: 2, ease: "power2.out" }, 0)
        .fromTo(reveal, { "--reveal": "-40%" }, { "--reveal": "125%", duration: 3.5, ease: "power2.out" }, 0)
        .fromTo(reveal, { opacity: 0 }, { opacity: 1, duration: 1.5, ease: "power2.out" }, 0)
        .call(() => setShowHeadline(true), undefined, 1)
        .call(() => setShowLabels(true), undefined, 1.5)
        .to(header, { yPercent: 0, autoAlpha: 1, duration: 0.8, ease: "power3.out", onComplete: finishIntro }, 1.8);

      return finishIntro;
    },
    { scope: sectionRef }
  );

  // Scroll: the hero shrinks into a card while the event photo wall behind it comes into focus
  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
      tl.to(panelRef.current, { scale: 0.5, ease: "power2.inOut", duration: 1 }, 0);

      gsap.set(wallRef.current, { filter: "blur(24px)", opacity: 0.35 });
      tl.to(wallRef.current, { filter: "blur(0px)", opacity: 1, ease: "power2.out", duration: 0.18 }, 0.32);
    },
    { scope: sectionRef }
  );

  // Mouse parallax (desktop only): three depths, photo < text < logo, all drifting away from the cursor
  useEffect(() => {
    if (window.innerWidth <= 1024 || reduceMotion) return;

    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    const onMove = (e) => {
      target.x = -((e.clientX / window.innerWidth) * 2 - 1);
      target.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    const tick = () => {
      current.x += (target.x - current.x) * 0.08;
      current.y += (target.y - current.y) * 0.08;
      gsap.set(logoRef.current, { x: current.x * 30, y: current.y * 30 });
      gsap.set(textRef.current, { x: current.x * 12, y: current.y * 12 });
      gsap.set(photoRef.current, { x: current.x * 6, y: current.y * 6 });
    };

    window.addEventListener("mousemove", onMove);
    gsap.ticker.add(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      gsap.ticker.remove(tick);
    };
  }, [reduceMotion]);

  return (
    <section ref={sectionRef} id="hero" className="relative h-[300vh] w-full bg-[#0a1128]">
      <div
        ref={panelRef}
        className="sticky top-0 z-[2] flex h-screen w-full items-center overflow-hidden px-[4vw] max-[1025px]:items-start max-[1025px]:px-[5vw] max-[1025px]:pt-[calc(72px+8vw)]"
        style={heroBackground}
      >
        {/* The 2026 team photo, tinted navy by blending its luminance into the panel background.
            Slightly oversized so the parallax drift never shows an edge. */}
        <img
          ref={photoRef}
          src="/hero-team.jpg"
          alt=""
          draggable={false}
          className="pointer-events-none absolute -left-[2%] -top-[2%] h-[104%] w-[104%] max-w-none select-none object-cover opacity-0 mix-blend-luminosity"
        />
        {/* Scrim: keeps the headline and side labels readable over faces */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(10,17,40,0.85)_0%,rgba(10,17,40,0.35)_45%,rgba(10,17,40,0.35)_60%,rgba(10,17,40,0.8)_100%)]"
        />

        <div
          ref={textRef}
          className="relative z-[1] flex w-full justify-between max-[1025px]:flex-col max-[1025px]:gap-8"
        >
          <div className="w-[34%] max-[1025px]:w-[85%] max-md:w-full">
            <TextReveal stagger={0.015} start={showHeadline} animateOnScroll={false}>
              <h1 className="text-[6vw] font-semibold leading-[1.05] tracking-tight text-white max-[1025px]:text-[12.5vw] max-md:text-[15vw]">
                The Debugging Society
              </h1>
            </TextReveal>
          </div>
          <div className="flex w-[18%] flex-col justify-between py-[1vw] text-end text-[1.6vw] leading-[1.25] text-white/90 max-[1025px]:w-[70%] max-[1025px]:gap-4 max-[1025px]:py-0 max-[1025px]:text-start max-[1025px]:text-[3.2vw] max-md:text-[4.5vw]">
            <TextReveal splitBy="lines" start={showLabels} animateOnScroll={false}>
              <p>
                We Teach, Code
                <br />
                And Compete.
              </p>
            </TextReveal>
            <TextReveal splitBy="lines" start={showLabels} animateOnScroll={false}>
              <p>
                DSA, CP &amp;
                <br />
                Development
              </p>
            </TextReveal>
          </div>
        </div>

        {/* Centred with flex rather than translate(-50%) so it can't drift when a browser drops the translate property */}
        <div className="pointer-events-none absolute inset-0 z-[2] flex items-center justify-center max-[1025px]:items-end max-[1025px]:pb-[5vh]">
          <div
            ref={logoRevealRef}
            className="hero-mask-reveal aspect-square w-[44vw] opacity-0 max-[1025px]:w-[62vw] max-md:w-[84vw]"
          >
            <div ref={logoRef} className="h-full w-full">
              <img
                src="/tds-logo-transparent.png"
                alt="The Debugging Society logo"
                draggable={false}
                fetchPriority="high"
                className="h-full w-full select-none object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      <div ref={wallRef} aria-hidden="true" className="absolute inset-0 bg-[#0a1128]">
        <div
          className="sticky top-0 flex h-screen w-full gap-[2.5vw] overflow-hidden px-[4vw]"
        >
          <MarqueeColumn images={columnOne} className="hero-marquee-1" />
          <MarqueeColumn images={columnTwo} className="hero-marquee-2" />
        </div>
      </div>
    </section>
  );
}

export default Hero;
