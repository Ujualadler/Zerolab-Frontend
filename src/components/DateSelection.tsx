"use client";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState, FC } from "react";
import DateCalendarComponent from "./DateCalendarComponent";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

interface DateSelectionProps {
  dates: { startDate: Date; endDate: Date; key: string };
  setDates: (dates: { startDate: Date; endDate: Date; key: string }) => void;
}

const DateSelection: FC<DateSelectionProps> = ({ dates, setDates }) => {
  const [assignmentCalendar, setAssignmentCalendar] = useState(false);
  const [dateOption, setDateOption] = useState("last6Months");

  const formatDate = (dateString: Date): string => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-indexed
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleClose = () => {
    setAssignmentCalendar(!assignmentCalendar);
  };

  return (
    <Box position={"relative"}>
      <Box
        onClick={handleClose}
        sx={{
          cursor: "pointer",
          padding: "5px",
          width: "10.7rem",
          background: '#1F3635',
          color: "white",
          display:'flex',
          justifyContent:'center',
          alignItems:'center',
          borderRadius: 1,
        }}
      >
        <Box display={'flex'} gap={'1px'} alignItems={'center'}>
        <Typography fontSize={"12px"}>
          {dates.startDate === dates.endDate
            ? formatDate(dates.startDate)
            : formatDate(dates.startDate) + " to " + formatDate(dates.endDate)}
        </Typography>
          <ArrowDropDownIcon fontSize="small"/>
        </Box>
      </Box>
      {assignmentCalendar && (
        <DateCalendarComponent
          open={assignmentCalendar}
          show={setAssignmentCalendar}
          dates={dates}
          setDates={setDates}
          dateOption={dateOption}
          setDateOption={setDateOption}
        />
      )}
    </Box>
  );
};

export default DateSelection;
