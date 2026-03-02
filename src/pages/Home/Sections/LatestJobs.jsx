import React from "react";
import { FiArrowRight } from "react-icons/fi";

const LatestJobs = () => {
  const jobs = [
    { id: 1, company: "Nomad", title: "Social Media Assistant", location: "Paris, France", tags: ["Full-Time", "Marketing", "Design"], logo: "https://logo.clearbit.com/nomad.com" },
    { id: 2, company: "Netlify", title: "Social Media Assistant", location: "Paris, France", tags: ["Full-Time", "Marketing", "Design"], logo: "https://logo.clearbit.com/netlify.com" },
    { id: 3, company: "Dropbox", title: "Brand Designer", location: "San Francisco, USA", tags: ["Full-Time", "Marketing", "Design"], logo: "https://logo.clearbit.com/dropbox.com" },
    { id: 4, company: "Maze", title: "Brand Designer", location: "San Francisco, USA", tags: ["Full-Time", "Marketing", "Design"], logo: "https://logo.clearbit.com/maze.co" },
    { id: 5, company: "Terraform", title: "Interactive Developer", location: "Hamburg, Germany", tags: ["Full-Time", "Marketing", "Design"], logo: "https://logo.clearbit.com/hashicorp.com" },
    { id: 6, company: "Udacity", title: "Interactive Developer", location: "Hamburg, Germany", tags: ["Full-Time", "Marketing", "Design"], logo: "https://logo.clearbit.com/udacity.com" },
    { id: 7, company: "Packer", title: "HR Manager", location: "Lucern, Switzerland", tags: ["Full-Time", "Marketing", "Design"], logo: "https://logo.clearbit.com/packer.io" },
    { id: 8, company: "Webflow", title: "HR Manager", location: "Lucern, Switzerland", tags: ["Full-Time", "Marketing", "Design"], logo: "https://logo.clearbit.com/webflow.com" },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header matching image exactly */}
        <div className="flex items-center justify-between mb-16">
          <h2 className="text-5xl font-bold text-slate-900 leading-tight">
            Latest <span className="text-[#4F46E5]">jobs open</span>
          </h2>
          <button className="flex items-center gap-2 text-[#4F46E5] font-bold group">
            Show all jobs 
            <FiArrowRight className="group-hover:translate-x-2 transition-transform" />
          </button>
        </div>

        {/* 2-Column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-8">
          {jobs.map((job) => (
            <div 
              key={job.id} 
              className="group flex items-start gap-6 p-6 border border-slate-100 hover:border-[#4F46E5] hover:shadow-xl hover:shadow-indigo-50 transition-all cursor-pointer bg-white"
              style={{ borderRadius: "0px" }}
            >
              {/* Brand Logo - Larger and clean */}
              <div className="w-16 h-16 shrink-0 flex items-center justify-center p-1">
                <img src={job.logo} alt={job.company} className="w-full h-auto object-contain" />
              </div>
              
              {/* Job Info & Tags Column */}
              <div className="flex flex-col gap-3">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#4F46E5] transition-colors">
                    {job.title}
                  </h3>
                  <p className="text-slate-500 text-[15px] mt-1">
                    {job.company} <span className="mx-1">•</span> {job.location}
                  </p>
                </div>

                {/* Tags positioned exactly as per screenshot */}
                <div className="flex flex-wrap gap-2 mt-2">
                  {job.tags.map((tag, idx) => (
                    <span 
                      key={idx} 
                      className={`px-4 py-1 text-[13px] font-semibold border ${
                        tag === "Full-Time" ? "bg-emerald-50 text-emerald-500 border-emerald-100" :
                        tag === "Marketing" ? "bg-orange-50 text-orange-500 border-orange-100" :
                        "bg-white text-[#4F46E5] border-indigo-500"
                      }`}
                      style={{ borderRadius: "100px" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestJobs;