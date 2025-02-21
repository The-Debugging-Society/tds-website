import { Link } from 'react-router-dom'
import { MagicCard } from '../ui/magic-card'

const ML = () => {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-5 p-4 h-auto w-full">
      <Link
        target="_blank"
        to="https://www.coursera.org/learn/machine-learning"
      >
        <MagicCard
          image="/resources/coursera.png"
          title="Coursera ML Course"
          body="Enroll in the Machine Learning course on Coursera."
          className="max-w-sm"
        />
      </Link>
      <Link
        target="_blank"
        to="https://www.kaggle.com/learn/intro-to-machine-learning"
      >
        <MagicCard
          image="/resources/kaggle.png"
          title="Kaggle ML Course"
          body="Learn Machine Learning with hands-on exercises on Kaggle."
          className="max-w-sm object-fit"
        />
      </Link>
    </div>
  )
}

export default ML
