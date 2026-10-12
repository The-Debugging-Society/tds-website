import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { useGSAP } from "@gsap/react";
import { useLenis } from "lenis/react";
import InteractiveDots from "../ui/interactive-dots";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrambleTextPlugin);

// Terminal lines shown while the "society boots up"
const BOOT_LINES = [
  "> boot tds.nsut",
  "> load modules: dsa, cp, web, android",
  "> run tests ........ passed",
  "> 0 bugs found",
];

// Where the red crosshair sits inside the logo's square box (measured from the PNG), as fractions
const RETICLE = { x: 0.369, y: 0.5134, size: 0.0817 };
// How far the camera zooms: enough for the crosshair's centre to swallow the screen
const MAX_ZOOM = 90;
// Title layer is 5x the logo box and centred on it, so the giant name can spread across the whole screen
const TITLE_LAYER = "pointer-events-none absolute -left-[200%] -top-[200%] flex h-[500%] w-[500%] items-center justify-center";
const TITLE_TEXT =
  "w-max shrink-0 whitespace-nowrap text-center text-[15.5vw] font-semibold uppercase leading-[0.82] tracking-[-0.03em] text-white max-md:text-[16vw]";
const RETICLE_HOLE = `radial-gradient(${RETICLE.size * 52}% ${RETICLE.size * 52}% at ${RETICLE.x * 100}% ${RETICLE.y * 100}%, transparent 97%, black 100%)`;

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function Hero() {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const dotsRef = useRef(null);
  const glowRef = useRef(null);
  const bootRef = useRef(null);
  const cameraRef = useRef(null);
  const logoRef = useRef(null);
  const reticleRef = useRef(null);
  const discRef = useRef(null);
  const titleRef = useRef(null);
  // Scroll-driven layers wrap the intro-driven elements, so the two animations never touch the same element
  const ambientScrollRef = useRef(null);
  const titleScrollRef = useRef(null);
  const logoScrollRef = useRef(null);
  const labelsScrollRef = useRef(null);
  const labelsRef = useRef(null);
  const barsRef = useRef(null);
  const blackoutRef = useRef(null);
  const lenisRef = useRef(null);
  const introDone = useRef(false);
  const [reduceMotion] = useState(prefersReducedMotion);
  const lenis = useLenis();

  // Lock scrolling while the intro plays. Lenis can mount after the hero, so re-check when it appears.
  useEffect(() => {
    lenisRef.current = lenis;
    if (!introDone.current && !reduceMotion) lenis?.stop();
  }, [lenis, reduceMotion]);

  // Opening sequence: letterbox, boot log, neon power-on, film-title reveal, then the bars retract
  useGSAP(
    () => {
      const header = document.getElementById("site-header");
      const bars = barsRef.current.children;
      if (reduceMotion) {
        gsap.set(bars, { scaleY: 0 });
        gsap.set(bootRef.current, { autoAlpha: 0 });
        introDone.current = true;
        return;
      }

      const finishIntro = () => {
        introDone.current = true;
        lenisRef.current?.start();
      };
      const lines = bootRef.current.querySelectorAll("p");

      gsap.set(header, { yPercent: -100, autoAlpha: 0 });
      gsap.set([logoRef.current, reticleRef.current, discRef.current, glowRef.current, dotsRef.current, labelsRef.current], { autoAlpha: 0 });
      // padding-left mirrors the letter-spacing (which trails after the last letter) so the title stays centred
      const titles = titleRef.current;
      gsap.set(titles, { autoAlpha: 0, letterSpacing: "0.35em", paddingLeft: "0.35em", filter: "blur(20px)" });

      const tl = gsap.timeline({ delay: 0.3 });
      lines.forEach((line, i) => {
        tl.to(line, { scrambleText: { text: line.dataset.text, chars: "01<>/_", speed: 0.9 }, duration: 0.42, ease: "none" }, i * 0.32);
      });
      tl.to(bootRef.current, { autoAlpha: 0, y: -12, duration: 0.4, ease: "power2.in" }, "+=0.25")
        // Neon tube flickering on
        .to([logoRef.current, reticleRef.current, discRef.current], {
          keyframes: [
            { autoAlpha: 0.9, duration: 0.05 },
            { autoAlpha: 0.1, duration: 0.07 },
            { autoAlpha: 1, duration: 0.05 },
            { autoAlpha: 0.3, duration: 0.1 },
            { autoAlpha: 1, duration: 0.06 },
          ],
        })
        .fromTo(glowRef.current, { autoAlpha: 0, scale: 0.6 }, { autoAlpha: 1, scale: 1, duration: 1.4, ease: "expo.out" }, "<")
        .to(dotsRef.current, { autoAlpha: 1, duration: 1.2, ease: "power2.out" }, "<0.1")
        // Film title: letters track in from wide spacing, out of focus
        .to(titles, { autoAlpha: 1, letterSpacing: "-0.03em", paddingLeft: "0em", filter: "blur(0px)", duration: 1.8, ease: "expo.out" }, "<0.15")
        .to(labelsRef.current, { autoAlpha: 1, duration: 0.8, ease: "power2.out" }, "<0.9")
        .to(bars, { scaleY: 0, duration: 1, ease: "power3.inOut" }, "<0.1")
        .to(header, { yPercent: 0, autoAlpha: 1, duration: 0.8, ease: "power3.out", onComplete: finishIntro }, "<0.5");

      return finishIntro;
    },
    { scope: sectionRef }
  );

  // Scroll: the camera pushes into the crosshair and flies through it.
  // The whole scene is a pure function of scroll progress, recomputed every frame, so it can never get
  // out of sync with the scroll position (no recorded start states that a refresh could corrupt).
  useGSAP(
    () => {
      if (reduceMotion) return;
      gsap.set(cameraRef.current, { transformOrigin: `${RETICLE.x * 100}% ${RETICLE.y * 100}%` });
      const clamp01 = (v) => Math.min(1, Math.max(0, v));
      const zoomAt = (scale) => Math.log(scale) / Math.log(MAX_ZOOM);

      const apply = (p) => {
        const c = p * p; // camera eases in: slow push that accelerates
        gsap.set(cameraRef.current, { scale: Math.pow(MAX_ZOOM, c), rotation: c * 12 });
        const t = clamp01(p / 0.18);
        gsap.set(titleScrollRef.current, { autoAlpha: 1 - t, scale: 1 + 0.12 * t, filter: `blur(${10 * t}px)` });
        gsap.set(labelsScrollRef.current, { autoAlpha: 1 - clamp01(p / 0.1) });
        gsap.set(ambientScrollRef.current, { autoAlpha: 1 - clamp01((p - 0.15) / 0.3) });
        // The logo fades as the camera passes it; the vector crosshair stays sharp the whole way
        gsap.set(logoScrollRef.current, { autoAlpha: 1 - clamp01((c - zoomAt(3.5)) / (zoomAt(8) - zoomAt(3.5))) });
        gsap.set(blackoutRef.current, { autoAlpha: clamp01((p - 0.88) / 0.12) });
      };

      // A proxy number follows the scroll with a little smoothing; every update re-applies the scene
      const camera = { p: 0 };
      apply(0);
      gsap.to(camera, {
        p: 1,
        ease: "none",
        onUpdate: () => apply(camera.p),
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
          onRefresh: (self) => apply(self.progress),
        },
      });
    },
    { scope: sectionRef }
  );

  // Mouse parallax (desktop only): the logo and its title drift away from the cursor
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
      gsap.set(logoRef.current?.parentElement, { x: current.x * 24, y: current.y * 24 });
    };
    window.addEventListener("mousemove", onMove);
    gsap.ticker.add(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      gsap.ticker.remove(tick);
    };
  }, [reduceMotion]);

  return (
    <section ref={sectionRef} id="hero" className={`relative w-full bg-[#03050c] ${reduceMotion ? "h-screen" : "h-[350vh]"}`}>
      <div ref={stageRef} className="hero-bg sticky top-0 h-screen w-full overflow-hidden">
        <div ref={ambientScrollRef} className="absolute inset-0">
        <div ref={dotsRef} className="absolute inset-0">
          <InteractiveDots />
        </div>
        <div
          ref={glowRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
        >
          {/* Slowly breathes and drifts so the hero is never completely still */}
          <div className="hero-breathe absolute inset-0 bg-[radial-gradient(38%_42%_at_50%_44%,rgba(37,99,235,0.35),rgba(37,99,235,0)_100%)]" />
          <div className="hero-drift absolute inset-0 bg-[radial-gradient(26%_30%_at_62%_58%,rgba(59,130,246,0.18),rgba(59,130,246,0)_100%)]" />
        </div>
        </div>

        {/* Boot log */}
        <div
          ref={bootRef}
          aria-hidden="true"
          className="absolute inset-0 z-[3] flex flex-col items-start justify-center gap-2 px-[30vw] font-mono text-[1.05vw] text-white/80 max-[1025px]:px-[10vw] max-[1025px]:text-[2.6vw] max-md:text-[3.4vw]"
        >
          {BOOT_LINES.map((line, i) => (
            <p key={line} data-text={line} className={`min-h-[1.5em] ${i === BOOT_LINES.length - 1 ? "text-[#3b82f6]" : ""}`} />
          ))}
        </div>

        {/* Camera: everything inside zooms into the crosshair on scroll */}
        <div className="pointer-events-none absolute inset-0 z-[2] flex flex-col items-center justify-center pb-[6vh]">
          <div ref={cameraRef} className="relative aspect-square w-[min(34vw,52vh)] max-[1025px]:w-[min(44vw,36vh)] max-md:w-[min(48vw,30vh)]">
            <div className="relative h-full w-full">
              {/* The full name, huge, sitting behind the logo */}
              <div ref={titleScrollRef} className={TITLE_LAYER}>
                <h1 ref={titleRef} className={TITLE_TEXT}>
                  The
                  <br />
                  Debugging
                  <br />
                  Society
                </h1>
              </div>

              {/* Dark disc behind the logo's ring (with a soft feathered edge) so the name doesn't show
                  through the logo's see-through gaps: the logo reads as a badge set into the type */}
              <div
                ref={discRef}
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(35% 35% at 50.5% 50%, rgba(37,99,235,0.22) 0%, rgba(37,99,235,0) 100%), radial-gradient(37% 37% at 50.5% 50%, #040a1c 88%, rgba(4,10,28,0) 100%)",
                }}
              />

              {/* Logo above the name. Glow is applied around the masked image, so the cut-out doesn't punch a dark hole in it */}
              <div ref={logoScrollRef} className="relative h-full w-full drop-shadow-[0_0_28px_rgba(59,130,246,0.45)]">
                <img
                  ref={logoRef}
                  src="/tds-logo-transparent.png"
                  alt="The Debugging Society logo"
                  draggable={false}
                  fetchPriority="high"
                  className="h-full w-full select-none object-contain"
                  // Cut the image's own crosshair out: the vector copy below replaces it, so there is only ever one
                  style={{ WebkitMaskImage: RETICLE_HOLE, maskImage: RETICLE_HOLE }}
                />
              </div>

              {/* Vector copy of the logo's crosshair: stays sharp at any zoom */}
              <svg
                ref={reticleRef}
                viewBox="0 0 100 100"
                aria-hidden="true"
                className="absolute"
                style={{
                  left: `${(RETICLE.x - RETICLE.size / 2) * 100}%`,
                  top: `${(RETICLE.y - RETICLE.size / 2) * 100}%`,
                  width: `${RETICLE.size * 100}%`,
                  height: `${RETICLE.size * 100}%`,
                }}
              >
                <g fill="none" stroke="#c9302c" strokeLinecap="round">
                  <circle cx="50" cy="50" r="33" strokeWidth="7" />
                  <path d="M50 4v24M50 72v24M4 50h24M72 50h24" strokeWidth="7" />
                </g>
              </svg>
            </div>
          </div>
        </div>

        {/* Corner lines */}
        <div ref={labelsScrollRef} className="pointer-events-none absolute inset-0 z-[3]">
        <div
          ref={labelsRef}
          className="absolute inset-x-[4vw] bottom-[3.5vw] z-[3] flex items-end justify-between font-mono text-[1.05vw] leading-[1.4] text-white/75 max-[1025px]:inset-x-[5vw] max-[1025px]:bottom-[6vw] max-[1025px]:text-[2.6vw] max-md:text-[3.2vw]"
        >
          <p>
            We Teach, Code
            <br />
            And Compete.
            <span className="term-cursor" aria-hidden="true" />
          </p>
          <p className="text-end">
            DSA, CP &amp;
            <br />
            Development
          </p>
        </div>
        </div>

        {/* Cinema letterbox bars, retract when the intro ends */}
        <div ref={barsRef} aria-hidden="true" className="pointer-events-none absolute inset-0 z-[6]">
          <div className="absolute inset-x-0 top-0 h-[12vh] origin-top bg-black" />
          <div className="absolute inset-x-0 bottom-0 h-[12vh] origin-bottom bg-black" />
        </div>

        {/* Fade to black as the camera passes through the crosshair */}
        <div ref={blackoutRef} aria-hidden="true" className="pointer-events-none absolute inset-0 z-[5] bg-[#03050c] opacity-0" />
      </div>
    </section>
  );
}

export default Hero;
