// Shown for the first moments of a visit while the app settles: the logo over the navy surface,
// with a thin line that fills across the screen
export function Loader() {
  return (
    <div
      role="status"
      aria-label="Loading"
      className="surface fixed inset-0 z-50 flex flex-col items-center justify-center gap-8"
      style={{ '--glow-pos': '50% 50%', '--glow-size': '45% 45%' }}
    >
      <img
        src="/tds-logo-transparent.png"
        alt="The Debugging Society"
        className="loader-logo w-[min(28vw,180px)]"
      />
      <div aria-hidden="true" className="h-px w-[min(40vw,240px)] overflow-hidden bg-white/15">
        <div className="loader-bar h-full w-full bg-[#3b82f6]" />
      </div>
    </div>
  );
}
