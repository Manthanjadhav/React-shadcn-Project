import { Bookmark } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Badge } from "./ui/badge";
function Job() {
  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">2 days ago</p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex items-center gap-2 my-2">
        <Button variant="outline" size="icon">
          <Avatar className="w-8 h-8">
            <AvatarImage
              src="https://tse3.mm.bing.net/th?id=OIP.qgp1rab4Db9aIZJ56hTD4wHaFj&pid=Api&P=0&h=180"
              alt="User avatar"
            />
          </Avatar>
        </Button>
        <div>
          <h1 className="font-medium text-lg"> Company Name</h1>
          <p className="text-sm text-gray-600">India</p>
        </div>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2">Title</h1>
        <p className="text-sm text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit
          sed quo eius.
        </p>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Badge className="text-blue-700 font-bold" variant="ghost">
          12 Positions
        </Badge>
        <Badge className="text-[#F83002] font-bold" variant="ghost">
          Part Time
        </Badge>
        <Badge className="text-[#7209b7] font-bold" variant="ghost">
          24 Lpa
        </Badge>
      </div>
      <div className="flex items-center gap-4 mt-4">
        <Button variant="outline">Details</Button>
        <Button className="bg-[#7209b7] ">Save for Later</Button>
      </div>
    </div>
  );
}

export default Job;
