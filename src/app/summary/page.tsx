"use client";

import React, { useEffect, useRef, useState } from "react";
import mapboxgl, { LngLatLike } from "mapbox-gl"; // Import LngLatLike for type checking
import { useRouter } from "next/navigation";
import { Box } from "@mui/material";
import {
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
  ArrowRightAlt as ArrowRightAltIcon,
} from "@mui/icons-material";

import "react-circular-progressbar/dist/styles.css";
import { ProgressBar } from "@/components/ProgressBar";

type ToggleDataType = {
  name: string;
  url: string;
};

const toggleData: ToggleDataType[] = [
  { name: "Entab Analysis", url: "/upcoming" },
  { name: "Competitor Analysis", url: "/upcoming" },
  { name: "My Team", url: "/" },
  { name: "Revenue Analysis ", url: "/upcoming" },
  { name: "Target Analysis", url: "/upcoming" },
  { name: "Marketing", url: "/upcoming" },
  { name: "Summary", url: "/summary" },
];

interface TeamPerformanceProps {
  name: string;
  total: number;
  current: number;
  percentage: number;
  status: string;
  demoFixed: number;
  noOfVisit: number;
  place: string;
  demoDone: number;
  demoScheduled: number;
  transferToManager: number;
  referenceCollected: string;
  projection: string;
}

const teamPerformanceData: TeamPerformanceProps[] = [
  // {
  //   name: "Alin Anto",
  //   total: 100000,
  //   current: 62000,
  //   percentage: 62,
  //   status: "high",
  //   // demoFixed:

  // },
  {
    name: "Jissmon George",
    total: 800000,
    current: 0,
    percentage: 0,
    status: "low",
    demoFixed: 19,
    noOfVisit: 53,
    place: "Delhi,UP,Karntaka,MP,Chattisgarh",
    demoDone: 5,
    demoScheduled: 4,
    transferToManager: 2,
    referenceCollected:
      "St Georges School Malad, Begur diocese Schools of Carmelite sisters",
    projection: "41,00,000",
  },
  {
    name: "Annam Giri",
    total: 0,
    current: 0,
    percentage: 0,
    status: "high",
    demoFixed: 13,
    noOfVisit: 61,
    place: "visakhapatnam , viijayawada , ongole",
    demoDone: 7,
    demoScheduled: 7,
    transferToManager: 9,
    referenceCollected:
      "St Georges School Malad, Begur diocese Schools of Carmelite sisters",
    projection: "60,40,000",
  },
  {
    name: "Joy Sony",
    total: 0,
    current: 0,
    percentage: 0,
    status: "low",
    demoFixed: 0,
    noOfVisit: 0,
    place: "No visit",
    demoDone: 0,
    demoScheduled: 0,
    transferToManager: 0,
    referenceCollected: "",
    projection: "No data",
  },
  {
    name: "Adarsh Shetty",
    total: 0,
    current: 0,
    percentage: 0,
    status: "low",
    demoFixed: 0,
    noOfVisit: 0,
    place: "No visit",
    demoDone: 0,
    demoScheduled: 0,
    transferToManager: 0,
    referenceCollected: "",
    projection: "No data",
  },
];

interface ROIItemProps {
  title: string;
  value: number;
}

const ROIData: ROIItemProps[] = [
  { title: "Total Revenue", value: 500000 },
  { title: "Commission", value: 30000 },
  { title: "Bonuses", value: 15000 },
  { title: "Benefits", value: 10000 },
  { title: "Training Costs", value: 5000 },
  { title: "Travel Expenses", value: 2000 },
  { title: "Office Expenses", value: 8000 },
  { title: "Utilities", value: 4000 },
  { title: "Other Overheads", value: 3000 },
];

// Main component
const MapShow: React.FC = () => {
  const router = useRouter();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map>();
  const [activeToggle, setActiveToggle] = useState<number>(2);

  const handleToggle = (index: number, url: string) => {
    setActiveToggle(index);
    router.push(url);
  };

  interface DateRange {
    startDate: Date;
    endDate: Date;
    key: string;
  }

  // Initialize the state with proper typing
  const [circularDate, setCircularDate] = useState<DateRange>({
    startDate: new Date(new Date().setMonth(new Date().getMonth() - 6)),
    endDate: new Date(),
    key: "selection",
  });

  // Define your data with type annotation

  return (
    <>
      <div
        className="relative"
        style={{
          background: "linear-gradient(180deg, #011719 0%, #03292C 100%)",
          minHeight: "100vh",
          maxWidth: "100vw",
          overflow: "hidden",
          paddingBottom: "60px",
          height: "fit-content",
        }}
      >
        {/* middle section  */}
        <div className="absolute top-5 left-[35%] gap-3 flex flex-col items-center">
          <h1 className="text-white text-xl font-[500] ">Hi, Alin Anto</h1>
          <div className="rounded-3xl p-3 px-4 flex items-center gap-4 bg-[#204244]">
            <div className="flex items-center gap-1">
              <span className="rounded-[50%] h-2 w-2 bg-[#fff]"></span>
              <h1 className="text-[#fff] text-[15px]">49</h1>
              <h1 className="text-[#C4C4C4] text-[15px]">Demo Fixed</h1>
            </div>
            <div className="flex items-center gap-1">
              <span className="rounded-[50%] h-2 w-2 bg-[#fff]"></span>
              <h1 className="text-[#fff] text-[15px]">22</h1>
              <h1 className="text-[#C4C4C4] text-[15px]">Demo Achieved</h1>
            </div>
            <div className="flex items-center gap-1">
              <span className="rounded-[50%] h-2 w-2 bg-[#fff]"></span>
              <h1 className="text-[#fff] text-[15px]">160</h1>
              <h1 className="text-[#C4C4C4] text-[15px]">No Of Visits</h1>
            </div>
          </div>
        </div>
        {/* middle section  */}

        {/* draggable togglebar  */}
        <div className="fixed bottom-10 z-50 left-[30%] bg-[#68AC25] rounded-xl p-2 px-2 flex item-center gap-2">
          {toggleData.map((data, index) => (
            <div
              key={index}
              onClick={() => handleToggle(index, data.url)}
              className={`text-white p-2 rounded-lg cursor-pointer text-sm ${
                activeToggle === index ? "bg-[#48820E]" : ""
              }`}
            >
              <h1>{data.name}</h1>
            </div>
          ))}
        </div>
        {/* draggable togglebar  */}

        {/* Team performance */}

        <div className="w-[100%] p-5 flex justify-center mt-44">
          <div className="w-[90%]">
            <div className="flex gap-10 item-center">
              <div className="flex gap-1 items-center mb-4 font-bold text-2xl">
                <img src="/images/logozero.png" className="h-6 w-6 " />
                <h3 className="text-white">Team Performance(Quarter 2)</h3>
              </div>
            </div>
            <div className="grid grid-cols-12 gap-10 mt-10">
              <div className="col-span-12">
                <div className="col-span-12 gap-10 grid grid-cols-12 mt-10">
                  {teamPerformanceData.map((data, index) => (
                    <TeamPerformanceItem
                      key={index}
                      index={index + 1}
                      data={data}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MapShow;

// Performance data and item components

const TeamPerformanceItem: React.FC<{
  data: TeamPerformanceProps;
  index: number;
}> = ({ data, index }) => {
  const { name, total, current, percentage, status } = data;
  return (
    <div className="col-span-4 relative  rounded-lg bg-gradient-to-b  py-6 px-3 w-[100%] from-[#011719] shadow-2xl  bg-opacity-0  backdrop-blur-sm ">
      <div className="absolute flex top-2 right-2 bg-[#204244] rounded-lg w-7 h-5  justify-center items-center">
        <p className="text-[#80FF00] text-sm">{index}</p>
      </div>
      <div className="absolute flex top-[50%] right-[-7px] bg-black text-white rounded-[50%] w-5 h-5  justify-center items-center">
        <ArrowRightAltIcon sx={{ fontSize: "14px" }} />
      </div>
      <div className="flex items-baseline gap-2 mb-1 mt-3">
        <h1 className="text-[#fff] text-md">{name}</h1>
      </div>
      <div className="flex item center gap-1 mb-1 mt-3 ">
        <h1
          className={`${
            status === "high" ? "text-[#80FF00]" : "text-[#E03030]"
          } text-md`}
        >
          {percentage}%
        </h1>
        <h1 className="text-[#C4C4C4] text-md">Target status</h1>
        {status === "high" ? (
          <ArrowUpwardIcon fontSize="small" sx={{ color: "#80FF00" }} />
        ) : (
          <ArrowDownwardIcon fontSize="small" sx={{ color: "#E03030" }} />
        )}
      </div>
      <ProgressBar progression={percentage} width={95} />
      <div className="flex justify-between w-[95%] mt-1">
        <h1
          className={`${
            status === "high" ? "text-[#80FF00]" : "text-[#E03030]"
          } text-md`}
        >
          ₹{current}
        </h1>
        <h1 className="text-[#C4C4C4] text-md">₹{total}</h1>
      </div>
      <div
        className="flex justify-between w-[95%] text-sm mt-5 pt-1 text-white"
        // style={{ borderTop: "1px dashed white" }}
      >
        <h1 className="font-[200]">No of visit happen in july</h1>
        <h1>{data.noOfVisit}</h1>
      </div>
      <div className="flex justify-between w-[95%] mt-3 text-sm text-white">
        <h1 className="font-[200]">No of demo fixed</h1>
        <h1>{data.demoFixed}</h1>
      </div>
      <div className="flex justify-between w-[95%] text-sm mt-3 text-white">
        <h1 className="font-[200]">Demo done</h1>
        <h1>{data.demoDone}</h1>
      </div>
      <div className="flex justify-between w-[95%] text-sm  mt-3 text-white">
        <h1 className="font-[200]">Demo scheduled for this month</h1>
        <h1>{data.demoScheduled}</h1>
      </div>
      <div className="flex justify-between w-[95%] text-sm mt-3 text-white">
        <h1 className="font-[200]">Meeting transfered to Manager</h1>
        <h1>{data.transferToManager}</h1>
      </div>
      <div className="flex justify-between w-[95%] text-sm mt-3 text-white">
        <h1 className="font-[200]">Reference Collected</h1>
        <h1>{data.referenceCollected}</h1>
      </div>
      <div className="flex justify-between w-[95%] text-sm mt-3 text-white">
        <h1 className="font-[200]">Projection</h1>
        <h1 className="text-[#80FF00]">₹{data.projection}</h1>
      </div>
      <div className="flex justify-between w-[95%] text-sm mt-3 text-white">
        <h1 className="font-[200]">Place</h1>
        <h1>{data.place}</h1>
      </div>
    </div>
  );
};

const ROIItem: React.FC<ROIItemProps> = ({ title, value }) => {
  return (
    <Box
      className="roi-item flex items-center w-[100%]  justify-between p-3"
      sx={{ borderBottom: "1px solid #787878", "&:last-child borderBottom": 0 }}
    >
      <h3 className="text-white text-sm">{title}</h3>
      <h3 className="text-[#4D9900] text-sm">{value}</h3>
    </Box>
  );
};

// import React from 'react'

// function page() {
//   return (
//     <div>page</div>
//   )
// }

// export default page
