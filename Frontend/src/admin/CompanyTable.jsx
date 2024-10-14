import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent } from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { Edit2, MoreHorizontal } from "lucide-react";
import React from "react";

function CompanyTable() {
  return (
    <div>
      <Table>
        <TableCaption>A list of your recent registered Companies.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Company Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[1, 2, 3, 4].map((item, index) => (
            <TableRow key={index}>
              <TableCell>
                <Avatar className="w-8 h-8">
                  <AvatarImage
                    src="https://tse3.mm.bing.net/th?id=OIP.qgp1rab4Db9aIZJ56hTD4wHaFj&pid=Api&P=0&h=180"
                    alt="User avatar"
                  />
                </Avatar>
              </TableCell>
              <TableCell>Google</TableCell>
              <TableCell>02/10/2024</TableCell>
              <TableCell className="text-right cursor-pointer">
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal />
                  </PopoverTrigger>
                  <PopoverContent className="w-32">
                    <div className="flex items-center gap-2 w-fit cursor-pointer">
                      <Edit2 />
                      <span>Edit</span>
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default CompanyTable;
