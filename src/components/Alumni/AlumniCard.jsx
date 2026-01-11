import { IconBrandLinkedin } from '@tabler/icons-react'

const AlumniCard = ({ name, image, por, company, linkedin }) => {
  const displayName = name.split(' ').slice(0, 2).join(' ')
  
  return (
    <div className="flex flex-col items-center p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-xl group">
      <div className="relative mb-4">
        {image ? (
          <img 
            src={image} 
            alt={name} 
            className="w-32 h-32 rounded-full object-cover border-2 border-blue-500/30 group-hover:border-blue-500 transition-colors duration-300" 
          />
        ) : (
          <div className="w-32 h-32 rounded-full bg-blue-900/20 border-2 border-blue-500/30 flex items-center justify-center text-4xl font-bold text-blue-400 group-hover:border-blue-500 transition-colors duration-300">
            {name[0]}
          </div>
        )}
      </div>
      
      <div className="text-center space-y-2 w-full">
        <div className="flex items-center justify-center gap-2">
          <h2 className="text-xl font-bold text-white tracking-tight">
            {displayName}
          </h2>
          {linkedin && (
            <a 
              href={linkedin} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400 transition-colors"
            >
              <IconBrandLinkedin size={20} />
            </a>
          )}
        </div>
        
        {por && (
          <p className="text-blue-400 font-medium text-sm bg-blue-500/10 py-1 px-3 rounded-full inline-block">
            {por}
          </p>
        )}
        
        <p className="text-gray-400 text-sm font-medium">
          <span className="text-gray-500 mr-1">Company:</span>
          {company}
        </p>
      </div>
    </div>
  )
}

export default AlumniCard
