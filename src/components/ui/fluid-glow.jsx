import { useEffect, useRef } from "react";

// Flowing "ink in water" field: fractal noise warped by itself (domain warping), coloured with the
// TDS blues, fading to the page colour towards the top. The cursor gently stirs the flow near it.
const FRAGMENT = `
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;
uniform float uMouseStrength;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  mat2 rot = mat2(0.8, 0.6, -0.6, 0.8);
  for (int i = 0; i < 5; i++) { v += a * noise(p); p = rot * p * 2.0; a *= 0.5; }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes;          // 0..1, y up
  vec2 p = vec2(uv.x * uRes.x / uRes.y, uv.y) * 1.6;
  float t = uTime * 0.06;

  // Cursor stirs the field: a soft swirl around the pointer
  vec2 m = vec2(uMouse.x * uRes.x / uRes.y, uMouse.y) * 1.6;
  vec2 d = p - m;
  float near = exp(-dot(d, d) * 3.0) * uMouseStrength;
  p += vec2(-d.y, d.x) * near * 0.6;

  vec2 q = vec2(fbm(p + vec2(0.0, t)), fbm(p + vec2(5.2, 1.3) - t));
  vec2 r = vec2(fbm(p + 3.0 * q + vec2(1.7, 9.2) + t * 1.4), fbm(p + 3.0 * q + vec2(8.3, 2.8) - t * 1.1));
  float f = fbm(p + 3.0 * r);

  vec3 page = vec3(0.012, 0.02, 0.047);       // #03050c
  vec3 deep = vec3(0.04, 0.16, 0.48);         // deep royal
  vec3 blue = vec3(0.15, 0.39, 0.92);         // #2563eb
  vec3 light = vec3(0.45, 0.66, 1.0);         // pale highlight in the brightest folds

  vec3 col = mix(deep, blue, smoothstep(0.25, 0.85, f));
  col = mix(col, light, smoothstep(0.62, 0.95, f * length(r)) * 0.55);

  // Light rises from the bottom: strong at the base, gone by ~60% height, with the currents
  // pushing the edge up and down so the top boundary flows too
  float rise = smoothstep(0.62 + (f - 0.5) * 0.35, 0.0, uv.y);
  col = mix(page, col, rise * (0.55 + 0.6 * f));
  gl_FragColor = vec4(col, 1.0);
}
`;

const VERTEX = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`;

export default function FluidGlow({ className = "" }) {
  const canvasRef = useRef(null);
  const fallbackRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas.getContext("webgl", { antialias: false, premultipliedAlpha: false });
    if (!gl) {
      fallbackRef.current.style.display = "block";
      return;
    }

    const compile = (type, src) => {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const program = gl.createProgram();
    gl.attachShader(program, compile(gl.VERTEX_SHADER, VERTEX));
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, FRAGMENT));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      fallbackRef.current.style.display = "block";
      return;
    }
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(program, "aPos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(program, "uRes");
    const uTime = gl.getUniformLocation(program, "uTime");
    const uMouse = gl.getUniformLocation(program, "uMouse");
    const uMouseStrength = gl.getUniformLocation(program, "uMouseStrength");

    // Rendered at reduced resolution: the field is soft, so this is invisible and much cheaper
    const SCALE = 0.5;
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.round(rect.width * SCALE));
      canvas.height = Math.max(1, Math.round(rect.height * SCALE));
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uRes, canvas.width, canvas.height);
    };
    resize();

    const mouse = { x: 0.5, y: 0.2, tx: 0.5, ty: 0.2, s: 0, ts: 0 };
    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const inside = e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;
      mouse.tx = (e.clientX - rect.left) / rect.width;
      mouse.ty = 1 - (e.clientY - rect.top) / rect.height;
      mouse.ts = inside ? 1 : 0;
    };

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const start = performance.now() - 20000; // start mid-flow, not from a uniform first frame
    let frame = null;
    let visible = false;

    const draw = (now) => {
      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;
      mouse.s += (mouse.ts - mouse.s) * 0.04;
      gl.uniform1f(uTime, (now - start) / 1000);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.uniform1f(uMouseStrength, mouse.s);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };
    const loop = (now) => {
      draw(now);
      frame = visible ? requestAnimationFrame(loop) : null;
    };

    // Only animate while the footer is on screen
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (reduce) {
        if (visible) draw(start + 20000);
        return;
      }
      if (visible && !frame) frame = requestAnimationFrame(loop);
    });
    observer.observe(canvas);

    const ro = new ResizeObserver(() => {
      resize();
      if (reduce || !visible) draw(performance.now());
    });
    ro.observe(canvas);
    window.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      observer.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div aria-hidden="true" className={`pointer-events-none ${className}`}>
      <canvas ref={canvasRef} className="h-full w-full" />
      {/* Static gradient if WebGL is unavailable */}
      <div ref={fallbackRef} className="footer-glow absolute inset-0" style={{ display: "none" }} />
    </div>
  );
}
