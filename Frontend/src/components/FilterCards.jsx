import { RadioGroup } from "@radix-ui/react-radio-group";
import React from "react";
import { RadioGroupItem } from "./ui/radio-group";
import { Label } from "@radix-ui/react-label";
const filterData = [
  {
    filterType: "Location",
    array: ["Delhi NCR", "Banglore", "Hyderabad", "Pune", "Mumbai"],
  },
  {
    filterType: "Industry",
    array: [
      "Frontend Developer",
      "Backend Developer",
      "Data Science",
      "Graphics Designer",
      "Data Analyst",
      "FullStack Developer",
    ],
  },
  {
    filterType: "Salary",
    array: ["0-40k", "42-1lakh", "1lakh to 5lakh"],
  },
];
function FilterCards() {
  return (
    <div className="w-full bg-white p-3 rounded-md">
      <h1 className="font-bold text-lg">Filter Jobs</h1>
      <hr className="mt-2" />
      <RadioGroup>
        {filterData.map((data, index) => (
          <div>
            <h1 className="font-bold text-lg">{data.filterType}</h1>
            {data.array.map((item, index) => (
              <div className="flex items-center space-x-2 my-2">
                <RadioGroupItem value={item} />
                <Label>{item}</Label>
              </div>
            ))}
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}

export default FilterCards;
