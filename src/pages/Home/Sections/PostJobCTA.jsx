import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ctaImage from "../../../assets/cta.png";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const PostJobCTA = () => {
  const sectionRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Content animation (from left)
      gsap.from(".cta-content", {
        x: -40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });
      // Image animation (fades in slightly later)
      gsap.from(".cta-image-container", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Blue CTA Container - Flex layout with relative positioning */}
        <div className="bg-[#4F46E5] flex flex-col lg:flex-row items-stretch rounded-none relative overflow-hidden h-full">
          
          {/* Left Content Area - p-16 for generous spacing */}
          <div className="cta-content flex-1 p-10 md:p-16 lg:p-20 z-10 text-center lg:text-left">
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Start posting <br /> jobs today
            </h2>
            <p className="text-indigo-100 mt-6 text-lg max-w-md mx-auto lg:mx-0">
              Great platform for the job seeker that searching for new career heights and passionate about startups. Start posting jobs for only $10.
            </p>
            
            {/* White Button - Sharp edges */}
            <button className="mt-10 bg-white text-[#4F46E5] px-10 py-4 font-bold text-lg rounded-none hover:bg-indigo-50 transition-all shadow-xl shadow-indigo-200 active:scale-95">
              Sign up for free
            </button>
          </div>

          {/* Right Image Container - Absolutely positioned at bottom right, fully contained */}
          <div className="cta-image-container flex-1 relative lg:absolute lg:right-0 lg:bottom-0 lg:w-1/2 lg:h-full lg:flex lg:items-end lg:justify-end mt-10 lg:mt-0 p-6 lg:p-0">
            <img 
              src={ctaImage} 
              alt="Dashboard Preview" 
              // w-auto on mobile, contained on desktop, aligned to bottom
              className="w-full lg:w-auto h-auto lg:max-h-[90%] object-contain object-bottom drop-shadow-2xl"
              style={{ borderRadius: "0px" }}
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default PostJobCTA;