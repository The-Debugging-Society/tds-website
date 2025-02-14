  import DotPattern from "../ui/dot-pattern";
  import { cn } from "@/lib/utils";
  import FlipText from "../ui/flip-text";
  import { BentoCard, BentoGrid } from "../ui/bento-grid";
  
  const features = [
    {
      image: "event2.jpg",
      name: "Save your files",
      description: "We automatically save your files as you type.",
      href: "/",
      cta: "Learn more",
      background:  <DotPattern
      className={cn(
        "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]",
      )}
    />,
      className: "col-span-3 lg:col-span-1",
    },
    {
      image: "event5.jpg",
      name: "Full text search",
      description: "Search through all your files in one place.",
      href: "/",
      cta: "Learn more",
       background: <DotPattern
        className={cn(
          "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]",
        )}
      />,
      className: "col-span-3 lg:col-span-2",
    },
    {
      image: "event4.jpg",
      name: "Multilingual",
      description: "Supports 100+ languages and counting.",
      href: "/",
      cta: "Learn more",
       background: <DotPattern
        className={cn(
          "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]",
        )}
      />,
      className: "col-span-3 lg:col-span-2",
    },
    {
      image: "event3.jpg",
      name: "Calendar",
      description: "Use the calendar to filter your files by date.",
      href: "/",
      cta: "Learn more",
       background: <DotPattern
        className={cn(
          "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]",
        )}
      />,
      className: "col-span-3 lg:col-span-1",
    },
  ];
  
  export function BentoDemo() {
    return(
      <div>
    <div className="flex animate-on-scroll flex-col md:flex-row justify-center items-center gap-5 p-5 w-full">
    <FlipText
      className="text-4xl font-bold -tracking-widest text-blue-500 md:text-7xl md:leading-[5rem]"
      word="Highlights"
    />
    </div>
        <div className="relative pt-1 pb-1 flex h-auto w-full px-12 py-8 flex-col items-center justify-start md:shadow-xl">
      <BentoGrid>
        {features.map((feature) => (
          <BentoCard key={feature.name} {...feature} />
        ))}
      </BentoGrid>
        </div>
        </div>
    );


  }
  