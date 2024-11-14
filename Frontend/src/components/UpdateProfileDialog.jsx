import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { USER_API_END_POINT } from "@/utils/constant";
import axios from "axios"; // Ensure axios is imported
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";

function UpdateProfileDialog({ open, setOpen }) {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);

  const [input, setInput] = useState({
    fullName: user?.fullName,
    email: user?.email,
    phoneNumber: user?.phoneNumber,
    bio: user?.profile?.bio,
    skills: user?.profile?.skills?.map((skill) => skill),
    file: user?.profile?.resume,
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const dispatch = useDispatch();

  const SubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simple form validation
    if (!input.email || !input.fullName) {
      toast.error("Please fill all required fields.");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("fullName", input.fullName);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);

    // Check if a file is selected and is valid
    if (input.file) {
      if (input.file.type !== "application/pdf") {
        toast.error("Please upload a valid PDF file.");
        setLoading(false);
        return;
      }
      formData.append("file", input.file);
    }

    console.log(formData);

    try {
      const res = await axios.post(
        `${USER_API_END_POINT}/profile/update`,
        formData,
        {
          headers: {
            "Content-type": "multipart/form-data",
          },
          withCredentials: true, // Ensure cookies are sent with request
        }
      );

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
        setOpen(false);
      }
    } catch (error) {
      console.error("Error details: ", error.response || error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Profile</DialogTitle>
        </DialogHeader>
        <form onSubmit={SubmitHandler}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right font-bold" htmlFor="fullName">
                Name :
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                value={input.fullName}
                onChange={changeEventHandler}
                className="col-span-3 border border-gray-600 rounded-lg"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right font-bold" htmlFor="email">
                Email :
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={input.email}
                onChange={changeEventHandler}
                className="col-span-3 border border-gray-600 rounded-lg"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right font-bold" htmlFor="phoneNumber">
                Number :
              </label>
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="text"
                value={input.phoneNumber}
                onChange={changeEventHandler}
                className="col-span-3 border border-gray-600 rounded-lg"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right font-bold" htmlFor="bio">
                Bio :
              </label>
              <input
                id="bio"
                name="bio"
                type="text"
                value={input.bio}
                onChange={changeEventHandler}
                className="col-span-3 border border-gray-600 rounded-lg"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right font-bold" htmlFor="skills">
                Skills :
              </label>
              <input
                id="skills"
                name="skills"
                type="text"
                value={input.skills}
                onChange={changeEventHandler}
                className="col-span-3 border border-gray-600 rounded-lg"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right font-bold" htmlFor="resume">
                Resume :
              </label>
              <input
                id="resume"
                name="resume"
                type="file"
                accept="application/pdf"
                onChange={fileChangeHandler}
                className="col-span-3 border border-gray-600 rounded-lg"
              />
            </div>
          </div>
          <DialogFooter>
            {loading ? (
              <Button className="w-full">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button type="submit" className="w-full">
                Update
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default UpdateProfileDialog;
