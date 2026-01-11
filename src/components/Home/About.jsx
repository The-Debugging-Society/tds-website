import { Link } from "react-router-dom";
import BoxReveal from "../ui/box-reveal";
import FlickeringGrid from "../ui/flickering-grid";

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
          <BoxReveal boxColor={"#0077B6"} duration={0.3}>
            <h2 className="text-4xl md:text-6xl font-bold text-blue-400 mb-4">
              About Us
            </h2>
          </BoxReveal>
          <BoxReveal boxColor={"#0077B6"} duration={0.3}>
            <h3 className="text-3xl md:text-4xl font-extrabold leading-snug mb-4">
              The Debugging society
            </h3>
          </BoxReveal>
          <BoxReveal boxColor={"#0077B6"} duration={0.3}>
            <p className="text-gray-300 leading-relaxed mb-6">
              The Debugging Society has been initiated with the purpose to
              develop a passion for coding throught regular assignments,weekly
              quizzes and create a network of like-minded individuals who are
              passionate about coding and technology.
            </p>
            <p className="text-gray-300 leading-relaxed mb-6">
              Specialties
              <br />
              DATA STRUCTUE AND ALGORITHIMS, COMPETITIVE PROGRAMMING, WEB
              DEVELOPMENT, INTERVIEW PREPARATION, ANDROID DEVELOPMENT, C++ and
              JAVA
            </p>
          </BoxReveal>
          <BoxReveal boxColor={"#0077B6"} duration={0.3}>
            <button className="bg-blue-400 text-white py-2 px-4 rounded-md hover:bg-blue-500">
              <Link to="/about">Learn More</Link>
            </button>
          </BoxReveal>
        </div>

        {/* Right Side */}
        <div className="md:w-1/2 flex justify-center relative">
          <BoxReveal boxColor={"#0077B6"} duration={0.2}>
            <img
              src="/tds26.jpg"
              alt="About Us"
              className="w-full h-full object-cover rounded-lg"
            />
          </BoxReveal>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
