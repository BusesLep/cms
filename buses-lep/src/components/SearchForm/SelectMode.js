import React from "react";
import {
  Select,
  MenuItem,
} from "@mui/material";
import { Icon } from "../";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import { useTheme } from "../../context/themeContext";

export default function SlectNode({
isDateTimeEnabled,
handleOptionChange,
}) {
  const { theme } = useTheme();

    return(
         <div className="selectMode">
          {isDateTimeEnabled === "true" ? (
            <Icon code={"MdCompareArrows"}></Icon>
          ) : (
            <Icon code={"MdArrowRightAlt"}></Icon>
          )}
          <Select
            name="selectMode"
            id=""
            IconComponent={ExpandMoreOutlinedIcon}
            value={isDateTimeEnabled}
            onChange={handleOptionChange}
            sx={{
              color: theme === "dark" && "#ffffff",
              boxShadow: "none",
              ".MuiOutlinedInput-notchedOutline": { border: "0 !important" },
              ".MuiOutlinedInput-input": {
                paddingBottom: "14px",
                paddingLeft: "5px",
              },
              ".MuiSvgIcon-root ": {
                fill: "#1A73E8",
              },
            }}
            inputProps={{
              MenuProps: {
                MenuListProps: {
                  sx: {
                    backgroundColor: theme === "dark" && "#35373A",
                    color: theme === "dark" && "#ffffff",
                  },
                },
              },
            }}
          >
            <MenuItem value={"true"}>Ida y vuelta</MenuItem>
            <MenuItem value={"false"}>Solo ida</MenuItem>
          </Select>
        </div>
    )
}