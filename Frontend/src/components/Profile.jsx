import React from "react";
import Navbar from "./shared/Navbar";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarImage } from "./ui/avatar";

function Profile() {
  return (
    <div>
      <Navbar />
      <div className="bg-white border border-gray-200 my-5 p-8 rounded-2xl">
        <Avatar className="w-8 h-8">
          <AvatarImage 
            src="https://tse3.mm.bing.net/th?id=OIP.qgp1rab4Db9aIZJ56hTD4wHaFj&pid=Api&P=0&h=180" 
            alt="Profile Avatar" 
          />
        </Avatar>
      </div>
    </div>
  );
}

export default Profile;
