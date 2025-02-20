import { Link } from 'react-router-dom'
import { MagicCard } from '../ui/magic-card'

const WebDev = () => {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-5 p-4 h-auto w-full bg-background">
      <Link
        target="_blank"
        to="https://www.youtube.com/"
      >
        <MagicCard
          image="/resources/youtube.png"
          title="YouTube Lectures"
          body="Watch comprehensive lectures on various topics on YouTube."
          className="max-w-sm"
        />
      </Link>
      {/* <Link target="_blank" to="/resources/sample.pdf" download>
        <MagicCard
          image="pdf.png"
          title="Download PDF"
          body="This PDF contains detailed notes, examples, and exercises to help you master web development."
          className="max-w-sm"
        />
      </Link> */}
    </div>
  )
}

export default WebDev
