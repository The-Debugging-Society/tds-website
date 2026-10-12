import { useEffect, useRef } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "lenis/dist/lenis.css";

gsap.registerPlugin(ScrollTrigger);

// Lenis tuning: a softer, longer glide than the default (lerp 0.1), slightly gentler wheel steps,
// in-page #anchor links scroll smoothly too. Lenis turns itself off for reduced-motion users.
const LENIS_OPTIONS = {
  autoRaf: false, // driven by GSAP's ticker below, so ScrollTrigger and Lenis share one clock
  lerp: 0.07,
  wheelMultiplier: 0.9,
  touchMultiplier: 1.4,
  smoothWheel: true,
  anchors: true,
};

// Site-wide Lenis smooth scroll, driven by GSAP's ticker so ScrollTrigger stays in sync
export default function SmoothScroll({ children }) {
  const lenisRef = useRef(null);

  useLenis(ScrollTrigger.update);

  useEffect(() => {
    const update = (time) => lenisRef.current?.lenis?.raf(time * 1000);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    return () => gsap.ticker.remove(update);
  }, []);

  // Pinned sections cache their scroll positions. Re-measure whenever the page height changes
  // (late fonts, images, content edits) so pins never start in the wrong place.
  useEffect(() => {
    let last = document.body.scrollHeight;
    let timer;
    const refresh = () => {
      ScrollTrigger.refresh();
      last = document.body.scrollHeight;
    };
    const observer = new ResizeObserver(() => {
      if (Math.abs(document.body.scrollHeight - last) < 2) return;
      clearTimeout(timer);
      timer = setTimeout(refresh, 250);
    });
    observer.observe(document.body);
    document.fonts?.ready.then(refresh);
    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, []);

  return (
    <ReactLenis root options={LENIS_OPTIONS} ref={lenisRef}>
      {children}
    </ReactLenis>
  );
}
