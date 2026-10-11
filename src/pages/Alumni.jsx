import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import AlumniCard from '@/components/Alumni/AlumniCard'
import TextReveal from '@/components/ui/text-reveal'
import SectionLabel from "@/components/ui/section-label";
import alumniData from '@/data/alumni'

gsap.registerPlugin(useGSAP, ScrollTrigger)

// Newest batch first, every batch on the page
const batches = [...new Set(alumniData.map((a) => a.yearOfGraduation))]
  .sort((a, b) => Number(b) - Number(a))
  .map((year) => ({ year, alumni: alumniData.filter((a) => a.yearOfGraduation === year) }))

// Every company an alumnus works at, in data order, without duplicates
const companies = [...new Set(alumniData.map((a) => a.currentCompany?.trim()).filter(Boolean))]

const Alumni = () => {
  const pageRef = useRef(null)

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      gsap.set('[data-alumni-card]', { autoAlpha: 0 })
      ScrollTrigger.batch('[data-alumni-card]', {
        start: 'top 90%',
        once: true,
        onEnter: (cards) =>
          gsap.fromTo(cards, { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.08, ease: 'power2.out' }),
      })
    },
    { scope: pageRef }
  )

  return (
    <div ref={pageRef} className="surface w-full text-white" style={{ '--glow-pos': '18% 8vw', '--glow-size': '50vw 30vw' }}>
      {/* Hero */}
      <section className="grid grid-cols-12 items-end gap-[4vw] px-[4vw] pb-[5vw] pt-[6vw] max-[1025px]:grid-cols-1 max-[1025px]:gap-[6vw] max-[1025px]:px-[5vw] max-[1025px]:pt-[12vw]">
        <div className="col-span-7 max-[1025px]:col-span-1">
          <SectionLabel path="alumni" animateOnScroll={false} className="mb-[1.5vw] max-[1025px]:mb-[3vw]" />
          <TextReveal stagger={0.015} animateOnScroll={false}>
            <h1 className="text-[10vw] font-semibold leading-[0.95] tracking-tight max-[1025px]:text-[16vw] max-md:text-[20vw]">
              Alumni
            </h1>
          </TextReveal>
        </div>
        <div className="col-span-5 pb-[1vw] max-[1025px]:col-span-1">
          <TextReveal splitBy="lines" animateOnScroll={false} delay={0.3}>
            <p className="text-[1.5vw] font-medium leading-[1.45] text-white/85 max-[1025px]:text-[3.4vw] max-md:text-[4.6vw]">
              The people who ran TDS went on to Google, Microsoft, Amazon, Uber, Atlassian and more. Here&apos;s where
              every batch landed.
            </p>
          </TextReveal>
        </div>
      </section>

      {/* Where they work now, as one slow band of names */}
      <div aria-label="Companies our alumni work at" className="overflow-hidden border-y border-white/10 py-[1.6vw] max-[1025px]:py-[4vw]">
        <div className="alumni-marquee flex w-max">
          {[0, 1].map((copy) => (
            <ul key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-center">
              {companies.map((company) => (
                <li key={company} className="flex items-center">
                  <span className="whitespace-nowrap px-[2vw] text-[4.5vw] font-semibold leading-none tracking-tight text-white/90 max-[1025px]:text-[8vw] max-md:text-[11vw]">
                    {company}
                  </span>
                  <span aria-hidden="true" className="size-[0.8vw] shrink-0 rounded-full bg-[#3b82f6] max-[1025px]:size-[1.6vw]" />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      {/* One block per batch: the year stays pinned while its people scroll past */}
      <div className="px-[4vw] pb-[8vw] pt-[6vw] max-[1025px]:px-[5vw] max-[1025px]:pb-[16vw] max-[1025px]:pt-[12vw]">
        {batches.map(({ year, alumni }) => (
          <section
            key={year}
            aria-labelledby={`batch-${year}`}
            className="grid grid-cols-12 gap-[4vw] border-t border-white/15 pb-[6vw] pt-[2.5vw] max-[1025px]:grid-cols-1 max-[1025px]:gap-[5vw] max-[1025px]:pb-[12vw] max-[1025px]:pt-[5vw]"
          >
            <div className="col-span-3 max-[1025px]:col-span-1">
              <div className="sticky top-[6vw] max-[1025px]:static">
                <p className="font-mono text-[1vw] font-medium text-[#3b82f6] max-[1025px]:text-[2.6vw] max-md:text-[4vw]">Class of</p>
                <h2
                  id={`batch-${year}`}
                  className="text-[7vw] font-semibold leading-[0.95] tracking-tight max-[1025px]:text-[12vw] max-md:text-[16vw]"
                >
                  {year}
                </h2>
              </div>
            </div>
            <ul className="col-span-9 grid grid-cols-3 gap-x-[2vw] gap-y-[3.5vw] max-[1025px]:col-span-1 max-[1025px]:gap-x-[4vw] max-[1025px]:gap-y-[8vw] max-md:grid-cols-2">
              {alumni.map((a) => (
                <AlumniCard
                  key={`${year}-${a.name}`}
                  name={a.name}
                  por={a.por}
                  image={a.image}
                  company={a.currentCompany}
                  linkedin={a.linkedIn}
                />
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  )
}

export default Alumni
