import FlipText from '@/components/ui/flip-text'
import { MeetTDSCard } from '@/components'
import { Card } from "../components/ui/card"

const About = () => {
  const teamData = [
    {
      photo:
        'https://res.cloudinary.com/dqvwf3z2c/image/upload/v1739006407/WhatsApp_Image_2025-02-08_at_14.49.31_e641d0c3_ept4uw.jpg',
      name: 'Nikil',
      position: 'President',
      description:
        'A dynamic leader with a vision to drive innovation and excellence.',
      linkedinUrl: 'https://www.linkedin.com/in/nikhil-nsut?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
    },
    {
      photo:
        'https://res.cloudinary.com/dqvwf3z2c/image/upload/v1739003223/WhatsApp_Image_2025-02-06_at_20.47.13_c8834e60_t28kec.jpg',
      name: 'Ashwajeet',
      position: 'Vice president',
      description:
        'A dedicated leader committed to fostering innovation and teamwork.',
      linkedinUrl: 'https://www.linkedin.com/in/ashwajeetbhatia/',
    },
    {
      photo:
        'https://res.cloudinary.com/dqvwf3z2c/image/upload/v1739003216/WhatsApp_Image_2025-02-06_at_20.04.41_da938446_pnz23k.jpg',
      name: 'Daksh',
      position: 'Managing Director',
      description:
        'A strategic thinker focused on driving growth and efficiency.',
      linkedinUrl: 'https://www.linkedin.com/in/daksh-b0a820263/',
    },
    {
      photo:
        'https://res.cloudinary.com/dqvwf3z2c/image/upload/v1739003210/WhatsApp_Image_2025-02-06_at_20.04.08_abbbfb4e_ujqwny.jpg',
      name: 'Anjali',
      position: 'Treasurer',
      description:
        'A Treasurer who ensures our finances stay on point and our team spirit stays high.',
      linkedinUrl: 'https://www.linkedin.com/in/anjali-longre-573953258/ ',
    },
    {
      photo:
        'https://res.cloudinary.com/dqvwf3z2c/image/upload/v1739003213/WhatsApp_Image_2025-02-06_at_20.04.25_87b34146_xqrnxm.jpg',
      name: 'Ritesh',
      position: 'Web dev lead',
      description:
        'A creative coder passionate about building impactful web applications.',
      linkedinUrl: 'https://www.linkedin.com/in/riteshwadhwani?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
    },
    {
      photo:
        'https://res.cloudinary.com/dqvwf3z2c/image/upload/v1739003220/WhatsApp_Image_2025-02-06_at_20.05.44_7c8b1ddd_rmuegc.jpg',
      name: 'Saneh',
      position: 'ML Lead',
      description:
        'A machine learning enthusiast passionate about AI-driven solutions.',
      linkedinUrl: 'https://www.linkedin.com/in/saneh-mahrolia-5801a3257/',
    },
    {
      photo:
        'https://res.cloudinary.com/dqvwf3z2c/image/upload/v1739003190/WhatsApp_Image_2025-02-06_at_20.01.48_85855272_hgerm2.jpg',
      name: 'Harsh',
      position: 'DSA Lead',
      description:
        'A problem-solving enthusiast with a keen interest in data structures and algorithms.',
      linkedinUrl: 'https://www.linkedin.com/company/thedebuggingsocietynsut/mycompany/',
    },
    {
      photo:
        'https://res.cloudinary.com/dqvwf3z2c/image/upload/v1739006520/WhatsApp_Image_2025-02-08_at_14.51.44_fc7d27a8_tx7jyx.jpg',
      name: 'Ayushmaan Bari',
      position: 'General Secretary',
      description:
        'An energetic and passionate individual dedicated to fostering collaboration.',
      linkedinUrl: 'https://www.linkedin.com/in/ayushman-bari-49145a27a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app ',
    },
    {
      photo:
        'https://res.cloudinary.com/dqvwf3z2c/image/upload/v1739003203/WhatsApp_Image_2025-02-06_at_20.03.48_bc6bf5a5_omtnjl.jpg',
      name: 'Ayush',
      position: 'General Secretary',
      description:
        'An energetic and passionate individual dedicated to fostering collaboration.',
      linkedinUrl: 'https://www.linkedin.com/in/ayush-dewangan-133b28259?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app9',
    },
    {
      photo:
        'https://res.cloudinary.com/dqvwf3z2c/image/upload/v1739006535/WhatsApp_Image_2025-02-08_at_14.51.45_890968f5_lr6qxk.jpg',
      name: 'Ishita',
      position: 'Operational lead',
      description:
        'An energetic and passionate individual dedicated to fostering collaboration.',
      linkedinUrl: 'https://www.linkedin.com/company/thedebuggingsocietynsut/mycompany/',
    },
  ]

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
    // <div className="bg-cover bg-center bg-[url('/logo.jpeg')]">
    <div>
      <div className="backdrop-blur-lg bg-opacity-50 bg-black flex animate-on-scroll flex-col md:flex-row justify-center items-center gap-5 p-5 w-full text-center ">
        <FlipText
          className="text-4xl font-bold -tracking-[6px] text-blue-500 md:text-7xl md:leading-[5rem]"
          word="About"
        />
      </div>
      <div className="backdrop-blur-lg bg-opacity-50 bg-black px-5">
        <div className="text-xl md:text-2xl max-w-3xl mx-auto text-center text-gray-300 mt-8">
          TDS Alumni is a community dedicated to sharing knowledge, inspiring,
          and connecting with aspiring software engineers from around the world.
          We aim to foster a supportive and inclusive environment where
          individuals can learn, grow, and excel.
        </div >
        <div className="flex animate-on-scroll m-auto flex-col justify-center items-center gap-5 p-5 pt-0 text-center bg-[#1f1f1f] rounded-lg" style={{
          width:"fit-content"
        }}>
        <div >
          <FlipText
            className="text-4xl font-bold -tracking-[6px] text-blue-500 md:text-6xl md:leading-[5rem]"
            word="Our Mission"
          />
        <h2 className="text-xl text-left mt-1 mb-4 font-semibold text-gray-300 italic">"Code with passion, innovate with purpose, and create an impact that lasts!"</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="bg-gray-800/50 hover:bg-gray-700/50 transition-colors duration-200 p-6 space-y-4"
            >
              {/* <feature.icon className="w-8 h-8 text-white opacity-90" strokeWidth={1.5} /> */}
              <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">{feature.description}</p>
            </Card>
          ))}
          </div>
        </div>
        </div>
        <div className="flex animate-on-scroll flex-col md:flex-row justify-center items-center gap-5 p-5 w-full text-center">
          <FlipText
            className="text-4xl font-bold -tracking-[6px] text-blue-500 md:text-6xl md:leading-[5rem]"
            word="Our  Team"
          />
        </div>
        <div className="mt-12 mb-10" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '24px',
            justifyItems: 'center',
            gridAutoRows: "500px",
            width: "calc(100% - 16px)",
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
  )
}

export default About
