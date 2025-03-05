"use client";

import { Link as ScrollLink } from "react-scroll";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white dark:bg-gray-900 shadow-lg z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <ScrollLink
            to="hero"
            smooth={true}
            duration={500}
            className="text-2xl font-bold text-gray-800 dark:text-white cursor-pointer"
          >
            My Portfolio
          </ScrollLink>
          <div className="hidden md:flex items-center space-x-4">
            <ScrollLink
              to="hero"
              smooth={true}
              duration={500}
              className="text-gray-800 dark:text-gray-200 hover:text-indigo-600 cursor-pointer"
            >
              Home
            </ScrollLink>
            <ScrollLink
              to="about"
              smooth={true}
              duration={500}
              className="text-gray-800 dark:text-gray-200 hover:text-indigo-600 cursor-pointer"
            >
              About Me
            </ScrollLink>
            <ScrollLink
              to="contact"
              smooth={true}
              duration={500}
              className="text-gray-800 dark:text-gray-200 hover:text-indigo-600 cursor-pointer"
            >
              Contact Me
            </ScrollLink>
          </div>
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-800 dark:text-gray-200"
            >
              {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
        {isMobileMenuOpen && (
          <div className="md:hidden flex flex-col items-center space-y-4 py-4">
            <ScrollLink
              to="hero"
              smooth={true}
              duration={500}
              className="text-gray-800 dark:text-gray-200 hover:text-indigo-600 cursor-pointer"
              onClick={toggleMobileMenu}
            >
              Home
            </ScrollLink>
            <ScrollLink
              to="about"
              smooth={true}
              duration={500}
              className="text-gray-800 dark:text-gray-200 hover:text-indigo-600 cursor-pointer"
              onClick={toggleMobileMenu}
            >
              About Me
            </ScrollLink>
            <ScrollLink
              to="contact"
              smooth={true}
              duration={500}
              className="text-gray-800 dark:text-gray-200 hover:text-indigo-600 cursor-pointer"
              onClick={toggleMobileMenu}
            >
              Contact Me
            </ScrollLink>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
