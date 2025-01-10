import { MagicCard } from "./ui/magic-card";

export function MagicCardDemo() {
  const { theme } = "dark";
  return (
    <div
      className={
        "flex h-[500px] w-1/3 flex-col gap-4 lg:h-[250px] lg:flex-row"
      }
    >
      <MagicCard
        className="cursor-pointer flex-col items-center justify-center whitespace-nowrap text-4xl shadow-2xl"
        gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
      >
        Magic
      </MagicCard>
      <MagicCard
        className="cursor-pointer flex-col items-center justify-center whitespace-nowrap text-4xl shadow-2xl"
        gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
      >
        Card
      </MagicCard>
    </div>
  );
}
