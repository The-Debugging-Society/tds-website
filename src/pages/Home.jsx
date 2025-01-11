import Hero from "@/components/Hero"
import { VelocityScrollText } from "@/components/VelocityScrollText"
import MarqueeDemo from "@/components/Review"
import { MagicCardDemo } from "@/components/Card"
import { BentoDemo } from "@/components/Event"
import AboutSection from "@/components/About"
const Home = () => {
  return (
    <>
      <Hero />
      <VelocityScrollText />
      <AboutSection />
      <BentoDemo />
      <MagicCardDemo />
      <MarqueeDemo />
    </>
  )
}

export default Home
