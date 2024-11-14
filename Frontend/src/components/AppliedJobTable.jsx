import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "./ui/badge";
import { useSelector } from "react-redux";

function AppliedJobTable() {
  const { allAppliedJobs } = useSelector((store) => store.jobs);

  return (
    <Table>
      <TableCaption>A list of your Applied Jobs.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Job Role</TableHead>
          <TableHead>Company</TableHead>
          <TableHead className="text-right">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {allAppliedJobs?.length ? (
          allAppliedJobs.map((appliedJob) => (
            <TableRow key={appliedJob._id}>
              <TableCell>{appliedJob.createdAt.split("T")[0]}</TableCell>
              <TableCell>{appliedJob.job?.title}</TableCell>
              <TableCell>{appliedJob.job?.company?.name}</TableCell>
              <TableCell className="text-right">
                <Badge>{appliedJob.status}</Badge>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan="4" className="text-center">
              No applied jobs.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

export default AppliedJobTable;
