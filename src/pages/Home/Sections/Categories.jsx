import React from "react";
import { 
  FiArrowRight, 
  FiPieChart, 
  FiMic, 
  FiCode, 
  FiMonitor, 
  FiDatabase, 
  FiBriefcase, 
  FiPenTool,
  FiUsers
} from "react-icons/fi";

const Categories = () => {
  const categories = [
    { id: 1, title: "Design", jobs: "235 jobs available", icon: <FiPenTool size={32} /> },
    { id: 2, title: "Sales", jobs: "756 jobs available", icon: <FiPieChart size={32} /> },
    { id: 3, title: "Marketing", jobs: "140 jobs available", icon: <FiMic size={32} /> },
    { id: 4, title: "Finance", jobs: "325 jobs available", icon: <FiBriefcase size={32} /> },
    { id: 5, title: "Technology", jobs: "436 jobs available", icon: <FiMonitor size={32} /> },
    { id: 6, title: "Engineering", jobs: "542 jobs available", icon: <FiCode size={32} /> },
    { id: 7, title: "Business", jobs: "211 jobs available", icon: <FiDatabase size={32} /> },
    { id: 8, title: "Human Resource", jobs: "346 jobs available", icon: <FiUsers size={32} /> },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
            Explore by <span className="text-[#4F46E5]">category</span>
          </h2>
          <button className="hidden md:flex items-center gap-2 text-[#4F46E5] font-bold group">
            Show all jobs 
            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <div 
              key={cat.id} 
              className={`
                group border border-slate-200 bg-white p-6 md:p-10 transition-all duration-300 cursor-pointer 
                flex flex-row md:flex-col items-center md:items-start justify-between md:justify-start gap-4
                hover:bg-[#4F46E5] hover:border-[#4F46E5]
              `}
              style={{ borderRadius: "0px" }}
            >
              {/* Icon Container */}
              <div className="text-[#4F46E5] group-hover:text-white transition-colors duration-300 shrink-0">
                {cat.icon}
              </div>

              {/* Text Wrapper */}
              <div className="flex-1 md:mt-8">
                <h3 className="text-lg md:text-xl font-bold text-slate-900 group-hover:text-white transition-colors duration-300">
                  {cat.title}
                </h3>
                <p className="text-sm text-slate-400 group-hover:text-indigo-100 transition-colors duration-300">
                  {cat.jobs}
                </p>
              </div>

              {/* Right Arrow */}
              <div className="text-slate-300 group-hover:text-white transition-all duration-300">
                <FiArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        {/* Mobile-only Link */}
        <button className="flex md:hidden items-center gap-2 text-[#4F46E5] font-bold mt-8 mx-auto">
          Show all jobs <FiArrowRight />
        </button>
      </div>
    </section>
  );
};

export default Categories;