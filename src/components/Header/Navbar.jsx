import { Link } from 'react-router-dom';
import { useState } from 'react';
import "./Navbar.css"
import {Menu,X} from 'lucide-react';
import ScrollProgress from "../ui/scroll-progress"
import HyperText from '../ui/hyper-text';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const links = ['Home', 'About','Events', 'Alumni', 'Resources'];

  return (
      <div className="sticky top-0 bg-black z-50 flex justify-between items-center p-5">
        <div>
          <Link to="/">
            <img src="logo.jpeg" alt="TDS Logo" className="h-12 w-12"/>
          </Link>
        </div>
        {/* Menu bar bar for mobile */}
        <div className="lg:hidden">
          <label onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <div className="w-9 h-10 cursor-pointer flex flex-col items-center justify-center font-bold">
              <Menu className='text-blue-500' size={24}/>
            </div>
          </label>
        </div>
        {/* navbar links for large screen */}
        <div className="hidden lg:flex justify-end items-center gap-8 font-semibold text-lg text-blue-500/85">
          {links.map((link, index) => (
              <Link key={index} to={`/${link.toLocaleLowerCase()}`} className='hover:text-blue-500'>
                <HyperText animateOnHover={false} className={'text-lg'}>{link}</HyperText>
              </Link>
          ))}
        </div>
        {/* menu bar links for mobile screen */}
        <div id={"mobileCr1"} className={isMenuOpen ? "expanded" : ""}></div>
        <div id={"mobileCr2"} className={isMenuOpen ? "expanded" : ""}></div>
        <div id={"mobileCr3"} className={isMenuOpen ? "expanded" : ""}></div>

        <div id="mobileNav"
             className={`fixed top-0 left-0 w-full h-screen text-lg text-blue-500 bg-black space-y-5 flex flex-col items-center justify-center transform ${isMenuOpen ? "expanded" : ""} ${isMenuOpen ? "translate-y-0" : "-translate-y-full"}  lg:hidden`}>
          <button onClick={() => setIsMenuOpen(false)} className="absolute top-8 right-8 text-2xl text-blue-500"><X
              size={24}/></button>
          {links.map((link, index) => (
              <Link key={index} to={`/${link.toLocaleLowerCase()}`}>
                <h1 onClick={() => setIsMenuOpen(false)} className={'text-lg text-blue-500'}>{link}</h1>
              </Link>
          ))}
        </div>

        <ScrollProgress className="top-[88px]"/>
      </div>
  );
};

export default Navbar;