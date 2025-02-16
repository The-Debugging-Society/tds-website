import { useState } from 'react'
import AlumniCard from '@/components/Alumni/AlumniCard'
import FlipText from '@/components/ui/flip-text'
import alumniData from '@/data/alumni'

const Alumni = () => {
  const [selectedYear, setSelectedYear] = useState('2024')

  // const handleYearChange = (event) => {
  //   setSelectedYear(event.target.value)
  // }

  const filteredAlumni = alumniData.filter(
    (alumni) => alumni.yearOfGraduation === selectedYear
  )

  return (
    <div className="w-full mx-auto">
      <div className="flex flex-col md:flex-row items-center justify-center md:gap-6 p-10">
        <FlipText
          className="text-5xl font-bold -tracking-[6px] text-blue-500 md:text-7xl md:leading-[5rem]"
          word="MEET  OUR  ALUMNI  OF"
        />
        <div className="flex justify-center my-4 md:my-0">
          <select
            value={selectedYear}
            onChange={(e) => {
              setSelectedYear(e.target.value)
            }}
            className="px-2 mx-auto py-2 text-5xl md:text-7xl font-bold outline-none bg-black text-blue-500"
          >
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
          </select>
        </div>
      </div>
      <div className="mt-5 mb-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-7xl mx-auto px-5">
        {filteredAlumni.map((alumni, i) => (
          <AlumniCard
            key={i}
            name={alumni.name}
            por={alumni.por}
            image={alumni.image}
            company={alumni.currentCompany}
            linkedin={alumni.linkedIn}
          />
        ))}
      </div>
    </div>
  )
}

export default Alumni
