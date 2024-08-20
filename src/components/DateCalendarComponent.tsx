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
import { subDays, subMonths } from "date-fns";
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

  const handleChange = (event: SelectChangeEvent<string>) => {
    const option = event.target.value as string;
    setDateOption(option);
    const today = new Date();
    switch (option) {
      case "today":
        setDates({ startDate: today, endDate: today, key: "selection" });
        break;
      case "yesterday":
        const yesterday = subDays(today, 1);
        setDates({
          startDate: yesterday,
          endDate: yesterday,
          key: "selection",
        });
        break;
      case "last7days":
        setDates({
          startDate: subDays(today, 6),
          endDate: today,
          key: "selection",
        });
        break;
      case "lastMonth":
        const startLastMonth = subMonths(today, 1);
        startLastMonth.setDate(1); // Set to the first day of last month
        const endLastMonth = new Date(
          startLastMonth.getFullYear(),
          startLastMonth.getMonth() + 1,
          0
        ); // Last day of last month
        setDates({
          startDate: startLastMonth,
          endDate: endLastMonth,
          key: "selection",
        });
        break;
      case "last6Months":
        const startLast6Months = subMonths(today, 6);
        startLast6Months.setDate(1); // Set to the first day of 6 months ago
        const endLast6Months = new Date(
          today.getFullYear(),
          today.getMonth() + 1,
          0
        ); // End of the current month
        setDates({
          startDate: startLast6Months,
          endDate: endLast6Months,
          key: "selection",
        });
        break;
      case "custom":
        // do not update dates here to let the user select custom range
        break;
    }
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
        <MenuItem value="today">Today</MenuItem>
        <MenuItem value="yesterday">Yesterday</MenuItem>
        <MenuItem value="last7days">Last 7 Days</MenuItem>
        <MenuItem value="lastMonth">Last Month</MenuItem>
        <MenuItem value="last6Months">Last 6 Months</MenuItem>
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
