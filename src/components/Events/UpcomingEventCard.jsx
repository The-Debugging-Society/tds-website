export const EventCard = ({
  image,
  title,
  description,
}) => {

  return (
    <div className=" rounded-lg p-5 overflow-hidden shadow-lg bg-[#0a0a0a] text-white border border-[#1f1f1f]">
      <div className="overflow-hidden">
        <img
          className={`w-full rounded-lg h-64 object-cover object-center` }
          src={image}
          alt={`${title} event photo`}
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
