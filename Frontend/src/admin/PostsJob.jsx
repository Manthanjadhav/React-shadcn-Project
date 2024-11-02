import Navbar from "@/components/shared/Navbar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { JOB_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function PostsJob() {
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    companyId: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { companies } = useSelector((store) => store.company);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (value) => {
    setInput({ ...input, companyId: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center w-screen my-1">
        <form
          onSubmit={submitHandler}
          className="grid grid-cols-2 gap-2 p-8 max-w-4xl border border-gray-300 shadow-2xl rounded-md"
        >
          <div>
            <Label>Title</Label>
            <Input
              type="text"
              name="title"
              className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              value={input.title}
              onChange={changeEventHandler}
            />
          </div>
          <div>
            <Label>Description</Label>
            <Input
              type="text"
              name="description"
              className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              value={input.description}
              onChange={changeEventHandler}
            />
          </div>
          <div>
            <Label>Requirements</Label>
            <Input
              type="text"
              name="requirements"
              className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              value={input.requirements}
              onChange={changeEventHandler}
            />
          </div>
          <div>
            <Label>Salary</Label>
            <Input
              type="number"
              name="salary"
              className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              value={input.salary}
              onChange={changeEventHandler}
            />
          </div>
          <div>
            <Label>Location</Label>
            <Input
              type="text"
              name="location"
              className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              value={input.location}
              onChange={changeEventHandler}
            />
          </div>
          <div>
            <Label>Job Type</Label>
            <Input
              type="text"
              name="jobType"
              className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              value={input.jobType}
              onChange={changeEventHandler}
            />
          </div>
          <div>
            <Label>Experience</Label>
            <Input
              type="number"
              name="experience"
              className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              value={input.experience}
              onChange={changeEventHandler}
            />
          </div>
          <div>
            <Label>Number of Positions</Label>
            <Input
              type="number"
              name="position"
              className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              value={input.position}
              onChange={changeEventHandler}
            />
          </div>
          {companies?.length > 0 && (
            <div>
              <Label>Company</Label>
              <Select onValueChange={handleSelectChange}>
                <SelectTrigger className="min-w-fit my-1">
                  <SelectValue placeholder="Select a Company" />
                </SelectTrigger>
                <SelectContent>
                  {companies?.map((company) => (
                    <SelectItem key={company?._id} value={company?._id}>
                      {company?.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          <div className="col-span-2">
            <button
              type="submit"
              className="bg-black w-full text-white py-2 px-4 rounded mt-4"
            >
              {loading ? (
                <>
                  <Loader2 />
                  Please wait...
                </>
              ) : (
                "Post Job"
              )}
            </button>
            {companies?.length === 0 && (
              <p className="text-xs text-red-600 font-bold text-center my-3">
                Please register a company before posting a job.
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default PostsJob;
