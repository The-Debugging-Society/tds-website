import { IconBrandLinkedin } from '@tabler/icons-react'
import "./alumni.css"

const AlumniCard = ({ name, image, por, company, linkedin }) => {
  const displayName = name.split(' ').slice(0, 2).join(' ')
  console.log(name[0])

return (<div className="card-container">
    {image ? <img src={image} alt={name} className="profile-image" /> : <div className='rounded-full border-blue-800 border-2 p-5 flex items-center text-3xl'>{name[0]}</div>}
    <div className="text-container">
      <div className='name-container'>
      <h2 className="name">
      </h2>
        {displayName} {linkedin && (
          <a href={linkedin} className="linkedin-link" target="_blank" rel="noopener noreferrer">
            <IconBrandLinkedin className="mr-2 h-6 w-6" />
          </a>
        )}
      </div>
      {por && <p className="position">{por}</p>}
      <p className="company">Company: {company}</p>
    </div>
  </div>
  
  )
}

export default AlumniCard
