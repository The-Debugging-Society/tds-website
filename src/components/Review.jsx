import Marquee from "./ui/marquee";
import FlipText from "./ui/flip-text";

const reviews = [
    {
      name: "Aarav",
      username: "@aarav",
      body: "The events organized by TDS NSUT are exceptional. The hands-on workshops are a game changer!",
      img: "https://avatar.vercel.sh/aarav?theme=indian",
    },
    {
      name: "Ishita",
      username: "@ishita",
      body: "Being part of TDS NSUT has boosted my coding skills immensely. The guidance here is unmatched!",
      img: "https://avatar.vercel.sh/ishita?theme=indian",
    },
    {
      name: "Rohan",
      username: "@rohan",
      body: "The community is amazing! The hackathons and tech talks really broaden your perspective.",
      img: "https://avatar.vercel.sh/rohan?theme=indian",
    },
    {
      name: "Meera",
      username: "@meera",
      body: "I love how TDS NSUT makes learning so fun and interactive. Joining was the best decision!",
      img: "https://avatar.vercel.sh/meera?theme=indian",
    },
    {
      name: "Kabir",
      username: "@kabir",
      body: "From coding competitions to guest lectures, TDS NSUT is the hub of tech brilliance.",
      img: "https://avatar.vercel.sh/kabir?theme=indian",
    },
    {
      name: "Ananya",
      username: "@ananya",
      body: "The mentorship program at TDS NSUT is outstanding. It helped me land my first internship!",
      img: "https://avatar.vercel.sh/ananya?theme=indian",
    },
  ];
  

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({ img, name, username, body }) => {
  return (
    <figure
      className={`relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4 
        border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05] 
        dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]`}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};

const MarqueeDemo = () => {
  return (
    <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden border bg-background md:shadow-xl">
                <FlipText
              className="text-4xl font-bold -tracking-widest mt-12 mb-12 text-black dark:text-white md:text-7xl md:leading-[5rem]"
              word="Reviews"
            />
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
    </div>
  );
};

export default MarqueeDemo;
