"use client";
import React from "react";
import { Box, Tooltip } from "@mui/material";

interface ProgressBarProps {
  progression: number;
  width: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progression,
  width,
}) => {
  return (
    <Tooltip title={`${progression}%`}>
      <Box
        sx={{
          width: `${width}%`,
          borderRadius: "7px",
          backgroundColor: "#3a3b41",
          height: "7px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: `${progression}%`,
            borderRadius: "7px",
            height: "100%",
            backgroundColor:
              progression < 30
                ? "#ff5630"
                : progression < 80
                ? "rgb(255, 171, 0)"
                : "rgb(0, 167, 111)",
            transition: "width 0.5s ease-in-out",
          }}
        ></Box>
      </Box>
    </Tooltip>
  );
};
