import FlipText from "@/components/ui/flip-text";
import { MeetTDSCard } from "@/components";

const About = () => {
  return (
    <div className="bg-cover bg-[url('/logo.jpeg')] min-h-screen">
      <div className="backdrop-blur-lg bg-opacity-50 bg-black flex animate-on-scroll flex-col md:flex-row justify-center items-center gap-5 p-5 w-full text-center">
        <FlipText
          className="text-4xl font-bold tracking-widest text-blue-500 md:text-7xl md:leading-[5rem]"
          word="About"
        />
      </div>
      <div className="backdrop-blur-lg bg-opacity-50 bg-black px-5 py-10">
        <div className="text-center text-lg max-w-2xl mx-auto">
          <p>
            TDS Alumni is a community dedicated to sharing knowledge, inspiring, and connecting with aspiring software engineers from around the world. We aim to foster a supportive and inclusive environment where individuals can learn, grow, and excel.
          </p>
          <br/>
          <p className="font-semibold">Todos:</p>
          <ul className="list-disc list-inside text-gray-300">
            <li>Our Mission</li>
            <li>Our Vision</li>
            <li>Why join TDS</li>
          </ul>
        </div>
        <div className="flex animate-on-scroll flex-col md:flex-row justify-center items-center gap-5 p-5 w-full text-center">
          <FlipText
            className="text-4xl font-bold tracking-widest text-blue-500 md:text-5xl md:leading-[5rem]"
            word="Meet TDS"
          />
        </div>
        <div className="flex justify-center mt-8">
          <MeetTDSCard
            photoUrl="https://res.cloudinary.com/dqvwf3z2c/image/upload/v1739006407/WhatsApp_Image_2025-02-08_at_14.49.31_e641d0c3_ept4uw.jpg"
            name="Nikil"
            position="President"
            description="A dynamic leader with a vision to drive innovation and excellence."
          />
        </div>
        <div className="mt-12 flex flex-wrap justify-center gap-8 px-5">
          <MeetTDSCard
            photoUrl="https://res.cloudinary.com/dqvwf3z2c/image/upload/v1739003223/WhatsApp_Image_2025-02-06_at_20.47.13_c8834e60_t28kec.jpg"
            name="Ashwajeet"
            position="Vice president"
            description="A dedicated leader committed to fostering innovation and teamwork."
          />
            <MeetTDSCard
              photoUrl="https://res.cloudinary.com/dqvwf3z2c/image/upload/v1739003216/WhatsApp_Image_2025-02-06_at_20.04.41_da938446_pnz23k.jpg"
              name="Daksh"
              position="Managing director"
              description="A strategic thinker focused on driving growth and efficiency."
            />
              <MeetTDSCard
                photoUrl="https://res.cloudinary.com/dqvwf3z2c/image/upload/v1739003213/WhatsApp_Image_2025-02-06_at_20.04.25_87b34146_xqrnxm.jpg"
                name="Ritesh"
                position="Web dev lead"
                description="A creative coder passionate about building impactful web applications."
              />
            <MeetTDSCard
              photoUrl="https://res.cloudinary.com/dqvwf3z2c/image/upload/v1739003220/WhatsApp_Image_2025-02-06_at_20.05.44_7c8b1ddd_rmuegc.jpg"
              name="Saneh"
              position="Ml lead"
              description="A machine learning enthusiast passionate about AI-driven solutions."
            />
          <MeetTDSCard
            photoUrl="https://res.cloudinary.com/dqvwf3z2c/image/upload/v1739003190/WhatsApp_Image_2025-02-06_at_20.01.48_85855272_hgerm2.jpg"
            name="Harsh"
            position="DSA lead"
            description="A problem-solving enthusiast with a keen interest in data structures and algorithms."
          />
          <MeetTDSCard
            photoUrl="https://res.cloudinary.com/dqvwf3z2c/image/upload/v1739006520/WhatsApp_Image_2025-02-08_at_14.51.44_fc7d27a8_tx7jyx.jpg"
            name="Ayushmaan Bari"
            position="Gen sec"
            description="An energetic and passionate individual dedicated to fostering collaboration."
          />
            <MeetTDSCard
              photoUrl="https://res.cloudinary.com/dqvwf3z2c/image/upload/v1739003203/WhatsApp_Image_2025-02-06_at_20.03.48_bc6bf5a5_omtnjl.jpg"
              name="Ayush"
              position="Gen sec"
              description="A dedicated leader committed to empowering the community."
            />
          <MeetTDSCard
            photoUrl="https://res.cloudinary.com/dqvwf3z2c/image/upload/v1739006535/WhatsApp_Image_2025-02-08_at_14.51.45_890968f5_lr6qxk.jpg"
            name="Ishita"
            position="Operation"
            description="An organizational mastermind ensuring seamless execution of tasks."
          />
        </div>
      </div>
    </div>
  );
};

export default About;
