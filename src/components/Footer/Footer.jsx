import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { IconBrandInstagram, IconBrandLinkedin, IconBrandWhatsapp } from '@tabler/icons-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import PillButton from '../ui/pill-button'
import { WHATSAPP_URL } from '../../lib/constants'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const links = [
  { name: 'About Us', path: '/about' },
  { name: 'Events', path: '/events' },
  { name: 'Alumni', path: '/alumni' },
  { name: 'Resources', path: '/resources' },
]

const socials = [
  { icon: IconBrandInstagram, href: 'https://www.instagram.com/thedebuggingsocietynsut/', label: 'Instagram' },
  { icon: IconBrandLinkedin, href: 'https://www.linkedin.com/company/thedebuggingsocietynsut/', label: 'LinkedIn' },
  { icon: IconBrandWhatsapp, href: WHATSAPP_URL, label: 'WhatsApp' },
]

const Footer = () => {
  const year = new Date().getFullYear()
  const footerRef = useRef(null)
  const cardRef = useRef(null)

  // Desktop: the card rises into place as the footer scrolls in
  useGSAP(
    () => {
      if (window.innerWidth <= 1025 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      gsap.fromTo(
        cardRef.current,
        { yPercent: 20 },
        {
          yPercent: 0,
          ease: 'power1.out',
          scrollTrigger: { trigger: footerRef.current, start: 'top 60%', end: 'bottom bottom', scrub: true },
        }
      )
    },
    { scope: footerRef }
  )

  return (
    <footer
      ref={footerRef}
      style={{ '--glow-pos': '50% 65%', '--glow-size': '60% 55%', '--glow-alpha': 0.16 }}
      className="surface w-full overflow-x-clip px-[4vw] pt-[4vw] text-white max-[1025px]:px-[5vw] max-md:pt-[10vw]"
    >
      <div
        ref={cardRef}
        className="surface-blue-card flex flex-col gap-[6vw] rounded-[2rem] px-12 py-12 max-[1025px]:gap-12 max-[1025px]:px-8 max-[1025px]:py-14 max-md:px-6 max-md:py-10"
      >
        <div className="flex items-start justify-between gap-[6vw] max-[1025px]:flex-col-reverse max-[1025px]:items-center max-[1025px]:gap-12">
          <Link to="/" aria-label="The Debugging Society home" className="shrink-0">
            {/* Logo rendered as a white silhouette so it reads on the brand blue */}
            <img
              src="/tds-logo-transparent.png"
              alt="The Debugging Society logo"
              loading="lazy"
              className="w-[14vw] [filter:brightness(0)_invert(1)] max-[1025px]:w-[30vw] max-md:w-[44vw]"
            />
          </Link>
          <div className="flex flex-col items-end gap-[2vw] max-[1025px]:items-center max-[1025px]:gap-8 max-[1025px]:text-center">
            <p className="w-[80%] text-end text-[3.4vw] font-semibold leading-[1.1] tracking-tight max-[1025px]:w-full max-[1025px]:text-center max-[1025px]:text-[6vw] max-md:text-[8vw]">
              Ready to code with us?
            </p>
            <PillButton href={WHATSAPP_URL}>
              Join the community
            </PillButton>
          </div>
        </div>

        <div className="flex items-end justify-between gap-12 max-[1025px]:flex-col max-[1025px]:items-center max-[1025px]:text-center">
          <nav aria-label="Footer">
            <p className="mb-4 font-mono text-[1vw] font-medium text-white/70 max-[1025px]:text-[2.4vw] max-md:text-[4vw]">Explore</p>
            <ul className="flex flex-wrap gap-x-[2.5vw] gap-y-2 text-[1.25vw] max-[1025px]:justify-center max-[1025px]:gap-x-6 max-[1025px]:text-[2.6vw] max-md:text-[4.2vw]">
              {links.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="link-underline pb-0.5">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <ul className="flex gap-4">
            {socials.map(({ icon: Icon, href, label }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="group relative flex size-12 items-center justify-center overflow-hidden rounded-full border border-white/40 transition-transform duration-300 ease-in-out hover:[transform:scale(0.95)]"
                >
                  {/* White disc grows from the centre and the icon flips to brand blue */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 rounded-full bg-white transition-transform duration-300 ease-in-out [transform:scale(0)] group-hover:[transform:scale(1)]"
                  />
                  <Icon
                    size={20}
                    stroke={1.6}
                    className="relative text-white transition-colors duration-300 group-hover:text-[#082b6e]"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex justify-between gap-2 py-8 text-sm text-white/60 max-md:flex-col max-md:items-center max-md:py-6 max-md:text-center">
        <p>&copy; {year} The Debugging Society, NSUT</p>
        <p>Built by the TDS Tech Team</p>
      </div>
    </footer>
  )
}

export default Footer
