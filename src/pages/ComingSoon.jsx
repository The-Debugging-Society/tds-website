import TextReveal from '../components/ui/text-reveal'
import PillButton from '../components/ui/pill-button'

// Placeholder for sections that exist as routes but have no content yet (Blogs, Community)
const ComingSoon = ({ title }) => {
  return (
    <section
      className="surface flex min-h-[70vh] flex-col justify-end px-[4vw] pb-[6vw] pt-[8vw] text-white max-[1025px]:px-[5vw] max-[1025px]:pb-[12vw]"
      style={{ '--glow-pos': '75% 40%', '--glow-size': '50% 55%' }}
    >
      <p className="font-mono text-[1.1vw] font-medium text-[#3b82f6] max-[1025px]:text-[3vw] max-md:text-[4.2vw]">Coming soon</p>
      <TextReveal stagger={0.015} animateOnScroll={false}>
        <h1 className="mt-[0.5vw] text-[10vw] font-semibold leading-[0.95] tracking-tight max-[1025px]:text-[16vw] max-md:text-[18vw]">
          {title}
        </h1>
      </TextReveal>
      <p className="mt-[2vw] max-w-[44ch] text-[1.4vw] leading-[1.5] text-white/75 max-[1025px]:mt-[4vw] max-[1025px]:text-[3vw] max-md:text-[4.4vw]">
        We&apos;re still building this page. In the meantime, see what we&apos;ve been up to.
      </p>
      <div className="mt-[3vw] max-[1025px]:mt-[6vw]">
        <PillButton to="/events">See our events</PillButton>
      </div>
    </section>
  )
}

export default ComingSoon
