import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import {
  Box,
  Button,
  FormControl,
  Grid,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import Close from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { ProgressBar } from "./ProgressBar"; // Assuming you have this component
import { SlideProps } from "@mui/material";
import LeadDetails from "./LeadDetails";
import { all } from "axios";
import SearchIcon from "@mui/icons-material/Search";
import { ArrowUpward } from "@mui/icons-material";
import { fetchPipeLineLeads } from "@/Service/services";

interface SalesMatrixTableProps {
  type: string;
  scroll: Boolean;
  sHeight: string;
  leadData?: any;
  filter?: any;
  setFilter?: any;
  allData?: any;
  completeData?: any;
  brief?: boolean;

  change: (value: boolean) => void;
}

const SalesMatrixTable: React.FC<SalesMatrixTableProps> = ({
  type,
  scroll,
  sHeight,
  leadData,
  allData,
  change,
  filter,
  setFilter,
  completeData,
  brief,
}) => {
  const tableRef = React.useRef<HTMLDivElement>(null); // Reference to the table container
  const [showDialog, setShowDialog] = React.useState(false);
  const [showLeadDetails, setShowLeadDetails] = React.useState<boolean>(false);
  const [selectedLeadId, setSelectedleadId] = React.useState<string>("");
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [sortField, setSortField] = React.useState<string>("client");
  const [sortOrder, setSortOrder] = React.useState<"asc" | "desc">("asc");
  const [data, setData] = React.useState<any>(leadData);
  const [leadStatusFilter, setLeadStatusFilter] = React.useState<string>(
    filter.status
  );
  const [salesRepFilter, setSalesRepFilter] = React.useState<string>(
    filter.teamMember
  );

  // State to control dialog visibility
  console.log(leadData);
  console.log(allData);

  React.useEffect(() => {
    setData(leadData);
  }, [leadData]);

  // Check scroll position
  const handleScroll = () => {
    if (tableRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = tableRef.current;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 5;
      setShowDialog(isAtBottom);
    }
  };

  const toggleSort = (field: string) => {
    if (sortField === field) {
      setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSingleLeadClick = (id: string) => {
    setSelectedleadId(id);
    setShowLeadDetails(true);
  };

  // Filter leadData based on search query (case-insensitive)
  // Filter leadData based on search query, lead status, and sales rep (case-insensitive)
  const filteredLeads = data.filter((lead: any) => {
    const matchesSearchQuery = Object.values(lead).some((value) => {
      if (typeof value === "string") {
        return value.toLowerCase().includes(searchQuery.toLowerCase());
      }
      if (typeof value === "number") {
        return value === Number(searchQuery);
      }
      return false;
    });

    const matchesLeadStatus = leadStatusFilter
      ? lead.leadStatus === leadStatusFilter
      : true;

    const matchesSalesRep = salesRepFilter
      ? lead.assignedTo === salesRepFilter
      : true;

    return matchesSearchQuery && matchesLeadStatus && matchesSalesRep;
  });

  const sortedLeads = [...filteredLeads].sort((a: any, b: any) => {
    const aValue = a[sortField];
    const bValue = b[sortField];

    if (typeof aValue === "string" && typeof bValue === "string") {
      // Sort strings alphabetically
      return sortOrder === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    } else if (typeof aValue === "number" && typeof bValue === "number") {
      // Sort numbers
      return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
    } else {
      return 0;
    }
  });

  const leadsToDisplay = brief ? sortedLeads.slice(0, 6) : sortedLeads;

  return (
    <Box sx={{ position: "relative", padding: "16px" }}>
      {showLeadDetails && selectedLeadId && (
        <LeadDetails
          change={change}
          show={setShowLeadDetails}
          open={showLeadDetails}
          id={selectedLeadId}
        />
      )}
      {brief !== true && (
        <Box
          width={"100%"}
          display={"flex"}
          justifyContent={"end"}
          alignItems={"center"}
        >
          <TextField
            value={searchQuery}
            onChange={handleSearchChange}
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 4,
                width: "100%",
                mb: 1,
                background: "rgba(12, 80, 101, 0.7)", // Semi-transparent background
                backdropFilter: "blur(10px)",
                height: "40px",
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
        </Box>
      )}

      <TableContainer
        sx={{
          borderRadius: 4,
          maxHeight: scroll ? "370px" : sHeight,
          overflow: "auto",
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
        component={Paper}
        ref={tableRef} // Attach ref to TableContainer
        // onScroll={handleScroll}
      >
        <Table
          sx={{
            minWidth: 650,
            backgroundColor: "#03383D",
            color: "white",
          }}
          aria-label="sales matrix table"
        >
          <TableHead>
            <TableRow>
              <TableCell
                sx={{ color: "white", borderRight: "1px solid #5F5C5C" }}
              >
                <Button
                  sx={{ textTransform: "none", color: "white" }}
                  onClick={() => toggleSort("client")}
                  endIcon={
                    <ArrowUpward
                      sx={{
                        transform:
                          sortField === "client" && sortOrder === "asc"
                            ? "rotate(0deg)"
                            : "rotate(180deg)",
                        transition: "transform 0.3s ease-in-out",
                        color: "#80FF00",
                      }}
                    />
                  }
                >
                  Client
                </Button>
              </TableCell>
              <TableCell
                sx={{ color: "white", borderRight: "1px solid #5F5C5C" }}
                align="left"
              >
                {" "}
                {brief === true ? (
                  "Lead Status"
                ) : (
                  <FormControl fullWidth>
                    <Select
                      value={leadStatusFilter}
                      disableUnderline
                      onChange={(e) => {
                        const value = e.target.value;
                        setLeadStatusFilter(value); // Update the lead status filter state
                        setFilter((prev: any) => ({
                          ...prev,
                          status: value, // Update the filter status in the parent component
                        }));
                      }}
                      displayEmpty
                      variant="standard"
                      sx={{
                        fontSize: "14px",
                        // maxWidth: "100px",
                        color: "white",
                        ".MuiOutlinedInput-notchedOutline": {
                          borderColor: "white",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#80FF00",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#80FF00",
                        },
                        "& .MuiSelect-select": {
                          textDecoration: "none",
                        },
                      }}
                      IconComponent={(props) => (
                        <ArrowDropDownIcon
                          {...props}
                          style={{ color: "#80FF00" }}
                        />
                      )}
                    >
                      <MenuItem value="">All Status</MenuItem>
                      <MenuItem value="Lead Generation">
                        Lead Generation
                      </MenuItem>
                      <MenuItem value="Qualification">Qualification</MenuItem>
                      <MenuItem value="Demo">Demo</MenuItem>
                      <MenuItem value="Proposal">Proposal</MenuItem>
                      <MenuItem value="Negotiation">Negotiation</MenuItem>
                      <MenuItem value="Closed">Closed</MenuItem>
                    </Select>
                  </FormControl>
                )}
              </TableCell>
              <TableCell
                sx={{ color: "white", borderRight: "1px solid #5F5C5C" }}
                align="left"
              >
                Date
              </TableCell>
              <TableCell
                sx={{ color: "white", borderRight: "1px solid #5F5C5C" }}
                align="left"
              >
                <Button
                  sx={{ textTransform: "none", color: "white" }}
                  onClick={() => toggleSort("dealValue")}
                  endIcon={
                    <ArrowUpward
                      sx={{
                        transform:
                          sortField === "dealValue" && sortOrder === "asc"
                            ? "rotate(0deg)"
                            : "rotate(180deg)",
                        transition: "transform 0.3s ease-in-out",
                        color: "#80FF00",
                      }}
                    />
                  }
                >
                  Deal Value
                </Button>
              </TableCell>
              <TableCell
                sx={{ color: "white", borderRight: "1px solid #5F5C5C" }}
                align="left"
              >
                Items
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  borderRight: "1px solid #5F5C5C",
                  whiteSpace: "pre-line",
                }}
                align="left"
              >
                Current Vendor
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  borderRight: "1px solid #5F5C5C",
                  whiteSpace: "pre-line",
                }}
                align="left"
              >
                <Button
                  sx={{ textTransform: "none", color: "white" }}
                  onClick={() => toggleSort("noOfStudents")}
                  endIcon={
                    <ArrowUpward
                      sx={{
                        transform:
                          sortField === "noOfStudents" && sortOrder === "asc"
                            ? "rotate(0deg)"
                            : "rotate(180deg)",
                        transition: "transform 0.3s ease-in-out",
                        color: "#80FF00",
                      }}
                    />
                  }
                >
                  Student Count
                </Button>
              </TableCell>
              <TableCell
                sx={{ color: "white", borderRight: "1px solid #5F5C5C" }}
                align="left"
              >
                <FormControl fullWidth>
                  {brief === true ? (
                    "Sales Rep"
                  ) : (
                    <Select
                      value={salesRepFilter}
                      disableUnderline
                      onChange={(e) => {
                        const value = e.target.value;
                        setSalesRepFilter(value); // Update the lead status filter state
                        setFilter((prev: any) => ({
                          ...prev,
                          teamMember: value, // Update the filter status in the parent component
                        }));
                      }}
                      displayEmpty
                      variant="standard"
                      sx={{
                        fontSize: "14px",
                        // maxWidth: "80px",
                        color: "white",
                        ".MuiOutlinedInput-notchedOutline": {
                          borderColor: "white",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#80FF00",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#80FF00",
                        },
                        "& .MuiSelect-select": {
                          textDecoration: "none",
                        },
                      }}
                      IconComponent={(props) => (
                        <ArrowDropDownIcon
                          {...props}
                          style={{ color: "#80FF00" }}
                        />
                      )}
                    >
                      <MenuItem value="">Sales Rep(All)</MenuItem>
                      <MenuItem value={"Alin Anto"}>Alin Anto</MenuItem>
                      <MenuItem value={"Jissmon George"}>
                        Jissmon George
                      </MenuItem>
                      <MenuItem value={"Annam Giri"}>
                        Annam Giri Prakash
                      </MenuItem>
                      <MenuItem value={"Adarsh Shetty"}>Akash</MenuItem>
                    </Select>
                  )}
                </FormControl>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leadsToDisplay.length > 0 ? (
              leadsToDisplay.map((row: any, index: any) => (
                <TableRow
                  key={index}
                  sx={{
                    "&:last-child td, &:last-child th": { borderBottom: 0 },
                  }}
                >
                  <TableCell
                    onClick={() => handleSingleLeadClick(row._id)}
                    sx={{
                      color: "white",
                      borderRight: "1px solid #5F5C5C",
                      cursor: "pointer",
                    }}
                    component="th"
                    scope="row"
                  >
                    {row.client}
                  </TableCell>
                  <TableCell
                    sx={{ color: "#80FF00", borderRight: "1px solid #5F5C5C" }}
                    align="left"
                  >
                    <div className="flex items-baseline gap-1">
                      <h1 className="text-[10px]">
                        {row.leadStatus === "Lead Generation"
                          ? 0
                          : row.leadStatus === "Qualification"
                          ? 20
                          : row.leadStatus === "Demo"
                          ? 40
                          : row.leadStatus === "Proposal"
                          ? 60
                          : row.leadStatus === "Negotiation"
                          ? 80
                          : row.leadStatus === "Closed"
                          ? 100
                          : 0}
                        %
                      </h1>
                      <ProgressBar
                        progression={
                          row.leadStatus === "Lead Generation"
                            ? 0
                            : row.leadStatus === "Qualification"
                            ? 20
                            : row.leadStatus === "Demo"
                            ? 40
                            : row.leadStatus === "Proposal"
                            ? 60
                            : row.leadStatus === "Negotiation"
                            ? 80
                            : row.leadStatus === "Closed"
                            ? 100
                            : 0
                        }
                        width={85}
                      />
                    </div>
                  </TableCell>
                  <TableCell
                    sx={{ color: "white", borderRight: "1px solid #5F5C5C" }}
                    align="left"
                  >
                    {new Date(row.createdDate).toLocaleDateString("en-GB")}
                  </TableCell>
                  <TableCell
                    sx={{ borderRight: "1px solid #5F5C5C", color: "#80FF00" }}
                    align="left"
                  >
                    {row.dealValue ? `₹${row.dealValue}` : "-----------"}
                  </TableCell>
                  <TableCell
                    sx={{ color: "white", borderRight: "1px solid #5F5C5C" }}
                    align="left"
                  >
                    {row.products.map((data: any) => (
                      <h5 key={data?.productId?.name} className="text-white">
                        {data?.productId?.name}
                      </h5>
                    ))}
                  </TableCell>
                  <TableCell
                    sx={{ color: "white", borderRight: "1px solid #5F5C5C" }}
                    align="left"
                  >
                    {row.currentVendor}
                  </TableCell>
                  <TableCell
                    sx={{ color: "white", borderRight: "1px solid #5F5C5C" }}
                    align="left"
                  >
                    {row.noOfStudents}
                  </TableCell>
                  <TableCell sx={{ color: "white" }} align="left">
                    {row.assignedTo}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={8}
                  sx={{ textAlign: "center", color: "white" }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "200px",
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: 600,
                        fontSize: "15px",
                        color: "#80FF00",
                      }}
                    >
                      No Leads To Show
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        width={"100%"}
        justifyContent={"end"}
        display={brief === true ? "flex" : "none"}
        alignItems={"center"}
      >
        <Button
          sx={{ textTransform: "none", color: "#48820E" }}
          onClick={() => setShowDialog(true)}
        >
          View All
        </Button>
      </Box>

      {/* Show ScrollTable as a dialog when scrolled to bottom */}
      {showDialog && scroll && (
        <ScrollTable
          allData={allData}
          change={change}
          leadData={leadData}
          filter={filter}
          open={showDialog}
          setFilter={setFilter}
          completeData={completeData}
          brief={false}
          show={setShowDialog}
        />
      )}
    </Box>
  );
};

export default SalesMatrixTable;

// Transition for the dialog

const Transition = React.forwardRef(function Transition(
  props: SlideProps & { children: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface EventDetailsProps {
  open: boolean;
  completeData: any;
  brief: boolean;
  show: (value: boolean) => void;
  leadData?: any;
  filter: any;
  setFilter: any;
  allData?: any;
  change: any;
}

interface DateRange {
  startDate: Date;
  endDate: Date;
  key: string;
}

function ScrollTable({
  open,
  show,
  leadData,
  change,
  filter,
  completeData,
  brief,
  setFilter,
  allData,
}: EventDetailsProps) {
  const setVhProperty = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  };

  const [headerValues, setHeaderValues] = React.useState<any>(allData);
  const [data, setData] = React.useState<any>(leadData);
  const [mainDate, setMainDate] = React.useState<DateRange>({
    startDate: new Date(new Date().setMonth(new Date().getMonth() - 12)),
    endDate: new Date(),
    key: "selection",
  });

  console.log(filter);
  const [pipelineQueryParams, setPipelineQueryParams] = React.useState<any>({
    from: mainDate.startDate,
    to: mainDate.endDate,
    teamMember: filter?.teamMember,
    status: filter?.status,
  });

  // React.useEffect(() => {
  //   setPipelineQueryParams((prev: any) => ({
  //     ...prev,
  //     teamMember: filter?.teamMember,
  //     status: filter?.status,
  //   }));
  // }, []);

  React.useEffect(() => {
    async function getSalesPipelineLeads() {
      try {
        const data = await fetchPipeLineLeads(pipelineQueryParams);
        setHeaderValues(data);
        setData(data.data);
      } catch (error) {
        console.error("Failed to fetch leads:", error);
      }
    }
    getSalesPipelineLeads();
  }, [pipelineQueryParams]);

  console.log(allData);

  console.log(filter);

  console.log(headerValues);
  console.log(data);

  React.useEffect(() => {
    setVhProperty();
    window.addEventListener("resize", setVhProperty);
    return () => {
      window.removeEventListener("resize", setVhProperty);
    };
  }, []);

  const handleClose = () => {
    show(false);
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        fullScreen
        TransitionComponent={Transition}
        transitionDuration={500}
        PaperProps={{
          sx: {
            position: "absolute",
            bottom: 0,
            height: { xs: "calc(var(--vh, 1vh) * 90)" },
            // maxHeight: "90vh",
            width: "100vw",
            zIndex: 100000,
            borderTopLeftRadius: "30px",
            borderTopRightRadius: "30px",
            background: "linear-gradient(180deg, #011719 0%, #03292C 100%)",
          },
        }}
      >
        <Box position={"relative"}>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            overflow={"hidden"}
            color={"white"}
            width={"100%"}
            position={"fixed"}
            zIndex={10000000}
            mb={{ xs: 2, sm: 0 }}
            p={3}
          >
            <h1 className="ml-2 text-white font-bold text-lg">
              I/O Sales Matrix Table
            </h1>
            <IconButton
              size="small"
              sx={{
                background: "linear-gradient(180deg, #011719 0%, #03292C 100%)",
              }}
              onClick={handleClose}
            >
              <Close sx={{ color: "#80FF00" }} />
            </IconButton>
          </Box>
          <Grid container columnSpacing={3} mt={10} px={4}>
            <Grid item md={2}>
              <Box
                sx={{
                  height: "100px",
                  width: "100%",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)",
                  borderRadius: 3,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "white",
                }}
              >
                <Typography>Total Leads</Typography>
                <Typography
                  color={"#80FF00"}
                  fontWeight={600}
                  fontSize={"1.3rem"}
                >
                  {headerValues?.totalCount}
                </Typography>
              </Box>
            </Grid>
            <Grid item md={2}>
              <Box
                sx={{
                  height: "100px",
                  width: "100%",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)",
                  borderRadius: 3,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "white",
                }}
              >
                <Typography>Closed Leads</Typography>
                <Typography
                  color={"#80FF00"}
                  fontWeight={600}
                  fontSize={"1.3rem"}
                >
                  {headerValues?.targetCounts.Closed}
                </Typography>
              </Box>
            </Grid>
            <Grid item md={2}>
              <Box
                sx={{
                  height: "100px",
                  width: "100%",
                  // background: "#1c252e",
                  borderRadius: 3,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "white",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)",
                }}
              >
                <Typography>Rejected Leads</Typography>
                <Typography
                  color={"#80FF00"}
                  fontWeight={600}
                  fontSize={"1.3rem"}
                >
                  {headerValues?.targetCounts.Rejected}
                </Typography>
              </Box>
            </Grid>
            <Grid item md={2}>
              <Box
                sx={{
                  height: "100px",
                  width: "100%",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)",
                  borderRadius: 3,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "white",
                }}
              >
                <Typography>Ongoing Leads</Typography>
                <Typography
                  fontWeight={600}
                  color={"#80FF00"}
                  fontSize={"1.3rem"}
                >
                  {headerValues?.totalCount -
                    headerValues?.targetCounts.Rejected -
                    headerValues?.targetCounts.Closed}
                </Typography>
              </Box>
            </Grid>
            <Grid item md={2}>
              <Box
                sx={{
                  height: "100px",
                  width: "100%",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)",
                  borderRadius: 3,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "white",
                }}
              >
                <Typography>Lead Status</Typography>
                <Typography
                  fontWeight={600}
                  color={"#80FF00"}
                  fontSize={"1.3rem"}
                >
                  {pipelineQueryParams.status === ""
                    ? "All Status"
                    : pipelineQueryParams.status}
                </Typography>
              </Box>
            </Grid>
            <Grid item md={2}>
              <Box
                sx={{
                  height: "100px",
                  width: "100%",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)",
                  borderRadius: 3,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "white",
                }}
              >
                <Typography>Sales Rep</Typography>
                <Typography
                  fontWeight={600}
                  color={"#80FF00"}
                  fontSize={"1.3rem"}
                >
                  {pipelineQueryParams.teamMember === ""
                    ? "All"
                    : pipelineQueryParams.teamMember}
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Grid
            px={2}

            // maxHeight={{ xs: "calc(var(--vh, 1vh) * 55)" }}
            // overflow={"auto"}
          >
            <SalesMatrixTable
              type="nvnadbvfnbvsdnf"
              leadData={data}
              allData={allData}
              filter={pipelineQueryParams}
              setFilter={setPipelineQueryParams}
              scroll={false}
              change={change}
              sHeight={"calc(var(--vh, 1vh) * 56)"}
            />
          </Grid>
        </Box>
      </Dialog>
    </React.Fragment>
  );
}
