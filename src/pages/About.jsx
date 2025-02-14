import FlipText from '@/components/ui/flip-text'
import { MeetTDSCard } from '@/components'
import { Card } from "../components/ui/card"
import "../css/About.css"
import teamData from "../data/team"

const About = () => {

  const features = [
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
      <div className="backdrop-blur-lg bg-opacity-50 bg-black px-5" style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",

      }}>
        <div id="aboutHero" className="rounded-3xl" style={{
          overflow: "hidden",
          position: "relative",
          maxWidth: "1320px",
          maxHeight: "calc(100vh - 108px)",
          border: "2px solid rgba(33, 33, 33, 0.4)",
        }}>
          <img style={{
            marginBottom: "200px",
          }} src="/about_hero.png" alt={"About Hero"}/>
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
              boxShadow: "0px 0px 14px 1px #5e5e5e inset",
              boxSizing: "border-box",
              padding: "50px",
              maxWidth: "1320px",
              width: "fit-content",
              margin: "40px 0",
              backgroundColor: "#121212"
            }}>
          <div>
            <FlipText
                className="text-4xl font-bold -tracking-[6px] text-blue-500 md:text-6xl md:leading-[5rem]"
                word="Our Mission"
            />
            <h2 className="text-xl text-left mt-1 mb-4 font-semibold text-gray-300 italic">&#34;Code with passion, innovate
              with purpose, and create an impact that lasts!&#34;</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
              {features.map((feature, index) => (
                  <Card
                      key={index}
                      className="bg-neutral-800/50 backdrop-blur-[30px] hover:bg-neutral-600/50 transition-colors duration-200 p-6 space-y-4"
                  >
                    {/* <feature.icon className="w-8 h-8 text-white opacity-90" strokeWidth={1.5} /> */}
                    <h3 className="text-xl font-semibold text-white text-left">{feature.title}</h3>
                    <p className="text-gray-400 leading-relaxed text-left">{feature.description}</p>
                  </Card>
              ))}
            </div>
          </div>
        </div>
        <div style={{
          width: "100%",
          maxWidth: "1320px",
        }}>
          <div
              className="ml-[20px] animate-on-scroll  md:flex-row justify-center items-center gap-5 p-5 w-full text-center">
            <FlipText
                className="text-4xl font-bold -tracking-[6px] text-blue-500 md:text-6xl md:leading-[5rem] text-left"
                word="Our  Team"
            />
          </div>
          <div className="mt-5 mb-10" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '24px',
            width: "100%",
            gridAutoRows: "500px",
            padding: "0 20px",
          }}>
            {teamData.map((member, index) => (
                <MeetTDSCard
                    key={index}
                    photoUrl={member.photo}
                    name={member.name}
                    position={member.position}
                    description={member.description}
                    instagramUrl={member.instagramUrl}
                    linkedinUrl={member.linkedinUrl}
                    facebookUrl={member.facebookUrl}
                    githubUrl={member.githubUrl}
                    twitterUrl={member.twitterUrl}
                />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
