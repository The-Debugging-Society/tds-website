import { Link } from "react-router-dom"
import FlipText from "../components/ui/flip-text"
import {MagicCard} from "../components/ui/magic-card"

const Resources = () => {
  return (
    <div>
      <div className="flex animate-on-scroll flex-col md:flex-row justify-center items-center gap-5 p-5 w-full bg-background">
          <FlipText
            className="text-4xl font-bold -tracking-widest text-blue-500 md:text-7xl md:leading-[5rem]"
            word="Resources"
          />
      </div>
      <div className="flex flex-col md:flex-row justify-center gap-5 p-4 h-auto w-full bg-background">
        <button className="border-4 px-6 py-3 rounded-full text-white hover:shadow-white hover:shadow-md"><Link to='https://leetcode.com/explore/'>Leetcode</Link></button>
        <button className="border-4 px-6 py-3 rounded-full text-white hover:shadow-white hover:shadow-md"><Link to='https://www.geeksforgeeks.org/problem-of-the-day'>Geeks For Geeks</Link></button>
        <button className="border-4 px-6 py-3 rounded-full text-white hover:shadow-white hover:shadow-md"><Link to='https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/'>Striver A-Z</Link></button>
      </div>
      <div className="flex flex-col md:flex-row justify-center items-center gap-5 p-4 h-auto w-full bg-background">
        <MagicCard
          image="leetcode.png"
          title="LeetCode POTD"
          body="Solve the Problem of the Day on LeetCode to improve your problem-solving skills."
          className="max-w-sm"
        />
        <MagicCard
          image="gfg.png"
          title="GFG POTD"
          body="Tackle the Problem of the Day on GeeksforGeeks for daily coding practice."
          className="max-w-sm"
        />
        <MagicCard
          image="striver.png"
          title="Striver A-Z Sheets"
          body="Striver's A-Z DSA Sheets for a comprehensive guide to data structures and algorithms."
          className="max-w-sm"
        />
      </div>
      <div className="flex animate-on-scroll flex-col md:flex-row justify-center items-center gap-5 p-5 w-full bg-background">
          <FlipText
            className="text-4xl font-bold -tracking-widest text-blue-500 md:text-5xl md:leading-[5rem]"
            word="Challenges"
          />
      </div>
      <div className="text-center p-5 text-lg max-w-2xl mx-auto">
        <div className="text-blue-500 text-3xl font-bold">75 Day Challenge</div> to improve your problem-solving skills.
      </div>
    </div>
  )
}

export default Resources
