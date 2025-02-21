import { Link } from 'react-router-dom'
import { MagicCard } from '../ui/magic-card'

const DSA = () => {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-5 p-4 h-auto w-full">
      <Link target="_blank" to="https://leetcode.com/explore/">
        <MagicCard
          image="/resources/leetcode.png"
          title="LeetCode POTD"
          body="Solve the Problem of the Day on LeetCode to improve your problem-solving skills."
          className="max-w-sm"
        />
      </Link>
      <Link
        target="_blank"
        to="https://www.geeksforgeeks.org/problem-of-the-day"
      >
        <MagicCard
          image="/resources/gfg.png"
          title="GFG POTD"
          body="Tackle the Problem of the Day on GeeksforGeeks for daily coding practice."
          className="max-w-sm"
        />
      </Link>
      <Link
        target="_blank"
        to="https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/"
      >
        <MagicCard
          image="/resources/striver.png"
          title="Striver A-Z Sheets"
          body="Striver's A-Z DSA Sheets for a comprehensive guide to data structures and algorithms."
          className="max-w-sm"
        />
      </Link>
    </div>
  )
}

export default DSA
