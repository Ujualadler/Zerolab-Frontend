"use client";

import React, { useRef, FC } from "react";
import {
  Box,
  IconButton,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";

import { DateRange } from "react-date-range";
import { endOfMonth, subDays, subMonths } from "date-fns";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css";
import Close from "@mui/icons-material/Close";
import { Fascinate } from "next/font/google";

interface DateCalendarComponentProps {
  show: (value: boolean) => void;
  open: boolean;
  dates: { startDate: Date; endDate: Date; key: string };
  setDates: (dates: { startDate: Date; endDate: Date; key: string }) => void;
  dateOption: string;
  setDateOption: (option: string) => void;
}

const DateCalendarComponent: FC<DateCalendarComponentProps> = ({
  show,
  open,
  dates,
  setDates,
  dateOption,

  setDateOption,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleClose = () => show(false);

  const handleDateChange = (item: any) => {
    setDates(item.selection);
  };

  console.log(dates);

  const modalStyle = {
    position: "absolute" as "absolute",
    top: 50,
    right: { sm: 0, xs: -50 },
    width: "340px",
    bgcolor: "white",
    color: "black",
    borderRadius: 2,
    boxShadow: 24,
    p: "0px 4px 0px 4px",
    // maxHeight: "300px",
    // overflow: "auto",
    zIndex: 300,
  };

  // Handler function to handle date range changes
  const handleChange = (event: SelectChangeEvent<string>) => {
    const option = event.target.value as string;
    setDateOption(option);

    const today = new Date();
    let startDate: Date;
    let endDate: Date = endOfMonth(today); // Default end date is the end of the current month

    switch (option) {
      case "lastMonth":
        startDate = subMonths(today, 1);
        startDate.setDate(1); // First day of last month
        endDate = endOfMonth(today); // Last day of last month
        break;
      case "last3Months":
        startDate = subMonths(today, 3);
        startDate.setDate(1); // First day of the month three months ago
        endDate = endOfMonth(today); // End of the current month
        break;
      case "last6Months":
        startDate = subMonths(today, 6);
        startDate.setDate(1); // First day of the month six months ago
        endDate = endOfMonth(today); // End of the current month
        break;
      case "lastYear":
        startDate = subMonths(today, 12);
        startDate.setDate(1); // First day of the month twelve months ago
        endDate = endOfMonth(today); // End of the current month
        break;
      case "custom":
        return; // Don't update dates, let the user select a custom range
      default:
        return; // No action for unexpected cases
    }

    setDates({
      startDate,
      endDate,
      key: "selection",
    });
  };

  return (
    <Box sx={modalStyle} ref={wrapperRef}>
      <Box display={"flex"} justifyContent={"end"} alignItems={"center"}>
        <IconButton onClick={handleClose} size="small">
          <Close fontSize="small" />
        </IconButton>
      </Box>

      <Select
        fullWidth
        sx={{
          color: "black",
          border: `1px solid white`,
          height: "50px",
          mb: "4px",
        }}
        value={dateOption}
        placeholder="select date"
        onChange={handleChange}
      >
        <MenuItem value="lastMonth">Last Month</MenuItem>
        <MenuItem value="last3Months">Last 3 Months</MenuItem>
        <MenuItem value="last6Months">Last 6 Months</MenuItem>
        <MenuItem value="lastYear">Last Year</MenuItem>
        <MenuItem value="custom">Custom Date</MenuItem>
      </Select>
      {dateOption === "custom" && (
        <DateRange
          onChange={handleDateChange}
          moveRangeOnFirstSelection={false}
          scroll={{ enabled: false }}
          color="black"
          months={1}
          ranges={[dates]}
          direction="vertical"
        />
      )}
    </Box>
  );
};

export default DateCalendarComponent;
