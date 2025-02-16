import React,{useState} from "react"

export const EventCard = ({
  image,
  title,
  description,
}) => {
    const [hoverOver,setHoverOver] = useState(false)

  return (
    <div className=" rounded-lg p-5 overflow-hidden shadow-lg bg-[#0a0a0a] text-white border border-[#1f1f1f] transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105">
      <div className="overflow-hidden">
        <img
          className={`w-full rounded-lg h-64 object-cover object-center transition-transform duration-300 ease-in-out hover:scale-110 ${hoverOver ? "grayscale-0" : "grayscale" }` }
          src={image}
          alt={`${title} event photo`}
          onMouseEnter={() => setHoverOver(true)}
          onMouseLeave={() => setHoverOver(false)}
          style={{ transition: "filter 2s cubic-bezier(0.680, -0.550, 0.265, 1.550)" }}
        />
      </div>
      <div className="px-2 py-4">
        <div className="flex items-center gap-2">
          <h3 className="font-bold text-2xl mb-1 text-white">{title}</h3>
        </div>
        <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  )
}
