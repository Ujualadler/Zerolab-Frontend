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
  SelectChangeEvent,
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
import "mapbox-gl/dist/mapbox-gl.css";
import "../app/Assets/style/map.css";

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
import axios from "axios";
import { baseURL } from "@/Constants/constants";
import { fetchLeads } from "@/Service/services";

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

interface IFeature {
  _id: string;
  name: string;
  price: string;
  __v: number;
}

// Interface for Product
interface IProduct {
  _id: string;
  name: string;
  price: string;
  features: string[]; // Array of ObjectIds referencing Features
  __v: number;
}

// Interface for ProductDetails (within Lead)
interface IProductDetails {
  productId: IProduct | null; // Product can be null
  selectedFeatures: IFeature[]; // Array of Feature objects
  _id: string;
}
interface ILead {
  _id: string;
  phone: number;
  mobile: number;
  email: string;
  status: string;
  currentVendor: string;
  items: any[]; // Assuming items is an array of any type
  cordinates: number[]; // Assuming coordinates are an array of numbers [latitude, longitude]
  leadOwner: string;
  leadSource: string;
  leadQuality: string;
  client: string;
  website: string;
  decisionMaker: string;
  spoc: string;
  street: string;
  leadStatus: string;
  state: string;
  country: string;
  dealValue: number;
  city: string;
  district: string;
  zipCode: string;
  board: string;
  products: IProductDetails[]; // Array of ProductDetails
  noOfStudents: number;
  assignedTo: string;
  assignmentDate: string;
  __v: number;
}

interface StateType {
  name: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

interface CoordinateType {
  latitude: number;
  longitude: number;
}

interface ProgressBarProps {
  value: number;
  text?: string;
}

const stateArray: StateType[] = [
  {
    name: "Andhra Pradesh",
    coordinates: {
      latitude: 15.9129,
      longitude: 79.74,
    },
  },
  {
    name: "Arunachal Pradesh",
    coordinates: {
      latitude: 28.218,
      longitude: 94.7278,
    },
  },
  {
    name: "Assam",
    coordinates: {
      latitude: 26.2006,
      longitude: 92.9376,
    },
  },
  {
    name: "Bihar",
    coordinates: {
      latitude: 25.0961,
      longitude: 85.3131,
    },
  },
  {
    name: "Chhattisgarh",
    coordinates: {
      latitude: 21.2787,
      longitude: 81.8661,
    },
  },
  {
    name: "Goa",
    coordinates: {
      latitude: 15.2993,
      longitude: 74.124,
    },
  },
  {
    name: "Gujarat",
    coordinates: {
      latitude: 22.2587,
      longitude: 71.1924,
    },
  },
  {
    name: "Haryana",
    coordinates: {
      latitude: 29.0588,
      longitude: 76.0856,
    },
  },
  {
    name: "Himachal Pradesh",
    coordinates: {
      latitude: 31.1048,
      longitude: 77.1734,
    },
  },
  {
    name: "Jharkhand",
    coordinates: {
      latitude: 23.6102,
      longitude: 85.2799,
    },
  },
  {
    name: "Karnataka",
    coordinates: {
      latitude: 15.3173,
      longitude: 75.7139,
    },
  },
  {
    name: "Kerala",
    coordinates: {
      latitude: 10.8505,
      longitude: 76.2711,
    },
  },
  {
    name: "Madhya Pradesh",
    coordinates: {
      latitude: 22.9734,
      longitude: 78.6569,
    },
  },
  {
    name: "Maharashtra",
    coordinates: {
      latitude: 19.7515,
      longitude: 75.7139,
    },
  },
  {
    name: "Manipur",
    coordinates: {
      latitude: 24.6637,
      longitude: 93.9063,
    },
  },
  {
    name: "Meghalaya",
    coordinates: {
      latitude: 25.467,
      longitude: 91.3662,
    },
  },
  {
    name: "Mizoram",
    coordinates: {
      latitude: 23.1645,
      longitude: 92.9376,
    },
  },
  {
    name: "Nagaland",
    coordinates: {
      latitude: 26.1584,
      longitude: 94.5624,
    },
  },
  {
    name: "Odisha",
    coordinates: {
      latitude: 20.9517,
      longitude: 85.0985,
    },
  },
  {
    name: "Punjab",
    coordinates: {
      latitude: 31.1471,
      longitude: 75.3412,
    },
  },
  {
    name: "Rajasthan",
    coordinates: {
      latitude: 27.0238,
      longitude: 74.2179,
    },
  },
  {
    name: "Sikkim",
    coordinates: {
      latitude: 27.533,
      longitude: 88.5122,
    },
  },
  {
    name: "Tamil Nadu",
    coordinates: {
      latitude: 11.1271,
      longitude: 78.6569,
    },
  },
  {
    name: "Telangana",
    coordinates: {
      latitude: 18.1124,
      longitude: 79.0193,
    },
  },
  {
    name: "Tripura",
    coordinates: {
      latitude: 23.9408,
      longitude: 91.9882,
    },
  },
  {
    name: "Uttar Pradesh",
    coordinates: {
      latitude: 26.8467,
      longitude: 80.9462,
    },
  },
  {
    name: "Uttarakhand",
    coordinates: {
      latitude: 30.0668,
      longitude: 79.0193,
    },
  },
  {
    name: "West Bengal",
    coordinates: {
      latitude: 22.9868,
      longitude: 87.855,
    },
  },
  {
    name: "Andaman and Nicobar Islands",
    coordinates: {
      latitude: 11.7401,
      longitude: 92.6586,
    },
  },
  {
    name: "Chandigarh",
    coordinates: {
      latitude: 30.7333,
      longitude: 76.7794,
    },
  },
  {
    name: "Dadra and Nagar Haveli and Daman and Diu",
    coordinates: {
      latitude: 20.1809,
      longitude: 73.0169,
    },
  },
  {
    name: "Lakshadweep",
    coordinates: {
      latitude: 10.5667,
      longitude: 72.6411,
    },
  },
  {
    name: "Delhi",
    coordinates: {
      latitude: 28.7041,
      longitude: 77.1025,
    },
  },
  {
    name: "Puducherry",
    coordinates: {
      latitude: 11.9416,
      longitude: 79.8083,
    },
  },
];

interface DateRange {
  startDate: Date;
  endDate: Date;
  key: string;
}

type topPerformanceType = {
  name: string;
  team: string;
  amount: string;
  count: string;
};

type QueryParams = {
  from: Date; // Changed from string to Date
  to: Date; // Changed from string to Date
  state: string;
  status: string;
  strength: string;
  dealValue: string;
};

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
  const [strengthFilter, setStrengthFilter] = useState<boolean>(false);
  const [dealValueFilter, setDealValueFilter] = useState<boolean>(false);
  const [targetFilter, setTargetFilter] = useState<string>("");
  const [source, setSource] = useState<any>("");
  const [leadData, setLeadData] = useState<ILead[]>([]);
  const [salesRepData, setSalesRepData] = useState<any>([]);
  const [leadStatusCounts, setLeadStatusCounts] = useState<any>([]);
  const [salesPipelineLeadData, setSalesPipelineLeadData] = useState<ILead[]>(
    []
  );
  const [teamPerformanceLeadData, setTeamPerformanceLeadData] = useState<
    ILead[]
  >([]);
  const [targetCounts, setTargetCounts] = useState<any>({});
  const [targetValue, setTargetValue] = useState<any>({});
  const [selectedState, setSelectedState] = React.useState<StateType | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [salesPipelineTeam, setSalesPipelineTeam] = useState<string>("");
  const [selectedLeadId, setSelectedleadId] = useState<string>("");

  const [circularDate, setCircularDate] = useState<DateRange>({
    startDate: new Date(new Date().setMonth(new Date().getMonth() - 6)),
    endDate: new Date(),
    key: "selection",
  });
  const [mainDate, setMainDate] = useState<DateRange>({
    startDate: new Date(new Date().setMonth(new Date().getMonth() - 12)),
    endDate: new Date(),
    key: "selection",
  });
  const [teamDate, setTeamDate] = useState<DateRange>({
    startDate: new Date(new Date().setMonth(new Date().getMonth() - 12)),
    endDate: new Date(),
    key: "selection",
  });

  const [queryParams, setQueryParams] = useState<QueryParams>({
    from: mainDate.startDate, // Set as Date object
    to: mainDate.endDate, // Set as Date object
    state: "",
    status: "",
    strength: "down",
    dealValue: "down",
  });

  const handleToggle = (index: number, url: string) => {
    setActiveToggle(index);
    router.push(url);
  };

  // Initialize the state with proper typing

  // Define your data with type annotation

  const topPerformamnceData: topPerformanceType[] = [
    { name: "Alin", team: "Team A", amount: "17,4545", count: "50" },
    { name: "Alin", team: "Team A", amount: "17,4545", count: "50" },
    { name: "Alin", team: "Team A", amount: "17,4545", count: "50" },
    { name: "Alin", team: "Team A", amount: "17,4545", count: "50" },
  ];

  //   {
  //     company: "Entab",
  //     coordinates: [
  //       { latitude: "25.343", longitude: "71.111" },
  //       { latitude: "31.347", longitude: "75.112" },
  //       { latitude: "21.348", longitude: "75.134" },
  //       { latitude: "31.1471", longitude: "76.3412" },
  //       { latitude: "32.1471", longitude: "77.3412" },
  //       { latitude: "23.1471", longitude: "71.3412" },
  //       { latitude: "24.1471", longitude: "72.3412" },
  //       { latitude: "25.1471", longitude: "73.3412" },
  //       { latitude: "26.1471", longitude: "76.3412" },
  //       { latitude: "27.1471", longitude: "73.3412" },
  //       { latitude: "24.1471", longitude: "72.3412" },
  //       { latitude: "10.1632", longitude: "76.6413" },
  //       { latitude: "11.8745", longitude: "75.7804" },
  //       { latitude: "19.0861", longitude: "82.0188" },
  //       { latitude: "26.9124", longitude: "75.7873" },
  //       { latitude: "31.1048", longitude: "77.1734" },
  //       { latitude: "27.2412", longitude: "79.0609" },
  //       { latitude: "", longitude: "" },
  //       { latitude: "", longitude: "" },
  //     ],
  //   },
  //   {
  //     company: "Next",
  //     coordinates: [
  //       { latitude: "24.343", longitude: "72.111" },
  //       { latitude: "23.34545", longitude: "72.125" },
  //       { latitude: "26.348", longitude: "75.134" },
  //       { latitude: "22.7196", longitude: "75.8577" },
  //       { latitude: "16.5062", longitude: "16.5062" }, // Corrected the longitude format
  //       { latitude: "17.6868", longitude: "83.2185" },
  //       { latitude: "19.0760", longitude: "72.8777" },
  //     ],
  //   },
  // ];
  const [geojsonData, setGeojsonData] = useState<
    FeatureCollection<Point, GeoJsonProperties>
  >({
    type: "FeatureCollection",
    features: [],
  });

  useEffect(() => {
    async function getLeads() {
      try {
        const data = await fetchLeads(queryParams);
        console.log(data);
        setLeadData(data.data);
        setSalesPipelineLeadData(data.data);
        setTeamPerformanceLeadData(data.data);
        setTargetCounts(data.targetCounts);
        setTargetValue(data.targetValue);
        setLeadStatusCounts(data.leadStatusCounts);
      } catch (error) {
        console.error("Failed to fetch leads:", error);
      }
    }
    getLeads();
  }, [queryParams]);

  useEffect(() => {
    setQueryParams((prev) => ({
      ...prev,
      from: mainDate.startDate,
      to: mainDate.endDate,
    }));
  }, [mainDate]);

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
        id: "data-points",
        type: "circle",
        source: "salesData",
        paint: {
          "circle-radius": 8,
          "circle-color": [
            "case",
            ["==", ["get", "leadStatus"], "Closed"], // Check if leadStatus is 'closed'
            "#68ac25", // Green color for closed leads
            "#fff", // Default color
          ],
        },
      });

      const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
        offset: 25,
      });

      map.on("mouseenter", "data-points", (e) => {
        if (!e.features || !e.features[0]) return;

        const feature = e.features[0];
        if (feature.geometry.type === "Point") {
          const coordinates = (feature.geometry as any).coordinates.slice();
          const leadStatus = feature.properties?.leadStatus;
          const company =
            leadStatus === "Closed"
              ? "Entab Infotech"
              : feature.properties?.company;
          const client = feature.properties?.client;
          const count = feature.properties?.count;
          const dealValue = feature.properties?.dealValue;

          popup
            .setLngLat(coordinates as [number, number])
            .setHTML(
              `<div style="font-family: Arial, sans-serif; font-size: 12px; padding:10px; max-width: 200px; background: black; border-radius: 10px; color: #fff;">
                <h4 style="margin: 0; font-size: 14px;color:#68ac25">${client}</h4>
                <p style="margin: 5px 0;"><strong>Current Vendor:</strong> ${company}</p>
                <p style="margin: 5px 0;"><strong>Strength:</strong> ${count}</p>
                <p style="margin: 5px 0;"><strong>Lead Status:</strong> ${leadStatus}</p>
                <p style="margin: 5px 0;"><strong>Deal Value:</strong> ₹${dealValue}</p>
              </div>`
            )
            .addTo(map);
        }

        map.getCanvas().style.cursor = "pointer";
      });

      map.on("mouseleave", "data-points", () => {
        popup.remove();
        map.getCanvas().style.cursor = "";
      });

      map.addControl(
        new mapboxgl.NavigationControl({ showCompass: false }),
        "top-right"
      );

      mapRef.current = map;
      const source = mapRef?.current.getSource("salesData");
      setSource(source);
    });

    return () => map.remove();
  }, []);

  useEffect(() => {
    // Update the geojsonData state whenever leadData changes
    const updatedGeojsonData: FeatureCollection<Point, GeoJsonProperties> = {
      type: "FeatureCollection",
      features: leadData.map((item) => ({
        type: "Feature",
        properties: {
          company: item.currentVendor,
          client: item.client,
          leadStatus: item.leadStatus,
          count: item.noOfStudents,
          dealValue: item.dealValue,
        },
        geometry: {
          type: "Point",
          coordinates: [
            item.cordinates[0], // Latitude
            item.cordinates[1], // Longitude
          ],
        },
      })),
    };

    setGeojsonData(updatedGeojsonData);
  }, [leadData]);

  console.log(leadData);

  useEffect(() => {
    // if (
    //   mapRef.current &&
    //   mapRef.current.isStyleLoaded() &&
    //   geojsonData.features.length > 0
    // ) {
    //   console.log(geojsonData)
    //   const source = mapRef?.current.getSource("salesData");
    console.log(source);
    if (source) {
      (source as mapboxgl.GeoJSONSource).setData(geojsonData);
    }
    // }
  }, [geojsonData, source]);

  useEffect(() => {
    async function getSalesRepLeads() {
      try {
        const res = await axios.get(`${baseURL}/salesRep`);
        console.log(res.data);
        setSalesRepData(res.data.data);
      } catch (error) {
        console.error("Failed to fetch leads:", error);
      }
    }

    getSalesRepLeads();
  }, []);

  console.log(salesRepData);

  // Handle input change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

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
        essential: true,
      });
    }
  };

  const handleStateClick = (latitude: number, longitude: number) => {
    if (mapRef.current) {
      mapRef.current.flyTo({
        center: [longitude, latitude],
        zoom: 6.5,
        essential: true,
      });
    }
  };

  const handleStateChange = (event: SelectChangeEvent<string>) => {
    const selectedValue =
      stateArray.find((state) => state.name === event.target.value) || null;

    if (selectedValue) {
      setQueryParams((prev) => ({
        ...prev,
        state: selectedValue.name,
      }));

      handleStateClick(
        selectedValue.coordinates.latitude,
        selectedValue.coordinates.longitude
      );
      setSelectedState(selectedValue);
    } else {
      console.warn("Selected state not found");
      setSelectedState(null);
      setQueryParams((prev) => ({
        ...prev,
        state: "",
      }));
    }
  };

  const handleNoOfStudentClick = () => {
    setStrengthFilter(!strengthFilter);

    setQueryParams((prev) => ({
      ...prev,
      dealValue: "",
    }));

    if (!strengthFilter === true) {
      setQueryParams((prev) => ({
        ...prev,
        strength: "up",
      }));
    } else {
      setQueryParams((prev) => ({
        ...prev,
        strength: "down",
      }));
    }
  };

  const handleDealvalueClick = () => {
    setDealValueFilter(!dealValueFilter);

    setQueryParams((prev) => ({
      ...prev,
      strength: "",
    }));

    if (!dealValueFilter === true) {
      setQueryParams((prev) => ({
        ...prev,
        dealValue: "up",
      }));
    } else {
      setQueryParams((prev) => ({
        ...prev,
        dealValue: "down",
      }));
    }
  };

  const handleTargetClick = (event: SelectChangeEvent<string>) => {
    setTargetFilter(event.target.value);

    setQueryParams((prev) => ({
      ...prev,
      status: event.target.value,
    }));
  };

  const handleDateClick = () => {
    setQueryParams((prev) => ({
      ...prev,
      from: mainDate.startDate,
      to: mainDate.endDate,
    }));
  };

  const handleFilterChange = (teamMember: string, status: string) => {
    let filteredData = leadData;

    if (teamMember === "") {
      setSalesPipelineLeadData(leadData); // Show all data if the selection is empty
    } else if (teamMember === "Alin Anto") {
      filteredData = leadData.filter((data) => data.assignedTo === "Alin Anto");
    } else {
      filteredData = leadData.filter((data) => data.assignedTo === teamMember);
    }

    if (status && status !== "Lead Generation") {
      filteredData = filteredData.filter((data) => data.leadStatus === status);
    }

    setSalesPipelineLeadData(filteredData);
  };

  const handleSalesPipeline = (e: SelectChangeEvent<string>) => {
    setSalesPipelineTeam(e.target.value);

    handleFilterChange(e.target.value, showTable);
  };

  const handlePipelineClick = (status: string) => {
    setShowTable(status);
    handleFilterChange(salesPipelineTeam, status);
  };
  
  function calculateLeadStatusPercentage(targetStatus: string) {
    // Find the counts for the target status and the base status
    const baseCount = leadData.length;
    const targetCount =
      leadStatusCounts.find((data: any) => data._id === targetStatus)?.count ||
      0;

    // Calculate the percentage, avoiding division by zero
    const percentage = baseCount !== 0 ? (targetCount / baseCount) * 100 : 0;

    return percentage;
  }

  const handleSingleLeadClick = (id: string) => {
    setSelectedleadId(id);
    setShowLeadDetails(true);
  };

  console.log(
    (leadStatusCounts?.filter((data: any) => data._id === "Qualification")
      .count /
      leadStatusCounts.filter((data: any) => data._id === "Lead Generation")
        .count) *
      100
  );

  return (
    <>
      {addLeads && <LeadAdding open={addLeads} show={setAddLeads} />}
      {showBoard && <KanbanBoard open={showBoard} show={setShowBoard} />}
      {showLeadDetails && selectedLeadId && (
        <LeadDetails
          show={setShowLeadDetails}
          open={showLeadDetails}
          id={selectedLeadId}
        />
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
          <div className="flex items-center mt-4 justify-between gap-1 p-4  w-[100%] ">
            <Select
              value={selectedState?.name || ""} // Use state name or an empty string if none selected
              onChange={handleStateChange}
              sx={{
                height: "30px",
                bgcolor: "black",
                color: "white",
                fontSize: "14px",
              }}
              IconComponent={(props) => (
                <ArrowDropDownIcon {...props} style={{ color: "#80FF00" }} />
              )}
              displayEmpty
            >
              {/* Optionally, include a placeholder item */}

              <MenuItem value="" onClick={handleResetMap}>
                All states
              </MenuItem>

              {stateArray.map((data) => (
                <MenuItem key={data.name} value={data.name}>
                  {data.name}
                </MenuItem>
              ))}
            </Select>
            <Button
              onClick={handleNoOfStudentClick}
              endIcon={
                <IconButton
                  size="small"
                  sx={{
                    color: "#80FF00",
                    height: "10px",
                    width: "14px",
                    transform: !strengthFilter
                      ? "rotate(180deg)"
                      : "rotate(0deg)",
                    transition: "transform 0.3s ease", // Added transition effect
                  }}
                >
                  <ArrowUpwardIcon sx={{ fontSize: "1rem" }} />
                </IconButton>
              }
              sx={{
                bgcolor: "black",
                height: "30px",
                color: "white",
                fontSize: "14px",
                textTransform: "none",
              }}
            >
              No of Student
            </Button>
            <Button
              onClick={handleDealvalueClick}
              endIcon={
                <IconButton
                  size="small"
                  sx={{
                    color: "#80FF00",
                    height: "10px",
                    width: "14px",
                    transform: !dealValueFilter
                      ? "rotate(180deg)"
                      : "rotate(0deg)",
                    transition: "transform 0.3s ease", // Added transition effect
                  }}
                >
                  <ArrowUpwardIcon sx={{ fontSize: "1rem" }} />
                </IconButton>
              }
              sx={{
                bgcolor: "black",
                height: "30px",
                color: "white",
                fontSize: "14px",
                textTransform: "none",
              }}
            >
              Deal Value
            </Button>
            <Select
              value={targetFilter || ""}
              onChange={handleTargetClick}
              sx={{
                height: "30px",
                bgcolor: "black",
                color: "white",
                fontSize: "14px",
              }}
              IconComponent={(props) => (
                <ArrowDropDownIcon {...props} style={{ color: "#80FF00" }} />
              )}
              displayEmpty
            >
              <MenuItem value="">All Leads</MenuItem>
              <MenuItem value="target">Target</MenuItem>
              <MenuItem value="closed">Closed</MenuItem>
            </Select>
          </div>
          <div className="w-[100%] flex px-4 mb-2">
            {" "}
            <TextField
              value={searchQuery}
              onChange={handleSearchChange}
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
            height={"48vh"}
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
            {leadData.length > 0 ? (
              leadData?.map((data, index) => (
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
                      <h6
                        onClick={() => handleSingleLeadClick(data._id)}
                        className="text-[14px] max-w-[200px] cursor-pointer"
                      >
                        {data.client}
                      </h6>
                    </div>
                    <div className="flex gap-5">
                      <div className="flex flex-col items-start gap-1">
                        <div className="flex   items-center gap-2">
                          <h6 className="text-[14px] text-[#80FF00]">
                            {data?.noOfStudents}
                          </h6>
                          <h6 className="text-[12px] text-gray-400">
                            Students
                          </h6>
                        </div>
                        <h6 className="text-[12px] text-gray-400">
                          {data.state}
                        </h6>
                      </div>
                      <div className="flex flex-col items-start gap-1">
                        <h6 className="text-[13px] text-[#80FF00]">
                          ₹{data?.dealValue}
                        </h6>
                        <h6 className="text-[12px] text-gray-400">
                          Deal Value
                        </h6>
                      </div>
                    </div>
                  </div>
                  <Divider className="bg-gray-500" />
                </>
              ))
            ) : (
              <div className="flex justify-center items-center h-[35vh]">
                <h3 style={{ color: "#80FF00" }}>No Leads To Show</h3>
              </div>
            )}
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
              <MenuItem value="Pakistan">Inside Sales</MenuItem>
            </Select>
          </div>
          <h1 className="text-white text-xl font-[300] ">Good Morning, Alin</h1>
          <div className="rounded-3xl p-2 px-4 flex items-center gap-4 bg-[#204244]">
            <DateSelection
              dates={mainDate}
              setDates={setMainDate}
              mainDate={handleDateClick}
            />
            <div className="flex items-center gap-1 ">
              <span className="rounded-[50%] h-2 w-2 bg-[#80FF00]"></span>
              <h1 className="text-[#80FF00] text-[12px]">
                {targetCounts.closed}
              </h1>
              <h1 className="text-[#C4C4C4] text-[12px]">Closed</h1>
            </div>
            {/* <div className="flex items-center gap-1">
              <span className="rounded-[50%] h-2 w-2 bg-[#E53939]"></span>
              <h1 className="text-[#E53939] text-[12px]">94</h1>
              <h1 className="text-[#C4C4C4] text-[12px]">Not Closed</h1>
            </div> */}
            <div className="flex items-center gap-1">
              <span className="rounded-[50%] h-2 w-2 bg-[#fff]"></span>
              <h1 className="text-[#fff] text-[12px]">{targetCounts.target}</h1>
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
              <h1 className="text-[#80FF00] text-2xl">
                ₹{targetValue?.closed}
              </h1>
              <div className="flex item center gap-2 mt-2">
                <h1 className="text-[#80FF00] text-lg">34%</h1>
                <h1 className="text-[#C4C4C4] text-md">Increased</h1>
              </div>
              <h1 className="text-[#C4C4C4] text-md mt-2">2023-2024</h1>
            </div>
            <div className="absolute bottom-[-25px] right-[0px] p-3  bg-[#204244] rounded-lg">
              <div className="flex item center gap-1">
                <h1 className="text-[#80FF00] text-sm">
                  {targetCounts?.closed}
                </h1>
                <h1 className="text-[#C4C4C4] text-sm">Schools</h1>
              </div>
              <h1 className="text-[#C4C4C4] text-xs  mt-[2px]">Closed</h1>
            </div>
          </div>
          <div className="mt-10 w-[100%]">
            <div className="flex item center gap-1 mb-1 ">
              <h1 className="text-[#80FF00] text-sm">
                {Math.round(
                  (targetValue?.closed / targetValue?.target) * 100 * 10
                ) / 10}
                %
              </h1>
              <h1 className="text-[#C4C4C4] text-sm">Total target status</h1>
            </div>
            <ProgressBar
              progression={(targetValue?.closed / targetValue?.target) * 100}
              width={100}
            />
            <div className="flex justify-between w-[100%] mt-1">
              <h1 className="text-[#80FF00] text-xs">₹{targetValue?.closed}</h1>
              <h1 className="text-[#C4C4C4] text-xs">₹{targetValue?.target}</h1>
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
                {/* <DateSelection
                  dates={circularDate}
                  setDates={setCircularDate}
                /> */}
              </div>
            </div>
            <div className="grid grid-cols-12 gap-10 mt-10">
              <div className="col-span-8">
                <div className="col-span-12">
                  <div className="flex items-baseline gap-1 mb-1 ">
                    <h1 className="text-[#80FF00] text-2xl">
                      ₹{targetValue?.closed}
                    </h1>
                    <h1 className="text-[#fff] text-xl">Team A</h1>
                  </div>
                  <div className="flex gap-2 items-baseline">
                    <ProgressBar
                      progression={
                        (targetValue?.closed / targetValue?.target) * 100
                      }
                      width={80}
                    />
                    <h1 className="text-[#80FF00] text-xl">
                      {Math.round(
                        (targetValue?.closed / targetValue?.target) * 100 * 10
                      ) / 10}
                      %
                    </h1>
                  </div>
                  <div className="flex justify-end w-[80%] ">
                    <h1 className="text-[#C4C4C4] text-xl">
                      ₹{targetValue?.target}
                    </h1>
                  </div>
                </div>
                <div className="col-span-12 gap-10 grid grid-cols-12 mt-10">
                  {salesRepData.length > 0 &&
                    salesRepData?.map((data: any, index: any) => (
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
                  <h1 className="text-lg font-bold my-3">LeaderBoard</h1>
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
                    value={salesPipelineTeam}
                    onChange={handleSalesPipeline}
                    displayEmpty
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
                    <MenuItem value="">Overall (team)</MenuItem>
                    <MenuItem value="Alin Anto">Alin Anto</MenuItem>
                    <MenuItem value="Jissmon George">Jissmon George</MenuItem>
                    <MenuItem value="Annam Giri">Annam Giri</MenuItem>
                    <MenuItem value="Adarsh Shetty">Adarsh Shetty</MenuItem>
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
                      onClick={() => handlePipelineClick("Lead Generation")}
                    >
                      <PipelineProgressbar
                        title="Lead Generation"
                        width={100}
                        percentage={100}
                      />
                      {showTable === "Lead Generation" && (
                        <GradeIcon fontSize={"small"} />
                      )}
                    </div>
                    <div
                      className="flex gap-1 items-center cursor-pointer "
                      onClick={() => handlePipelineClick("Qualification")}
                    >
                      <PipelineProgressbar
                        title="Qualification & Initial Contact"
                        width={100}
                        percentage={calculateLeadStatusPercentage(
                          "Qualification"
                        )}
                      />
                      {showTable === "Qualification" && (
                        <GradeIcon fontSize={"small"} />
                      )}
                    </div>
                    <div
                      className="flex gap-1 items-center cursor-pointer "
                      onClick={() => handlePipelineClick("Demo")}
                    >
                      <PipelineProgressbar
                        title="Demo"
                        width={100}
                        percentage={calculateLeadStatusPercentage("Demo")}
                      />
                      {showTable === "Demo" && <GradeIcon fontSize={"small"} />}
                    </div>
                    <div
                      className="flex gap-1 items-center cursor-pointer "
                      onClick={() => handlePipelineClick("Proposal")}
                    >
                      <PipelineProgressbar
                        title="Proposal"
                        width={100}
                        percentage={calculateLeadStatusPercentage("Proposal")}
                      />
                      {showTable === "Proposal" && (
                        <GradeIcon fontSize={"small"} />
                      )}
                    </div>
                    <div
                      className="flex gap-1 items-center cursor-pointer "
                      onClick={() => handlePipelineClick("Negotiation")}
                    >
                      <PipelineProgressbar
                        title="Negotiation"
                        width={100}
                        percentage={calculateLeadStatusPercentage(
                          "Negotiation"
                        )}
                      />
                      {showTable === "Negotiation" && (
                        <GradeIcon fontSize={"small"} />
                      )}
                    </div>

                    <div className="flex items-center gap-2 w-[100%]">
                      <div
                        className="flex gap-1 items-center cursor-pointer w-[25%]"
                        onClick={() => handlePipelineClick("Closed")}
                      >
                        <PipelineProgressbar
                          title="Closed"
                          width={100}
                          percentage={calculateLeadStatusPercentage("Closed")}
                        />
                      </div>
                      <div
                        className="flex gap-1 items-center cursor-pointer w-[25%] "
                        onClick={() => handlePipelineClick("hold")}
                      >
                        <PipelineProgressbar
                          title="hold"
                          width={100}
                          percentage={calculateLeadStatusPercentage("hold")}
                        />
                      </div>
                      <div
                        className="flex gap-1 items-center cursor-pointer w-[25%]"
                        onClick={() => handlePipelineClick("Rejected")}
                      >
                        <PipelineProgressbar
                          title="Rejected"
                          width={100}
                          percentage={calculateLeadStatusPercentage("Rejected")}
                        />
                      </div>
                      <div
                        className="flex gap-1 items-center cursor-pointer w-[25%]"
                        onClick={() => handlePipelineClick("Retention")}
                      >
                        <PipelineProgressbar
                          title="Retention"
                          width={100}
                          percentage={calculateLeadStatusPercentage(
                            "Retention"
                          )}
                        />
                      </div>
                    </div>
                  </>
                )}
                {activePipeline === "upselling" && (
                  <>
                    <div
                      className="flex gap-1 items-center cursor-pointer "
                      onClick={() => handlePipelineClick("Demo")}
                    >
                      <PipelineProgressbar
                        title="Demo"
                        width={100}
                        percentage={60}
                      />
                      {showTable === "Demo" && <GradeIcon fontSize={"small"} />}
                    </div>
                    <div
                      className="flex gap-1 items-center cursor-pointer "
                      onClick={() => handlePipelineClick("Proposal")}
                    >
                      <PipelineProgressbar
                        title="Proposal"
                        width={100}
                        percentage={50}
                      />
                      {showTable === "Proposal" && (
                        <GradeIcon fontSize={"small"} />
                      )}
                    </div>
                    <div
                      className="flex gap-1 items-center cursor-pointer "
                      onClick={() => handlePipelineClick("Negotiation")}
                    >
                      <PipelineProgressbar
                        title="Negotiation"
                        width={100}
                        percentage={40}
                      />
                      {showTable === "Negotiation" && (
                        <GradeIcon fontSize={"small"} />
                      )}
                    </div>
                    <div
                      className="flex gap-1 items-center cursor-pointer"
                      onClick={() => handlePipelineClick("Closure")}
                    >
                      <PipelineProgressbar
                        title="Closure"
                        width={100}
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
                  leadData={salesPipelineLeadData}
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

interface TeamPerformanceItemProps {
  data: any;
  index: number; // Add type to the interface
}

const TeamPerformanceItem: React.FC<TeamPerformanceItemProps> = ({
  data,
  index,
}) => {
  const status = data.status; // Access status from data

  console.log(data);
  return (
    <div className="col-span-4 relative rounded-lg bg-gradient-to-b py-6 px-3 w-[100%] from-[#011719] shadow-2xl bg-opacity-0 backdrop-blur-sm">
      <div className="absolute flex top-2 right-2 bg-[#204244] rounded-lg p-1  justify-center px-3 gap-2 items-center">
        <h1 className="text-xs text-white">No of Leads</h1>
        <p className="text-[#80FF00] text-sm">{data?.data.length}</p>
      </div>
      <div className="absolute flex top-[50%] right-[-7px] bg-black text-white rounded-[50%] w-5 h-5 justify-center items-center">
        <ArrowRightAltIcon sx={{ fontSize: "14px" }} />
      </div>
      <div className="flex items-baseline gap-2 mb-1 mt-3">
        {/* <h1 className="text-[#80FF00] text-md">₹78,6545</h1> */}
        <h1 className="text-[#fff] text-sm">{data?.name}</h1>
      </div>
      <div className="flex item-center gap-1 mb-1 mt-3">
        <h1
          className={`${
            (data?.achievedTarget / data?.target) * 100 > 50
              ? "text-[#80FF00]"
              : "text-[#E03030]"
          } text-sm`}
        >
          {" "}
          {Math.round((data?.achievedTarget / data?.target) * 100 * 10) / 10}%
        </h1>
        <h1 className="text-[#C4C4C4] text-sm">Target status</h1>
        {(data?.achievedTarget / data?.target) * 100 > 50 ? (
          <ArrowUpwardIcon fontSize="small" sx={{ color: "#80FF00" }} />
        ) : (
          <ArrowDownwardIcon fontSize="small" sx={{ color: "#E03030" }} />
        )}
      </div>
      <ProgressBar
        progression={(data?.achievedTarget / data?.target) * 100}
        width={95}
      />
      <div className="flex justify-between w-[95%] mt-1">
        <h1
          className={`${
            (data?.achievedTarget / data?.target) * 100 > 50
              ? "text-[#80FF00]"
              : "text-[#E03030]"
          } text-xs`}
        >
          ₹{data?.achievedTarget}
        </h1>
        <h1 className="text-[#C4C4C4] text-xs">₹{data?.target}</h1>
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
