import { useState } from 'react'
import { IconBrandLinkedin } from '@tabler/icons-react'

// Cloudinary serves the originals (up to ~1 MB); ask it for a small, auto-format version instead
const optimise = (src) =>
  src.includes('res.cloudinary.com') && !src.includes('/upload/w_')
    ? src.replace('/upload/', '/upload/w_600,c_fill,g_face,ar_1:1,q_auto,f_auto/')
    : src

const AlumniCard = ({ name, image, por, company, linkedin }) => {
  // A missing or moved file falls back to the placeholder instead of a broken image
  const [failed, setFailed] = useState(false)

  return (
    <li data-alumni-card className="group flex flex-col">
      <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-[linear-gradient(180deg,#16224a_0%,#0f1838_100%)] ring-1 ring-inset ring-white/5">
        {image && !failed ? (
          <img
            src={optimise(image)}
            alt={name}
            loading="lazy"
            onError={() => setFailed(true)}
            className="h-full w-full object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] [transform:scale(1)] group-hover:[transform:scale(1.05)] motion-reduce:transition-none"
          />
        ) : (
          // No photo: a faint TDS mark holds the slot
          <div className="flex h-full w-full items-center justify-center">
            <img src="/tds-logo-transparent.png" alt="" className="w-[32%] opacity-[0.12] [filter:grayscale(1)_brightness(2.2)]" />
          </div>
        )}
      </div>

      <div className="mt-[1vw] flex items-start justify-between gap-3 max-[1025px]:mt-[2.5vw]">
        <div className="min-w-0">
          <h3 className="text-[1.45vw] font-semibold leading-tight tracking-tight max-[1025px]:text-[3vw] max-md:text-[4.4vw]">
            {name}
          </h3>
          {por && (
            <p className="mt-[0.3vw] font-mono text-[0.85vw] font-medium text-[#3b82f6] max-[1025px]:mt-[0.8vw] max-[1025px]:text-[2vw] max-md:text-[3.3vw]">
              {por}
            </p>
          )}
          {company && (
            <p className="mt-[0.3vw] text-[0.95vw] text-white/70 max-[1025px]:mt-[0.6vw] max-[1025px]:text-[2vw] max-md:text-[3.3vw]">
              Now at <span className="text-white">{company}</span>
            </p>
          )}
        </div>
        {linkedin && (
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${name} on LinkedIn`}
            className="shrink-0 rounded-full p-2 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
          >
            <IconBrandLinkedin size={18} stroke={1.6} />
          </a>
        )}
      </div>
    </li>
  )
}

export default AlumniCard
