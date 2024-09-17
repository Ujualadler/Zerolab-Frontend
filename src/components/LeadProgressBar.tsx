"use client";
import React from "react";
import { Box, Tooltip } from "@mui/material";

interface ProgressBarProps {
  total: number; // Total lead value percentage
  target: number; // Target percentage
  achieved: number; // Achieved percentage
  width: number; // Total width of the progress bar
}

export const LeadProgressBar: React.FC<ProgressBarProps> = ({
  total,
  target,
  achieved,
  width,
}) => {
  // Find the maximum value among total, target, and achieved
  const maxValue = Math.max(total, target, achieved);

  console.log(total, target, achieved);

  // Calculate the width of each bar relative to the maximum value, capped at 100%
  const totalWidth = (total / maxValue) * 100;
  const targetWidth = (target / maxValue) * 100;
  const achievedWidth = (achieved / maxValue) * 100;

  console.log(totalWidth);
  console.log(targetWidth);
  console.log(achievedWidth);

  // Create an array of widths to determine z-index values
  const widths = [
    { width: totalWidth, zIndex: 0 },
    { width: targetWidth, zIndex: 0 },
    { width: achievedWidth, zIndex: 0 },
  ];

  // Sort widths descending to assign z-index (highest width gets z-index 1, etc.)
  widths.sort((a, b) => b.width - a.width);

  // Assign z-index values
  widths[0].zIndex = 1; // Largest width gets z-index 1
  widths[1].zIndex = 2; // Middle width gets z-index 2
  widths[2].zIndex = 3; // Smallest width gets z-index 3

  // Extract the z-index values based on the sorted order
  const zIndexTotal = widths[0].width === totalWidth ? 1 : widths[1].width === totalWidth ? 2 : 3;
  const zIndexTarget = widths[0].width === targetWidth ? 1 : widths[1].width === targetWidth ? 2 : 3;
  const zIndexAchieved = widths[0].width === achievedWidth ? 1 : widths[1].width === achievedWidth ? 2 : 3;

  console.log(zIndexTotal, zIndexTarget, zIndexAchieved);

  return (
    <Tooltip
      title={`Total: ${total}%, Target: ${target}%, Achieved: ${achieved}%`}
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
        {/* Total Progression */}
        <Box
          sx={{
            width: `${totalWidth}%`,
            zIndex: zIndexTotal,
            borderRadius: "7px 0 0 7px",
            height: "100%",
            left: 0,
            backgroundColor: "#ffa500", // Fixed color for total
            transition: "width 0.5s ease-in-out",
            position: "absolute", // Needed to ensure proper stacking
          }}
        ></Box>

        {/* Target Progression */}
        <Box
          sx={{
            width: `${targetWidth}%`,
            zIndex: zIndexTarget,
            borderRadius: "0",
            height: "100%",
            left: 0,
            backgroundColor: "#ff5630", // Fixed color for target
            transition: "width 0.5s ease-in-out",
            position: "absolute",
          }}
        ></Box>

        {/* Achieved Progression */}
        <Box
          sx={{
            width: `${achievedWidth}%`,
            zIndex: zIndexAchieved,
            borderRadius: "0 7px 7px 0",
            height: "100%",
            left: 0,
            backgroundColor: "#00a76f", // Fixed color for achieved
            transition: "width 0.5s ease-in-out",
            position: "absolute",
          }}
        ></Box>
      </Box>
    </Tooltip>
  );
};
