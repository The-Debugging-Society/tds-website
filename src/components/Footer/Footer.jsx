import {
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandWhatsapp,
} from '@tabler/icons-react'
import { Link } from 'react-router-dom'
import Particles from '../ui/particles'
import HyperText from '../ui/hyper-text'

const Footer = () => {
  const year = new Date().getFullYear()
  
  return (
    <footer className="relative w-full overflow-hidden border-t border-white/10 bg-black text-white">
      {/* Background Particles */}
      <Particles
        className="absolute inset-0 z-0"
        quantity={60}
        ease={80}
        color="#ffffff"
        refresh
      />

      {/* Large Cut Text */}
      <div className="absolute -bottom-0 left-1/2 -translate-x-1/2 w-full text-center pointer-events-none z-0 select-none overflow-hidden">
        <h1 className="text-[10rem] md:text-[16rem] font-black tracking-tighter text-white/[0.2] whitespace-nowrap leading-none translate-y-1/3">
        TDS<span className="hidden md:inline"> NSUT</span>
        </h1>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          
          {/* Brand Section - Spans 5 columns */}
          <div className="md:col-span-5 space-y-6">
            <Link to="/" className="flex items-center gap-4 group">
              <div className="relative overflow-hidden rounded-xl border border-white/10 p-1 bg-white/5 transition-transform duration-300 group-hover:scale-105">
                <img 
                  src="https://res.cloudinary.com/dqvwf3z2c/image/upload/v1739019866/logo_zlscnv.jpg" 
                  alt="Logo" 
                  className="w-16 h-16 rounded-lg object-cover" 
                />
              </div>
              <div className="flex flex-col">
                <HyperText 
                  className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
                  text="TDS NSUT"
                >
                  TDS NSUT
                </HyperText>
                <span className="text-sm text-gray-400 tracking-wider uppercase font-medium mt-1">
                  The Debugging Society
                </span>
              </div>
            </Link>
            
            <p className="text-gray-400 leading-relaxed max-w-sm">
              We foster a community of developers, innovators, and problem solvers. 
              Join us to learn, code, and compete at the highest level.
            </p>
          </div>

          {/* Quick Links - Spans 3 columns */}
          <div className="md:col-span-3 space-y-6">
            <h3 className="text-lg font-semibold text-white relative inline-block after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-12 after:h-1 after:bg-blue-500 after:rounded-full">
              Explore
            </h3>
            <ul className="space-y-3">
              {[
                { name: 'About Us', path: '/about' },
                { name: 'Our Events', path: '/events/upcoming' },
                { name: 'Alumni Network', path: '/alumni' },
                { name: 'Resources', path: '/resources' },
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    className="text-gray-400 hover:text-blue-400 transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-blue-400 transition-colors"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials & Contact - Spans 4 columns */}
          <div className="md:col-span-4 space-y-6">
            <h3 className="text-lg font-semibold text-white relative inline-block after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-12 after:h-1 after:bg-purple-500 after:rounded-full">
              Connect With Us
            </h3>
            <p className="text-gray-400">
              Stay updated with the latest hackathons, workshops, and tech talks.
            </p>
            <div className="flex gap-4">
              {[
                { icon: IconBrandInstagram, href: 'https://www.instagram.com/thedebuggingsocietynsut/', color: 'hover:text-pink-500', label: 'Instagram' },
                { icon: IconBrandLinkedin, href: 'https://www.linkedin.com/company/thedebuggingsocietynsut/', color: 'hover:text-blue-600', label: 'LinkedIn' },
                { icon: IconBrandWhatsapp, href: 'https://chat.whatsapp.com/GQThHbXdSpT68iHm2nT8Dx', color: 'hover:text-green-500', label: 'WhatsApp' },
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={`p-3 rounded-lg bg-white/5 border border-white/10 text-gray-400 transition-all duration-300 hover:scale-110 hover:bg-white/10 ${social.color}`}
                >
                  <social.icon size={24} stroke={1.5} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            &copy; {year} TDS NSUT. Built with ❤️ by the Tech Team.
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
