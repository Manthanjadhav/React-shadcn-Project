import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { MoreHorizontal } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

const shortlistStatus = ["Accepted", "Rejected"];

function ApplicantsTable() {
  const { applicants } = useSelector((state) => state.application);

  const statusHandler = async (status, id) => {
    try {
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${id}/update`,
        { status },
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div>
      <Table>
        <TableCaption>A list of your recent applied users.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>FullName</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicants?.applications?.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                No Applicants Available
              </TableCell>
            </TableRow>
          ) : (
            applicants?.applications?.map((application) => (
              <TableRow key={application?.applicant?._id}>
                <TableCell>{application.applicant.fullName}</TableCell>
                <TableCell>{application.applicant.email}</TableCell>
                <TableCell>{application.applicant.phoneNumber}</TableCell>{" "}
                {/* Updated */}
                <TableCell>
                  {application?.applicant?.profile?.resumeOriginalName ? (
                    <a
                      className="text-blue-600 cursor-pointer"
                      href={application?.applicant?.profile?.resume}
                      target="_blank"
                    >
                      {application?.applicant?.profile?.resumeOriginalName}
                    </a>
                  ) : (
                    <span>NA</span>
                  )}
                </TableCell>{" "}
                {/* Updated */}
                <TableCell>
                  {application.applicant.createdAt.split("T")[0]}
                </TableCell>
                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      {shortlistStatus.map((status) => (
                        <div
                          key={status}
                          onClick={() => statusHandler(status, application._id)}
                        >
                          {" "}
                          {/* Updated key */}
                          <span className="cursor-pointer">{status}</span>
                        </div>
                      ))}
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default ApplicantsTable;
