import FlipText from "@/components/ui/flip-text";
import { TeamCard } from "@/components/About/TeamCard";
import teamData from "@/data/team";
import about from "@/assets/images/about.png";

const About = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center backdrop-blur-lg bg-opacity-50 bg-black px-5">
        <div
          id="aboutHero"
          className="rounded-3xl"
          style={{
            overflow: "hidden",
            position: "relative",
            maxWidth: "1320px",
            maxHeight: "calc(100vh - 108px)",
            border: "2px solid rgba(33, 33, 33, 0.4)",
          }}
        >
          <img
            style={{
              marginBottom: "200px",
            }}
            src={about}
            alt={"About Hero"}
          />
          <p
            className="text-xl md:text-2xl mx-auto text-left text-gray-300 mt-8 tracking-wide"
            style={{
              position: "absolute",
              bottom: "0",
              width: "100%",
              padding: "250px 60px 60px 60px",
              backgroundImage:
                "linear-gradient(rgba(0,0,0,0), rgba(0,0,0,1) 75%)",
            }}
          >
            TDS Alumni is a community dedicated to sharing knowledge, inspiring,
            and connecting with aspiring software engineers from around the
            world. We aim to foster a supportive and inclusive environment where
            individuals can learn, grow, and excel.
          </p>
        </div>
        <div className="w-full max-w-7xl py-10">
          <FlipText
            className="text-4xl font-bold -tracking-[8px] text-blue-500 md:text-6xl md:leading-[5rem] text-center"
            word="Our Team"
          />
          <div className="mt-5 mb-10 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-5">
            {teamData.map((member, index) => (
              <TeamCard
                key={index}
                photoUrl={member.photo}
                name={member.name}
                position={member.position}
                description={member.description}
                linkedinUrl={member.linkedinUrl}
                xUrl={member.xUrl}
                instaUrl={member.instaUrl}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
