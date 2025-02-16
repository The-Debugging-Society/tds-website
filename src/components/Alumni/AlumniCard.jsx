import { IconBrandLinkedin } from '@tabler/icons-react'

const AlumniCard = ({ name, image, por, company, linkedin }) => {
  const displayName = name.split(' ').slice(0, 2).join(' ')

  return (
    <div className="max-w-md flex flex-col justify-between items-center bg-gray-700/50 rounded-lg px-8 py-10 hover:scale-105 gap-6">
      <div className="flex items-center">
        <img
          src={image}
          alt={name}
          className="h-28 w-28 object-cover rounded-full"
        />
      </div>
      <div className="text-center md:text-left">
        <h2 className="text-xl font-bold mb-2 text-white flex items-center gap-2">{displayName} {linkedin && (
          <a
            href={linkedin}
            className="text-blue-500 hover:underline flex items-center justify-center md:justify-start"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconBrandLinkedin className="mr-2 h-6 w-6" />
          </a>
        )}</h2>
        {por && (
          <p className="text-gray-300 mb-1">{por}</p>
        )}
        <p className="text-gray-400 mb-4">Company: {company}</p>
        
      </div>
    </div>
  )
}

export default AlumniCard
