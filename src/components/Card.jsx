import { MagicCard } from "./ui/magic-card";
import FlipText from "./ui/flip-text";

export function MagicCardDemo() {
  const { theme } = "dark";
  return (
    <>
    <div className="flex flex-col md:flex-row justify-center items-center gap-5 p-5 w-full bg-black">
    <FlipText
      className="text-4xl font-bold -tracking-widest text-black  dark:text-white md:text-7xl md:leading-[5rem]"
      word="Events"
    />
    </div>
    <div className="flex flex-col md:flex-row justify-center items-center gap-5 p-5 h-[500px] w-full bg-gray-950">
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
