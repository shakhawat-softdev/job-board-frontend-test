import React, { useState, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import gsap from "gsap";
import logo from "../assets/logo.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const navLinks = [
    { id: "#", title: "Find Jobs" },
    { id: "#", title: "Browse Companies" },
  ];

  const toggleMenu = () => {
    if (!isMenuOpen) {
      setIsMenuOpen(true);
      gsap.to(menuRef.current, {
        x: 0,
        opacity: 1,
        visibility: "visible",
        duration: 0.4,
        ease: "power3.out",
      });
    } else {
      gsap.to(menuRef.current, {
        x: "100%",
        opacity: 0,
        duration: 0.3,
        ease: "power3.in",
        onComplete: () => setIsMenuOpen(false),
      });
    }
  };

  return (
    // Added solid bg-white to ensure it covers the Hero section content
    <header className="fixed top-0 left-0 w-full z-[100] bg-white border-b border-gray-100 py-4">
      <nav className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        
        <div className="flex items-center gap-12">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="QuickHire" className="h-8 md:h-10" />
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((nav) => (
              <NavLink
                key={nav.id}
                to={nav.id}
                className={({ isActive }) =>
                  `text-[15px] font-medium transition-all ${
                    isActive ? "text-[#4F46E5]" : "text-slate-500 hover:text-[#4F46E5]"
                  }`
                }
              >
                {nav.title}
              </NavLink>
            ))}
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-6">
          <Link to="/login" className="text-[15px] font-bold text-[#4F46E5] hover:text-[#4338CA]">
            Login
          </Link>
          <div className="h-6 w-[1px] bg-gray-200"></div> 
          <Link 
            to="/signup" 
            // Removed rounded-md, added rounded-none for sharp corners
            className="bg-[#4F46E5] text-white px-8 py-2.5 rounded-none font-bold hover:bg-[#4338CA] transition-all"
          >
            Sign Up
          </Link>
        </div>

        <button 
          onClick={toggleMenu} 
          className="lg:hidden p-2 text-slate-900 z-[110]" // Higher Z to stay above overlay
        >
          {isMenuOpen ? <FiX size={28} className="text-slate-900" /> : <FiMenu size={28} />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        ref={menuRef}
        className="fixed inset-0 bg-white z-[105] flex flex-col translate-x-full opacity-0 invisible lg:hidden pt-24 px-8"
      >
        {/* Added a internal Close button for better UX if the nav one is blocked */}
        <div className="flex flex-col gap-6">
          {navLinks.map((nav) => (
            <NavLink 
              key={nav.id} 
              to={nav.id} 
              onClick={toggleMenu}
              className="text-2xl font-bold text-slate-900"
            >
              {nav.title}
            </NavLink>
          ))}
          <hr className="border-gray-100" />
          <Link to="/login" className="text-xl font-semibold text-[#4F46E5]">Login</Link>
          <Link 
            to="/signup" 
            onClick={toggleMenu}
            // Sharp corners for mobile button
            className="bg-[#4F46E5] text-white text-center py-4 rounded-none font-bold text-lg"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;