import React, { useEffect, useRef } from "react";
import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import gsap from "gsap";
import { jobs } from "../../../data/jobs";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

const featuredJobs = jobs.filter((job) => job.isFeatured);

const FeaturedJobs = () => {
  const sectionRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".job-card", {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.6,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
            Featured <span className="text-[#4F46E5]">jobs</span>
          </h2>
          <button className="flex items-center gap-2 text-[#4F46E5] font-bold group">
            Show all jobs
            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Mobile View: Swiper Slider */}
        <div className="block md:hidden">
          <Swiper
            modules={[Pagination]}
            spaceBetween={20}
            slidesPerView={1.2}
            pagination={{ clickable: true }}
            className="pb-12"
          >
            {featuredJobs.map((job) => (
              <SwiperSlide key={job.id}>
                <JobCard job={job} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Desktop View: Grid Layout */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredJobs.map((job) => (
            <div key={job.id} className="job-card">
              <JobCard job={job} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

// Reusable Job Card Component
const JobCard = ({ job }) => (
  <Link
    to={`/jobs/${job.id}`}
    className="border border-slate-200 p-6 bg-white hover:border-[#4F46E5] transition-all duration-300 group cursor-pointer h-full block"
    style={{ borderRadius: "0px" }}
  >
    <div className="flex justify-between items-start mb-6">
      <div className="w-12 h-12 bg-white border border-slate-100 p-2 overflow-hidden flex items-center justify-center">
        <img src={job.logo} alt={job.company} className="w-full h-auto object-contain" />
      </div>
      <span className="text-[#4F46E5] border border-[#4F46E5] px-3 py-1 text-xs font-bold uppercase tracking-wider">
        {job.type}
      </span>
    </div>

    <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#4F46E5] transition-colors mb-1">
      {job.title}
    </h3>
    <p className="text-slate-400 text-sm mb-6">
      {job.company} • {job.location}
    </p>

    <div className="flex flex-wrap gap-2">
      {job.tags.map((tag, index) => (
        <span
          key={index}
          className={`px-3 py-1 text-xs font-medium rounded-full ${tag === "Marketing" ? "bg-orange-50 text-orange-600" : "bg-teal-50 text-teal-600"
            }`}
        >
          {tag}
        </span>
      ))}
    </div>
  </Link>
);

export default FeaturedJobs;