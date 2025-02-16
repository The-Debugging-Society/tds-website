import FlipText from '@/components/ui/flip-text'
import { TeamCard } from '@/components/About/TeamCard'
import { Card } from "../components/ui/card"
import "../css/About.css"
import teamData from "../data/team"

const About = () => {

  const missions = [
    {
      title: "Empowering Innovators",
      description: "We foster a community where tech enthusiasts can explore, innovate, and build impactful solutions.",
    },
    {
      title: "Hands-on Learning",
      description: "Through projects, hackathons, and collaborative problem-solving, we bridge the gap between theory and real-world application.",
    },
    {
      title: "Skill Development",
      description: "We equip members with expertise in software development, AI, cybersecurity, and emerging technologies through workshops and mentorship.",
    },
    {
      title: "Industry & Academia Connection",
      description: "We provide exposure to industry trends, career opportunities, and networking with experts.",
    },
    {
      title: "Technology for Impact",
      description:
        "We believe in using tech for social good, solving real-world challenges through open-source and community-driven initiatives.",
    },
    {
      title: "A Culture of Curiosity",
      description: "We encourage continuous learning, critical thinking, and debugging challenges—one solution at a time.",
    },
  ]

  return (
    <div>
      <div className="flex flex-col items-center justify-center backdrop-blur-lg bg-opacity-50 bg-black px-5">
        <div id="aboutHero" className="rounded-3xl" style={{
          overflow: "hidden",
          position: "relative",
          maxWidth: "1320px",
          maxHeight: "calc(100vh - 108px)",
          border: "2px solid rgba(33, 33, 33, 0.4)",
        }}>
          <img style={{
            marginBottom: "200px",
          }} src="https://res.cloudinary.com/dqvwf3z2c/image/upload/v1739477715/about_hero_hnbjb2.png" alt={"About Hero"}/>
          <p className="text-xl md:text-2xl mx-auto text-left text-gray-300 mt-8 tracking-wide" style={{
            position: "absolute",
            bottom: "0",
            width: "100%",
            padding: "250px 60px 60px 60px",
            backgroundImage: "linear-gradient(rgba(0,0,0,0), rgba(0,0,0,1) 75%)",
          }}>
            TDS Alumni is a community dedicated to sharing knowledge, inspiring,
            and connecting with aspiring software engineers from around the world.
            We aim to foster a supportive and inclusive environment where
            individuals can learn, grow, and excel.
          </p>
        </div>
        <div
            className="flex rounded-3xl animate-on-scroll m-auto flex-col justify-center items-center gap-5 pt-0 text-center"
            id={"aboutMission"}
            style={{
              padding: "50px",
              maxWidth: "1320px",
              width: "fit-content",
              margin: "40px 0",
            }}>
            <FlipText
                className="text-4xl font-bold -tracking-[6px] text-blue-500 md:text-6xl md:leading-[5rem]"
                word="Our Mission"
            />
            <h2 className="text-xl text-left mt-1 mb-4 font-semibold text-gray-300 italic">&#34;Code with passion, innovate
              with purpose, and create an impact that lasts!&#34;</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
              {missions.map((mission, index) => (
                  <Card
                      key={index}
                      className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-20 rounded-lg p-6 space-y-4 shadow-lg"
                  >
                    <h3 className="text-xl font-semibold text-white text-left">{mission.title}</h3>
                    <p className="text-gray-400 leading-relaxed text-left">{mission.description}</p>
                  </Card>
              ))}
          </div>
        </div>
        <div className="w-full max-w-7xl">
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
                />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
