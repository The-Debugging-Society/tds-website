import FlipText from "@/components/ui/flip-text"
import { MeetTDSCard } from "@/components"

const About = () => {
  return (
    <div className="bg-cover bg-[url('/logo.jpeg')]">
      <div className=" backdrop-blur-lg bg-opacity-50 bg-black flex animate-on-scroll flex-col md:flex-row justify-center items-center gap-5 p-5 w-full">
        <FlipText
          className="text-4xl font-bold -tracking-widest text-blue-500 md:text-7xl md:leading-[5rem]"
          word="About"
        />
      </div>
      <div className="backdrop-blur-lg bg-opacity-50 bg-black">
        <div className="text-center p-5 text-lg max-w-2xl mx-auto">
            TDS Alumni is a community dedicated to sharing knowledge, inspiring, and connecting with aspiring software engineers from around the world. We aim to foster a supportive and inclusive environment where individuals can learn, grow, and excel.<br/>
          Todos:<br/>
          - "Our Mission"<br/>
          - "Our Vision"<br/>
          - "Why join tds"<br/>
        </div>
        <div className="flex animate-on-scroll flex-col md:flex-row justify-center items-center gap-5 p-5 w-full">
          <FlipText
            className="text-4xl font-bold -tracking-widest text-blue-500 md:text-5xl md:leading-[5rem]"
            word="Meet TDS"
          />
        </div>
        <div>
        <MeetTDSCard
            photo="/placeholder.svg?height=224&width=384"
            name="Nikil"
            position="President"
            description="Jane is a passionate software engineer with 5 years of experience in web development."
            twitterUrl= "https://twitter.com/janedoe"
            linkedinUrl= "https://linkedin.com/in/janedoe"
            githubUrl= "https://github.com/janedoe"
          />
        </div>
        <div className="mt-12 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <MeetTDSCard
            photo="/placeholder.svg?height=224&width=384"
            name="Nikil"
            position="President"
            description="Jane is a passionate software engineer with 5 years of experience in web development."
            twitterUrl= "https://twitter.com/janedoe"
            linkedinUrl= "https://linkedin.com/in/janedoe"
            githubUrl= "https://github.com/janedoe"
          />
          <MeetTDSCard
            photo="/placeholder.svg?height=224&width=384"
            name="Nikil"
            position="President"
            description="Jane is a passionate software engineer with 5 years of experience in web development."
            twitterUrl= "https://twitter.com/janedoe"
            linkedinUrl= "https://linkedin.com/in/janedoe"
            githubUrl= "https://github.com/janedoe"
          />
          <MeetTDSCard
            photo="/placeholder.svg?height=224&width=384"
            name="Nikil"
            position="President"
            description="Jane is a passionate software engineer with 5 years of experience in web development."
            twitterUrl= "https://twitter.com/janedoe"
            linkedinUrl= "https://linkedin.com/in/janedoe"
            githubUrl= "https://github.com/janedoe"
          />
        </div>
        </div>
    </div>
  )
}

export default About
