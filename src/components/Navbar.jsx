import { Link } from 'react-router-dom'
import HyperText from './ui/hyper-text'

const Navbar = () => {
  return (
    <div className='flex justify-between items-center p-5 sticky top-0 bg-black z-50'>
      <img src="logo.jpeg" alt="TDS Logo" className="h-12 w-12" />
      <div className='text-white flex gap-5'>
        <Link to="/"><HyperText className={"text-lg text-blue-500"} duration={500}>Home</HyperText></Link>
        <Link to="/about"><HyperText className={"text-lg text-blue-500"}>About</HyperText></Link>
        <Link to="/contact"><HyperText className={"text-lg text-blue-500"}>Contact</HyperText></Link>
        <Link to="/alumni"><HyperText className={"text-lg text-blue-500"}>Alumni</HyperText></Link>
      </div>
    </div>
  )
}

export default Navbar
