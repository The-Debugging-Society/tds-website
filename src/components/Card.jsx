import { MagicCard } from "./ui/magic-card";
import FlipText from "./ui/flip-text";

export function MagicCardDemo() {
  
  return (
    <>
    <div className="flex animate-on-scroll flex-col md:flex-row justify-center items-center gap-5 p-5 w-full bg-background">
    <FlipText
      className="text-4xl font-bold -tracking-widest text-blue-500 md:text-7xl md:leading-[5rem]"
      word="Events"
    />
    </div>
    <div className="flex flex-col md:flex-row justify-center items-center gap-5 p-4 pt-12 h-auto w-full bg-background">
<MagicCard
  image="event1.jpg"
  title="Stunning Card"
  body="This is a beautiful card with interactive animations."
  className="max-w-sm"
/>
<MagicCard
  image="event2.jpg"
  title="Stunning Card"
  body="This is a beautiful card with interactive animations."
  className="max-w-sm"
/>
<MagicCard
  image="event3.jpg"
  title="Stunning Card"
  body="This is a beautiful card with interactive animations."
  className="max-w-sm"
/>
      </div>
    </>
  );
}
