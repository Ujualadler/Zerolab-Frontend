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
import axios from "axios";
import { useRouter } from "next/navigation";
import { baseURL } from "@/Constants/constants";
import { Changa } from "next/font/google";

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
  id?: string;
  change:(value: boolean) => void;
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
  { id: "Lead Generation", title: "Lead Generation", tasks: [] },
  { id: "Qualification", title: "Qualification", tasks: [] },
  { id: "Demo", title: "Demo", tasks: [] },
  { id: "Proposal", title: "Proposal", tasks: [] },
  { id: "Negotiation", title: "Negotiation", tasks: [] },
  { id: "Closed", title: "Closed", tasks: [] },
  { id: "Retention", title: "Retention", tasks: [] },
  { id: "Rejected", title: "Rejected", tasks: [] },
];

export default function LeadDetails({ open, show, id,change }: LeadDetailsProps) {
  const [columns, setColumns] = React.useState<Column[]>(initialColumns);
  const [showFormAdd, setShowFormAdd] = React.useState<boolean>(false);
  const [leadData, setLeadData] = React.useState<any>({});
  const [isUpdated, setIsUpdated] = React.useState<boolean>(false);
  const handleClose = () =>{
    change(true)
    show(false);
  } 
  const [forms, setForms] = React.useState<{ _id: string; title: string }[]>(
    []
  );
  const router = useRouter();

  console.log(id);

  React.useEffect(() => {
    const fetchLead = async () => {
      try {
        // Fetch lead data from the backend
        const response = await axios.get(
          `${baseURL}/singleLead?id=${id}`
        );
        const lead = response.data;

        // Set lead data to state
        setLeadData(lead);
        setForms(lead.forms)

        // Find the column based on leadStatus and add the lead as a task
        const updatedColumns = initialColumns.map((column) => {
          if (column.title.toLowerCase() === lead.leadStatus.toLowerCase()) {
            return {
              ...column,
              tasks: [
                {
                  id: lead._id,
                  title: lead.client,
                  description: lead.leadQuality, // Or any other relevant info
                },
              ],
            };
          }
          return column;
        });

        // Update state with the new columns structure
        setColumns(updatedColumns);
      } catch (error) {
        console.error("Error fetching lead data:", error);
      }
    };

    if (id) {
      fetchLead();
    }
  }, [id, isUpdated]);



  const handleViewForm = (id: string) => {
    router.push(`/formPage/${id}`);
  };

  const handleDragEnd = async (result: DropResult) => {
    const { source, destination } = result;
  
    // If there is no destination (dropped outside a column), return early.
    if (!destination) return;
  
    // If dropped in the same position, no need to change the state
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }
  
    // Find the source and destination columns
    const sourceColumnIndex = columns.findIndex(
      (col) => col.id === source.droppableId
    );
    const destinationColumnIndex = columns.findIndex(
      (col) => col.id === destination.droppableId
    );
  
    const sourceColumn = columns[sourceColumnIndex];
    const destinationColumn = columns[destinationColumnIndex];
  
    // Clone the tasks to avoid directly mutating state
    const sourceTasks = [...sourceColumn.tasks];
    const destinationTasks = [...destinationColumn.tasks];
  
    // Remove the task from the source column
    const [movedTask] = sourceTasks.splice(source.index, 1);
  
    // Add the task to the destination column
    destinationTasks.splice(destination.index, 0, movedTask);
  
    // Update the columns with the modified tasks
    const newColumns = [...columns];
    newColumns[sourceColumnIndex] = {
      ...sourceColumn,
      tasks: sourceTasks,
    };
    newColumns[destinationColumnIndex] = {
      ...destinationColumn,
      tasks: destinationTasks,
    };
  
    setColumns(newColumns);
  
    // Optionally, update backend or perform any necessary actions after moving the task
    try {
      const response = await axios.put(`${baseURL}/singleLead`, {
        id: id,
        NewLeadStatus: destination?.droppableId,
      });
  
      if (response.data.message === "success") {
        setIsUpdated(!isUpdated); 
        change(true)// Trigger a re-fetch if needed
      }
    } catch (error) {
      console.log(error);
    }
  };
  

  const nextIndex = leadData.leadStatus
    ? initialColumns.findIndex((data) => data.title === leadData.leadStatus) + 1
    : -1;

  const nextStep =
    nextIndex >= 0 && nextIndex < initialColumns.length
      ? initialColumns[nextIndex].title
      : "No Next Step";

  return (
    <div>
      {showFormAdd && <FormAdd id={leadData?._id} show={setShowFormAdd} open={showFormAdd} />}
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
                {leadData?.client}
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
                  <Typography>{leadData?.assignedTo}</Typography>
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
                  <Typography>{leadData?.decisionMaker}</Typography>
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
                  <Typography>{leadData?.currentVendor}</Typography>
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
                  <Typography>{leadData?.leadSource}</Typography>
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
                  gap={2}
                  color={"white"}
                  // bgcolor={'black'}
                >
                  <Typography color={"#a8a9b4"}>Street</Typography>
                  <Typography textAlign={'left'}>{leadData?.street}</Typography>
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
                  <Typography>{leadData?.city}</Typography>
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
                  <Typography>{leadData?.district}</Typography>
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
                  <Typography>{leadData?.state}</Typography>
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
                  <Typography>{leadData?.country}</Typography>
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
                  <Typography>{leadData?.zipCode}</Typography>
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
                      <Typography>{leadData?.leadQuality}</Typography>
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
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          width: "100%",
                        }}
                      >
                        <h1 className="text-[10px]">
                          {leadData?.leadStatus === "Lead Generation"
                            ? 0
                            : leadData?.leadStatus === "Qualification"
                            ? 20
                            : leadData?.leadStatus === "Demo"
                            ? 40
                            : leadData?.leadStatus === "Proposal"
                            ? 60
                            : leadData?.leadStatus === "Negotiation"
                            ? 80
                            : leadData?.leadStatus === "Closed"
                            ? 100
                            : 0}
                          %
                        </h1>
                        <ProgressBar
                          width={85}
                          progression={
                            leadData?.leadStatus === "Lead Generation"
                              ? 0
                              : leadData?.leadStatus === "Qualification"
                              ? 20
                              : leadData?.leadStatus === "Demo"
                              ? 40
                              : leadData?.leadStatus === "Proposal"
                              ? 60
                              : leadData?.leadStatus === "Negotiation"
                              ? 80
                              : leadData?.leadStatus === "Closed"
                              ? 100
                              : 0
                          }
                        />
                      </Box>
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
                      <Typography>{nextStep}</Typography>
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
                        {leadData.products?.length>0&&leadData?.products?.map((data: any, index: any) => (
                          <Typography
                            key={data._id}
                            sx={{
                              background: "#2a2b2f",
                              p: 1,
                              borderRadius: 1,
                            }}
                            mb={2}
                          >
                            {data?.productId?.name}
                          </Typography>
                        ))}
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
                      {leadData?.dealValue?    <Typography
                        fontWeight={700}
                        fontSize={"1.5rem"}
                        color={"#80FF00"}
                      >
                        ₹{leadData?.dealValue}
                      </Typography>:    <Typography
                        fontWeight={700}
                        fontSize={"1.rem"}
                        color={"red"}
                      >
                        Not Added
                      </Typography>}
                  
                    </Box>
                  </Grid>
                </Grid>
                <Grid item md={12} gap={2} mt={3} container>
                  <DragDropContext onDragEnd={handleDragEnd}>
                    <Box
                      display={"flex"}
                      maxHeight={"210px"}
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
                                                    : column.title === "Closed"
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
                      onClick={() => setShowFormAdd(true)}
                      size="small"
                      endIcon={<AddIcon />}
                      sx={{ height: "30px", color: "white", bgcolor: "black" }}
                    >
                      Form
                    </Button>
                  </Box>
                  {forms.length > 0 &&
                    forms.map((data, index) => (
                      <Box
                        key={index}
                        mt={2}
                        width={"100%"}
                        display={"flex"}
                        justifyContent={"space-between"}
                        alignItems={"center"}
                        color={"white"}
                        // bgcolor={'black'}
                      >
                        <Typography color={"#a8a9b4"}>{data.title}</Typography>
                        <IconButton
                          onClick={() => handleViewForm(data._id)}
                          size="small"
                          sx={{
                            color: "white",
                          }}
                        >
                          <VisibilityIcon />
                        </IconButton>
                      </Box>
                    ))}
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
                    <Typography>Work order generation</Typography>
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
