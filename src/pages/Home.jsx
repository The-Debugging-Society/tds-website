import { Hero, AboutSection, BentoDemo, MagicCardDemo, MarqueeDemo, VelocityScrollText } from '../components/index.js'  
const Home = () => {
  return (
    <>
      <Hero />
      <VelocityScrollText />
      <AboutSection />
      {/* <BentoDemo /> */}
      <MagicCardDemo />
      <MarqueeDemo />
    </>
  )
}

export default Home
