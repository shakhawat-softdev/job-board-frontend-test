import React, { useEffect, useRef } from "react";
import { FiSearch, FiMapPin } from "react-icons/fi";
import gsap from "gsap";
import heroPerson from "../../../assets/hero-person.png"; 

const Hero = () => {
  const root = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      tl.from(".hero-text", {
        y: 30,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out"
      })
      .from(".hero-image", {
        scale: 0.9,
        opacity: 0,
        duration: 1.2,
        ease: "power2.out"
      }, "-=0.8")
      .from(".search-bar", {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out"
      }, "-=0.4");
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative min-h-screen pt-32 pb-20 bg-[#F8FAFC] overflow-hidden flex items-center">
      {/* Background Accent Gradient */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-indigo-50/40 -z-10 skew-x-6 translate-x-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Content */}
          <div className="z-10">
            <h1 className="hero-text text-5xl md:text-7xl font-bold text-slate-900 leading-[1.1]">
              Discover <br /> more than <br />
              <span className="relative inline-block text-[#4F46E5]">
                5000+ Jobs
                {/* Decorative Swash Underline */}
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 20" fill="none">
                  <path d="M5 15C50 5 150 5 295 15" stroke="#4F46E5" strokeWidth="4" strokeLinecap="round" />
                </svg>
              </span>
            </h1>
            
            <p className="hero-text mt-8 text-lg text-slate-500 max-w-lg leading-relaxed">
              Great platform for the job seeker that searching for new career heights and passionate about startups.
            </p>

            {/* Floating Search Bar - Changed rounded-xl to rounded-none */}
            <div className="search-bar mt-10 bg-white p-2 rounded-none shadow-[0_20px_50px_rgba(0,0,0,0.05)] flex flex-col md:flex-row items-center gap-2 border border-slate-100">
              <div className="flex items-center gap-3 flex-1 px-4 py-3 w-full">
                <FiSearch className="text-[#4F46E5]" size={22} />
                <input 
                  type="text" 
                  placeholder="Job title or keyword" 
                  className="w-full outline-none text-slate-700 font-medium placeholder:text-slate-400"
                />
              </div>
              
              <div className="hidden md:block w-[1px] h-10 bg-slate-200" />
              
              <div className="flex items-center gap-3 flex-1 px-4 py-3 w-full">
                <FiMapPin className="text-[#4F46E5]" size={22} />
                <select className="w-full outline-none text-slate-700 font-medium bg-transparent cursor-pointer">
                  <option>Florence, Italy</option>
                  <option>Remote</option>
                  <option>New York, USA</option>
                </select>
              </div>

              {/* Search Button - Changed rounded-lg to rounded-none */}
              <button className="w-full md:w-auto bg-[#4F46E5] text-white px-8 py-4 rounded-none font-bold hover:bg-[#4338CA] transition-all transform active:scale-95 shadow-lg shadow-indigo-100">
                Search my job
              </button>
            </div>

            <p className="hero-text mt-6 text-sm text-slate-400 font-medium">
              Popular: <span className="text-slate-600 font-semibold">UI Designer, UX Researcher, Android, Admin</span>
            </p>
          </div>

          {/* Right Image Container */}
          <div className="hero-image relative hidden lg:flex justify-end">
             <div className="relative">
                {/* Visual Depth Circle - Background blur stays soft, but can be removed if strictly cornered */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%]   blur-3xl -z-10" />
                
                <img 
                  src={heroPerson} 
                  alt="Professional man pointing" 
                  className="relative z-10 w-full max-w-lg h-auto object-contain"
                />
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;