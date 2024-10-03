import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import Close from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { Box, Grid, Typography } from "@mui/material";
import { ProgressBar } from "./ProgressBar";
import InfoIcon from "@mui/icons-material/Info";
import { SlideProps } from "@mui/material";

import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import LeadDetails from "./LeadDetails";

// Define the types for your tasks and columns
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
    tasks: [
      { id: "task-1", title: "School 1", description: "Description 1" },
      { id: "task-2", title: "School 2", description: "Description 2" },
    ],
  },
  {
    id: "qualification",
    title: "Qualification",
    tasks: [{ id: "task-3", title: "School 3", description: "Description 3" }],
  },
  {
    id: "demo",
    title: "Demo",
    tasks: [{ id: "task-4", title: "School 4", description: "Description 4" }],
  },
  // {
  //   id: "requirement-gathering",
  //   title: "Requirement Gathering",
  //   tasks: [{ id: "task-5", title: "School 5", description: "Description 5" }],
  // },
  {
    id: "proposal",
    title: "Proposal",
    tasks: [{ id: "task-6", title: "School 6", description: "Description 6" }],
  },
  {
    id: "negotiation",
    title: "Negotiation",
    tasks: [{ id: "task-7", title: "School 7", description: "Description 7" }],
  },
  {
    id: "closure",
    title: "Closure",
    tasks: [{ id: "task-8", title: "School 8", description: "Description 8" }],
  },
  {
    id: "retention",
    title: "Retention",
    tasks: [{ id: "task-9", title: "School 9", description: "Description 9" }],
  },
];

const Transition = React.forwardRef(function Transition(
  props: SlideProps & { children: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface EventDetailsProps {
  open: boolean;
  show: (value: boolean) => void;
}

export default function KanbanBoard({ open, show }: EventDetailsProps) {
  const [columns, setColumns] = useState<Column[]>(initialColumns);
  const [showLeadDetails, setShowLeadDetails] = useState<boolean>(false);
  const [change, setChange] = useState<boolean>(false);

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

  // Function to handle drag and drop logic
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
    <React.Fragment>
      {showLeadDetails && (
        <LeadDetails change={setChange} show={setShowLeadDetails} open={showLeadDetails} />
      )}
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
            maxHeight: "90vh",
            width: "100vw",
            zIndex: 100000,
            borderTopLeftRadius: "30px",
            borderTopRightRadius: "30px",
            background: "#2a2b2f",
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
            <div className="col-span-12 w-[300px]">
              <div className="flex items-baseline gap-[3px]">
                <h1 className="text-[#80FF00] text-lg">₹23,654534</h1>
                <h1 className="text-[#fff] text-md">Total Target Status</h1>
              </div>
              <div className="flex gap-1 items-baseline">
                <ProgressBar progression={62} width={100} />
                <h1 className="text-[#80FF00] text-md">62%</h1>
              </div>
              <div className="flex justify-end w-[80%] ">
                <h1 className="text-[#160909] text-md">₹1,73,62294</h1>
              </div>
            </div>
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
          <DragDropContext onDragEnd={handleDragEnd}>
            <Box
              //   container
              mt={12}
              display={"flex"}
              height={"calc(var(--vh, 1vh) * 76)"}
              width={"100vw"}
              sx={{
                // Configure grid to allow for scrolling and display 4 items per row
                // gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
                // display: "grid",
                // Add space between items
                overflowX: "auto",
                overflowY: "auto",
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
              {columns.map((column, columnIndex) => (
                <Box key={column.id}>
                  <Droppable droppableId={column.id}>
                    {(provided, snapshot) => (
                      <Box width={{ lg: "20vw", xl: "16.666vw" }} p={1} mt={1}>
                        <Box
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          sx={{
                            borderRadius: 2,
                            width: "100%",
                            height: "calc(var(--vh, 1vh) * 76)",
                            // overflow: "auto",
                            p: 1,
                            "&::-webkit-scrollbar": {
                              width: "3px",
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
                            background:
                              column.tasks.length < 1
                                ? "linear-gradient(to bottom, #1a1b1f, #25262b, #2a2b30)"
                                : "transparent",
                          }}
                        >
                          <Box
                            display={"flex"}
                            sx={{
                              background:
                                column.tasks.length < 1 ? "#2a2b30" : "#25262b",
                              borderRadius: 2,
                            }}
                            justifyContent={"space-between"}
                            color={"white"}
                            alignItems={"baseline"}
                            p={1}
                          >
                            <Typography
                              fontSize={"15px"}
                              fontWeight={500}
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
                            column.tasks.map((task, taskIndex) => (
                              <Draggable
                                key={task.id}
                                draggableId={task.id}
                                index={taskIndex}
                              >
                                {(provided) => (
                                  <Box
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    sx={{
                                      padding: 1,
                                      mt: 2,
                                      background: "#25262b",
                                      cursor: "move",
                                      borderRadius: 2,
                                      color: "#D2D2D2",
                                      "&:hover": {
                                        background: "transparent",
                                        border: "1px solid #424244",
                                      },
                                    }}
                                    data-task-id={task.id}
                                  >
                                    <Box
                                      width={"100%"}
                                      display={"flex"}
                                      justifyContent={"space-between"}
                                      alignItems={"center"}
                                      fontSize={"14px"}
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
                                      justifyContent={"space-between"}
                                      alignItems={"center"}
                                      mb={"3px"}
                                    >
                                      <Typography fontSize={"14px"}>
                                        Contact
                                      </Typography>
                                      <Typography
                                        fontSize={"14px"}
                                        color={"#8B8B8B"}
                                      >
                                        8345678990
                                      </Typography>
                                    </Box>
                                    <Box
                                      width={"100%"}
                                      display={"flex"}
                                      justifyContent={"space-between"}
                                      alignItems={"center"}
                                      mb={"3px"}
                                    >
                                      <Typography fontSize={"14px"}>
                                        Deal Value
                                      </Typography>
                                      <Typography
                                        fontSize={"14px"}
                                        color={"#8B8B8B"}
                                      >
                                        ₹73467
                                      </Typography>
                                    </Box>

                                    <Box
                                      width={"100%"}
                                      display={"flex"}
                                      justifyContent={"space-between"}
                                      alignItems={"center"}
                                      fontSize={"13px"}
                                      mb={"3px"}
                                    >
                                      <Typography fontSize={"14px"}>
                                        Next Step
                                      </Typography>
                                      <Typography
                                        fontSize={"14px"}
                                        color={"#8B8B8B"}
                                      >
                                        {columnIndex < columns.length - 1
                                          ? columns[columnIndex + 1].title
                                          : "No Next Step"}
                                      </Typography>
                                    </Box>
                                    <Box
                                      width={"100%"}
                                      display={"flex"}
                                      justifyContent={"center"}
                                      alignItems={"center"}
                                      fontSize={"13px"}
                                      my={"3px"}
                                    >
                                      <ProgressBar
                                        width={100}
                                        progression={
                                          column.title === "Lead Generation"
                                            ? 0
                                            : column.title === "Qualification"
                                            ? 20
                                            : column.title === "Demo"
                                            ? 40
                                            : column.title === "Proposal"
                                            ? 60
                                            : column.title === "Negotiation"
                                            ? 80
                                            : column.title === "Closure"
                                            ? 100
                                            : 0
                                        }
                                      />
                                    </Box>
                                    <Box
                                      width={"100%"}
                                      display={"flex"}
                                      justifyContent={"space-between"}
                                      alignItems={"center"}
                                      fontSize={"13px"}
                                      mb={"3px"}
                                      mt={"3px"}
                                    >
                                      <IconButton
                                        onClick={() => setShowLeadDetails(true)}
                                        sx={{ color: "#80FF00" }}
                                      >
                                        <InfoIcon />
                                      </IconButton>
                                      <img
                                        src="https://pub-c5e31b5cdafb419fb247a8ac2e78df7a.r2.dev/mock/assets/images/avatar/avatar-25.webp"
                                        className="h-8 w-8 mt-1 rounded-[50%]"
                                        style={{ border: "1px solid black" }}
                                      />
                                    </Box>
                                  </Box>
                                )}
                              </Draggable>
                            ))
                          ) : (
                            <Box width={"100%"} mt={1} p={1}>
                              <Box
                                // border={"1px dashed #8B8B8B"}
                                display={"flex"}
                                justifyContent={"center"}
                                alignItems={"center"}
                                borderRadius={2}
                                height={"60px"}
                              >
                                <Typography fontSize={"14px"} color={"white"}>
                                  Drop Here
                                </Typography>
                              </Box>
                            </Box>
                          )}
                          {snapshot.isDraggingOver && <SkeletonPlaceholder />}
                          {provided.placeholder}
                        </Box>
                      </Box>
                    )}
                  </Droppable>
                </Box>
              ))}
            </Box>
          </DragDropContext>
        </Box>
      </Dialog>
    </React.Fragment>
  );
}

const SkeletonPlaceholder = () => (
  <Box
    sx={{
      padding: 1,
      mt: 2,
      background: "#3a3b3f",
      borderRadius: 2,
      height: "170px", // Set a fixed height or make it dynamic based on your task card size
      color: "#D2D2D2",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "14px",
    }}
  >
    <Typography color={"#8B8B8B"}>Drop Here</Typography>
  </Box>
);
