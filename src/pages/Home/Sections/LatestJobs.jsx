import React, { useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useGetJobs } from "../../../hooks/useJobs";

const LatestJobs = ({
  searchValue: propSearchValue = "",
  categoryValue: propCategoryValue = "",
  locationValue: propLocationValue = "",
}) => {
  const { data: jobs = [], isLoading, isError } = useGetJobs();
  const [searchValue, setSearchValue] = useState(propSearchValue);
  const [categoryValue, setCategoryValue] = useState(propCategoryValue);
  const [locationValue, setLocationValue] = useState(propLocationValue);

  // Update local state when props change
  React.useEffect(() => {
    setSearchValue(propSearchValue);
    setCategoryValue(propCategoryValue);
    setLocationValue(propLocationValue);
  }, [propSearchValue, propCategoryValue, propLocationValue]);

  // Filter logic
  const filteredJobs = [...jobs]
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .filter((job) => {
      // Search filter - searches in title, company, and description
      const searchLower = searchValue.toLowerCase();
      const matchesSearch =
        !searchValue ||
        job.title.toLowerCase().includes(searchLower) ||
        job.company.toLowerCase().includes(searchLower) ||
        job.description.toLowerCase().includes(searchLower);

      // Category filter - searches in tags
      const matchesCategory =
        !categoryValue ||
        job.tags.some((tag) =>
          tag.toLowerCase().includes(categoryValue.toLowerCase())
        );

      // Location filter - exact match on location
      const matchesLocation = !locationValue || job.location === locationValue;

      return matchesSearch && matchesCategory && matchesLocation;
    });

  const displayJobs = filteredJobs.slice(0, 8);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Header matching image exactly */}
        <div className="flex items-center justify-between mb-16">
          <div>
            <h2 className="text-5xl font-bold text-slate-900 leading-tight">
              Latest <span className="text-[#4F46E5]">jobs open</span>
            </h2>
            {filteredJobs.length > 0 && (searchValue || categoryValue || locationValue) && (
              <p className="text-slate-500 mt-2">
                Found {filteredJobs.length} job{filteredJobs.length !== 1 ? "s" : ""}
              </p>
            )}
          </div>
          <button className="flex items-center gap-2 text-[#4F46E5] font-bold group">
            Show all jobs
            <FiArrowRight className="group-hover:translate-x-2 transition-transform" />
          </button>
        </div>

        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <p className="text-slate-500">Loading latest jobs...</p>
          </div>
        )}

        {isError && (
          <div className="flex items-center justify-center py-12">
            <p className="text-red-500">Failed to load jobs</p>
          </div>
        )}

        {!isLoading && !isError && displayJobs.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-8">
            {displayJobs.map((job) => (
              <Link
                to={`/jobs/${job._id}`}
                key={job._id}
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
                        className={`px-4 py-1 text-[13px] font-semibold border ${tag === "Full-Time" ? "bg-emerald-50 text-emerald-500 border-emerald-100" :
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
              </Link>
            ))}
          </div>
        )}

        {!isLoading && !isError && displayJobs.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="text-center">
              <p className="text-slate-500 text-lg mb-2">No jobs found</p>
              <p className="text-slate-400">
                {searchValue || categoryValue || locationValue
                  ? "Try adjusting your search or filter criteria"
                  : "No jobs available at the moment"}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default LatestJobs;