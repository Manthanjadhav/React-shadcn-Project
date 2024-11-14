import Navbar from "@/components/shared/Navbar";
import React, { useEffect } from "react";
import ApplicantsTable from "./ApplicantsTable";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setApplication } from "@/redux/applicationSlice";

function Applicants() {
  const params = useParams();
  const dispatch = useDispatch();
  const { applicants } = useSelector((state) => state.application);

  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(
          `${APPLICATION_API_END_POINT}/${params.id}/applicants`,
          {
            withCredentials: true,
          }
        );
        console.log(res.data);
        if (res.data.success) {
          dispatch(setApplication(res.data.job));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllApplicants();
  }, []);
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto">
        <h1>Applicants ({applicants?.applications?.length})</h1>
        <ApplicantsTable />
      </div>
    </div>
  );
}

export default Applicants;
