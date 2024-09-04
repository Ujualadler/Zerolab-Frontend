import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Grid, Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import Close from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { ProgressBar } from "./ProgressBar"; // Assuming you have this component
import { SlideProps } from "@mui/material";
import LeadDetails from "./LeadDetails";

// Data creation function
function createData(
  client: string,
  completion: number,
  date: string,
  value: number,
  items: number,
  currentVendor: string,
  studentCount: number,
  salesRep: string
) {
  return {
    client,
    completion,
    date,
    value,
    items,
    currentVendor,
    studentCount,
    salesRep,
  };
}

// Sample data
const rows = [
  createData(
    "Client A",
    80,
    "2023-07-01",
    5000,
    20,
    "Vendor X",
    150,
    "John Doe"
  ),
  createData(
    "Client B",
    60,
    "2023-07-02",
    3000,
    10,
    "Vendor Y",
    120,
    "Jane Smith"
  ),
  createData(
    "Client C",
    90,
    "2023-07-03",
    7000,
    30,
    "Vendor Z",
    200,
    "Mike Johnson"
  ),
  createData(
    "Client D",
    50,
    "2023-07-04",
    2500,
    15,
    "Vendor A",
    110,
    "Emily Davis"
  ),
  createData(
    "Client E",
    75,
    "2023-07-05",
    6000,
    25,
    "Vendor B",
    180,
    "David Wilson"
  ),
  createData(
    "Client F",
    85,
    "2023-07-06",
    6500,
    27,
    "Vendor C",
    170,
    "Sarah Brown"
  ),
  createData(
    "Client G",
    95,
    "2023-07-07",
    7200,
    22,
    "Vendor D",
    190,
    "Michael Scott"
  ),
  createData(
    "Client H",
    65,
    "2023-07-08",
    4300,
    17,
    "Vendor E",
    140,
    "Jessica Taylor"
  ),
];

interface SalesMatrixTableProps {
  type: string;
  scroll: Boolean;
  sHeight: string;
  leadData?: any;
  change:any
}

const SalesMatrixTable: React.FC<SalesMatrixTableProps> = ({
  type,
  scroll,
  sHeight,
  leadData,
  change
}) => {
  const tableRef = React.useRef<HTMLDivElement>(null); // Reference to the table container
  const [showDialog, setShowDialog] = React.useState(false);
  const [showLeadDetails, setShowLeadDetails] = React.useState<boolean>(false);
  const [selectedLeadId, setSelectedleadId] = React.useState<string>("");

  // State to control dialog visibility

  console.log(leadData);

  // Check scroll position
  const handleScroll = () => {
    if (tableRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = tableRef.current;

      console.log(scrollTop, scrollHeight, clientHeight);
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 5;
      setShowDialog(isAtBottom);
    }
  };

  interface leadStatusType {
    name: string;
  }

  const leadStatusCalc: leadStatusType[] = [
    { name: "Lead Generation" },
    { name: "Qualification" },
    { name: "Demo" },
    { name: "Proposal" },
    { name: "Negotiation" },
    { name: "Closure" },
    { name: "hold" },
    { name: "Retention" },
    { name: "Closed" },
    { name: "Rejected" },
  ];

  const handleSingleLeadClick = (id: string) => {
    setSelectedleadId(id);
    setShowLeadDetails(true);
  };

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
        onScroll={handleScroll} // Listen for scroll events
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
                Client
              </TableCell>
              <TableCell
                sx={{ color: "white", borderRight: "1px solid #5F5C5C" }}
                align="left"
              >
                Completion
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
                Value
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
                Current{"\n"}Vendor
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  borderRight: "1px solid #5F5C5C",
                  whiteSpace: "pre-line",
                }}
                align="left"
              >
                Student{"\n"}Count
              </TableCell>
              <TableCell sx={{ color: "white" }} align="left">
                Sales Rep
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leadData.length > 0 ? (
              leadData.map((row: any, index: any) => (
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
                    {row.dealValue?`₹${row.dealValue}`:'-----------'}
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

      {/* Show ScrollTable as a dialog when scrolled to bottom */}
      {showDialog && scroll && (
        <ScrollTable
          change={change}
          leadData={leadData}
          open={showDialog}
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
  show: (value: boolean) => void;
  leadData?: any;
  change:any
}

function ScrollTable({ open, show, leadData,change }: EventDetailsProps) {
  const setVhProperty = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  };

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
            <Grid item md={3}>
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
                <Typography>Total Clients</Typography>
                <Typography
                  color={"#80FF00"}
                  fontWeight={600}
                  fontSize={"2rem"}
                >
                  35
                </Typography>
              </Box>
            </Grid>
            <Grid item md={3}>
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
                <Typography>Completed Leads</Typography>
                <Typography
                  color={"#80FF00"}
                  fontWeight={600}
                  fontSize={"2rem"}
                >
                  15
                </Typography>
              </Box>
            </Grid>
            <Grid item md={3}>
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
                <Typography>Completed Leads</Typography>
                <Typography
                  color={"#80FF00"}
                  fontWeight={600}
                  fontSize={"2rem"}
                >
                  15
                </Typography>
              </Box>
            </Grid>
            <Grid item md={3}>
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
                <Typography>Completed Leads</Typography>
                <Typography
                  fontWeight={600}
                  color={"#80FF00"}
                  fontSize={"2rem"}
                >
                  15
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
              leadData={leadData}
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
