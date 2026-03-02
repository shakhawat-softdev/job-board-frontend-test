import React, { useEffect, useRef } from "react";
import gsap from "gsap";

// Import your logos here
// import vodafone from "../assets/logos/vodafone.png";
// import tesla from "../assets/logos/tesla.png";

const CompanyLogos = () => {
  const sectionRef = useRef();

  // Data array for easy management
  const companies = [
    { id: 1, name: "Vodafone", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/0/04/Vodafone_Logo.svg/1200px-Vodafone_Logo.svg.png" },
    { id: 2, name: "Intel", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Intel_logo_%282020%2C_light_blue%29.svg/1024px-Intel_logo_%282020%2C_light_blue%29.svg.png" },
    { id: 3, name: "Tesla", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Tesla_Motors.svg/1200px-Tesla_Motors.svg.png" },
    { id: 4, name: "AMD", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/AMD_Logo.svg/1200px-AMD_Logo.svg.png" },
    { id: 5, name: "Talkit", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/LinkedIn_Logo.svg/1200px-LinkedIn_Logo.svg.png" },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".company-item", {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 90%",
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-10 bg-[#Fff]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <p className="text-slate-400 text-sm font-medium mb-8">
          Companies we helped grow
        </p>
        
        <div className="flex flex-wrap items-center justify-between gap-8 md:gap-12">
          {companies.map((company) => (
            <div 
              key={company.id} 
              className="company-item group flex items-center justify-center transition-all duration-300"
            >
              <img 
                src={company.logo} 
                alt={company.name} 
                className="h-8 md:h-10 w-auto object-contain grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 cursor-pointer"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompanyLogos;