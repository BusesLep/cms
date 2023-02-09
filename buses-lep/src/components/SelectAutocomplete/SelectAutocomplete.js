import React, { useStyles } from "react";
import { TextField, InputAdornment, Box, Popper, Paper } from "@mui/material";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import { useTheme } from "../../context/themeContext";
import { Icon } from "../";
import "./SelectAutocomplete.scss";

export default function SelectAutocomplete({
  style,
  icon,
  label,
  options,
  handler,
}) {
  const [value, setValue] = React.useState("");
  const [inputValue, setInputValue] = React.useState("");
  const { theme } = useTheme();

  const rootLight = {
    fontSize: 18,
    backgroundColor: "#FFF",
    "& li": {
      //list item specific styling
      display: "flex",
      color: "#35373A",
    },
  };
  const rootDark = {
    fontSize: 18,
    backgroundColor: "#35373A",
    "& li": {
      //list item specific styling
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
        if (style === "origin") {
          handler(newValue?.ID_Localidad || null);
        } else if (style === "destination" && newValue !== null) {
          handler(newValue.id_localidad_destino);
        } else if (style === "offices") {
          handler(newValue);
        }
      }}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      className={`selectAutocomplete col-12 col-lg-6 pb-3 pb-lg-0 ${style}`}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      id="destiny"
      getOptionLabel={
        style === "destination"
          ? (option) => option.hasta ?? option
          : (option) => option.Localidad ?? option
      }
      PopperComponent={CustomPopper}
      PaperComponent={CustomPaper}
      ListboxProps={{ sx: theme === "dark" ? rootDark : rootLight }}
      options={options}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Icon code={"MdOutlineLocationOn"} />
          <Box
            sx={{
              flexGrow: 1,
              "& span": {
                color: "#586069",
                backgroundColor: "#35373A",
              },
            }}
          >
            {style === "destination" ? option.hasta : option.Localidad}
            <br />
            {option.Boleteria_Ubicacion != null ? (
              <small>{option.Boleteria_Ubicacion}</small>
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
          <InputAdornment position="start" className={style}>
            {icon}
          </InputAdornment>
          <TextField {...params} label={label} />
        </div>
      )}
    />
  );
}
