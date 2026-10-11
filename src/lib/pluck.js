// Soft acoustic-guitar pluck, synthesised with the Karplus-Strong algorithm: a burst of noise fed
// through a delay line whose length sets the pitch, averaged each pass so it decays like a real
// string. A wooden-body resonance and a small room reverb make it sound acoustic. No audio files.

// C major 7 / add9 voicing in guitar range (C3 to E5): any run of strings sounds like a calm strum
const NOTES = [130.81, 164.81, 196.0, 246.94, 293.66, 329.63, 392.0, 493.88, 587.33, 659.25];
const RING = 3.4; // seconds each note rings for

let ctx = null;
let input = null;

// A short, dark, decaying noise burst used as the impulse of a small wooden room
function roomImpulse(ac) {
  const len = Math.floor(ac.sampleRate * 2.4);
  const buf = ac.createBuffer(2, len, ac.sampleRate);
  for (let ch = 0; ch < 2; ch += 1) {
    const data = buf.getChannelData(ch);
    let lp = 0;
    for (let i = 0; i < len; i += 1) {
      lp += ((Math.random() * 2 - 1) - lp) * 0.25; // darken the tail
      data[i] = lp * Math.pow(1 - i / len, 3);
    }
  }
  return buf;
}

function getContext() {
  if (!ctx) {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return null;
    ctx = new AudioCtx();

    // Guitar body: gentle boosts at the air and wood resonances, a little cut in the boxy mids
    input = ctx.createGain();
    const air = ctx.createBiquadFilter();
    air.type = "peaking";
    air.frequency.value = 110;
    air.Q.value = 1.2;
    air.gain.value = 5;
    const wood = ctx.createBiquadFilter();
    wood.type = "peaking";
    wood.frequency.value = 240;
    wood.Q.value = 1.4;
    wood.gain.value = 3;
    const box = ctx.createBiquadFilter();
    box.type = "peaking";
    box.frequency.value = 900;
    box.Q.value = 0.9;
    box.gain.value = -3;
    const soft = ctx.createBiquadFilter();
    soft.type = "lowpass";
    soft.frequency.value = 3200;
    input.connect(air).connect(wood).connect(box).connect(soft);

    // Mostly dry with a soft room behind it
    const dry = ctx.createGain();
    dry.gain.value = 0.8;
    const wet = ctx.createGain();
    wet.gain.value = 0.3;
    const reverb = ctx.createConvolver();
    reverb.buffer = roomImpulse(ctx);
    const master = ctx.createGain();
    master.gain.value = 0.35;
    soft.connect(dry).connect(master);
    soft.connect(reverb).connect(wet).connect(master);
    master.connect(ctx.destination);
  }
  // Browsers only allow audio after the visitor has interacted with the page (a click, tap or key)
  if (ctx.state === "suspended") ctx.resume().catch(() => {});
  return ctx;
}

/**
 * Pluck string number `index` (picks a note from the chord) with a `strength` from 0 to 1.
 */
export function pluck(index, strength) {
  const ac = getContext();
  if (!ac || ac.state !== "running" || strength < 0.05) return;

  // Even hard bends stay gentle: the range is deliberately narrow
  const force = 0.35 + Math.min(1, strength) * 0.35;
  const freq = NOTES[index % NOTES.length] * (1 + (Math.random() - 0.5) * 0.003);
  const rate = ac.sampleRate;
  const period = Math.max(2, Math.round(rate / freq));
  const length = Math.floor(rate * RING);
  const buffer = ac.createBuffer(1, length, rate);
  const out = buffer.getChannelData(0);

  // Excitation: heavily smoothed noise, like a fingertip rather than a pick
  const line = new Float32Array(period);
  let prev = 0;
  for (let i = 0; i < period; i += 1) {
    prev += ((Math.random() * 2 - 1) - prev) * 0.12;
    line[i] = prev;
  }
  // Pluck position: subtracting a shifted copy removes harmonics, as plucking near the middle does
  const shift = Math.max(1, Math.round(period / 5));
  const shaped = line.map((v, i) => v - line[(i + shift) % period] * 0.6);
  line.set(shaped);

  // Each pass averages neighbours (highs fade first); decay close to 1 lets it ring long and warm
  const decay = 0.9985;
  for (let i = 0, p = 0; i < length; i += 1) {
    const next = (p + 1) % period;
    const sample = line[p];
    line[p] = (sample + line[next]) * 0.5 * decay;
    out[i] = sample;
    p = next;
  }

  const source = ac.createBufferSource();
  source.buffer = buffer;
  const gain = ac.createGain();
  const now = ac.currentTime;
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(force, now + 0.012); // soft attack, no click
  gain.gain.exponentialRampToValueAtTime(0.0001, now + RING);
  // Slight left/right spread across the strings, like sitting in front of the guitar
  const pan = ac.createStereoPanner ? ac.createStereoPanner() : null;

  source.connect(gain);
  if (pan) {
    pan.pan.value = ((index % NOTES.length) / (NOTES.length - 1) - 0.5) * 0.5;
    gain.connect(pan).connect(input);
  } else {
    gain.connect(input);
  }
  source.start(now);
  source.stop(now + RING);
  source.onended = () => {
    source.disconnect();
    gain.disconnect();
    pan?.disconnect();
  };
}

// Unlock audio on the first interaction anywhere, so hover plucks work from then on
if (typeof window !== "undefined") {
  const unlock = () => {
    getContext();
    window.removeEventListener("pointerdown", unlock);
    window.removeEventListener("keydown", unlock);
  };
  window.addEventListener("pointerdown", unlock);
  window.addEventListener("keydown", unlock);
}
