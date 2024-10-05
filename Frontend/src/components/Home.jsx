import React from "react";
import Navbar from "./shared/Navbar";
import HeroSection from "./HeroSection";
import CategoryCarousal from "./CategoryCarousal";
import LatestJobs from "./LatestJobs";
import Footer from "./Footer";
import UseGetAllJobs from "@/hooks/UseGetAllJobs";

function Home() {
  UseGetAllJobs();
  return (
    <div>
      <Navbar />
      <HeroSection />
      <CategoryCarousal />
      <LatestJobs />
      <Footer />
    </div>
  );
}

export default Home;
