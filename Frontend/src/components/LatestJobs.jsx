import React from "react";
import LatestJobCard from "./LatestJobCard";
import { useSelector } from "react-redux";
function LatestJobs() {
  const { alljobs } = useSelector((store) => store.jobs);
  return (
    <div className="max-w-7xl mx-auto my-20">
      <h1 className="text-4xl font-bold">
        <span className="text-[#6A38C2]">Latest & Top </span>Job Openings
      </h1>
      <div className="grid grid-cols-3 gap-4 my-5">
        {alljobs.length <= 0 ? (
          <span>No Jobs Available</span>
        ) : (
          alljobs
            ?.slice(0, 6)
            .map((item) => <LatestJobCard key={item._id} job={item} />)
        )}
      </div>
    </div>
  );
}

export default LatestJobs;
