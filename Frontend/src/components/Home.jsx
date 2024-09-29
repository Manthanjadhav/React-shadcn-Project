import React from "react";
import Navbar from "./shared/Navbar";
import HeroSection from "./HeroSection";
import CategoryCarousal from "./CategoryCarousal";

function Home() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <CategoryCarousal />
    </div>
  );
}

export default Home;
