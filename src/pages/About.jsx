import FlipText from "@/components/ui/flip-text"

const About = () => {
  return (
    <div className="bg-cover bg-[url('/logo.jpeg')]">
      <div className="flex animate-on-scroll flex-col md:flex-row justify-center items-center gap-5 p-5 w-full">
        <FlipText
          className="text-4xl font-bold -tracking-widest text-blue-500 md:text-7xl md:leading-[5rem]"
          word="About"
        />
      </div>
      <div className="backdrop-blur-lg bg-opacity-50 bg-black">
        <div className="text-center p-5 text-lg max-w-2xl mx-auto">
            TDS Alumni is a community dedicated to sharing knowledge, inspiring, and connecting with aspiring software engineers from around the world. We aim to foster a supportive and inclusive environment where individuals can learn, grow, and excel.
        </div>
        <div className="text-center p-5 text-lg max-w-2xl mx-auto">
            TDS Alumni is a community dedicated to sharing knowledge, inspiring, and connecting with aspiring software engineers from around the world. We aim to foster a supportive and inclusive environment where individuals can learn, grow, and excel.
        </div>
        <div className="text-center p-5 text-lg max-w-2xl mx-auto">
            TDS Alumni is a community dedicated to sharing knowledge, inspiring, and connecting with aspiring software engineers from around the world. We aim to foster a supportive and inclusive environment where individuals can learn, grow, and excel.
        </div>
        <div className="text-center p-5 text-lg max-w-2xl mx-auto">
            TDS Alumni is a community dedicated to sharing knowledge, inspiring, and connecting with aspiring software engineers from around the world. We aim to foster a supportive and inclusive environment where individuals can learn, grow, and excel.
        </div>
        <div className="flex animate-on-scroll flex-col md:flex-row justify-center items-center gap-5 p-5 w-full">
          <FlipText
            className="text-4xl font-bold -tracking-widest text-blue-500 md:text-5xl md:leading-[5rem]"
            word="Our Events"
          />
        </div>
        <div className="text-center p-5 text-lg max-w-2xl mx-auto">
            TDS Alumni is a community dedicated to sharing knowledge, inspiring, and connecting with aspiring software engineers from around the world. We aim to foster a supportive and inclusive environment where individuals can learn, grow, and excel.
        </div>
        <div className="text-center p-5 text-lg max-w-2xl mx-auto">
            TDS Alumni is a community dedicated to sharing knowledge, inspiring, and connecting with aspiring software engineers from around the world. We aim to foster a supportive and inclusive environment where individuals can learn, grow, and excel.
        </div>
        <div className="text-center p-5 text-lg max-w-2xl mx-auto">
            TDS Alumni is a community dedicated to sharing knowledge, inspiring, and connecting with aspiring software engineers from around the world. We aim to foster a supportive and inclusive environment where individuals can learn, grow, and excel.
        </div>
        </div>
    </div>
  )
}

export default About
