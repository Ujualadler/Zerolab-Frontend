"use client";
import React from "react";
import { Box, Tooltip } from "@mui/material";

interface ProgressBarProps {
  progression1: number; // First progression percentage
  progression2: number; // Second progression percentage
  width: number; // Total width of the progress bar
}

export const LeadProgressBar: React.FC<ProgressBarProps> = ({
  progression1,
  progression2,
  width,
}) => {
  // Cap the progressions to 100 if they exceed
  const cappedProgression1 = Math.min(progression1, 100);
  const cappedProgression2 = Math.min(progression2, 100);

  // Ensure both bars are visible even if one progression is greater than 100
  const visibleProgression1 = Math.min(progression1, 100);
  const visibleProgression2 = Math.min(progression2, 100 - visibleProgression1);

  return (
    <Tooltip
      title={`Progress 1: ${cappedProgression1}%, Progress 2: ${cappedProgression2}%`}
    >
      <Box
        sx={{
          width: `${width}%`,
          borderRadius: "7px",
          backgroundColor: "#3a3b41",
          height: "7px",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          position: "relative",
        }}
      >
        {/* First Progression */}
        <Box
          sx={{
            width: `${visibleProgression1}%`,
            borderRadius: "7px 0 0 7px",
            height: "100%",
            backgroundColor: "#00a76f", // Fixed color for first progression
            transition: "width 0.5s ease-in-out",
          }}
        ></Box>

        {/* Second Progression */}
        <Box
          sx={{
            width: `${visibleProgression2}%`,
            borderRadius:
              visibleProgression1 + visibleProgression2 >= 100
                ? "0 7px 7px 0"
                : "0",
            height: "100%",
            backgroundColor: "#ff5630", // Fixed color for second progression
            transition: "width 0.5s ease-in-out",
            position: "absolute",
            left: `${visibleProgression1}%`,
          }}
        ></Box>
      </Box>
    </Tooltip>
  );
};
