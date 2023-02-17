import React from "react";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import moment from "moment";
import { TextField } from "@mui/material";
import { useTheme } from "../../context/themeContext";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

export default function DatePicker({
  goDateValue,
  handleGoDateChange,
  returnDateValue,
  handleReturnDateChange,
  isDateTimeEnabled,
}) {
  const { theme } = useTheme();

  const popperSxDatePicker = {
    "& .MuiPaper-root": {
      color: "#ffffff",
    },
    "& .MuiCalendarPicker-root": {
      backgroundColor: "#35373A",
      color: "#ffffff",
    },
    "& .MuiPickersDay-dayWithMargin": {
      color: "rgb(229,228,226)",
      backgroundColor: "#5F6368",
    },
    "& .MuiTabs-root": { backgroundColor: "#ffffff" },
    "& .MuiTypography-root": { color: "#ffffff" },
    "& .MuiSvgIcon-root": { color: "#ffffff" },
  };

  moment.locale("es");

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <DesktopDatePicker
        label="Fecha salida"
        inputFormat="DD/MM/YYYY"
        value={goDateValue}
        onChange={handleGoDateChange}
        renderInput={(params) => <TextField {...params} />}
        minDate={new Date()}
        className="col-12 col-lg-3 mb-3 mb-lg-0 ps-lg-3"
        PopperProps={{
          sx: theme === "dark" && popperSxDatePicker,
        }}
      />{" "}
      <DesktopDatePicker
        label="Fecha regreso"
        inputFormat="DD/MM/YYYY"
        value={returnDateValue}
        onChange={handleReturnDateChange}
        renderInput={(params) => <TextField {...params} />}
        disabled={isDateTimeEnabled === "false"}
        minDate={goDateValue}
        className="col-12 col-lg-3 mb-3 mb-lg-0 ps-lg-3"
        PopperProps={{
          sx: theme === "dark" && popperSxDatePicker,
        }}
      />
    </LocalizationProvider>
  );
};
