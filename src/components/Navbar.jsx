import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='flex justify-between items-center p-5 backdrop-filter backdrop-blur-lg'>
      <Link to='/'>
      {/* to be replace with img tag */}
        <div className='text-white'>TDS LOGO</div>
      </Link>
      <div className='text-white flex gap-5'>
        <Link to='/'>Home</Link>
        <Link to='/about'>About</Link>
        <Link to='/contact'>Contact</Link>
        <Link to='/alumni'>Alumni</Link>
      </div>
    </div>
  )
}

export default Navbar
