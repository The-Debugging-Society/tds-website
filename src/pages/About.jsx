import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import TextReveal from '../components/ui/text-reveal'
import TeamRoster from '../components/About/TeamRoster'
import team from '../data/team.json'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

const About = () => {
  const pageRef = useRef(null)
  const heroRef = useRef(null)
  const heroImgRef = useRef(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return

      // Hero photo settles in from a slight zoom, then drifts against the scroll
      gsap.fromTo(heroImgRef.current, { scale: 1.15 }, { scale: 1, duration: 2.2, ease: 'power3.out' })
      gsap.fromTo(
        heroImgRef.current,
        { yPercent: 0 },
        {
          yPercent: 8,
          ease: 'none',
          scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: true },
        }
      )
    },
    { scope: pageRef }
  )

  return (
    <div ref={pageRef} className="w-full bg-[#0a1128] text-white">
      {/* Hero: the team photo full-bleed, with the intro set over its darkened lower half */}
      <section
        ref={heroRef}
        className="relative h-[85vh] min-h-[560px] w-full overflow-hidden max-md:h-[80vh]"
      >
        <img
          ref={heroImgRef}
          src="/hero-team.jpg"
          alt="The Debugging Society team at NSUT"
          className="absolute -top-[8%] left-0 h-[116%] w-full max-w-none object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,17,40,0.3)_0%,rgba(10,17,40,0.1)_25%,rgba(10,17,40,0.8)_58%,#0a1128_100%)]"
        />
        <div className="absolute inset-x-[4vw] bottom-[4vw] grid grid-cols-12 items-end gap-[4vw] max-[1025px]:inset-x-[5vw] max-[1025px]:bottom-[8vw] max-[1025px]:grid-cols-1 max-[1025px]:gap-[5vw]">
          <div className="col-span-6 max-[1025px]:col-span-1">
            <TextReveal stagger={0.015} animateOnScroll={false}>
              <h1 className="text-[8vw] font-semibold leading-[1] tracking-tight max-[1025px]:text-[12vw] max-md:text-[15vw]">
                About Us
              </h1>
            </TextReveal>
          </div>
          <div className="col-span-6 space-y-[1.2vw] max-[1025px]:col-span-1 max-[1025px]:space-y-[3vw]">
            <TextReveal splitBy="lines" animateOnScroll={false} delay={0.3}>
              <p className="text-[1.6vw] font-medium leading-[1.35] max-[1025px]:text-[3.4vw] max-md:text-[4.6vw]">
                The Debugging Society is a coding society at NSUT, started to develop a passion for coding through
                regular assignments, weekly quizzes and a network of people who care about technology.
              </p>
            </TextReveal>
            <TextReveal splitBy="lines" animateOnScroll={false} delay={0.5}>
              <p className="text-[1.1vw] leading-[1.6] text-white/75 max-[1025px]:text-[2.4vw] max-md:text-[3.8vw]">
                We run events like CTRL+ALT+HACK, Data Sphere, Web-a-Thon and the AI: Ethics &amp; Security Conclave,
                and teach everything from DSA and competitive programming to web and Android development.
              </p>
            </TextReveal>
          </div>
        </div>
      </section>

      <TeamRoster members={[...team.officeBearers, ...team.directors]} />
    </div>
  )
}

export default About
