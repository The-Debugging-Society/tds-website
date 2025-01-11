import React from "react";
import { FloatingDockDemo } from "./FloatingDock";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-black text-white py-8">
      <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-between">
        {/* Left Section: Logo and About */}
        <div className="mb-4 md:mb-0 w-full md:w-2/5">
          <div className="flex items-center space-x-2">
            <img
              src="logo.jpeg" // Replace with your logo
              alt="Logo"
              className="w-12 h-12"
            />
            <div>
              <h2 className="text-lg font-semibold">TDS NSUT</h2>
              <p className="text-gray-300">We Teach, Code And Compete</p>
            </div>
          </div>
          <p className="mt-4 text-gray-400 text-sm">
            &copy; TDS NSUT {year} | All rights reserved.
          </p>
        </div>

        {/* Center Section: Quick Links */}
        <div className="mb-4 md:mb-0 w-full md:w-1/5">
          <h3 className="text-lg font-semibold">Quick Links</h3>
          <ul className="mt-2 space-y-2">
            <li>
              <a href="#about" className="text-gray-400 hover:text-white">
                About Us
              </a>
            </li>
            <li>
              <a href="#projects" className="text-gray-400 hover:text-white">
                Our Projects
              </a>
            </li>
            <li>
              <a href="#contact" className="text-gray-400 hover:text-white">
                Contact Us
              </a>
            </li>
            <li>
              <a href="#privacy" className="text-gray-400 hover:text-white">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>

        {/* Right Section: Floating Dock with Social Links */}
        <div className="mb-4 md:mb-0 w-full md:w-2/5">
          <h3 className="text-lg font-semibold">Follow Us</h3>
          <p className="text-gray-400 text-sm mb-2">
            Stay connected with us on social media.
          </p>
          <FloatingDockDemo />
        </div>
      </div>
    </footer>
  );
};

export default Footer;

