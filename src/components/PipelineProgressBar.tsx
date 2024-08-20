"use client";
import React from "react";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface ProgressTooltipProps {
  width: number; // Percentage of width for the inner box
  percentage: number; // Percentage of width for the inner box
  title: string; // Tooltip title
  // Tooltip title
}

const PipelineProgressbar: React.FC<ProgressTooltipProps> = ({
  width,
  title,
  percentage,
}) => {
  return (
    <Tooltip title={`${percentage}%`}>
      <Box
        sx={{
          width: `${width}%`,
          borderRadius: "7px",
          backgroundColor: "#03383D",
          height: "30px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: `${percentage}%`,
            borderRadius: "7px",
            height: "100%",
            display: "flex",
            alignItems: "center",
            px: 2,
            backgroundColor:
              title === "Closed"
                ? "#4D9900"
                : title === "Rejected"
                ? "#E53939"
                : "#00B2FF",
            transition: "width 0.5s ease-in-out",
          }}
        >
          <Typography className="text-white text-xs">{title}</Typography>
        </Box>
      </Box>
    </Tooltip>
  );
};

export default PipelineProgressbar;




