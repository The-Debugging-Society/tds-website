import AlumniCard from '@/components/AlumniCard'
import FlipText from '@/components/ui/flip-text'

const Alumni = () => {
  const alumniData = [
    {
      name: 'John Doe',
      passoutYear: '2022',
      company: 'Google',
      linkedin: 'https://linkedin.com/johndoe',
    },
    {
      name: 'John Doe',
      passoutYear: '2022',
      company: 'Google',
      linkedin: 'https://linkedin.com/johndoe',
    },
    {
      name: 'John Doe',
      passoutYear: '2022',
      company: 'Google',
      linkedin: 'https://linkedin.com/johndoe',
    },
    {
      name: 'John Doe',
      passoutYear: '2022',
      company: 'Google',
      linkedin: 'https://linkedin.com/johndoe',
    },
    {
      name: 'John Doe',
      passoutYear: '2022',
      company: 'Google',
      linkedin: 'https://linkedin.com/johndoe',
    },
    {
      name: 'John Doe',
      passoutYear: '2022',
      company: 'Google',
      linkedin: 'https://linkedin.com/johndoe',
    },
  ]

  return (
    <div className='w-full mx-auto'>
      <div className="flex animate-on-scroll flex-col md:flex-row justify-center items-center gap-5 p-5 w-full bg-background">
        <FlipText
          className="text-4xl font-bold -tracking-widest text-blue-500 md:text-7xl md:leading-[5rem]"
          word="Our Alumni"
        />
      </div>
      <div className="w-full flex flex-wrap items-center justify-center gap-6 py-10">
        {alumniData.map((alumni, i) => (
          <AlumniCard
            key={i}
            name={alumni.name}
            passoutYear={alumni.passoutYear}
            company={alumni.company}
            linkedin={alumni.linkedin}
          />
        ))}
      </div>
    </div>
  )
}

export default Alumni
