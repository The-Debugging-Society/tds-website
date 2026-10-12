import { useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { MotionConfig, motion } from 'motion/react'
import { IconArrowUpRight } from '@tabler/icons-react'
import TextReveal from '../components/ui/text-reveal'
import SectionLabel from "../components/ui/section-label";
import resources from '../data/resources.json'

gsap.registerPlugin(useGSAP)

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

function ResourceRow({ item }) {
  const lineRef = useRef(null)

  // Hover line: wipes in from the left, exits to the right
  const sweep = (enter) => {
    const line = lineRef.current
    if (!line) return
    gsap.killTweensOf(line)
    gsap.set(line, { transformOrigin: enter ? 'left center' : 'right center' })
    gsap.to(line, { scaleX: enter ? 1 : 0, duration: prefersReducedMotion() ? 0 : 0.55, ease: 'power2.out' })
  }

  return (
    <li data-resource-row>
      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => sweep(true)}
        onMouseLeave={() => sweep(false)}
        onFocus={() => sweep(true)}
        onBlur={() => sweep(false)}
        className="group relative grid grid-cols-12 items-center gap-[3vw] py-[2.2vw] max-[1025px]:grid-cols-1 max-[1025px]:gap-[1.5vw] max-[1025px]:py-[5vw]"
      >
        <p className="col-span-3 font-mono text-[1vw] font-medium text-[#3b82f6] max-[1025px]:col-span-1 max-[1025px]:text-[2.6vw] max-md:text-[3.8vw]">
          {item.platform}
          {item.type && <span className="text-white/45"> • {item.type}</span>}
        </p>
        <div className="col-span-8 max-[1025px]:col-span-1 max-[1025px]:pr-12">
          <h3 className="text-[2.6vw] font-semibold leading-tight tracking-tight max-[1025px]:text-[5vw] max-md:text-[7vw]">
            {item.title}
          </h3>
          <p className="mt-[0.5vw] text-[1.1vw] leading-[1.6] text-white/70 max-[1025px]:mt-[1.2vw] max-[1025px]:text-[2.6vw] max-md:text-[3.9vw]">
            {item.description}
          </p>
        </div>
        <span
          aria-hidden="true"
          className="col-span-1 flex size-[3.4vw] items-center justify-center justify-self-end rounded-full border border-white/25 transition-colors duration-300 group-hover:border-white group-hover:bg-white group-hover:text-[#03050c] max-[1025px]:absolute max-[1025px]:right-0 max-[1025px]:top-1/2 max-[1025px]:size-11 max-[1025px]:[transform:translateY(-50%)]"
        >
          <IconArrowUpRight size={20} stroke={1.6} />
        </span>
        <span aria-hidden="true" className="absolute bottom-0 left-0 h-px w-full bg-white/15">
          <span ref={lineRef} className="absolute inset-0 bg-[#3b82f6] [transform:scaleX(0)]" />
        </span>
        <span className="sr-only">(opens in a new tab)</span>
      </a>
    </li>
  )
}

const Resources = () => {
  const pageRef = useRef(null)
  const listRef = useRef(null)
  const [active, setActive] = useState(resources[0].category)
  const current = resources.find((group) => group.category === active)

  // Rows rise in each time a tab's list appears
  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      gsap.fromTo(
        listRef.current.querySelectorAll('[data-resource-row]'),
        { autoAlpha: 0, y: 30 },
        { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.08, ease: 'power2.out' }
      )
    },
    { scope: pageRef, dependencies: [active] }
  )

  return (
    <MotionConfig reducedMotion="user">
      <div
        ref={pageRef}
        className="surface w-full px-[4vw] pb-[8vw] text-white max-[1025px]:px-[5vw] max-[1025px]:pb-[16vw]"
        style={{ '--glow-pos': '78% 10vw', '--glow-size': '50vw 32vw' }}
      >
        <section className="grid grid-cols-12 items-end gap-[4vw] pb-[5vw] pt-[6vw] max-[1025px]:grid-cols-1 max-[1025px]:gap-[6vw] max-[1025px]:pt-[12vw]">
          <div className="col-span-7 max-[1025px]:col-span-1">
            <SectionLabel path="resources" animateOnScroll={false} className="mb-[1.5vw] max-[1025px]:mb-[3vw]" />
            <TextReveal stagger={0.015} animateOnScroll={false}>
              <h1 className="text-[10vw] font-semibold leading-[0.95] tracking-tight max-[1025px]:text-[16vw] max-md:text-[18vw]">
                Resources
              </h1>
            </TextReveal>
          </div>
          <div className="col-span-5 pb-[1vw] max-[1025px]:col-span-1">
            <TextReveal splitBy="lines" animateOnScroll={false} delay={0.3}>
              <p className="text-[1.5vw] font-medium leading-[1.45] text-white/85 max-[1025px]:text-[3.4vw] max-md:text-[4.6vw]">
                The practice sets, sheets and courses we point new members to, sorted by what you want to learn.
              </p>
            </TextReveal>
          </div>
        </section>

        {/* Tab bar scrolls sideways when the categories don't fit on one line */}
        <div className="no-scrollbar -mx-[4vw] flex overflow-x-auto border-t border-white/15 px-[4vw] pt-[4vw] max-[1025px]:-mx-[5vw] max-[1025px]:px-[5vw] max-[1025px]:pt-[8vw]">
          <div role="tablist" aria-label="Resource categories" className="mx-auto inline-flex shrink-0 rounded-full border border-white/15 bg-white/5 p-1">
            {resources.map(({ category, items }) => {
              const selected = category === active
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setActive(category)}
                  className="relative shrink-0 whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-medium md:px-5 md:text-[15px]"
                >
                  {selected && (
                    <motion.span
                      layoutId="resources-tab-indicator"
                      className="absolute inset-0 rounded-full bg-white"
                      transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                    />
                  )}
                  <span className={`relative z-10 transition-colors duration-300 ${selected ? 'text-[#03050c]' : 'text-white/70 hover:text-white'}`}>
                    {category}
                    <span className={`ml-1.5 font-mono text-xs ${selected ? 'text-[#03050c]/50' : 'text-white/40'}`}>{items.length}</span>
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        <ul ref={listRef} role="tabpanel" aria-label={active} className="mt-[4vw] border-t border-white/15 max-[1025px]:mt-[8vw]">
          {current.items.map((item) => (
            <ResourceRow key={item.url} item={item} />
          ))}
        </ul>
      </div>
    </MotionConfig>
  )
}

export default Resources
