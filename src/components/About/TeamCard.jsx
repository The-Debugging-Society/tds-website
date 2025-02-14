import { IconBrandLinkedin } from '@tabler/icons-react'

export const MeetTDSCard = ({
  photoUrl,
  name,
  position,
  description,
  linkedinUrl,
}) => {
  return (
    <div className=" rounded-lg p-5 overflow-hidden shadow-lg bg-[#0a0a0a] text-white border border-[#1f1f1f] transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105">
      <div className="overflow-hidden">
        <img
          className="w-full rounded-lg h-64 object-cover object-center transition-transform duration-300 ease-in-out hover:scale-110"
          src={photoUrl}
          alt={`${name}'s profile`}
        />
      </div>
      <div className="px-2 py-4">
        <div className="flex items-center gap-2">
          <h3 className="font-bold text-2xl mb-1 text-white">{name}</h3>
          {linkedinUrl && (
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-blue-700 transition-colors duration-300"
            >
              <IconBrandLinkedin className="h-7 w-7" />
            </a>
          )}
        </div>
        <p className="text-gray-300 font-medium text-md mb-2">{position}</p>
        <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  )
}
