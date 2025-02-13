import { IconBrandLinkedin } from '@tabler/icons-react'

const AlumniCard = ({ name, passoutYear, company, linkedin }) => {
  return (
    <div className="max-w-md flex flex-col md:flex-row justify-between items-center bg-gray-700/50 rounded-lg px-8 py-10 hover:scale-105 gap-10">
      <div className="flex items-center mb-4 md:mb-0">
        <img
          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          className="h-36 w-36 object-cover rounded-full"
        />
      </div>
      <div className="text-center md:text-left">
        <h2 className="text-xl font-bold mb-2 text-white">{name}</h2>
        <p className="text-gray-300 mb-1">Passout Year: {passoutYear}</p>
        <p className="text-gray-400 mb-4">Company: {company}</p>
        <a
          href={linkedin}
          className="text-blue-500 hover:underline flex items-center justify-center md:justify-start"
          target="_blank"
          rel="noopener noreferrer"
        >
          <IconBrandLinkedin className="mr-2 h-6 w-6" />
        </a>
      </div>
    </div>
  )
}

export default AlumniCard
