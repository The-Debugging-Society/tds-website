import { Link } from 'react-router-dom';
import PillButton from '../components/ui/pill-button';

// Rendered outside the main layout (no navbar or footer), so it carries its own way home
const NotFound = () => {
  return (
    <main
      className="surface flex min-h-[100dvh] flex-col justify-between px-[4vw] py-[3vw] text-white max-[1025px]:px-[5vw] max-[1025px]:py-[6vw]"
      style={{ '--glow-pos': '70% 40%', '--glow-size': '55% 50%' }}
    >
      <Link to="/" aria-label="The Debugging Society home" className="w-fit">
        <img src="/tds-logo-transparent.png" alt="The Debugging Society logo" className="h-11 w-auto" />
      </Link>

      <div>
        <p className="font-mono text-[1.1vw] font-medium text-[#3b82f6] max-[1025px]:text-[3vw] max-md:text-[4.2vw]">Page not found</p>
        <h1 className="mt-[0.5vw] text-[22vw] font-semibold leading-[0.85] tracking-tighter max-md:text-[38vw]">404</h1>
        <p className="mt-[2vw] max-w-[42ch] text-[1.4vw] leading-[1.5] text-white/75 max-[1025px]:mt-[4vw] max-[1025px]:text-[3vw] max-md:text-[4.4vw]">
          This page doesn&apos;t exist. It may have moved, or the link may have a typo. Even the best of us ship bugs.
        </p>
        <div className="mt-[3vw] max-[1025px]:mt-[6vw]">
          <PillButton to="/">Back to home</PillButton>
        </div>
      </div>

      <p className="text-sm text-white/50">The Debugging Society, NSUT</p>
    </main>
  );
};

export default NotFound;
