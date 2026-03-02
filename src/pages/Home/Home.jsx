import React from "react";
import Hero from "./Sections/Hero";
import CompanyLogos from "./Sections/CompanyLogos";
import Categories from "./Sections/Categories";
import PostJobCTA from "./Sections/PostJobCTA";
import FeaturedJobs from "./Sections/FeaturedJobs";
import LatestJobs from "./Sections/LatestJobs";

const Home = () => {
  return (
    <div className="">
      <Hero />
      <CompanyLogos />
      <Categories />
      <PostJobCTA />
      <FeaturedJobs />
      <LatestJobs />
    </div>
  );
};

export default Home;
