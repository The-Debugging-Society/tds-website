import { IconBrandInstagram, IconBrandLinkedin, IconBrandX } from '@tabler/icons-react'

export const TeamCard = ({
  photoUrl,
  name,
  position,
  description,
  linkedinUrl,
  xUrl,
  instaUrl,
}) => {
  return (
    <div className=" rounded-lg p-5 overflow-hidden shadow-lg bg-[#0a0a0a] text-white border border-[#1f1f1f] transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105">
      <img
        className="w-full rounded-lg h-48 md:h-64 object-cover object-center"
        src={photoUrl}
        alt={`${name}'s profile`}
      />
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
              <IconBrandLinkedin className="size-7" />
            </a>
          )}
          {xUrl && (
            <a
              href={xUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-500 transition-colors duration-300"
            >
              <IconBrandX className="size-7" />
            </a>
          )}
          {instaUrl && (
            <a
              href={instaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-red-500 transition-colors duration-300"
            >
              <IconBrandInstagram className="size-7" />
            </a>
          )}
        </div>
        <p className="text-gray-300 font-medium text-md mb-2">{position}</p>
        <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  )
}
