// "use client";

// import React, { useEffect, useRef, useState } from "react";
// import mapboxgl, { LngLatLike } from "mapbox-gl"; // Import LngLatLike for type checking
// import { useRouter } from "next/navigation";
// import {
//   Box,
//   Button,
//   Divider,
//   Grid,
//   IconButton,
//   InputAdornment,
//   MenuItem,
//   Select,
//   TextField,
//   Tooltip,
//   Typography,
// } from "@mui/material";
// import {
//   Home as HomeIcon,
//   ArrowUpward as ArrowUpwardIcon,
//   ArrowDownward as ArrowDownwardIcon,
//   ArrowRightAlt as ArrowRightAltIcon,
//   Add as AddIcon,
//   Grade as GradeIcon,
//   ZoomIn as ZoomInIcon,
//   ZoomOut as ZoomOutIcon,
//   Refresh as RefreshIcon,
//   ArrowDropDown as ArrowDropDownIcon,
//   Person2Outlined as Person2OutlinedIcon,
//   KeyboardArrowRight as KeyboardArrowRightIcon,
//   Search as SearchIcon,
// } from "@mui/icons-material";
// import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
// import "react-circular-progressbar/dist/styles.css";
// import PipelineProgressbar from "@/components/PipelineProgressBar";
// import SalesMatrixTable from "@/components/SalesMatrixTable";
// import ROIPieChart from "@/components/ROIPieChart";
// import DateSelection from "@/components/DateSelection";
// import LeadAdding from "@/components/LeadAdding";
// import KanbanBoard from "@/components/KanbanBoard";
// import { ProgressBar } from "@/components/ProgressBar";
// import { FeatureCollection, Point } from "geojson";

// type StudentStrength = {
//   region: string;
//   strength: number;
//   team: string;
// };

// const studentStrengthData: StudentStrength[] = [
//   {
//     region: "Lotus Valley International School",
//     strength: 1400,
//     team: "Team A",
//   },
//   {
//     region: "Lotus Valley International School",
//     strength: 1400,
//     team: "Team A",
//   },
//   {
//     region: "Lotus Valley International School",
//     strength: 1400,
//     team: "Team A",
//   },
//   {
//     region: "Lotus Valley International School",
//     strength: 1400,
//     team: "Team A",
//   },
//   {
//     region: "Lotus Valley International School",
//     strength: 1400,
//     team: "Team A",
//   },
//   {
//     region: "Lotus Valley International School",
//     strength: 1400,
//     team: "Team A",
//   },
// ];

// // Declare type for your coordinate data structure
// type Coordinate = {
//   latitude: string;
//   longitude: string;
// };

// // Declare type for the company data structure
// type CompanyData = {
//   company: string;
//   coordinates: Coordinate[];
// };

// type ToggleDataType = {
//   name: string;
//   url: string;
// };

// const toggleData: ToggleDataType[] = [
//   { name: "Entab Analysis", url: "/upcoming" },
//   { name: "Competitor Analysis", url: "/upcoming" },
//   { name: "My Team", url: "/" },
//   { name: "Revenue Analysis ", url: "/upcoming" },
//   { name: "Target Analysis", url: "/upcoming" },
//   { name: "Marketing", url: "/upcoming" },
//   { name: "Summary", url: "/summary" },
// ];

// interface TeamPerformanceProps {
//   name: string;
//   total: number;
//   current: number;
//   percentage: number;
//   status: string;
//   demoFixed: number;
//   noOfVisit: number;
//   place: string;
//   demoDone: number;
//   demoScheduled: number;
//   transferToManager: number;
//   referenceCollected: string;
//   projection: string;
// }

// const teamPerformanceData: TeamPerformanceProps[] = [
//   // {
//   //   name: "Alin Anto",
//   //   total: 100000,
//   //   current: 62000,
//   //   percentage: 62,
//   //   status: "high",
//   //   // demoFixed:

//   // },
//   {
//     name: "Jissmon George",
//     total: 800000,
//     current: 0,
//     percentage: 0,
//     status: "low",
//     demoFixed: 19,
//     noOfVisit: 53,
//     place: "Delhi,UP,Karntaka,MP,Chattisgarh",
//     demoDone: 5,
//     demoScheduled: 4,
//     transferToManager: 2,
//     referenceCollected:
//       "St Georges School Malad, Begur diocese Schools of Carmelite sisters",
//     projection: "41,00,000",
//   },
//   {
//     name: "Annam Giri",
//     total: 0,
//     current: 0,
//     percentage: 0,
//     status: "high",
//     demoFixed: 13,
//     noOfVisit: 61,
//     place: "visakhapatnam , viijayawada , ongole",
//     demoDone: 7,
//     demoScheduled: 7,
//     transferToManager: 9,
//     referenceCollected:
//       "St Georges School Malad, Begur diocese Schools of Carmelite sisters",
//     projection: "60,40,000",
//   },
//   {
//     name: "Joy Sony",
//     total: 0,
//     current: 0,
//     percentage: 0,
//     status: "low",
//     demoFixed: 0,
//     noOfVisit: 0,
//     place: "No visit",
//     demoDone: 0,
//     demoScheduled: 0,
//     transferToManager: 0,
//     referenceCollected: "",
//     projection: "No data",
//   },
//   {
//     name: "Adarsh Shetty",
//     total: 0,
//     current: 0,
//     percentage: 0,
//     status: "low",
//     demoFixed: 0,
//     noOfVisit: 0,
//     place: "No visit",
//     demoDone: 0,
//     demoScheduled: 0,
//     transferToManager: 0,
//     referenceCollected: "",
//     projection: "No data",
//   },
// ];

// interface ROIItemProps {
//   title: string;
//   value: number;
// }

// const ROIData: ROIItemProps[] = [
//   { title: "Total Revenue", value: 500000 },
//   { title: "Commission", value: 30000 },
//   { title: "Bonuses", value: 15000 },
//   { title: "Benefits", value: 10000 },
//   { title: "Training Costs", value: 5000 },
//   { title: "Travel Expenses", value: 2000 },
//   { title: "Office Expenses", value: 8000 },
//   { title: "Utilities", value: 4000 },
//   { title: "Other Overheads", value: 3000 },
// ];

// // Main component
// const MapShow: React.FC = () => {
//   const router = useRouter();
//   const mapContainerRef = useRef<HTMLDivElement>(null);
//   const mapRef = useRef<mapboxgl.Map>();
//   const [activeToggle, setActiveToggle] = useState<number>(2);
//   const [addLeads, setAddLeads] = useState<boolean>(false); // Use lowercase boolean
//   const [showBoard, setShowBoard] = useState<boolean>(false); // Use lowercase boolean
//   const [showTable, setShowTable] = useState<string>("Lead Generation");
//   const [activePipeline, setActivePipeline] = useState<string>("new");

//   const handleToggle = (index: number, url: string) => {
//     setActiveToggle(index);
//     router.push(url);
//   };

//   interface DateRange {
//     startDate: Date;
//     endDate: Date;
//     key: string;
//   }

//   // Initialize the state with proper typing
//   const [circularDate, setCircularDate] = useState<DateRange>({
//     startDate: new Date(new Date().setMonth(new Date().getMonth() - 6)),
//     endDate: new Date(),
//     key: "selection",
//   });

//   // Define your data with type annotation

//   type TopPerformanceType = {
//     name: string;
//     team: string;
//     amount: string;
//     count: string;
//   };

//   const topPerformamnceData: TopPerformanceType[] = [
//     { name: "Felbin", team: "Team A", amount: "17,4545", count: "50" },
//     { name: "Felbin", team: "Team A", amount: "17,4545", count: "50" },
//     { name: "Felbin", team: "Team A", amount: "17,4545", count: "50" },
//     { name: "Felbin", team: "Team A", amount: "17,4545", count: "50" },
//   ];

//   const data: CompanyData[] = [
//     {
//       company: "Entab",
//       coordinates: [
//         { latitude: "25.343", longitude: "71.111" },
//         { latitude: "31.347", longitude: "75.112" },
//         { latitude: "21.348", longitude: "75.134" },
//         { latitude: "31.1471", longitude: "76.3412" },
//         { latitude: "32.1471", longitude: "77.3412" },
//         { latitude: "23.1471", longitude: "71.3412" },
//         { latitude: "24.1471", longitude: "72.3412" },
//         { latitude: "25.1471", longitude: "73.3412" },
//         { latitude: "26.1471", longitude: "76.3412" },
//         { latitude: "27.1471", longitude: "73.3412" },
//         { latitude: "24.1471", longitude: "72.3412" },
//         { latitude: "10.1632", longitude: "76.6413" },
//         { latitude: "11.8745", longitude: "75.7804" },
//         { latitude: "19.0861", longitude: "82.0188" },
//         { latitude: "26.9124", longitude: "75.7873" },
//         { latitude: "31.1048", longitude: "77.1734" },
//         { latitude: "27.2412", longitude: "79.0609" },
//         { latitude: "", longitude: "" },
//         { latitude: "", longitude: "" },
//       ],
//     },
//     {
//       company: "Next",
//       coordinates: [
//         { latitude: "24.343", longitude: "72.111" },
//         { latitude: "23.34545", longitude: "72.125" },
//         { latitude: "26.348", longitude: "75.134" },
//         { latitude: "22.7196", longitude: "75.8577" },
//         { latitude: "16.5062", longitude: "16.5062" }, // Corrected the longitude format
//         { latitude: "17.6868", longitude: "83.2185" },
//         { latitude: "19.0760", longitude: "72.8777" },
//       ],
//     },
//   ];

//   // Sample data
//   const geoData: CompanyData[] = [
//     {
//       company: "Entab",
//       coordinates: [
//         { latitude: "15.9129", longitude: "79.7400" },
//         { latitude: "17.9784", longitude: "79.5941" },
//         { latitude: "26.8467", longitude: "80.9462" },
//         { latitude: "28.6139", longitude: "77.2090" },
//         { latitude: "29.0588", longitude: "76.0856" },
//         { latitude: "31.1471", longitude: "75.3412" },
//         { latitude: "15.3173", longitude: "75.7139" },
//         { latitude: "22.9734", longitude: "78.6569" },
//         { latitude: "21.2787", longitude: "81.8661" },
//         { latitude: "19.7515", longitude: "75.7139" },
//       ],
//     },
//     // {
//     //   company: "Next",
//     //   coordinates: [
//     //     { latitude: "24.343", longitude: "72.111" },
//     //     { latitude: "23.34545", longitude: "72.125" },
//     //   ],
//     // },
//   ];

//   // Properly typed geojsonData with FeatureCollection<Point> from geojson
//   const geojsonData: FeatureCollection<Point> = {
//     type: "FeatureCollection",
//     features: geoData.flatMap((item) =>
//       item.coordinates.map((coord) => ({
//         type: "Feature",
//         properties: {
//           company: item.company,
//         },
//         geometry: {
//           type: "Point",
//           coordinates: [
//             parseFloat(coord.longitude),
//             parseFloat(coord.latitude),
//           ],
//         },
//       }))
//     ),
//   };

//   interface ProgressBarProps {
//     value: number;
//     text?: string;
//   }

//   const bounds: [LngLatLike, LngLatLike] = [
//     [68.1766451354, 6.756993], // Southwest coordinates
//     [97.4025614766, 35.5087008], // Northeast coordinates
//   ];

//   useEffect(() => {
//     mapboxgl.accessToken =
//       "pk.eyJ1IjoiNzQ4NSIsImEiOiJjbDFua3kwcHIwMDE1M2luMXhleDNqMGZiIn0.Mj40f5LXER6tUfR3ygQLaA";

//     const map = new mapboxgl.Map({
//       container: "mapContainer",
//       style: "mapbox://styles/mapbox/dark-v11",
//       center: [80, 22],
//       zoom: 3.8,
//       projection: "globe",
//       scrollZoom: false,
//     });

//     map.on("load", function () {
//       map.addSource("salesData", {
//         type: "geojson",
//         data: geojsonData,
//       });

//       map.addLayer({
//         id: "entab-points",
//         type: "circle",
//         source: "salesData",
//         paint: {
//           "circle-radius": 10,
//           "circle-color": "#bc3a3a",
//         },
//         filter: ["==", ["get", "company"], "Entab"],
//       });

//       map.addLayer({
//         id: "next-points",
//         type: "circle",
//         source: "salesData",
//         paint: {
//           "circle-radius": 10,
//           "circle-color": "#80FF00",
//         },
//         filter: ["==", ["get", "company"], "Next"],
//       });

//       map.addControl(
//         new mapboxgl.NavigationControl({ showCompass: false }),
//         "top-right"
//       );

//       // Handlers for mouse events on layers
//       map.on("mouseenter", "next-points", () => {
//         map.getCanvas().style.cursor = "pointer";
//       });

//       map.on("mouseleave", "next-points", () => {
//         map.getCanvas().style.cursor = "";
//       });
//     });

//     mapRef.current = map;

//     return () => map.remove();
//   }, []);

//   const handleZoomIn = () => {
//     mapRef.current?.zoomIn();
//   };

//   const handleZoomOut = () => {
//     mapRef.current?.zoomOut();
//   };

//   // Properly typed initialCenter
//   const initialCenter: [number, number] = [80, 22];

//   const initialZoom = 3.8;

//   const handleResetMap = () => {
//     if (mapRef.current) {
//       mapRef.current.flyTo({
//         center: initialCenter,
//         zoom: initialZoom,
//         essential: true, // This ensures the map moves even if the user has reduced motion settings
//       });
//     }
//   };

//   return (
//     <>
//       <div
//         className="relative"
//         style={{
//           background: "linear-gradient(180deg, #011719 0%, #03292C 100%)",
//           minHeight: "100vh",
//           maxWidth: "100vw",
//           overflow: "hidden",
//           paddingBottom: "60px",
//           height: "fit-content",
//         }}
//       >
//         <div
//           ref={mapContainerRef}
//           id="mapContainer"
//           style={{ height: "120vh", overflowY: "hidden", width: "100vw" }}
//         />
//         <Box
//           sx={{
//             color: "white",
//             display: "flex",
//             alignItems: "center", // Use alignItems instead of alignItem
//             gap: 1,
//             p: 1,
//             width: "100px",
//             position: "absolute",
//             top: "90vh",
//           }}
//         >
//           <IconButton
//             sx={{ color: "white", background: "#204244", borderRadius: 2 }}
//             onClick={handleZoomIn}
//           >
//             <ZoomInIcon />
//           </IconButton>
//           <IconButton
//             sx={{ color: "white", background: "#204244", borderRadius: 2 }}
//             onClick={handleZoomOut}
//           >
//             <ZoomOutIcon />
//           </IconButton>
//           <IconButton
//             sx={{ color: "white", background: "#204244", borderRadius: 2 }}
//             onClick={handleResetMap}
//           >
//             <RefreshIcon />
//           </IconButton>
//         </Box>

//         {/* middle section  */}
//         <div className="absolute top-5 left-[25%] gap-3 flex flex-col items-center">
//           <h1 className="text-white text-xl font-[500] ">Hi, Alin Anto</h1>
//           <div className="rounded-3xl p-3 px-4 flex items-center gap-4 bg-[#204244]">
//             <DateSelection dates={circularDate} setDates={setCircularDate} />
//             {/* <div className="flex items-center gap-1 ">
//               <span className="rounded-[50%] h-2 w-2 bg-[#fff]"></span>
//               <h1 className="text-[#fff] text-[15px]">94</h1>
//               <h1 className="text-[#C4C4C4] text-[15px]">Target</h1>
//             </div> */}
//             <div className="flex items-center gap-1">
//               <span className="rounded-[50%] h-2 w-2 bg-[#fff]"></span>
//               <h1 className="text-[#fff] text-[15px]">49</h1>
//               <h1 className="text-[#C4C4C4] text-[15px]">Demo Fixed</h1>
//             </div>
//             <div className="flex items-center gap-1">
//               <span className="rounded-[50%] h-2 w-2 bg-[#fff]"></span>
//               <h1 className="text-[#fff] text-[15px]">22</h1>
//               <h1 className="text-[#C4C4C4] text-[15px]">Demo Achieved</h1>
//             </div>
//             <div className="flex items-center gap-1">
//               <span className="rounded-[50%] h-2 w-2 bg-[#fff]"></span>
//               <h1 className="text-[#fff] text-[15px]">160</h1>
//               <h1 className="text-[#C4C4C4] text-[15px]">No Of Visits</h1>
//             </div>
//             {/* <div className="flex items-center gap-1">
//               <span className="rounded-[50%] h-2 w-2 bg-[#E53939]"></span>
//               <h1 className="text-[#E53939] text-[15px]">94</h1>
//               <h1 className="text-[#C4C4C4] text-[15px]">Not Done</h1>
//             </div>
//             <div className="flex items-center gap-1">
//               <span className="rounded-[50%] h-2 w-2 bg-[#E53939]"></span>
//               <h1 className="text-[#E53939] text-[15px]">94</h1>
//               <h1 className="text-[#C4C4C4] text-[15px]">Place Covered</h1>
//             </div> */}
//           </div>
//         </div>
//         {/* middle section  */}

//         {/* right section */}
//         <div className="absolute right-0 top-[200px] w-[24vw] px-6 text-white flex flex-col items-start bg-gradient-to-b from-[#011719] shadow-2xl  bg-opacity-0  backdrop-blur-sm rounded-lg">
//           <div className="relative w-[100%]">
//             <div className="mt-3  p-4 px-6 ">
//               <h1 className="text-white text-xl mb-3">Revenue Generated</h1>
//               <h1 className="text-[#80FF00] text-2xl">₹5,55,000</h1>
//               {/* <div className="flex item center gap-2 mt-2">
//                 <h1 className="text-[#80FF00] text-lg">34%</h1>
//                 <h1 className="text-[#C4C4C4] text-md">Increased</h1>
//               </div> */}
//               <h1 className="text-[#C4C4C4] text-md mt-2">June - July</h1>
//             </div>
//           </div>
//           <div className="mt-6 mb-4 w-[100%]">
//             <div className="flex item center gap-1 mb-2 ">
//               <h1 className="text-[#80FF00] text-md">16.32%</h1>
//               <h1 className="text-[#C4C4C4] text-md">Total target status</h1>
//             </div>
//             <ProgressBar progression={16} width={100} />
//             <div className="flex justify-between w-[100%] mt-2">
//               <h1 className="text-[#80FF00] text-md">₹5,55,000</h1>
//               <h1 className="text-[#C4C4C4] text-md">₹34,00,000</h1>
//             </div>
//           </div>
//         </div>
//         {/* right section */}

//         {/* draggable togglebar  */}
//         <div className="fixed bottom-10 z-50 left-[30%] bg-[#68AC25] rounded-xl p-2 px-2 flex item-center gap-2">
//           {toggleData.map((data, index) => (
//             <div
//               key={index}
//               onClick={() => handleToggle(index, data.url)}
//               className={`text-white p-2 rounded-lg cursor-pointer text-sm ${
//                 activeToggle === index ? "bg-[#48820E]" : ""
//               }`}
//             >
//               <h1>{data.name}</h1>
//             </div>
//           ))}
//         </div>
//         {/* draggable togglebar  */}

//         {/* Team performance */}

//         <div className="w-[100%] mt-16 p-5 flex justify-center">
//           <div className="w-[90%]">
//             <div className="flex gap-10 item-center">
//               <div className="flex gap-1 items-center mb-4 font-bold text-2xl">
//                 <img src="/images/logozero.png" className="h-6 w-6 " />
//                 <h3 className="text-white">Team Performance(Quarter 2)</h3>
//               </div>
//             </div>
//             <div className="grid grid-cols-12 gap-10 mt-10">
//               <div className="col-span-12">
//                 <div className="col-span-12">
//                   <div className="flex items-baseline gap-1 mb-1 ">
//                     <h1 className="text-[#80FF00] text-2xl">₹5,55,000</h1>
//                     <h1 className="text-[#fff] text-xl">My Team</h1>
//                   </div>
//                   <div className="flex gap-2 items-baseline">
//                     <ProgressBar progression={16} width={50} />
//                     <h1 className="text-[#80FF00] text-xl">16.3%</h1>
//                   </div>
//                   <div className="flex justify-end w-[50%] ">
//                     <h1 className="text-[#C4C4C4] text-xl">₹34,00,000</h1>
//                   </div>
//                 </div>
//                 <div className="col-span-12 gap-10 grid grid-cols-12 mt-10">
//                   {teamPerformanceData.map((data, index) => (
//                     <TeamPerformanceItem
//                       key={index}
//                       index={index + 1}
//                       data={data}
//                     />
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Team performance */}

//         {/* sales pipeline */}

//         {/* <div className="w-[100%] mt-16 p-5 flex justify-center">
//           <div className="w-[90%]">
//             <div className="flex gap-10 item-center">
//               <div className="flex gap-1 items-center mb-4 font-bold text-2xl">
//                 <img src="/images/logozero.png" className="h-6 w-6 " />
//                 <h3 className="text-white">Aug - Sep Plan</h3>
//               </div>
//             </div>
//             <div>
//               <Grid container>
//                 <Grid item md={5}>
//                   <Box
//                     display={"flex"}
//                     sx={{
//                       background: "black",
//                       borderRadius: 3,
//                       color: "white",
//                       p: 3,
//                     }}
//                     flexDirection={"column"}
//                     alignItems={"center"}
//                   >
//                     <Box
//                       display={"flex"}
//                       mb={2}
//                       width={"100%"}
//                       alignItems={"center"}
//                       justifyContent={"space-between"}
//                     >
//                       <Typography fontSize={"15px"}>
//                         No of demo fixed
//                       </Typography>
//                       <Typography color={"#80FF00"} fontWeight={600}>
//                         04
//                       </Typography>
//                     </Box>
//                     <Box
//                       display={"flex"}
//                       width={"100%"}
//                       mb={2}
//                       alignItems={"center"}
//                       justifyContent={"space-between"}
//                     >
//                       <Typography fontSize={"15px"}>
//                         No of meetings scheduled
//                       </Typography>
//                       <Typography color={"#80FF00"} fontWeight={600}>
//                         08
//                       </Typography>
//                     </Box>
//                     <Box
//                       display={"flex"}
//                       width={"100%"}
//                       alignItems={"center"}
//                       justifyContent={"space-between"}
//                     >
//                       <Typography fontSize={"15px"}>
//                         No of retail and group school got through reference
//                       </Typography>
//                       <Typography color={"#80FF00"} fontWeight={600}>
//                         02
//                       </Typography>
//                     </Box>
//                   </Box>
//                 </Grid>
//               </Grid>
//             </div>
//           </div>
//         </div> */}

//         {/* sales pipeline */}

//         {/* ROI */}
//         <div className="w-[100%] mt-16 p-5 flex justify-center">
//           <div className="w-[90%]">
//             <div className="flex gap-10 item-center">
//               <div className="flex gap-1 items-center mb-4 font-bold text-2xl">
//                 <img src="/images/logozero.png" className="h-6 w-6 " />
//                 <h3 className="text-white">ROI</h3>
//                 <div className="flex items-center ml-6  justify-around gap-3 ">
//                   <Select
//                     value={"India"}
//                     // className="h-10 bg-black text-white text-[14px] "
//                     sx={{
//                       height: "30px",
//                       bgcolor: "black",
//                       color: "white",
//                       fontSize: "14px",
//                     }}
//                     IconComponent={(props) => (
//                       <ArrowDropDownIcon
//                         {...props}
//                         style={{ color: "#80FF00" }}
//                       />
//                     )}
//                   >
//                     <MenuItem value="India">Overall (team)</MenuItem>
//                     <MenuItem value="Pakistan">Alin Anto</MenuItem>
//                     <MenuItem value="Pakistan">Jissmon George</MenuItem>
//                     <MenuItem value="Pakistan">Annam Giri</MenuItem>
//                     <MenuItem value="Pakistan">Joy Sony</MenuItem>
//                     <MenuItem value="Pakistan">Adarsh Shetty</MenuItem>
//                   </Select>
//                 </div>
//               </div>
//             </div>
//             <div className="grid grid-cols-12 gap-12">
//               <div className="col-span-4 mt-6 flex flex-col gap-4">
//                 <h3 className="text-white text-lg mb-4">
//                   Team <b>ROI</b> Breakdown
//                 </h3>
//                 <ROIPieChart />
//               </div>
//               <div className="col-span-4 mt-6 flex flex-col gap-4">
//                 <div className="m-6 bg-[#03383D] rounded-lg">
//                   {ROIData.map((data, index) => (
//                     <ROIItem
//                       key={index}
//                       title={data.title}
//                       value={data.value}
//                     />
//                   ))}
//                   <Box className="roi-item flex items-center w-[100%]  justify-between p-3">
//                     <h3 className="text-white text-md font-bold">ROI</h3>
//                     <h3 className="text-[#80FF00] text-md font-bold">200%</h3>
//                   </Box>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         {/* ROI */}
//       </div>
//     </>
//   );
// };

// export default MapShow;

// // Performance data and item components
// interface PerformanceData {
//   name: string;
//   team: string;
//   amount: string;
//   count: string;
// }

// interface PerformanceItemProps {
//   data: PerformanceData;
//   type: string; // Add type to the interface
// }

// const PerformanceItem: React.FC<PerformanceItemProps> = ({ data, type }) => {
//   return (
//     <div
//       className="flex items-center justify-between gap-3 py-1 text-sm"
//       style={{
//         borderBottom: ".1px dashed white",
//       }}
//     >
//       <h1>{data.name}</h1>
//       <h1>{data.team}</h1>
//       <h1
//         className={`${
//           type === "needs attention"
//             ? "text-[#E03030]"
//             : type === "slow sellers"
//             ? "text-[#FF9A02]"
//             : "text-[#80FF00] "
//         }`}
//       >
//         ₹{data.amount}
//       </h1>
//       <span
//         className={`${
//           type === "needs attention"
//             ? "text-[#E03030]"
//             : type === "slow sellers"
//             ? "text-[#FF9A02]"
//             : "text-[#80FF00] "
//         } bg-gradient-to-b p-3 from-[#011719] shadow-2xl  bg-opacity-0  backdrop-blur-sm rounded-md`}
//       >
//         {data.count}
//       </span>
//     </div>
//   );
// };

// const TeamPerformanceItem: React.FC<{
//   data: TeamPerformanceProps;
//   index: number;
// }> = ({ data, index }) => {
//   const { name, total, current, percentage, status } = data;
//   return (
//     <div className="col-span-4 relative  rounded-lg bg-gradient-to-b  py-6 px-3 w-[100%] from-[#011719] shadow-2xl  bg-opacity-0  backdrop-blur-sm ">
//       <div className="absolute flex top-2 right-2 bg-[#204244] rounded-lg w-7 h-5  justify-center items-center">
//         <p className="text-[#80FF00] text-sm">{index}</p>
//       </div>
//       <div className="absolute flex top-[50%] right-[-7px] bg-black text-white rounded-[50%] w-5 h-5  justify-center items-center">
//         <ArrowRightAltIcon sx={{ fontSize: "14px" }} />
//       </div>
//       <div className="flex items-baseline gap-2 mb-1 mt-3">
//         <h1 className="text-[#fff] text-md">{name}</h1>
//       </div>
//       <div className="flex item center gap-1 mb-1 mt-3 ">
//         <h1
//           className={`${
//             status === "high" ? "text-[#80FF00]" : "text-[#E03030]"
//           } text-md`}
//         >
//           {percentage}%
//         </h1>
//         <h1 className="text-[#C4C4C4] text-md">Target status</h1>
//         {status === "high" ? (
//           <ArrowUpwardIcon fontSize="small" sx={{ color: "#80FF00" }} />
//         ) : (
//           <ArrowDownwardIcon fontSize="small" sx={{ color: "#E03030" }} />
//         )}
//       </div>
//       <ProgressBar progression={percentage} width={95} />
//       <div className="flex justify-between w-[95%] mt-1">
//         <h1
//           className={`${
//             status === "high" ? "text-[#80FF00]" : "text-[#E03030]"
//           } text-md`}
//         >
//           ₹{current}
//         </h1>
//         <h1 className="text-[#C4C4C4] text-md">₹{total}</h1>
//       </div>
//       <div
//         className="flex justify-between w-[95%] text-sm mt-5 pt-1 text-white"
//         // style={{ borderTop: "1px dashed white" }}
//       >
//         <h1 className="font-[200]">No of visit happen in july</h1>
//         <h1>{data.noOfVisit}</h1>
//       </div>
//       <div className="flex justify-between w-[95%] mt-3 text-sm text-white">
//         <h1 className="font-[200]">No of demo fixed</h1>
//         <h1>{data.demoFixed}</h1>
//       </div>
//       <div className="flex justify-between w-[95%] text-sm mt-3 text-white">
//         <h1 className="font-[200]">Demo done</h1>
//         <h1>{data.demoDone}</h1>
//       </div>
//       <div className="flex justify-between w-[95%] text-sm  mt-3 text-white">
//         <h1 className="font-[200]">Demo scheduled for this month</h1>
//         <h1>{data.demoScheduled}</h1>
//       </div>
//       <div className="flex justify-between w-[95%] text-sm mt-3 text-white">
//         <h1 className="font-[200]">Meeting transfered to Manager</h1>
//         <h1>{data.transferToManager}</h1>
//       </div>
//       <div className="flex justify-between w-[95%] text-sm mt-3 text-white">
//         <h1 className="font-[200]">Reference Collected</h1>
//         <h1>{data.referenceCollected}</h1>
//       </div>
//       <div className="flex justify-between w-[95%] text-sm mt-3 text-white">
//         <h1 className="font-[200]">Projection</h1>
//         <h1 className="text-[#80FF00]">₹{data.projection}</h1>
//       </div>
//       <div className="flex justify-between w-[95%] text-sm mt-3 text-white">
//         <h1 className="font-[200]">Place</h1>
//         <h1>{data.place}</h1>
//       </div>
//     </div>
//   );
// };

// const ROIItem: React.FC<ROIItemProps> = ({ title, value }) => {
//   return (
//     <Box
//       className="roi-item flex items-center w-[100%]  justify-between p-3"
//       sx={{ borderBottom: "1px solid #787878", "&:last-child borderBottom": 0 }}
//     >
//       <h3 className="text-white text-sm">{title}</h3>
//       <h3 className="text-[#4D9900] text-sm">{value}</h3>
//     </Box>
//   );
// };

// import React from 'react'

// function page() {
//   return (
//     <div>page</div>
//   )
// }

// export default page
