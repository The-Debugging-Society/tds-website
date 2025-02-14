import { useState } from 'react';
import AlumniCard from '@/components/Alumni/AlumniCard'
import FlipText from '@/components/ui/flip-text'
import alumniData from '@/data/alumni'

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
      <div className="flex animate-on-scroll flex-col md:flex-row justify-center items-center gap-5 p-5 w-full">
        <FlipText
          className="text-4xl font-bold -tracking-widest text-blue-500 md:text-7xl md:leading-[5rem]"
          word="Our Alumni"
        />
      </div>
      <div className="flex flex-wrap justify-center gap-2 md:gap-4 my-4 px-5">
        {['All', '2024', '2023', '2022'].map(year => (
          <button 
            key={year} 
            onClick={() => handleYearChange(year)} 
            className={`px-4 py-2 rounded ${selectedYear === year ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}`}
          >
            {year}
          </button>
        ))}
      </div>
      <div className="mt-5 mb-10" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '24px',
            width: "100%",
            maxWidth: "1500px",
            gridAutoRows: "220px",
            padding: "0 20px",
            margin: "0 auto",
          }}>
        {selectedYear == "All" ? filteredAlumni.map((alumni, i) => (
          <AlumniCard
            key={i}
            name={alumni.name}
            passoutYear={alumni.yearOfGraduation}
            company={alumni.currentCompany || 'In College'}
            linkedin={alumni.linkedIn || 'https://www.linkedin.com/'}
          />
        )): filteredAlumni.map((alumni, i) => (
          <AlumniCard
            key={i}
            name={alumni.name}
            company={alumni.currentCompany || 'In College'}
            linkedin={alumni.linkedIn || 'https://www.linkedin.com/'}
          />
        ))}
      </div>
    </div>
  )
}

export default Alumni
