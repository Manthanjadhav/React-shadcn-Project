import { setSingleCompany } from "@/redux/companySlice";
import { COMPANY_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

function UseGetCompanyById(companyId) {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetCompanyById = async () => {
      try {
        const res = await axios.get(
          `${COMPANY_API_END_POINT}/get/${companyId}`,
          {
            withCredentials: true,
          }
        );

        if (res.data.success) {
          dispatch(setSingleCompany(res.data.company));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetCompanyById();
  }, [companyId, dispatch]);
}

export default UseGetCompanyById;