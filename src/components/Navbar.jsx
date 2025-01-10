import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='flex justify-between items-center p-5'>
      <div className='text-white'>TDS LOGO</div>
      <div className='text-white flex gap-5'>
        <Link>Home</Link>
        <Link>About</Link>
        <Link>Contact</Link>
        <Link>Alumni</Link>
      </div>
    </div>
  )
}

export default Navbar
