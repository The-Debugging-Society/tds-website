import { useEffect, useRef } from "react";
import gsap from "gsap";

const SPACING = 22; // px between dots
const RADIUS = 150; // px of cursor influence
const PUSH = 22; // how hard dots are pushed away from the cursor
const DRAG = 0.35; // how much cursor movement drags dots along (the "wake")
const SPRING = 0.06; // pull back to rest
const DAMPING = 0.86; // < 1: settles with a little overshoot
const PING_EVERY = [2600, 4200]; // ms between idle "debug pings" (random within this range)
const PING_SPEED = 0.28; // px per ms the ping ring expands
const PING_LIFE = 2200; // ms a ping lasts

/**
 * Canvas dot grid that behaves like a fluid surface: dots near the pointer are pushed aside
 * and dragged along its path, then spring back. Dots glow blue near the pointer and fade out
 * towards the edges. Taps on touch screens send out a ripple. Static under reduced motion.
 */
export default function InteractiveDots({ className = "" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let dots = [];
    let width = 0;
    let height = 0;
    let visible = true;
    const pointer = { x: -9999, y: -9999, vx: 0, vy: 0, active: false };
    // Idle motion: a slow wave of light across the grid, plus occasional ripples ("pings")
    const pings = [];
    let nextPing = performance.now() + 1500;
    let now = performance.now();

    const build = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      dots = [];
      const cols = Math.ceil(width / SPACING) + 1;
      const rows = Math.ceil(height / SPACING) + 1;
      const offX = (width - (cols - 1) * SPACING) / 2;
      const offY = (height - (rows - 1) * SPACING) / 2;
      for (let r = 0; r < rows; r += 1) {
        for (let c = 0; c < cols; c += 1) {
          const x = offX + c * SPACING;
          const y = offY + r * SPACING;
          // Elliptical fade: strong in the middle, gone at the edges
          const ex = (x - width / 2) / (width * 0.6);
          const ey = (y - height / 2) / (height * 0.65);
          const fade = Math.max(0, 1 - Math.sqrt(ex * ex + ey * ey));
          if (fade <= 0.02) continue;
          dots.push({ hx: x, hy: y, x, y, vx: 0, vy: 0, fade });
        }
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      for (const d of dots) {
        const dx = d.x - pointer.x;
        const dy = d.y - pointer.y;
        const cursor = pointer.active ? Math.max(0, 1 - Math.sqrt(dx * dx + dy * dy) / RADIUS) : 0;
        // Slow diagonal wave of light rolling across the grid
        const wave = reduce ? 0 : Math.max(0, Math.sin(d.hx * 0.0045 + d.hy * 0.003 - now * 0.0009)) ** 6 * 0.5;
        // Ping rings: bright where the expanding ring currently passes
        let ping = 0;
        for (const p of pings) {
          const age = now - p.t;
          const ring = Math.abs(Math.hypot(d.hx - p.x, d.hy - p.y) - age * PING_SPEED);
          if (ring < 28) ping = Math.max(ping, (1 - ring / 28) * (1 - age / PING_LIFE));
        }
        const near = Math.min(1, cursor + ping);
        const alpha = Math.min(1, d.fade * 0.32 + near * 0.75 + wave * d.fade);
        // White far away, TDS blue near the cursor
        const g = Math.round(255 - near * 125);
        const b = Math.round(255 - near * 9);
        const rch = Math.round(255 - near * 196);
        ctx.fillStyle = `rgba(${rch},${g},${b},${alpha})`;
        const size = 1.4 + near * 1.6;
        ctx.fillRect(d.x - size / 2, d.y - size / 2, size, size);
      }
    };

    const step = () => {
      if (!visible) return;
      now = performance.now();
      if (now > nextPing) {
        // Pings start near the middle third of the grid, where the dots are visible
        pings.push({ x: width * (0.2 + Math.random() * 0.6), y: height * (0.2 + Math.random() * 0.6), t: now });
        nextPing = now + PING_EVERY[0] + Math.random() * (PING_EVERY[1] - PING_EVERY[0]);
      }
      while (pings.length && now - pings[0].t > PING_LIFE) pings.shift();
      for (const d of dots) {
        // The ping ring gives the dots it passes a small outward nudge
        for (const p of pings) {
          const dx = d.x - p.x;
          const dy = d.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          const age = now - p.t;
          const ring = Math.abs(dist - age * PING_SPEED);
          if (ring < 20) {
            const f = (1 - ring / 20) * (1 - age / PING_LIFE) * 0.35;
            d.vx += (dx / dist) * f;
            d.vy += (dy / dist) * f;
          }
        }
        if (pointer.active) {
          const dx = d.x - pointer.x;
          const dy = d.y - pointer.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          if (dist < RADIUS) {
            const f = (1 - dist / RADIUS) ** 2;
            d.vx += (dx / dist) * f * PUSH * 0.1 + pointer.vx * f * DRAG;
            d.vy += (dy / dist) * f * PUSH * 0.1 + pointer.vy * f * DRAG;
          }
        }
        d.vx = (d.vx + (d.hx - d.x) * SPRING) * DAMPING;
        d.vy = (d.vy + (d.hy - d.y) * SPRING) * DAMPING;
        d.x += d.vx;
        d.y += d.vy;
      }
      // Pointer velocity decays so a still cursor stops dragging the surface
      pointer.vx *= 0.8;
      pointer.vy *= 0.8;
      draw();
    };

    const toLocal = (clientX, clientY) => {
      const rect = canvas.getBoundingClientRect();
      return { x: clientX - rect.left, y: clientY - rect.top, inside: clientX >= rect.left && clientX <= rect.right && clientY >= rect.top && clientY <= rect.bottom };
    };

    const onMove = (e) => {
      const p = toLocal(e.clientX, e.clientY);
      if (pointer.active) {
        pointer.vx = p.x - pointer.x;
        pointer.vy = p.y - pointer.y;
      }
      pointer.x = p.x;
      pointer.y = p.y;
      pointer.active = p.inside;
    };
    const onLeave = () => {
      pointer.active = false;
    };
    // Touch: a tap kicks every nearby dot outwards once
    const onTap = (e) => {
      const p = toLocal(e.clientX, e.clientY);
      if (!p.inside) return;
      for (const d of dots) {
        const dx = d.x - p.x;
        const dy = d.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        if (dist < RADIUS * 1.6) {
          const f = 1 - dist / (RADIUS * 1.6);
          d.vx += (dx / dist) * f * 9;
          d.vy += (dy / dist) * f * 9;
        }
      }
    };

    build();
    draw();
    if (reduce) {
      const onResize = () => {
        build();
        draw();
      };
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    }

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    observer.observe(canvas);

    const onResize = () => build();
    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    window.addEventListener("pointerdown", onTap, { passive: true });
    gsap.ticker.add(step);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("pointerdown", onTap);
      gsap.ticker.remove(step);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} />;
}
