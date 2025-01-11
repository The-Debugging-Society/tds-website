import BoxReveal from "./ui/box-reveal";
import FlickeringGrid from "./ui/flickering-grid";

const AboutSection = () => {
  return (
    <section className="relative bg-gradient-to-b from-gray-900 to-black text-white py-16 px-8 overflow-hidden">
      <FlickeringGrid
        className="absolute inset-0 z-0 [mask-image:radial-gradient(450px_circle_at_left,white,transparent)]"
        squareSize={4}
        gridGap={6}
        color="#60A5FA"
        maxOpacity={0.5}
        flickerChance={0.1}
        height={1000}
        width={800}
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left Side */}
        <div className="md:w-1/2">
          <BoxReveal boxColor={"#5046e6"} duration={0.5}>
            <h2 className="text-4xl md:text-6xl font-bold text-blue-400 mb-4">About Us</h2>
          </BoxReveal>
          <BoxReveal boxColor={"#5046e6"} duration={0.5}>
            <h3 className="text-3xl md:text-4xl font-extrabold leading-snug mb-4">
              The Demo Organization
            </h3>
          </BoxReveal>
          <BoxReveal boxColor={"#5046e6"} duration={0.5}>
            <p className="text-gray-300 leading-relaxed mb-6">
              The Demo Organization was founded with the vision to inspire creativity and foster
              innovation in communities around the world. Our goal is to provide a platform where
              individuals can collaborate, learn, and grow together. We aim to expand our reach and
              create meaningful impact through knowledge sharing and community-driven initiatives.
            </p>
          </BoxReveal>
          <BoxReveal boxColor={"#5046e6"} duration={0.5}>
            <button className="px-6 py-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg shadow-lg hover:opacity-90">
              Learn More
            </button>
          </BoxReveal>
        </div>

        {/* Right Side */}
        <div className="md:w-1/2 flex justify-center relative">
          <BoxReveal boxColor={"#5046e6"} duration={0.5}>
            <img src="about.jpg" alt="About Us" className="w-full h-full object-cover rounded-lg" />
          </BoxReveal>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
