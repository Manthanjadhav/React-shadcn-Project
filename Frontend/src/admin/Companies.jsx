import Navbar from "@/components/shared/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import CompanyTable from "./CompanyTable";
import { useNavigate } from "react-router-dom";
import UseGetAllCompanies from "@/hooks/UseGetAllCompanies";
import { useDispatch } from "react-redux";
import { setSearchCompanyByText } from "@/redux/companySlice";

function Companies() {
  UseGetAllCompanies();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
  }, [input]);
  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto my-10">
        <div className="flex items-center justify-between my-5">
          <Input
            className="w-fit"
            placeholder="Filter by name"
            onChange={(e) => setInput(e.target.value)}
          />
          <Button onClick={() => navigate("/admin/companies/create")}>
            New Company
          </Button>
        </div>
        <CompanyTable />
      </div>
    </div>
  );
}

export default Companies;
