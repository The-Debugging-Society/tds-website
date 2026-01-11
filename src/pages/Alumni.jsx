import { useState } from "react";
import AlumniCard from "@/components/Alumni/AlumniCard";
import alumniData from "@/data/alumni";

const Alumni = () => {
  const [selectedYear, setSelectedYear] = useState("2026");

  // const handleYearChange = (event) => {
  //   setSelectedYear(event.target.value)
  // }

  const filteredAlumni = alumniData.filter(
    (alumni) => alumni.yearOfGraduation === selectedYear
  );

  return (
    <div className="w-full mx-auto">
      <div className="flex flex-row items-center justify-center gap-6 p-10">
        <div className="alumni-heading">
          <h1>MEET OUR ALUMNI</h1>
        </div>
        <div className="select-container">
          <select
            value={selectedYear}
            onChange={(e) => {
              setSelectedYear(e.target.value);
            }}
            className="year-select"
          >
            <option value="2026">2026</option>
            <option value="2025">2025</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
          </select>
        </div>
      </div>
      <div className="mt-5 mb-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-7xl px-5 mx-auto">
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
  );
};

export default Alumni;
