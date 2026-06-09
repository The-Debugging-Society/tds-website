import { MagicCard } from "../ui/magic-card";
import FlipText from "../ui/flip-text";

export function MagicCardDemo() {
  const cards = [
    {
      title: "AI Ethics & Security Workshop",
      description:"AI : Ethics & Security Conclave at NSUT brings together industry speakers and hands on sessions designed for students who want to understand technology beyond just using it.",
    image: "/events/AIEthics.jpeg",
      link: "https://www.instagram.com/p/DVDhQCgk5uc/",
    },
     {
      title: "Matiks League 2026",
      description:" a 7 day online league that turns your screen time into a serious power-up.Think fast. Play smart. Build logic, speed, and focus with quick daily challenges that actually help with mind development and yes, come with prizes too.",
      image: "/events/Matiks26.png",
      link: "https://www.instagram.com/thedebuggingsocietynsut/p/DSrilOOCY3i/",
    },
    {
      title: "Tech4Impact 2025",
      description:"Tech4impact - an event where tech innovation meets sustainable impact, Whether you're a coder, creater, or crazy dreamer - this is your chance to not just build a frontend that is seen but that also matters.",
      image:
        "https://res.cloudinary.com/dh6u0utj8/image/upload/v1761826113/Website_banner_d9ju3a.png",
      link: "https://unstop.com/hackathons/tech4impact-2025-innovision25-netaji-subhas-university-of-technology-nsut-delhi-1574739",
    },
    {
      title: "CTRL+ALT+HACK",
      description:
        "The SpaceCon Hackathon is a 24-hour innovation marathon where brilliant minds collaborate to ideate, design, and prototype solutions using Generative AI, Machine Learning, and Web 3.0/Blockchain.",
      image: "/events/hackathon.jpeg",
    },
    {
      title: "DATA SPHERE",
      description:
        "This is the data analytics event of SpaceCon. As visualization takes centre stage, the event is all about drawing insights from the given data. It is the ultimate test of your analytical skills and storytelling as it involves presenting your insights in a creative and impactful way.",
      image: "/events/datasphere.jpeg",
    },
    {
      title: "WEB-A-THON",
      description:
        "Web-a-Thon is a frontend-focused website design challenge where participants will craft visually stunning and innovative websites based on space-related problem statements. Entries will be judged on design, creativity, responsiveness, and code structure.",
      image: "/events/webthon.jpeg",
    },
  ];
  
  return (
    <>
      <div className="flex animate-on-scroll flex-col md:flex-row justify-center items-center gap-5 p-5 w-full">
        <FlipText
          className="text-4xl font-bold -tracking-widest text-blue-500 md:text-7xl md:leading-[5rem]"
          word="Events"
        />
      </div>
      <div className="mt-5 mb-10" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '24px',
            width: "100%",
            maxWidth: "1500px",
            gridAutoRows: "400px",
            padding: "0 20px",
            margin: "0 auto",
          }}>
        {cards.map((card, index) => (
          <div key={index} className="w-full">
            <MagicCard
              className="w-full h-full"
              title={card.title}
              body={ card.description }
              image={card.image}
            />
          </div>
        ))}
      </div>
    </>
  );
}