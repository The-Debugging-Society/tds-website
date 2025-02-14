import { MagicCard } from "../ui/magic-card";
import FlipText from "../ui/flip-text";

export function MagicCardDemo() {
  const cards = [
    {
      title: "CTRL+ALT+HACK",
      description: "The SpaceCon Hackathon is a 24-hour innovation marathon where brilliant minds collaborate to ideate, design, and prototype solutions using Generative AI, Machine Learning, and Web 3.0/Blockchain.",
      image: "https://spacecon.tech/ctrlalthack.png"
    },
    {
      title: "DATA SPHERE",
      description: "This is the data analytics event of SpaceCon. As visualization takes centre stage, the event is all about drawing insights from the given data. It is the ultimate test of your analytical skills and storytelling as it involves presenting your insights in a creative and impactful way.",
      image: "https://spacecon.tech/Datasphereweb.png"
    },
    {
      title: "WEB-A-THON",
      description: "Web-a-Thon is a frontend-focused website design challenge where participants will craft visually stunning and innovative websites based on space-related problem statements. Entries will be judged on design, creativity, responsiveness, and code structure.",
      image: "https://spacecon.tech/webathon.png"
    },
    {
      title: "AI HORIZON",
      description: "Generative AI Challenge blends tech and creativity to explore AI's role in space exploration and storytelling. Focus on AI-driven research, planning, and missions. Workshops on AI innovations shaping human space journeys. If you're into space, AI, or creative tech, explore the future of space exploration!",
      image: "https://spacecon.tech/aihorizon.png"
    }
  ];
  
  return (
    <>
      <div className="flex animate-on-scroll flex-col md:flex-row justify-center items-center gap-5 p-5 w-full">
        <FlipText
          className="text-4xl font-bold -tracking-widest text-blue-500 md:text-7xl md:leading-[5rem]"
          word="Events"
        />
      </div>
      <div className="px-12 py-8 pt-1 pb-1" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '24px',
            width: "100%",
            gridAutoColumns: "500px",
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