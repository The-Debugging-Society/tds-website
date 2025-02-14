import { useState } from 'react';
import AlumniCard from '@/components/AlumniCard'
import FlipText from '@/components/ui/flip-text'
import alumniData from '@/alumni'

const Alumni = () => {
  const [selectedYear, setSelectedYear] = useState('All');

  const handleYearChange = (year) => {
    setSelectedYear(year);
  };

  const filteredAlumni = selectedYear === 'All' 
    ? alumniData 
    : alumniData.filter(alumni => alumni.yearOfGraduation === selectedYear);

  return (
    <div className='w-full mx-auto'>
      <div className="flex animate-on-scroll flex-col md:flex-row justify-center items-center gap-5 p-5 w-full bg-background">
        <FlipText
          className="text-4xl font-bold -tracking-widest text-blue-500 md:text-7xl md:leading-[5rem]"
          word="Our Alumni"
        />
      </div>
      <div className="flex justify-center space-x-4 my-4">
        {['All', '2026', '2025', '2024', '2023', '2022'].map(year => (
          <button 
            key={year} 
            onClick={() => handleYearChange(year)} 
            className={`px-4 py-2 rounded ${selectedYear === year ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}`}
          >
            {year}
          </button>
        ))}
      </div>
      <div className="w-full flex flex-wrap items-center justify-center gap-4 py-10">
        {filteredAlumni.map((alumni, i) => (
          <AlumniCard
            key={i}
            name={alumni.name}
            passoutYear={alumni.yearOfGraduation}
            company={alumni.currentCompany || 'In College'}
            linkedin={alumni.linkedIn || 'https://www.linkedin.com/'}
          />
        ))}
      </div>
    </div>
  )
}

export default Alumni
