"use client";
import React, { useState, useEffect, useRef } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import Link from "next/link";
import Dropdown from "./Dropdown";
import ThemeToggle from "./ThemeToggle";
import { usePathname, useRouter } from 'next/navigation'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showNavbar, setShowNavbar] = useState(true);
  const [drop1, setDrop1] = useState(false);
  const [menuOpenBool, setMenu] = useState(false);
  const currentPath = usePathname();
  const router = useRouter();
  const dropdownTimeoutRef = useRef(null);

  // Scroll handling for navbar show/hide animation
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show navbar when scrolling up or at top
      if (currentScrollY < lastScrollY || currentScrollY < 100) {
        setShowNavbar(true);
      } 
      // Hide navbar when scrolling down and past 100px
      else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowNavbar(false);
        setDrop1(false); // Close dropdown when hiding navbar
      }

      // Add background when scrolled
      setIsScrolled(currentScrollY > 20);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  function toggleMenu() {
    setMenu(!menuOpenBool);
  }

  function dropdownEnter() {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setDrop1(true);
  }

  function dropdownLeave() {
    dropdownTimeoutRef.current = window.setTimeout(() => {
      setDrop1(false);
      dropdownTimeoutRef.current = null;
    }, 150);
  }

  function toggleDropdown() {
    setDrop1(!drop1);
  }
  
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ease-in-out ${
        showNavbar ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <nav className={`transition-all duration-300 ease-in-out ${
        isScrolled 
          ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg border-b border-gray-200/20 dark:border-gray-700/20' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-[var(--content-max-width)] mx-auto px-[var(--content-padding-x-sm)] sm:px-[var(--content-padding-x-md)] lg:px-[var(--content-padding-x-lg)] xl:px-[var(--content-padding-x-xl)]">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="text-xl font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Robert Patton
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <Link
                  href="/"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentPath === '/'
                      ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                      : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                  }`}
                >
                  Home
                </Link>

                {/* Projects Dropdown */}
                <div className="relative" onMouseLeave={dropdownLeave}>
                  <button
                    onMouseEnter={dropdownEnter}
                    onClick={() => { toggleDropdown(); router.push('/projects'); }}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center ${
                      currentPath.startsWith('/projects')
                        ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                        : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                    }`}
                  >
                    Projects
                    <svg className="ml-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
          </button>

                  {/* Dropdown Menu */}
                  <div
                    onMouseEnter={dropdownEnter}
                    className={`absolute left-0 top-full w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 transition-all duration-200 ${
                      drop1 
                        ? 'opacity-100 translate-y-0 visible' 
                        : 'opacity-0 -translate-y-2 invisible'
                    }`}
                  >
                    <div className="py-1">
                      <Link
                        href="/#projects"
                        onClick={dropdownLeave}
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      >
                        Overview
                      </Link>
                      <Link
                        href="/projects/tech"
                        onClick={dropdownLeave}
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      >
                        Tech Projects
                      </Link>
                      <Link
                        href="/projects/uol"
                        onClick={dropdownLeave}
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      >
                        University Projects
                      </Link>
                      <Link
                        href="/projects/other"
                        onClick={dropdownLeave}
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      >
                        Other Projects
                      </Link>
                      <div className="border-t border-gray-100 dark:border-gray-700">
                        <Link
                          href="/projects"
                          onClick={dropdownLeave}
                          className="block px-4 py-2 text-sm font-medium text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                          All Projects
                        </Link>
                      </div>
                    </div>
                    </div>
                </div>

                <Link
                  href="/cv"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentPath === '/cv'
                      ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                      : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                  }`}
                >
                  CV
                </Link>

                <Link
                  href="/contact"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentPath === '/contact'
                      ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                      : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                  }`}
                >
                  Contact
                </Link>
              </div>
            </div>

            {/* Right side - Theme toggle and mobile menu */}
            <div className="flex items-center space-x-4">
              {/* Theme toggle - always rightmost on large screens */}
              <div className="hidden md:block">
                <ThemeToggle />
              </div>

              {/* Mobile menu button and theme toggle */}
              <div className="md:hidden flex items-center space-x-2">
                <ThemeToggle />
                <button
                  onClick={toggleMenu}
                  className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  aria-expanded={menuOpenBool}
                  aria-label="Toggle menu"
                >
                  {menuOpenBool ? (
                    <RxCross1 className="h-6 w-6" />
                  ) : (
                    <AiOutlineMenu className="h-6 w-6" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className={`md:hidden transition-all duration-300 ease-in-out ${
            menuOpenBool 
              ? 'max-h-96 opacity-100' 
              : 'max-h-0 opacity-0 overflow-hidden'
          }`}>
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md rounded-lg mt-2 shadow-lg border border-gray-200/20 dark:border-gray-700/20">
              <Link
                href="/"
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  currentPath === '/'
                    ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                    : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                }`}
                onClick={() => setMenu(false)}
              >
                Home
              </Link>

              {/* Mobile Projects Dropdown */}
              <div>
                <button
                  onClick={toggleDropdown}
                  className={`w-full flex justify-between items-center px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    currentPath.startsWith('/projects')
                      ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                      : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                  }`}
                >
                  Projects
                  <svg className={`h-4 w-4 transition-transform ${drop1 ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                
                <div className={`transition-all duration-200 ${drop1 ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                  <div className="ml-4 mt-2 space-y-1">
                    <Link
                      href="/#projects"
                      className="block px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-md transition-colors"
                      onClick={() => { setMenu(false); setDrop1(false); }}
                    >
                      Overview
                    </Link>
                    <Link
                      href="/projects/tech"
                      className="block px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-md transition-colors"
                      onClick={() => { setMenu(false); setDrop1(false); }}
                    >
                      Tech Projects
                    </Link>
                    <Link
                      href="/projects/uol"
                      className="block px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-md transition-colors"
                      onClick={() => { setMenu(false); setDrop1(false); }}
                    >
                      University Projects
                    </Link>
                    <Link
                      href="/projects/other"
                      className="block px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-md transition-colors"
                      onClick={() => { setMenu(false); setDrop1(false); }}
                    >
                      Other Projects
                    </Link>
                    <Link
                      href="/projects"
                      className="block px-3 py-2 text-sm font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-md transition-colors border-t border-gray-200 dark:border-gray-700 mt-2 pt-2"
                      onClick={() => { setMenu(false); setDrop1(false); }}
                    >
                      All Projects
                    </Link>
                  </div>
        </div>
    </div>

              <Link
                href="/cv"
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  currentPath === '/cv'
                    ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                    : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                }`}
                onClick={() => setMenu(false)}
              >
                CV
              </Link>

              <Link
                href="/contact"
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  currentPath === '/contact'
                    ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                    : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                }`}
                onClick={() => setMenu(false)}
              >
                Contact
              </Link>
            </div>
</div>
</div>
      </nav>
    </header>
  );
};
export default Navbar;