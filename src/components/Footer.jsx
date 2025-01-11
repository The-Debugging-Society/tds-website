import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-8 mt-8">
      <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-between items-center">
        {/* Left Section */}
        <div className="mb-4 md:mb-0">
          <div className="flex items-center space-x-2">
            <img
              src="logo.jpeg" // Replace with your logo
              alt="Logo"
              className="w-12 h-12"
            />
            <div>
              <h2 className="text-lg font-semibold">TDS NSUT</h2>
              <p>Soc tagline</p>
            </div>
          </div>
          <p className="mt-4 text-gray-400 text-sm">
            &copy; TDS NSUT 2024 | All rights reserved.
          </p>
        </div>

        {/* Center Section */}
        <div className="mb-4 md:mb-0">
          <h3 className="text-lg font-semibold mb-2">Contact us</h3>
          <p>Phone No</p>
          <p>Email address</p>
          <p>NSUT, Sector-3 Dwarka, Delhi</p>
          <div className="flex space-x-4 mt-2">
            {/* Replace '#' with actual links */}
            <a href="#" className="hover:text-gray-300">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="hover:text-gray-300">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="#" className="hover:text-gray-300">
              <i className="fab fa-facebook"></i>
            </a>
          </div>
        </div>

        {/* Right Section */}
        <div>
          <h3 className="text-lg font-semibold mb-2">About us</h3>
          <ul>
            <li>
              <a href="#" className="hover:underline">
                Chapters
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                FAQ
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
