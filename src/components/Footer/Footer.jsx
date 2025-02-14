import {
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandWhatsapp,
} from '@tabler/icons-react'
import { Link } from 'react-router-dom'

const Footer = () => {
  const year = new Date().getFullYear()
  return (
    <div className="max-w-7xl mx-auto px-4 pt-10">
      <div className="flex flex-col md:flex-row space-y-8 md:justify-between mb-6 px-8">
        <div className="flex items-center space-x-2">
          <Link to="/">
            <img src="https://res.cloudinary.com/dqvwf3z2c/image/upload/v1739019866/logo_zlscnv.jpg" alt="Logo" className="w-12 h-12" />
          </Link>
          <div>
            <h2 className="text-lg font-semibold">TDS NSUT</h2>
            <p className="text-gray-300">We Teach, Code And Compete</p>
          </div>
        </div>

        <div className=''>
          <h3 className="text-lg font-semibold">Quick Links</h3>
          <ul className="mt-2 space-y-2 text-gray-400">
            <li>
              <Link to="/about" className="hover:text-white">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/events/upcoming" className="hover:text-white">
                Our Events
              </Link>
            </li>
            <li>
              <Link to="/alumni" className="hover:text-white">
                Alumni
              </Link>
            </li>
            <li>
              <Link to="/resources" className="hover:text-white">
                Resources
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Follow Us</h3>
          <p className="text-gray-400 text-sm mb-2">
            Stay connected with us on social media.
          </p>
          <div className="flex gap-4 text-gray-400">
            <IconBrandInstagram className="hover:text-gray-200" />
            <IconBrandLinkedin className="hover:text-gray-200" />
            <IconBrandWhatsapp className="hover:text-gray-200" />
          </div>
        </div>
      </div>
      <p className="w-full text-center p-5 border-t-2 text-gray-400 text-sm tracking-wide">
        &copy; TDS NSUT {year} | All rights reserved.
      </p>
    </div>
  )
}

export default Footer
