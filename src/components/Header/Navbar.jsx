import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { IconMenu2, IconX } from "@tabler/icons-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLenis } from "lenis/react";
import PillButton from "../ui/pill-button";
import { NAV_HEIGHT, WHATSAPP_URL } from "../../lib/constants";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const links = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Events", path: "/events" },
  { name: "Alumni", path: "/alumni" },
  { name: "Resources", path: "/resources" },
];

const Navbar = () => {
  const headerRef = useRef(null);
  const hiddenRef = useRef(false);
  const menuOpenRef = useRef(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const lenis = useLenis();
  const isHome = pathname === "/" || pathname === "/home";
  // Transparent over the Home hero; everywhere else (and once scrolled) it gets a blurred navy backing
  const solid = !isHome || scrolled || menuOpen;

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          const y = self.scroll();
          const past = y > window.innerHeight * 0.4;
          setScrolled((prev) => (prev === past ? prev : past));

          // Hide while scrolling down, reveal on any scroll up; never hide near the top or with the menu open
          const shouldHide = self.direction === 1 && y > NAV_HEIGHT && !menuOpenRef.current;
          if (shouldHide === hiddenRef.current) return;
          hiddenRef.current = shouldHide;
          gsap.to(headerRef.current, { yPercent: shouldHide ? -100 : 0, duration: reduce ? 0 : 0.5, ease: "power3.out" });
        },
      });
    },
    { scope: headerRef }
  );

  const showHeader = () => {
    hiddenRef.current = false;
    gsap.to(headerRef.current, { yPercent: 0, duration: 0.3, ease: "power3.out" });
  };

  // Freeze the page behind the open menu
  useEffect(() => {
    menuOpenRef.current = menuOpen;
    if (menuOpen) lenis?.stop();
    else lenis?.start();
  }, [menuOpen, lenis]);

  const toggleMenu = () => {
    if (!menuOpen) showHeader();
    setMenuOpen((open) => !open);
  };
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header
        ref={headerRef}
        id="site-header"
        className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between px-[4vw] text-white transition-[background-color,backdrop-filter] duration-500 ease-out max-[1025px]:px-[5vw] ${
          solid ? "bg-[#03050c]/80 backdrop-blur-lg" : "bg-transparent"
        }`}
        style={{ height: NAV_HEIGHT }}
      >
        <Link to="/" onClick={closeMenu} aria-label="The Debugging Society home" className="shrink-0">
          <img src="/tds-logo-transparent.png" alt="The Debugging Society logo" className="h-11 w-auto" />
        </Link>

        <nav aria-label="Main" className="max-lg:hidden">
          <ul className="flex items-center gap-[2.2vw] font-mono text-[13px] uppercase tracking-[0.08em]">
            {links.map((link) => (
              <li key={link.name}>
                <NavLink
                  to={link.path}
                  end={link.path === "/"}
                  className={({ isActive }) =>
                    `link-underline pb-0.5 transition-colors duration-300 ${isActive ? "text-white" : "text-white/70 hover:text-white"}`
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-4">
          <div className="max-lg:hidden">
            <PillButton href={WHATSAPP_URL}>Join the community</PillButton>
          </div>
          <button
            type="button"
            onClick={toggleMenu}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="flex size-11 items-center justify-center rounded-full border border-white/25 lg:hidden"
          >
            {menuOpen ? <IconX size={20} stroke={1.6} /> : <IconMenu2 size={20} stroke={1.6} />}
          </button>
        </div>
      </header>

      {/* Mobile menu: opens as a circle growing from the menu button, links rise in one after another */}
      <div
        id="mobile-menu"
        aria-hidden={!menuOpen}
        inert={!menuOpen}
        className="fixed inset-0 z-40 flex flex-col justify-between surface px-[6vw] pb-[10vw] text-white transition-[clip-path] duration-700 ease-[cubic-bezier(0.85,0,0.15,1)] motion-reduce:transition-none lg:hidden"
        style={{
          paddingTop: NAV_HEIGHT + 32,
          clipPath: menuOpen ? "circle(150% at calc(100% - 46px) 36px)" : "circle(0% at calc(100% - 46px) 36px)",
        }}
      >
        <nav aria-label="Mobile">
          <ul className="flex flex-col gap-[3vw]">
            {links.map((link, i) => (
              <li
                key={link.name}
                className="transition-[opacity,transform] duration-500 ease-out motion-reduce:transition-none"
                style={{
                  opacity: menuOpen ? 1 : 0,
                  transform: menuOpen ? "translateY(0)" : "translateY(24px)",
                  transitionDelay: menuOpen ? `${0.25 + i * 0.06}s` : "0s",
                }}
              >
                <NavLink
                  to={link.path}
                  end={link.path === "/"}
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `text-[11vw] font-semibold leading-[1.15] tracking-tight ${isActive ? "text-white" : "text-white/60"}`
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div
          className="transition-opacity duration-500 motion-reduce:transition-none"
          style={{ opacity: menuOpen ? 1 : 0, transitionDelay: menuOpen ? "0.6s" : "0s" }}
        >
          <PillButton href={WHATSAPP_URL}>Join the community</PillButton>
        </div>
      </div>
    </>
  );
};

export default Navbar;
