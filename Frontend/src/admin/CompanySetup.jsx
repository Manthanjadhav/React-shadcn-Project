import Navbar from "@/components/shared/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { ArrowLeft, Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useFetcher, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios"; // Import axios if not already imported
import { useSelector } from "react-redux";
import UseGetCompanyById from "@/hooks/UseGetCompanyById";

function CompanySetup() {
  const params = useParams();
  UseGetCompanyById(params.id);
  const navigate = useNavigate();
  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });

  const [loading, setLoading] = useState(false);
  const { singleCompany } = useSelector((store) => store.company);
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const fileChangeHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      const res = await axios.put(
        `${COMPANY_API_END_POINT}/update/${params.id}`,
        formData,
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/companies");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setInput({
      name: singleCompany.name || "",
      description: singleCompany.description || "",
      website: singleCompany.website || "",
      location: singleCompany.location || "",
      file: null,
    });
  }, [singleCompany]);

  return (
    <div>
      <Navbar />
      <div className="max-w-xl mx-auto my-10">
        <form onSubmit={submitHandler}>
          <div className="flex items-center gap-5 p-8">
            <Button
              variant="outline"
              className="flex items-center gap-2 text-gray-500 font-semibold"
              onClick={() => navigate("/admin/companies")} // Navigate back
            >
              <ArrowLeft />
              <span>Back</span>
            </Button>
            <h1 className="font-bold text-xl">Company Setup</h1>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Company Name */}
            <Label htmlFor="companyName">Company Name</Label>
            <Input
              type="text"
              name="name"
              id="companyName"
              value={input.name}
              onChange={changeEventHandler}
              placeholder="Company name"
            />

            {/* Description */}
            <Label htmlFor="description">Description</Label>
            <Input
              type="text"
              name="description"
              id="description"
              value={input.description}
              onChange={changeEventHandler}
              placeholder="Description"
            />

            {/* Website */}
            <Label htmlFor="website">Website</Label>
            <Input
              type="url"
              name="website"
              id="website"
              value={input.website}
              onChange={changeEventHandler}
              placeholder="Website URL"
            />

            {/* Location */}
            <Label htmlFor="location">Location</Label>
            <Input
              type="text"
              name="location"
              id="location"
              value={input.location}
              onChange={changeEventHandler}
              placeholder="Location"
            />

            {/* File Upload */}
            <Label htmlFor="file">Upload Logo</Label>
            <Input
              type="file"
              name="file"
              id="file"
              accept="image/*"
              onChange={fileChangeHandler}
            />
          </div>

          <div className="mt-6">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 />
                  Please wait...
                </>
              ) : (
                "Update"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CompanySetup;
