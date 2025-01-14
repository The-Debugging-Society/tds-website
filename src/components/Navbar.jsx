import { Link } from 'react-router-dom';
import { useState } from 'react';
import HyperText from './ui/hyper-text';
import {Menu,X} from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="sticky top-0 bg-black z-50">
      <div className="flex justify-between items-center p-5">
        <Link to="/">
          <img src="logo.jpeg" alt="TDS Logo" className="h-12 w-12" />
        </Link>
        <div className="lg:hidden">
          <label onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <div className="w-9 h-10 cursor-pointer flex flex-col items-center justify-center">
              <Menu className='text-blue-500' size={24} />
            </div>
          </label>
        </div>
        <div className="hidden lg:flex justify-end items-center gap-5 text-white">
          <Link to="/"><HyperText className="text-lg text-blue-500">Home</HyperText></Link>
          <Link to="/about"><HyperText className="text-lg text-blue-500">About</HyperText></Link>
          <Link to="/community"><HyperText className="text-lg text-blue-500">Community</HyperText></Link>
          <Link to="/events"><HyperText className="text-lg text-blue-500">Events</HyperText></Link>
          <Link to="/blogs"><HyperText className="text-lg text-blue-500">Blogs</HyperText></Link>
          <Link to="/alumni"><HyperText className="text-lg text-blue-500">Alumni</HyperText></Link>
        </div>
      </div>
      <div className={`fixed top-0 left-0 w-full h-screen bg-black text-white flex flex-col items-center justify-center transform ${isMenuOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 lg:hidden`}>
        <button onClick={() => setIsMenuOpen(false)} className="absolute top-8 right-8 text-2xl text-blue-500"><X size={24}/></button>
        <Link to="/" onClick={() => setIsMenuOpen(false)}><HyperText className="text-lg text-blue-500 mb-5">Home</HyperText></Link>
        <Link to="/about" onClick={() => setIsMenuOpen(false)}><HyperText className="text-lg text-blue-500 mb-5">About</HyperText></Link>
        <Link to="/community" onClick={() => setIsMenuOpen(false)}><HyperText className="text-lg text-blue-500 mb-5">Community</HyperText></Link>
        <Link to="/events" onClick={() => setIsMenuOpen(false)}><HyperText className="text-lg text-blue-500 mb-5">Events</HyperText></Link>
        <Link to="/blogs" onClick={() => setIsMenuOpen(false)}><HyperText className="text-lg text-blue-500 mb-5">Blogs</HyperText></Link>
        <Link to="/alumni" onClick={() => setIsMenuOpen(false)}><HyperText className="text-lg text-blue-500 mb-5">Alumni</HyperText></Link>
      </div>
    </div>
  );
};

export default Navbar;
