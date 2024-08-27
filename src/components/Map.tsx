"use client";

import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import { useRouter } from "next/navigation";
import HomeIcon from "@mui/icons-material/Home";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import AddIcon from "@mui/icons-material/Add";
import GradeIcon from "@mui/icons-material/Grade";
import {
  Box,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { ProgressBar } from "./ProgressBar";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  ZoomIn as ZoomInIcon,
  ZoomOut as ZoomOutIcon,
  Refresh as RefreshIcon,
} from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
// import PipelineProgressbar from "./PipelineProgressBar";
const PipelineProgressbar = dynamic(() => import("./PipelineProgressBar"), {
  ssr: false,
});

// import SalesMatrixTable from "./SalesMatrixTable";
const SalesMatrixTable = dynamic(() => import("./SalesMatrixTable"), {
  ssr: false,
});

const ROIPieChart = dynamic(() => import("./ROIPieChart"), { ssr: false });
// import DateSelection from "./DateSelection";
const DateSelection = dynamic(() => import("./DateSelection"), { ssr: false });
// import LeadAdding from "./LeadAdding";

const LeadAdding = dynamic(() => import("./LeadAdding"), { ssr: false });
// import KanbanBoard from "./KanbanBoard";
const KanbanBoard = dynamic(() => import("./KanbanBoard"), { ssr: false });

import { FeatureCollection, Feature, Point, GeoJsonProperties } from "geojson";
import dynamic from "next/dynamic";
import LeadDetails from "./LeadDetails";

type StudentStrength = {
  region: string;
  strength: number;
  team: string;
};

const studentStrengthData: StudentStrength[] = [
  {
    region: "Lotus Valley International School",
    strength: 1400,
    team: "Team A",
  },
  {
    region: "Lotus Valley International School",
    strength: 1400,
    team: "Team A",
  },
  {
    region: "Lotus Valley International School",
    strength: 1400,
    team: "Team A",
  },
  {
    region: "Lotus Valley International School",
    strength: 1400,
    team: "Team A",
  },
  {
    region: "Lotus Valley International School",
    strength: 1400,
    team: "Team A",
  },
  {
    region: "Lotus Valley International School",
    strength: 1400,
    team: "Team A",
  },
];

// Declare type for your coordinate data structure
type Coordinate = {
  latitude: string;
  longitude: string;
};

// Declare type for the company data structure
type CompanyData = {
  company: string;
  coordinates: Coordinate[];
};

type toggleDataType = {
  name: string;
  url: string;
};

const toggleData: toggleDataType[] = [
  { name: "Entab Analysis", url: "/upcoming" },
  { name: "Competitor Analysis", url: "/upcoming" },
  { name: "My Team", url: "/" },
  { name: "Revenue Analysis ", url: "/upcoming" },
  { name: "Target Analysis", url: "/upcoming" },
  { name: "Marketing", url: "/upcoming" },
  { name: "Summary", url: "/summary" },
];

const teamPerformanceData: TeamPerformanceProps[] = [
  {
    name: "John Doe",
    total: 100000,
    current: 62000,
    percentage: 62,
    status: "high",
  },
  {
    name: "Jane Smith",
    total: 80000,
    current: 45000,
    percentage: 56,
    status: "low",
  },
  {
    name: "Michael Johnson",
    total: 120000,
    current: 110000,
    percentage: 92,
    status: "high",
  },
  {
    name: "Leo Das",
    total: 340000,
    current: 160000,
    percentage: 76,
    status: "low",
  },
];

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
  const [addLeads, setAddLeads] = useState<boolean>(false);
  const [showBoard, setShowBoard] = useState<boolean>(false);
  const [showTable, setShowTable] = useState<string>("Lead Generation");
  const [activePipeline, setActivePipeline] = useState<string>("new");
  const [showLeadDetails, setShowLeadDetails] = useState<boolean>(false);

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

  type topPerformanceType = {
    name: string;
    team: string;
    amount: string;
    count: string;
  };

  const topPerformamnceData: topPerformanceType[] = [
    { name: "Alin", team: "Team A", amount: "17,4545", count: "50" },
    { name: "Alin", team: "Team A", amount: "17,4545", count: "50" },
    { name: "Alin", team: "Team A", amount: "17,4545", count: "50" },
    { name: "Alin", team: "Team A", amount: "17,4545", count: "50" },
  ];

  const data: CompanyData[] = [
    {
      company: "Entab",
      coordinates: [
        { latitude: "25.343", longitude: "71.111" },
        { latitude: "31.347", longitude: "75.112" },
        { latitude: "21.348", longitude: "75.134" },
        { latitude: "31.1471", longitude: "76.3412" },
        { latitude: "32.1471", longitude: "77.3412" },
        { latitude: "23.1471", longitude: "71.3412" },
        { latitude: "24.1471", longitude: "72.3412" },
        { latitude: "25.1471", longitude: "73.3412" },
        { latitude: "26.1471", longitude: "76.3412" },
        { latitude: "27.1471", longitude: "73.3412" },
        { latitude: "24.1471", longitude: "72.3412" },
        { latitude: "10.1632", longitude: "76.6413" },
        { latitude: "11.8745", longitude: "75.7804" },
        { latitude: "19.0861", longitude: "82.0188" },
        { latitude: "26.9124", longitude: "75.7873" },
        { latitude: "31.1048", longitude: "77.1734" },
        { latitude: "27.2412", longitude: "79.0609" },
        { latitude: "", longitude: "" },
        { latitude: "", longitude: "" },
      ],
    },
    {
      company: "Next",
      coordinates: [
        { latitude: "24.343", longitude: "72.111" },
        { latitude: "23.34545", longitude: "72.125" },
        { latitude: "26.348", longitude: "75.134" },
        { latitude: "22.7196", longitude: "75.8577" },
        { latitude: "16.5062", longitude: "16.5062" }, // Corrected the longitude format
        { latitude: "17.6868", longitude: "83.2185" },
        { latitude: "19.0760", longitude: "72.8777" },
      ],
    },
  ];

  const geojsonData: FeatureCollection<Point, GeoJsonProperties> = {
    type: "FeatureCollection",
    features: data.flatMap((item) =>
      item.coordinates.map((coord) => ({
        type: "Feature",
        properties: {
          company: item.company,
        },
        geometry: {
          type: "Point",
          coordinates: [
            parseFloat(coord.longitude),
            parseFloat(coord.latitude),
          ],
        },
      }))
    ),
  };

  interface ProgressBarProps {
    value: number;
    text?: string;
  }

  const bounds = [
    [68.1766451354, 6.756993], // Southwest coordinates
    [97.4025614766, 35.5087008], // Northeast coordinates
  ];

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoiNzQ4NSIsImEiOiJjbDFua3kwcHIwMDE1M2luMXhleDNqMGZiIn0.Mj40f5LXER6tUfR3ygQLaA";

    const map = new mapboxgl.Map({
      container: "mapContainer",
      style: "mapbox://styles/mapbox/dark-v11",
      center: [80, 22],
      zoom: 3.8,
      projection: "globe",
      scrollZoom: false,
    });

    map.on("load", function () {
      map.addSource("salesData", {
        type: "geojson",
        data: geojsonData,
      });

      map.addLayer({
        id: "entab-points",
        type: "circle",
        source: "salesData",
        paint: {
          "circle-radius": 10,
          "circle-color": "#bc3a3a",
        },
        filter: ["==", ["get", "company"], "Entab"],
      });

      map.addLayer({
        id: "next-points",
        type: "circle",
        source: "salesData",
        paint: {
          "circle-radius": 10,
          "circle-color": "#80FF00",
        },
        filter: ["==", ["get", "company"], "Next"],
      });

      map.addControl(
        new mapboxgl.NavigationControl({ showCompass: false }),
        "top-right"
      );

      // Handlers for mouse events on layers
      map.on("mouseenter", "next-points", () => {
        map.getCanvas().style.cursor = "pointer";
      });

      map.on("mouseleave", "next-points", () => {
        map.getCanvas().style.cursor = "";
      });
    });
    mapRef.current = map;

    return () => map.remove();
  }, []);

  const handleZoomIn = () => {
    mapRef.current?.zoomIn();
  };

  const handleZoomOut = () => {
    mapRef.current?.zoomOut();
  };

  const initialCenter: [number, number] = [80, 22];

  const initialZoom = 3.8;

  const handleResetMap = () => {
    if (mapRef.current) {
      mapRef.current.flyTo({
        center: initialCenter,
        zoom: initialZoom,
        essential: true, // This ensures the map moves even if the user has reduced motion settings
      });
    }
  };

  return (
    <>
      {addLeads && <LeadAdding open={addLeads} show={setAddLeads} />}
      {showBoard && <KanbanBoard open={showBoard} show={setShowBoard} />}
      {showLeadDetails && (
        <LeadDetails show={setShowLeadDetails} open={showLeadDetails} />
      )}
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
        <div
          ref={mapContainerRef}
          id="mapContainer"
          style={{ height: "120vh", overflowY: "hidden", width: "100vw" }}
        />
        <Box
          sx={{
            color: "white",
            display: "flex",
            alignItems: "center", // Use alignItems instead of alignItem
            gap: 1,
            p: 1,
            width: "100px",
            position: "absolute",
            top: "85vh",
          }}
        >
          <IconButton
            sx={{ color: "white", background: "#204244", borderRadius: 2 }}
            onClick={handleZoomIn}
          >
            <ZoomInIcon />
          </IconButton>
          <IconButton
            sx={{ color: "white", background: "#204244", borderRadius: 2 }}
            onClick={handleZoomOut}
          >
            <ZoomOutIcon />
          </IconButton>
          <IconButton
            sx={{ color: "white", background: "#204244", borderRadius: 2 }}
            onClick={handleResetMap}
          >
            <RefreshIcon />
          </IconButton>
        </Box>
        {/* left section */}
        <div className="absolute p-6 top-6 left-12   bg-gradient-to-r from-[#011719] shadow-2xl  bg-opacity-5  backdrop-blur-sm  rounded-2xl text-white">
          <div className="flex m-2 ">
            <HomeIcon className="mt-2 text-[#80FF00]" />
            <h1 className="font-medium text-md mt-2">
              Top Student Strength Schools
            </h1>
          </div>
          <div className="flex items-center mt-4 justify-around gap-1 p-4  w-[100%] ">
            <Select
              value={"India"}
              sx={{
                height: "30px",
                bgcolor: "black",
                color: "white",
                fontSize: "14px",
              }}
              IconComponent={(props) => (
                <ArrowDropDownIcon {...props} style={{ color: "#80FF00" }} />
              )}
            >
              <MenuItem value="India">India</MenuItem>
              <MenuItem value="Pakistan">Pakistan</MenuItem>
            </Select>
            <Select
              value={"Student Strength"}
              sx={{
                height: "30px",
                bgcolor: "black",
                color: "white",
                fontSize: "14px",
              }}
              IconComponent={(props) => (
                <ArrowDropDownIcon {...props} style={{ color: "#80FF00" }} />
              )}
            >
              <MenuItem value="Student Strength">Student Strength</MenuItem>
              <MenuItem value="Pakistan">Pakistan</MenuItem>
            </Select>
            <Select
              value={"Team A"}
              sx={{
                height: "30px",
                bgcolor: "black",
                color: "white",
                fontSize: "14px",
              }}
              IconComponent={(props) => (
                <ArrowDropDownIcon {...props} style={{ color: "#80FF00" }} />
              )}
            >
              <MenuItem value="Team A">Team A</MenuItem>
              <MenuItem value="Team B">Team B</MenuItem>
            </Select>
          </div>
          <div className="w-[100%] flex px-4 mb-2">
            {" "}
            <TextField
              variant="outlined"
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 4,

                  background: "rgba(12, 80, 101, 0.7)", // Semi-transparent background
                  backdropFilter: "blur(10px)",
                  height: "40px",
                  "& fieldset": {
                    // borderColor: "#0C5065",
                  },
                  "&:hover fieldset": {
                    borderColor: "#80FF00",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#0C5065",
                  },
                },
                "& .MuiInputBase-input": {
                  color: "white", // Set the text color to white
                  height: "50px",
                  // padding: "0 14px", // Adjust padding to align the text properly
                  display: "flex",
                  alignItems: "center",
                },
              }}
              type="search"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon style={{ color: "lightGray" }} />
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <Box
            maxHeight={"48vh"}
            overflow={"auto"}
            sx={{
              "&::-webkit-scrollbar": {
                width: "5px",
              },
              "&::-webkit-scrollbar-track": {
                background: "#011719",
              },
              "&::-webkit-scrollbar-thumb": {
                background: "#4D9900",
                borderRadius: "10px",
              },
              "&::-webkit-scrollbar-thumb:hover": {
                background: "#80FF00",
              },
            }}
          >
            {studentStrengthData.map((data, index) => (
              <>
                <div
                  key={index}
                  className="p-2 flex items-center  justify-between w-[100%]"
                >
                  <div className="flex items-center gap-1">
                    <Person2OutlinedIcon
                      fontSize="small"
                      style={{ color: "#80FF00" }}
                    />
                    <h6  onClick={() => setShowLeadDetails(true)} className="text-[14px] max-w-[200px] cursor-pointer">{data.region}</h6>
                  </div>
                  <div className="flex gap-5">
                    <div className="flex flex-col items-start gap-1">
                      <div className="flex  items-center gap-2">
                        <h6 className="text-[14px] text-[#80FF00]">
                          {data.strength}
                        </h6>
                        <h6 className="text-[12px] text-gray-400">Students</h6>
                      </div>
                      <h6 className="text-[12px] text-gray-400">Kerala</h6>
                    </div>
                    <div className="flex flex-col items-start gap-1">
                      <h6 className="text-[13px] text-[#80FF00]">001</h6>
                      <h6 className="text-[12px] text-gray-400">{data.team}</h6>
                    </div>
                  </div>
                </div>
                <Divider className="bg-gray-500" />
              </>
            ))}
          </Box>
        </div>
        {/* left section */}

        {/* middle section  */}
        <div className="absolute top-5 left-[40%] gap-3 flex flex-col items-center">
          <div className="flex items-center gap-2">
            <Select
              value={"India"}
              sx={{
                height: "30px",
                bgcolor: "black",
                color: "white",
                fontSize: "14px",
                border: "1px solid #80FF00",
              }}
              IconComponent={(props) => (
                <ArrowDropDownIcon {...props} style={{ color: "#80FF00" }} />
              )}
            >
              <MenuItem value="India">India</MenuItem>
              <MenuItem value="Pakistan">Pakistan</MenuItem>
            </Select>
            <Select
              value={"Outside Sales"}
              sx={{
                height: "30px",
                bgcolor: "black",
                color: "white",
                fontSize: "14px",
                border: "1px solid #80FF00",
              }}
              IconComponent={(props) => (
                <ArrowDropDownIcon {...props} style={{ color: "#80FF00" }} />
              )}
            >
              <MenuItem value="Outside Sales">Outside Sales</MenuItem>
              <MenuItem value="Pakistan">Pakistan</MenuItem>
            </Select>
          </div>
          <h1 className="text-white text-xl font-[300] ">Good Morning, Alin</h1>
          <div className="rounded-3xl p-2 px-4 flex items-center gap-4 bg-[#204244]">
            <DateSelection dates={circularDate} setDates={setCircularDate} />
            <div className="flex items-center gap-1 ">
              <span className="rounded-[50%] h-2 w-2 bg-[#80FF00]"></span>
              <h1 className="text-[#80FF00] text-[12px]">94</h1>
              <h1 className="text-[#C4C4C4] text-[12px]">Closed</h1>
            </div>
            <div className="flex items-center gap-1">
              <span className="rounded-[50%] h-2 w-2 bg-[#E53939]"></span>
              <h1 className="text-[#E53939] text-[12px]">94</h1>
              <h1 className="text-[#C4C4C4] text-[12px]">Not Closed</h1>
            </div>
            <div className="flex items-center gap-1">
              <span className="rounded-[50%] h-2 w-2 bg-[#fff]"></span>
              <h1 className="text-[#fff] text-[12px]">94</h1>
              <h1 className="text-[#C4C4C4] text-[12px]">Target</h1>
            </div>
          </div>
        </div>
        {/* middle section  */}

        {/* right section */}
        <div className="absolute right-0 top-10 w-[18vw] px-6 text-white flex flex-col items-start bg-gradient-to-b from-[#011719] shadow-2xl  bg-opacity-0  backdrop-blur-sm rounded-lg">
          <div className="relative w-[100%]">
            <div className="mt-3  p-4 px-6 ">
              <h1 className="text-white text-xl mb-3">Team A</h1>
              <h1 className="text-[#80FF00] text-2xl">₹26,76,56786</h1>
              <div className="flex item center gap-2 mt-2">
                <h1 className="text-[#80FF00] text-lg">34%</h1>
                <h1 className="text-[#C4C4C4] text-md">Increased</h1>
              </div>
              <h1 className="text-[#C4C4C4] text-md mt-2">2023-2024</h1>
            </div>
            <div className="absolute bottom-[-25px] right-[0px] p-3  bg-[#204244] rounded-lg">
              <div className="flex item center gap-1">
                <h1 className="text-[#80FF00] text-sm">94</h1>
                <h1 className="text-[#C4C4C4] text-sm">Schools</h1>
              </div>
              <h1 className="text-[#C4C4C4] text-xs  mt-[2px]">Closed</h1>
            </div>
          </div>
          <div className="mt-10 w-[100%]">
            <div className="flex item center gap-1 mb-1 ">
              <h1 className="text-[#80FF00] text-sm">62%</h1>
              <h1 className="text-[#C4C4C4] text-sm">Total target status</h1>
            </div>
            <ProgressBar progression={60} width={100} />
            <div className="flex justify-between w-[100%] mt-1">
              <h1 className="text-[#80FF00] text-xs">₹73,62294</h1>
              <h1 className="text-[#C4C4C4] text-xs">₹1,73,62294</h1>
            </div>
            <div
              className="w-[100%]  mt-6 py-5 flex justify-between items-center  "
              style={{
                borderBottom: ".1px dashed lightgray",
                borderTop: ".1px dashed lightgray",
              }}
            >
              <div className="w-[80px] h-[80px] flex flex-col  items-center">
                <CircularProgressbar
                  value={30}
                  text={"35%"}
                  styles={buildStyles({
                    pathColor: "#80FF00", // Custom path color
                    textColor: "#fff", // Custom text color
                    trailColor: "#d6d6d6", // Custom trail color
                  })}
                />
                <h1 style={{ color: "ligh" }} className="text-xs mt-2">
                  2023
                </h1>
              </div>
              <div className="w-[80px] h-[80px] flex flex-col  items-center">
                <CircularProgressbar
                  value={40}
                  text={"45%"}
                  styles={buildStyles({
                    pathColor: "#80FF00", // Custom path color
                    textColor: "#fff", // Custom text color
                    trailColor: "#d6d6d6", // Custom trail color
                  })}
                />
                <h1 className="text-xs mt-2">2024</h1>
              </div>
              <div className="w-[80px] h-[80px] flex flex-col  items-center">
                <CircularProgressbar
                  value={55}
                  text={"55%"}
                  styles={buildStyles({
                    pathColor: "#00B2FF", // Custom path color
                    textColor: "#fff", // Custom text color
                    trailColor: "#d6d6d6", // Custom trail color
                  })}
                />
                <h1 className="text-xs mt-2">2025</h1>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-[100%]">
            <div className="flex items-center mt-2 justify-between bg-gradient-to-b p-4 w-[100%] from-[#011719] shadow-2xl  bg-opacity-0  backdrop-blur-sm rounded-lg">
              <h1 className="text-sm">Work Order Gen & Invoice</h1>
              <IconButton
                size="small"
                sx={{ background: "black", color: "white" }}
              >
                <KeyboardArrowRightIcon />
              </IconButton>
            </div>
            <div className="flex items-center justify-between bg-gradient-to-b p-4 w-[100%] from-[#011719] shadow-2xl  bg-opacity-0  backdrop-blur-sm rounded-lg">
              <h1 className="text-sm">Quotation Calc </h1>
              <IconButton
                size="small"
                sx={{ background: "black", color: "white" }}
              >
                <KeyboardArrowRightIcon />
              </IconButton>
            </div>
            <div className="flex items-center justify-between bg-gradient-to-b p-4 w-[100%] from-[#011719] shadow-2xl  bg-opacity-0  backdrop-blur-sm rounded-lg">
              <h1 className="text-sm">Order History</h1>
              <IconButton
                size="small"
                sx={{ background: "black", color: "white" }}
              >
                <KeyboardArrowRightIcon />
              </IconButton>
            </div>
            <div className="flex items-center justify-between bg-gradient-to-b p-4 w-[100%] from-[#011719] shadow-2xl  bg-opacity-0  backdrop-blur-sm rounded-lg">
              <h1 className="text-sm">Existing Clients</h1>
              <IconButton
                size="small"
                sx={{ background: "black", color: "white" }}
              >
                <KeyboardArrowRightIcon />
              </IconButton>
            </div>
            <div className="flex items-center justify-between bg-gradient-to-b p-4 w-[100%] from-[#011719] shadow-2xl  bg-opacity-0  backdrop-blur-sm rounded-lg">
              <h1 className="text-sm">Route Planning</h1>
              <IconButton
                size="small"
                sx={{ background: "black", color: "white" }}
              >
                <KeyboardArrowRightIcon />
              </IconButton>
            </div>
          </div>
        </div>
        {/* right section */}

        {/* draggable togglebar  */}
        <div className="fixed bottom-2 z-50 left-[25%] bg-[#68AC25] rounded-xl p-2 px-2 flex item-center gap-2">
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

        <div className="w-[100%] mt-16 p-5 flex justify-center">
          <div className="w-[90%]">
            <div className="flex gap-10 item-center">
              <div className="flex gap-1 items-center mb-4 font-bold text-2xl">
                <img
                  src="/images/logozero.png"
                  className="h-6 w-6"
                  alt="logo"
                />
                <h3 className="text-white">Team Performance</h3>
                <DateSelection
                  dates={circularDate}
                  setDates={setCircularDate}
                />
              </div>
            </div>
            <div className="grid grid-cols-12 gap-10 mt-10">
              <div className="col-span-8">
                <div className="col-span-12">
                  <div className="flex items-baseline gap-1 mb-1 ">
                    <h1 className="text-[#80FF00] text-2xl">₹23,654534</h1>
                    <h1 className="text-[#fff] text-xl">Team A</h1>
                  </div>
                  <div className="flex gap-2 items-baseline">
                    <ProgressBar progression={62} width={80} />
                    <h1 className="text-[#80FF00] text-xl">62%</h1>
                  </div>
                  <div className="flex justify-end w-[80%] ">
                    <h1 className="text-[#C4C4C4] text-xl">₹1,73,62294</h1>
                  </div>
                </div>
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

        {/* Team performance */}

        {/* performance leader */}
        <div className="w-[100%] mt-16 p-5 flex justify-center">
          <div className="w-[90%]">
            <div className="flex gap-1 items-center mb-4 font-bold text-2xl">
              <img src="/images/logozero.png" className="h-6 w-6" alt="logo" />
              <h3 className="text-white">Performance Leader</h3>
            </div>
            <div className="grid grid-cols-12 gap-10 ">
              <div className="col-span-9 grid grid-cols-12 gap-10">
                <div className="col-span-4 p-3 text-white">
                  <h1 className="text-lg font-bold my-3">Top Performers</h1>
                  {topPerformamnceData.map((data, index) => (
                    <PerformanceItem
                      key={index}
                      data={data}
                      type={"top performers"}
                    />
                  ))}
                </div>
                <div className="col-span-4 p-3 text-white">
                  <h1 className="text-lg font-bold my-3">Steady Movers</h1>
                  {topPerformamnceData.map((data, index) => (
                    <PerformanceItem
                      key={index}
                      data={data}
                      type={"steady movers"}
                    />
                  ))}
                </div>
                <div className="col-span-4 p-3 text-white">
                  <h1 className="text-lg font-bold my-3">Slow Sellers</h1>
                  {topPerformamnceData.map((data, index) => (
                    <PerformanceItem
                      key={index}
                      data={data}
                      type={"slow sellers"}
                    />
                  ))}
                </div>
                <div className="col-span-4 p-3 text-white">
                  <h1 className="text-lg font-bold my-3">Profit Leaders</h1>
                  {topPerformamnceData.map((data, index) => (
                    <PerformanceItem
                      key={index}
                      data={data}
                      type={"Profit Leaders"}
                    />
                  ))}
                </div>
                <div className="col-span-4 p-3 text-white">
                  <h1 className="text-lg font-bold my-3">
                    Profit Contributors
                  </h1>
                  {topPerformamnceData.map((data, index) => (
                    <PerformanceItem
                      key={index}
                      data={data}
                      type={"Profit Contributors"}
                    />
                  ))}
                </div>
              </div>
              <div className="col-span-3 grid grid-cols-12 gap-10">
                <div className="col-span-10 rounded-lg bg-gradient-to-b px-8 p-4 w-[100%] from-[#011719] shadow-2xl  bg-opacity-0  backdrop-blur-sm    text-white">
                  <h1 className="text-lg font-bold my-3">Rising Stars</h1>
                  {topPerformamnceData.map((data, index) => (
                    <PerformanceItem
                      key={index}
                      data={data}
                      type={"Rising Stars"}
                    />
                  ))}
                </div>
                <div className="col-span-10 rounded-lg border  border-red-600 bg-gradient-to-b p-4 px-8 w-[100%] from-[#011719] shadow-2xl  bg-opacity-0  backdrop-blur-sm    text-white">
                  <h1 className="text-lg font-bold my-3">Needs Attention</h1>
                  {topPerformamnceData.map((data, index) => (
                    <PerformanceItem
                      key={index}
                      data={data}
                      type={"needs attention"}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* performance leader */}

        {/* sales pipeline */}

        <div className="w-[100%] mt-16 p-5 flex justify-center">
          <div className="w-[90%]">
            <div className="flex gap-10 item-center">
              <div className="flex gap-1 items-center mb-4 font-bold text-2xl">
                <img
                  src="/images/logozero.png"
                  className="h-6 w-6"
                  alt="logo"
                />
                <h3 className="text-white">Sales Pipeline</h3>
                <div className="flex items-center ml-6  justify-around gap-3 ">
                  <Select
                    value={"India"}
                    sx={{
                      height: "30px",
                      bgcolor: "black",
                      color: "white",
                      fontSize: "14px",
                    }}
                    IconComponent={(props) => (
                      <ArrowDropDownIcon
                        {...props}
                        style={{ color: "#80FF00" }}
                      />
                    )}
                  >
                    <MenuItem value="India">Overall (team)</MenuItem>
                    <MenuItem value="Pakistan">Harold Das</MenuItem>
                    <MenuItem value="Pakistan">Leo Das</MenuItem>
                  </Select>
                  <Button
                    onClick={() => setShowBoard(true)}
                    variant="contained"
                    sx={{
                      background: "black",
                      height: "30px",
                      textTransform: "none",
                    }}
                  >
                    Board
                  </Button>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-12 gap-12">
              <div className="col-span-4 mt-6 flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-white text-lg mb-4">Sales Pipeline</h3>
                  <Box sx={{ P: 1 }} color={"white"}>
                    <Button
                      onClick={() => setActivePipeline("new")}
                      sx={{
                        textTransform: "none",
                        bgcolor: activePipeline === "new" ? "#48820E" : "",
                        color: "white",
                      }}
                    >
                      New School
                    </Button>
                    <Button
                      onClick={() => setActivePipeline("spotlight")}
                      sx={{
                        textTransform: "none",
                        color: "white",
                        bgcolor:
                          activePipeline === "spotlight" ? "#48820E" : "",
                      }}
                    >
                      Spotlight
                    </Button>
                    <Button
                      onClick={() => setActivePipeline("upselling")}
                      sx={{
                        textTransform: "none",
                        color: "white",
                        bgcolor:
                          activePipeline === "upselling" ? "#48820E" : "",
                      }}
                    >
                      Upselling
                    </Button>
                  </Box>
                </div>
                {activePipeline === "new" && (
                  <>
                    <div
                      className="flex gap-1 items-center cursor-pointer "
                      onClick={() => setShowTable("Lead Generation")}
                    >
                      <PipelineProgressbar
                        title="Lead Generation"
                        width={90}
                        percentage={90}
                      />
                      {showTable === "Lead Generation" && (
                        <GradeIcon fontSize={"small"} />
                      )}
                    </div>
                    <div
                      className="flex gap-1 items-center cursor-pointer "
                      onClick={() =>
                        setShowTable("Qualification & Initial Contact")
                      }
                    >
                      <PipelineProgressbar
                        title="Qualification & Initial Contact"
                        width={90}
                        percentage={70}
                      />
                      {showTable === "Qualification & Initial Contact" && (
                        <GradeIcon fontSize={"small"} />
                      )}
                    </div>
                    <div
                      className="flex gap-1 items-center cursor-pointer "
                      onClick={() => setShowTable("Demo")}
                    >
                      <PipelineProgressbar
                        title="Demo"
                        width={90}
                        percentage={60}
                      />
                      {showTable === "Demo" && <GradeIcon fontSize={"small"} />}
                    </div>
                    <div
                      className="flex gap-1 items-center cursor-pointer "
                      onClick={() => setShowTable("Proposal")}
                    >
                      <PipelineProgressbar
                        title="Proposal"
                        width={90}
                        percentage={50}
                      />
                      {showTable === "Proposal" && (
                        <GradeIcon fontSize={"small"} />
                      )}
                    </div>
                    <div
                      className="flex gap-1 items-center cursor-pointer "
                      onClick={() => setShowTable("Negotiation")}
                    >
                      <PipelineProgressbar
                        title="Negotiation"
                        width={90}
                        percentage={40}
                      />
                      {showTable === "Negotiation" && (
                        <GradeIcon fontSize={"small"} />
                      )}
                    </div>
                 
                    <div
                      className="flex gap-1 items-center cursor-pointer"
                      onClick={() => setShowTable("hold")}
                    >
                      <PipelineProgressbar
                        title="Closure"
                        width={90}
                        percentage={30}
                      />
                      {showTable === "Closure" && (
                        <GradeIcon fontSize={"small"} />
                      )}
                    </div>
                    <div
                      className="flex gap-1 items-center cursor-pointer "
                      onClick={() => setShowTable("hold")}
                    >
                      <PipelineProgressbar
                        title="hold"
                        width={90}
                        percentage={40}
                      />
                      {showTable === "hold" && (
                        <GradeIcon fontSize={"small"} />
                      )}
                    </div>
                    <div
                      className="flex gap-1 items-center cursor-pointer "
                      onClick={() => setShowTable("Retention")}
                    >
                      <PipelineProgressbar
                        title="Retention"
                        width={90}
                        percentage={20}
                      />
                      {showTable === "Retention" && (
                        <GradeIcon fontSize={"small"} />
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <PipelineProgressbar
                        title="Closed"
                        width={44}
                        percentage={60}
                      />
                      <PipelineProgressbar
                        title="Rejected"
                        width={44}
                        percentage={45}
                      />
                    </div>
                  </>
                )}
                {activePipeline === "upselling" && (
                  <>
                    <div
                      className="flex gap-1 items-center cursor-pointer "
                      onClick={() => setShowTable("Demo")}
                    >
                      <PipelineProgressbar
                        title="Demo"
                        width={90}
                        percentage={60}
                      />
                      {showTable === "Demo" && <GradeIcon fontSize={"small"} />}
                    </div>
                    <div
                      className="flex gap-1 items-center cursor-pointer "
                      onClick={() => setShowTable("Proposal")}
                    >
                      <PipelineProgressbar
                        title="Proposal"
                        width={90}
                        percentage={50}
                      />
                      {showTable === "Proposal" && (
                        <GradeIcon fontSize={"small"} />
                      )}
                    </div>
                    <div
                      className="flex gap-1 items-center cursor-pointer "
                      onClick={() => setShowTable("Negotiation")}
                    >
                      <PipelineProgressbar
                        title="Negotiation"
                        width={90}
                        percentage={40}
                      />
                      {showTable === "Negotiation" && (
                        <GradeIcon fontSize={"small"} />
                      )}
                    </div>
                    <div
                      className="flex gap-1 items-center cursor-pointer"
                      onClick={() => setShowTable("Closure")}
                    >
                      <PipelineProgressbar
                        title="Closure"
                        width={90}
                        percentage={30}
                      />
                      {showTable === "Closure" && (
                        <GradeIcon fontSize={"small"} />
                      )}
                    </div>
                  </>
                )}
              </div>
              <div className="col-span-8 mt-6 flex flex-col gap-4">
                <div className="flex justify-between items-center w-[100%]">
                  <h3 className="text-white text-lg mb-4">I/O Sales Matrix</h3>
                  <Button
                    endIcon={<AddIcon />}
                    onClick={() => setAddLeads(true)}
                    variant="contained"
                    disableElevation
                    sx={{ textTransform: "none", background: "#48820E" }}
                  >
                    Add Leads
                  </Button>
                </div>
                <SalesMatrixTable
                  type={showTable}
                  scroll={true}
                  sHeight="300px"
                />
              </div>
            </div>
          </div>
        </div>

        {/* sales pipeline */}

        {/* ROI */}
        <div className="w-[100%] mt-16 p-5 flex justify-center">
          <div className="w-[90%]">
            <div className="flex gap-10 item-center">
              <div className="flex gap-1 items-center mb-4 font-bold text-2xl">
                <img
                  src="/images/logozero.png"
                  className="h-6 w-6"
                  alt="logo"
                />
                <h3 className="text-white">ROI</h3>
                <div className="flex items-center ml-6  justify-around gap-3 ">
                  <Select
                    value={"India"}
                    // className="h-10 bg-black text-white text-[14px] "
                    sx={{
                      height: "30px",
                      bgcolor: "black",
                      color: "white",
                      fontSize: "14px",
                    }}
                    IconComponent={(props) => (
                      <ArrowDropDownIcon
                        {...props}
                        style={{ color: "#80FF00" }}
                      />
                    )}
                  >
                    <MenuItem value="India">Overall (team)</MenuItem>
                    <MenuItem value="Pakistan">Harold Das</MenuItem>
                    <MenuItem value="Pakistan">Leo Das</MenuItem>
                  </Select>
                  <DateSelection
                    dates={circularDate}
                    setDates={setCircularDate}
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-12 gap-12">
              <div className="col-span-4 mt-6 flex flex-col gap-4">
                <h3 className="text-white text-lg mb-4">
                  Team <b>ROI</b> Breakdown
                </h3>
                <ROIPieChart />
              </div>
              <div className="col-span-4 mt-6 flex flex-col gap-4">
                <div className="m-6 bg-[#03383D] rounded-lg">
                  {ROIData.map((data, index) => (
                    <ROIItem
                      key={index}
                      title={data.title}
                      value={data.value}
                    />
                  ))}
                  <Box className="roi-item flex items-center w-[100%]  justify-between p-3">
                    <h3 className="text-white text-md font-bold">ROI</h3>
                    <h3 className="text-[#80FF00] text-md font-bold">200%</h3>
                  </Box>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* ROI */}
      </div>
    </>
  );
};

export default MapShow;

interface PerformanceData {
  name: string;
  team: string;
  amount: string;
  count: string;
}

interface PerformanceItemProps {
  data: PerformanceData;
  type: string; // Add type to the interface
}
const PerformanceItem: React.FC<PerformanceItemProps> = ({ data, type }) => {
  return (
    <div
      className="flex items-center justify-between gap-3 py-1 text-sm"
      style={{
        borderBottom: ".1px dashed white",
      }}
    >
      <h1>{data.name}</h1>
      <h1>{data.team}</h1>
      <h1
        className={`${
          type === "needs attention"
            ? "text-[#E03030]"
            : type === "slow sellers"
            ? "text-[#FF9A02]"
            : "text-[#80FF00] "
        }`}
      >
        ₹{data.amount}
      </h1>
      <span
        className={`${
          type === "needs attention"
            ? "text-[#E03030]"
            : type === "slow sellers"
            ? "text-[#FF9A02]"
            : "text-[#80FF00] "
        } bg-gradient-to-b p-3 from-[#011719] shadow-2xl  bg-opacity-0  backdrop-blur-sm rounded-md`}
      >
        {data.count}
      </span>
    </div>
  );
};

interface TeamPerformanceProps {
  name: string;
  total: number;
  current: number;
  percentage: number;
  status: string;
}

interface TeamPerformanceItemProps {
  data: TeamPerformanceProps;
  index: number; // Add type to the interface
}

const TeamPerformanceItem: React.FC<TeamPerformanceItemProps> = ({
  data,
  index,
}) => {
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
        <h1 className="text-[#80FF00] text-md">₹78,6545</h1>
        <h1 className="text-[#fff] text-sm">{name}</h1>
      </div>
      <div className="flex item center gap-1 mb-1 mt-3 ">
        <h1
          className={`${
            status === "high" ? "text-[#80FF00]" : "text-[#E03030]"
          } text-sm`}
        >
          {percentage}%
        </h1>
        <h1 className="text-[#C4C4C4] text-sm">Target status</h1>
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
          } text-xs`}
        >
          ₹{current}
        </h1>
        <h1 className="text-[#C4C4C4] text-xs">₹{total}</h1>
      </div>
    </div>
  );
};

interface ROIItemProps {
  title: string;
  value: number;
}

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
