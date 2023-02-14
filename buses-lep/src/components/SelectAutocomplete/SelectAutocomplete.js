import React,{ useEffect } from "react";
import { TextField, InputAdornment, Box, Popper, Paper } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { useTheme } from "../../context/themeContext";
import "./SelectAutocomplete.scss";
import {Icon} from "..";

export default function SelectAutocomplete({
  styleOption,
  icon,
  label,
  options,
  handler,
  initialValue,
}) {
  const [value, setValue] = React.useState(initialValue);
  const [inputValue, setInputValue] = React.useState("");
  const { theme } = useTheme();

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const rootLight = {
    fontSize: 18,
    backgroundColor: "#FFF",
    "& li": {
      display: "flex",
      color: "#35373A",
    },
  };
  const rootDark = {
    fontSize: 18,
    backgroundColor: "#35373A",
    "& li": {
      display: "flex",
      color: "#FFF",
    },
  };

  const CustomPaper = (props) => {
    return <Paper {...props} sx={{ width: 300 }} />;
  };
  const CustomPopper = (props) => {
    return <Popper {...props} sx={{ width: 300 }} />;
  };

  return (
    <Autocomplete
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
        if (styleOption === "origin") {
          handler(newValue || null);
        } else if (styleOption === "destination") {
          handler(newValue || null);
        } else if (styleOption === "offices") {
          handler(newValue);
        }
      }}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      className={`selectAutocomplete col-12 col-lg-6 pb-3 pb-lg-0 ${styleOption}`}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      id="destiny"
      getOptionLabel={
        styleOption === "destination"
          ? (option) => option.hasta ?? option
          : (option) => option.Localidad ?? option
      }
      PopperComponent={CustomPopper}
      PaperComponent={CustomPaper}
      ListboxProps={{ sx: theme === "dark" ? rootDark : rootLight }}
      options={options}
      renderOption={(props, option) => (
        <li {...props}>
          {styleOption === "offices" ? (
            <Icon code={"MdOutlineLocationOn"} />
          ) : (
            icon
          )}
          <Box
            sx={{
              lineHeight: "20px",
              padding: ".5rem 1rem",
              "& span": {
                color: "#586069",
                backgroundColor: "#35373A",
              },
            }}
          >
            <p style={{ fontSize: "18px", margin: "0", padding: "0" }}>
              {styleOption === "destination" ? option.hasta : option.Localidad}
            </p>
            {option.Boleteria_Ubicacion != null ? (
              <small
                style={{
                  fontSize: "12px",
                  marginBottom: "0",
                  lineHeight: "2px",
                }}
              >
                {option.Boleteria_Ubicacion}
              </small>
            ) : (
              <></>
            )}
          </Box>
        </li>
      )}
      renderInput={(params) => (
        <div
          style={{
            position: "relative",
            color: "#586069",
          }}
        >
          <InputAdornment position="start" className={styleOption}>
            {icon}
          </InputAdornment>
          <TextField {...params} label={label} />
        </div>
      )}
    />
  );
}
