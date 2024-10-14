import React, { useEffect } from "react";
import Navbar from "./shared/Navbar";
import HeroSection from "./HeroSection";
import CategoryCarousal from "./CategoryCarousal";
import LatestJobs from "./LatestJobs";
import Footer from "./Footer";
import UseGetAllJobs from "@/hooks/UseGetAllJobs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Home() {
  UseGetAllJobs();
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.role === "recruiter") {
      navigate("/admin/companies");
    }
  }, []);

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
