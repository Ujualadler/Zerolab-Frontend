"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Grid, IconButton } from "@mui/material";
import Close from "@mui/icons-material/Close";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { ProgressBar } from "./ProgressBar";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import FormAdd from "./FormAdd";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "99vw",
  height: "99vh",
  background: "#2a2b2f",
  borderRadius: 4,
  boxShadow: 24,
};

interface LeadDetailsProps {
  open: boolean;
  show: (value: boolean) => void;
}

interface Task {
  id: string;
  title: string;
  description: string;
}

interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

const initialColumns: Column[] = [
  {
    id: "lead-generation",
    title: "Lead Generation",
    tasks: [{ id: "task-1", title: "School 1", description: "Description 1" }],
  },
  {
    id: "qualification",
    title: "Qualification",
    tasks: [],
  },
  {
    id: "demo",
    title: "Demo",
    tasks: [],
  },
  {
    id: "proposal",
    title: "Proposal",
    tasks: [],
  },
  {
    id: "negotiation",
    title: "Negotiation",
    tasks: [],
  },
  {
    id: "closure",
    title: "Closure",
    tasks: [],
  },
  {
    id: "retention",
    title: "Retention",
    tasks: [],
  },
];

export default function LeadDetails({ open, show }: LeadDetailsProps) {
  const [columns, setColumns] = React.useState<Column[]>(initialColumns);
  const [showFormAdd, setShowFormAdd] = React.useState<boolean>(false);
  const handleClose = () => show(false);

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    // If there's no destination (dropped outside a droppable area), do nothing
    if (!destination) return;

    // If the task is dropped in the same position, do nothing
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    // Find source and destination columns
    const sourceColumnIndex = columns.findIndex(
      (col) => col.id === source.droppableId
    );
    const destinationColumnIndex = columns.findIndex(
      (col) => col.id === destination.droppableId
    );

    const sourceColumn = columns[sourceColumnIndex];
    const destinationColumn = columns[destinationColumnIndex];

    // Remove task from source column
    const [movedTask] = sourceColumn.tasks.splice(source.index, 1);

    // Insert task into destination column
    destinationColumn.tasks.splice(destination.index, 0, movedTask);

    // Update columns state
    setColumns([...columns]);
  };

  return (
    <div>
      {showFormAdd&& <FormAdd show={setShowFormAdd} open={showFormAdd}/>}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box position={"relative"}>
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
              overflow={"hidden"}
              color={"white"}
              width={"100%"}
              mb={{ xs: 2, sm: 0 }}
              p={3}
            >
              <Typography fontSize={"1.5rem"} fontWeight={600} color={"#fff"}>
                School Name
              </Typography>
              <IconButton
                size="small"
                sx={{
                  background:
                    "linear-gradient(180deg, #011719 0%, #03292C 100%)",
                }}
                onClick={handleClose}
              >
                <Close sx={{ color: "#80FF00" }} />
              </IconButton>
            </Box>
            <Grid container>
              <Grid item md={3} px={3}>
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  color={"white"}
                  gap={2}
                >
                  <IconButton
                    sx={{
                      background: "black",
                      borderRadius: "50%",
                      p: 1,
                      color: "white",
                    }}
                  >
                    <PhoneIcon />
                  </IconButton>
                  <IconButton
                    sx={{
                      background: "black",
                      borderRadius: "50%",
                      p: 1,
                      color: "white",
                    }}
                  >
                    <EmailIcon />
                  </IconButton>
                </Box>
                <Box
                  mt={4}
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  color={"white"}
                  // bgcolor={'black'}
                >
                  <Typography color={"#a8a9b4"}>Sales Rep</Typography>
                  <Typography>Alin Anto</Typography>
                </Box>
                <Box
                  mt={2}
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  color={"white"}
                  // bgcolor={'black'}
                >
                  <Typography color={"#a8a9b4"}>Decision Maker</Typography>
                  <Typography>Joe Doe</Typography>
                </Box>
                <Box
                  mt={2}
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  color={"white"}
                  // bgcolor={'black'}
                >
                  <Typography color={"#a8a9b4"}>Current Vendor</Typography>
                  <Typography>Super Vendor</Typography>
                </Box>
                <Box
                  mt={2}
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  color={"white"}
                  // bgcolor={'black'}
                >
                  <Typography color={"#a8a9b4"}>Lead Source</Typography>
                  <Typography>Inside Sales</Typography>
                </Box>
                <Box
                  mt={4}
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  color={"white"}
                  // bgcolor={'black'}
                >
                  <Typography>Address Details</Typography>
                </Box>
                <Box
                  mt={2}
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  color={"white"}
                  // bgcolor={'black'}
                >
                  <Typography color={"#a8a9b4"}>Street</Typography>
                  <Typography>Street one</Typography>
                </Box>
                <Box
                  mt={2}
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  color={"white"}
                  // bgcolor={'black'}
                >
                  <Typography color={"#a8a9b4"}>City</Typography>
                  <Typography>City one</Typography>
                </Box>
                <Box
                  mt={2}
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  color={"white"}
                  // bgcolor={'black'}
                >
                  <Typography color={"#a8a9b4"}>District</Typography>
                  <Typography>District one</Typography>
                </Box>
                <Box
                  mt={2}
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  color={"white"}
                  // bgcolor={'black'}
                >
                  <Typography color={"#a8a9b4"}>State</Typography>
                  <Typography>State one</Typography>
                </Box>
                <Box
                  mt={2}
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  color={"white"}
                  // bgcolor={'black'}
                >
                  <Typography color={"#a8a9b4"}>Country</Typography>
                  <Typography>India</Typography>
                </Box>
                <Box
                  mt={2}
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  color={"white"}
                  // bgcolor={'black'}
                >
                  <Typography color={"#a8a9b4"}>Zip Code</Typography>
                  <Typography>123456</Typography>
                </Box>
              </Grid>
              <Grid
                item
                md={9}
                px={3}
                maxHeight={"82vh"}
                overflow={"auto"}
                sx={{
                  "&::-webkit-scrollbar": {
                    width: "5px",
                    height: "8px", // Height for horizontal scrollbar
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
                <Grid
                  item
                  container
                  md={12}
                  bgcolor={"#2f3247"}
                  // spacing={2}
                  p={2}
                  color={"white"}
                  borderRadius={1}
                >
                  <Grid item md={3}>
                    <Box
                      display={"flex"}
                      gap={1}
                      flexDirection={"column"}
                      alignItems={"start"}
                      color={"white"}
                    >
                      <Typography color={"#a8a9b4"}>Lead Quality</Typography>
                      <Typography>Medium</Typography>
                    </Box>
                  </Grid>
                  <Grid item md={6}>
                    <Box
                      width={"90%"}
                      display={"flex"}
                      gap={1}
                      flexDirection={"column"}
                      alignItems={"start"}
                      color={"white"}
                    >
                      <Typography mb={1} color={"#a8a9b4"}>
                        Status
                      </Typography>
                      <ProgressBar width={100} progression={40} />
                    </Box>
                  </Grid>
                  <Grid item md={3}>
                    <Box
                      display={"flex"}
                      gap={1}
                      flexDirection={"column"}
                      alignItems={"start"}
                      color={"white"}
                    >
                      <Typography color={"#a8a9b4"}>Next Step</Typography>
                      <Typography>Demo</Typography>
                    </Box>
                  </Grid>
                </Grid>
                <Grid item md={12} gap={2} mt={3} container>
                  <Grid
                    item
                    md={5.9}
                    px={2}
                    pt={2}
                    color={"white"}
                    bgcolor={"#2f3247"}
                    borderRadius={1}
                    // spacing={1}
                  >
                    <Box>
                      <Typography mb={2} color={"#a8a9b4"}>
                        Items
                      </Typography>
                      <Box display={"flex"} alignItems={"center"} gap={1}>
                        <Typography
                          sx={{ background: "#2a2b2f", p: 1, borderRadius: 1 }}
                          mb={2}
                        >
                          LMS
                        </Typography>
                        <Typography
                          sx={{ background: "#2a2b2f", p: 1, borderRadius: 1 }}
                          mb={2}
                        >
                          ERP
                        </Typography>
                        <Typography
                          sx={{ background: "#2a2b2f", p: 1, borderRadius: 1 }}
                          mb={2}
                        >
                          DC
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>

                  <Grid
                    item
                    md={5.9}
                    px={2}
                    pt={2}
                    color={"white"}
                    bgcolor={"#2f3247"}
                    borderRadius={1}
                    // spacing={1}
                  >
                    <Box>
                      <Typography mb={1} color={"#a8a9b4"}>
                        Value
                      </Typography>
                      <Typography
                        fontWeight={700}
                        fontSize={"1.5rem"}
                        color={"#80FF00"}
                      >
                        ₹20,00,0000
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
                <Grid item md={12} gap={2} mt={3} container>
                  <DragDropContext onDragEnd={handleDragEnd}>
                    <Box
                      //   container

                      display={"flex"}
                      maxHeight={"210px"}
                      // maxWidth={"100vw"}
                      overflow={"auto"}
                      sx={{
                        // Configure grid to allow for scrolling and display 4 items per row
                        // gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
                        // display: "grid",
                        // Add space between items
                        "&::-webkit-scrollbar": {
                          width: "5px",
                          height: "5px", // Height for horizontal scrollbar
                        },
                        "&::-webkit-scrollbar-track": {
                          background: "#011719",
                        },
                        "&::-webkit-scrollbar-thumb": {
                          background: "#2f3247",
                          borderRadius: "10px",
                        },
                        "&::-webkit-scrollbar-thumb:hover": {
                          background: "#2f3247",
                        },
                      }}
                    >
                      {columns.map((column) => (
                        <Box key={column.id}>
                          <Droppable droppableId={column.id}>
                            {(provided) => (
                              <Box width={"25vw"} p={2}>
                                <Box
                                  ref={provided.innerRef}
                                  {...provided.droppableProps}
                                  sx={{
                                    borderRadius: 2,
                                    width: "100%",
                                    p: 2,
                                    // minHeight: 230,
                                    // boxShadow:
                                    //   "0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.1)",
                                    background: "#25262b",
                                  }}
                                >
                                  <Box
                                    display={"flex"}
                                    sx={{
                                      background: "#2a2b30",
                                      borderRadius: 2,
                                    }}
                                    justifyContent={"space-around"}
                                    color={"white"}
                                    alignItems={"baseline"}
                                    p={1}
                                  >
                                    <Typography
                                      fontSize={"15px"}
                                      fontWeight={600}
                                      gutterBottom
                                    >
                                      {column.title}
                                    </Typography>
                                    <Typography
                                      border={"1px solid -"}
                                      fontSize={"14px"}
                                      py={"2px"}
                                      px={"8px"}
                                      borderRadius={1}
                                    >
                                      {column.tasks.length}
                                    </Typography>
                                  </Box>
                                  {column.tasks.length ? (
                                    column.tasks.map((task, index) => (
                                      <Draggable
                                        key={task.id}
                                        draggableId={task.id}
                                        index={index}
                                      >
                                        {(provided) => (
                                          <Box
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            sx={{
                                              padding: 2,
                                              mt: 2,
                                              background: "#2a2b30",
                                              cursor: "move",
                                              borderRadius: 2,
                                              color: "#D2D2D2",
                                              "&:hover": {
                                                background: "transparent",
                                                border: "1px solid #8B8B8B",
                                              },
                                            }}
                                            data-task-id={task.id}
                                          >
                                            <Box
                                              width={"100%"}
                                              display={"flex"}
                                              justifyContent={"space-between"}
                                              alignItems={"center"}
                                              mb={1}
                                            >
                                              <Typography
                                                fontWeight={500}
                                                color={"#80FF00"}
                                              >
                                                {task.title}
                                              </Typography>
                                            </Box>

                                            <Box
                                              width={"100%"}
                                              display={"flex"}
                                              justifyContent={"center"}
                                              alignItems={"center"}
                                              fontSize={"13px"}
                                              mb={"3px"}
                                            >
                                              <ProgressBar
                                                width={100}
                                                progression={
                                                  column.title ===
                                                  "Lead Generation"
                                                    ? 0
                                                    : column.title ===
                                                      "Qualification"
                                                    ? 20
                                                    : column.title === "Demo"
                                                    ? 40
                                                    : column.title ===
                                                      "Proposal"
                                                    ? 60
                                                    : column.title ===
                                                      "Negotiation"
                                                    ? 80
                                                    : column.title === "Closure"
                                                    ? 100
                                                    : 0
                                                }
                                              />
                                            </Box>
                                          </Box>
                                        )}
                                      </Draggable>
                                    ))
                                  ) : (
                                    <Box width={"100%"} mt={1} p={1}>
                                      <Box
                                        border={"1px dashed #8B8B8B"}
                                        display={"flex"}
                                        justifyContent={"center"}
                                        alignItems={"center"}
                                        borderRadius={2}
                                        height={"60px"}
                                      >
                                        <Typography
                                          fontSize={"14px"}
                                          color={"white"}
                                        >
                                          Drop Here
                                        </Typography>
                                      </Box>
                                    </Box>
                                  )}
                                  {provided.placeholder}
                                </Box>
                              </Box>
                            )}
                          </Droppable>
                        </Box>
                      ))}
                    </Box>
                  </DragDropContext>
                </Grid>
                <Grid
                  item
                  md={6}
                  color={"white"}
                  bgcolor={"#2f3247"}
                  p={2}
                  borderRadius={1}
                  mt={3}
                  container
                >
                  <Box
                    width={"100%"}
                    display={"flex"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                  >
                    <Typography>Feedback</Typography>
                    <Button
                      onClick={()=>setShowFormAdd(true)}
                      size="small"
                      endIcon={<AddIcon />}
                      sx={{ height: "30px", color: "white", bgcolor: "black" }}
                    >
                      Form
                    </Button>
                  </Box>

                  <Box
                    mt={2}
                    width={"100%"}
                    display={"flex"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    color={"white"}
                    // bgcolor={'black'}
                  >
                    <Typography color={"#a8a9b4"}>Form 1</Typography>
                    <IconButton
                      size="small"
                      sx={{
                        color: "white",
                      }}
                    >
                      <VisibilityIcon />
                    </IconButton>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
