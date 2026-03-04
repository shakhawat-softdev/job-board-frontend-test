import React, { useState, useRef } from "react";
import Hero from "./Sections/Hero";
import CompanyLogos from "./Sections/CompanyLogos";
import Categories from "./Sections/Categories";
import PostJobCTA from "./Sections/PostJobCTA";
import FeaturedJobs from "./Sections/FeaturedJobs";
import LatestJobs from "./Sections/LatestJobs";

const Home = () => {
  const [searchValue, setSearchValue] = useState("");
  const [categoryValue, setCategoryValue] = useState("");
  const [locationValue, setLocationValue] = useState("");
  const latestJobsRef = useRef(null);

  const handleHeroSearch = () => {
    // Scroll to latest jobs section
    if (latestJobsRef.current) {
      latestJobsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="">
      <Hero
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        categoryValue={categoryValue}
        setCategoryValue={setCategoryValue}
        locationValue={locationValue}
        setLocationValue={setLocationValue}
        onSearch={handleHeroSearch}
      />
      <CompanyLogos />
      <Categories />
      <PostJobCTA />
      <FeaturedJobs />
      <div ref={latestJobsRef}>
        <LatestJobs
          searchValue={searchValue}
          categoryValue={categoryValue}
          locationValue={locationValue}
        />
      </div>
    </div>
  );
};

export default Home;
