import FlipText from '@/components/ui/flip-text'
import { MeetTDSCard } from '@/components'

const About = () => {
  const teamData = [
    {
      photo:
        'https://res.cloudinary.com/dqvwf3z2c/image/upload/v1739006407/WhatsApp_Image_2025-02-08_at_14.49.31_e641d0c3_ept4uw.jpg',
      name: 'Nikil',
      position: 'President',
      description:
        'A dynamic leader with a vision to drive innovation and excellence.',
      instagramUrl: 'https://instagram.com/dummy',
      linkedinUrl: 'https://linkedin.com/dummy',
      facebookUrl: 'https://facebook.com/dummy',
      githubUrl: 'https://github.com/dummy',
      twitterUrl: 'https://twitter.com/dummy',
    },
    {
      photo:
        'https://res.cloudinary.com/dqvwf3z2c/image/upload/v1739003223/WhatsApp_Image_2025-02-06_at_20.47.13_c8834e60_t28kec.jpg',
      name: 'Ashwajeet',
      position: 'Vice president',
      description:
        'A dedicated leader committed to fostering innovation and teamwork.',
      instagramUrl: 'https://instagram.com/dummy',
      linkedinUrl: 'https://linkedin.com/dummy',
      facebookUrl: 'https://facebook.com/dummy',
      githubUrl: 'https://github.com/dummy',
      twitterUrl: 'https://twitter.com/dummy',
    },
    {
      photo:
        'https://res.cloudinary.com/dqvwf3z2c/image/upload/v1739003216/WhatsApp_Image_2025-02-06_at_20.04.41_da938446_pnz23k.jpg',
      name: 'Daksh',
      position: 'Managing Director',
      description:
        'A strategic thinker focused on driving growth and efficiency.',
      instagramUrl: 'https://instagram.com/dummy',
      linkedinUrl: 'https://linkedin.com/dummy',
      facebookUrl: 'https://facebook.com/dummy',
      githubUrl: 'https://github.com/dummy',
      twitterUrl: 'https://twitter.com/dummy',
    },
    {
      photo:
        'https://res.cloudinary.com/dqvwf3z2c/image/upload/v1739003210/WhatsApp_Image_2025-02-06_at_20.04.08_abbbfb4e_ujqwny.jpg',
      name: 'Anjali',
      position: 'Treasurer',
      description:
        'A Treasurer who ensures our finances stay on point and our team spirit stays high.',
      instagramUrl: 'https://instagram.com/dummy',
      linkedinUrl: 'https://linkedin.com/dummy',
      facebookUrl: 'https://facebook.com/dummy',
      githubUrl: 'https://github.com/dummy',
      twitterUrl: 'https://twitter.com/dummy',
    },
    {
      photo:
        'https://res.cloudinary.com/dqvwf3z2c/image/upload/v1739003213/WhatsApp_Image_2025-02-06_at_20.04.25_87b34146_xqrnxm.jpg',
      name: 'Ritesh',
      position: 'Web dev lead',
      description:
        'A creative coder passionate about building impactful web applications.',
      instagramUrl: 'https://instagram.com/dummy',
      linkedinUrl: 'https://linkedin.com/dummy',
      facebookUrl: 'https://facebook.com/dummy',
      githubUrl: 'https://github.com/dummy',
      twitterUrl: 'https://twitter.com/dummy',
    },
    {
      photo:
        'https://res.cloudinary.com/dqvwf3z2c/image/upload/v1739003220/WhatsApp_Image_2025-02-06_at_20.05.44_7c8b1ddd_rmuegc.jpg',
      name: 'Saneh',
      position: 'ML Lead',
      description:
        'A machine learning enthusiast passionate about AI-driven solutions.',
      instagramUrl: 'https://instagram.com/dummy',
      linkedinUrl: 'https://linkedin.com/dummy',
      facebookUrl: 'https://facebook.com/dummy',
      githubUrl: 'https://github.com/dummy',
      twitterUrl: 'https://twitter.com/dummy',
    },
    {
      photo:
        'https://res.cloudinary.com/dqvwf3z2c/image/upload/v1739003190/WhatsApp_Image_2025-02-06_at_20.01.48_85855272_hgerm2.jpg',
      name: 'Harsh',
      position: 'DSA Lead',
      description:
        'A problem-solving enthusiast with a keen interest in data structures and algorithms.',
      instagramUrl: 'https://instagram.com/dummy',
      linkedinUrl: 'https://linkedin.com/dummy',
      facebookUrl: 'https://facebook.com/dummy',
      githubUrl: 'https://github.com/dummy',
      twitterUrl: 'https://twitter.com/dummy',
    },
    {
      photo:
        'https://res.cloudinary.com/dqvwf3z2c/image/upload/v1739006520/WhatsApp_Image_2025-02-08_at_14.51.44_fc7d27a8_tx7jyx.jpg',
      name: 'Ayushmaan Bari',
      position: 'General Secretary',
      description:
        'An energetic and passionate individual dedicated to fostering collaboration.',
      instagramUrl: 'https://instagram.com/dummy',
      linkedinUrl: 'https://linkedin.com/dummy',
      facebookUrl: 'https://facebook.com/dummy',
      githubUrl: 'https://github.com/dummy',
      twitterUrl: 'https://twitter.com/dummy',
    },
  ]

  return (
    // <div className="bg-cover bg-center bg-[url('/logo.jpeg')]">
    <div>
      <div className="backdrop-blur-lg bg-opacity-50 bg-black flex animate-on-scroll flex-col md:flex-row justify-center items-center gap-5 p-5 w-full text-center">
        <FlipText
          className="text-4xl font-bold -tracking-[6px] text-blue-500 md:text-7xl md:leading-[5rem]"
          word="About"
        />
      </div>
      <div className="backdrop-blur-lg bg-opacity-50 bg-black px-5">
        <div className="text-xl md:text-2xl max-w-2xl mx-auto text-center text-gray-300 mt-10 space-y-5">
          TDS Alumni is a community dedicated to sharing knowledge, inspiring,
          and connecting with aspiring software engineers from around the world.
          We aim to foster a supportive and inclusive environment where
          individuals can learn, grow, and excel.
          <br />
          <p className="font-semibold">Todos:</p>
          <ul className="list-disc list-inside text-gray-300">
            <li>Our Mission</li>
            <li>Our Vision</li>
            <li>Why join TDS</li>
          </ul>
        </div>
        <div className="flex animate-on-scroll flex-col md:flex-row justify-center items-center gap-5 p-5 w-full text-center">
          <FlipText
            className="text-4xl font-bold -tracking-[6px] text-blue-500 md:text-6xl md:leading-[5rem]"
            word="Our  Team"
          />
        </div>
        <div className="mt-12 flex flex-wrap justify-center gap-8 px-5 mb-10">
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
