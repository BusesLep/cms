import React from "react";
import { TextField, InputAdornment, Box, Popper, Paper } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { useTheme } from "../../context/themeContext";
import "./SelectAutocomplete.scss";
import { useEffect } from "react";

export default function SelectAutocomplete({
  style,
  icon,
  label,
  options,
  handler,
  initialValue
}) {
  const [value, setValue] = React.useState(initialValue);
  const [inputValue, setInputValue] = React.useState("");
  const { theme } = useTheme();

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue])
  

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
        if (style === "origin") {
          handler(newValue || null);
        } else if (style === "destination") {
          handler(newValue || null);
        } else if (style === "offices") {
          handler(newValue);
  }}}
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
           {icon}
          {/* <Icon code={"MdOutlineLocationOn"} style={{ fontSize: "18px",  padding: "2rem" , backgroundColor: 'red' }}/> */}
          <Box
            sx={{
              lineHeight: '16px',
              padding: '.5rem 1rem',
              "& span": {
                color: "#586069",
                backgroundColor: "#35373A",
              },
            }}
          >
            <p style={{ fontSize: "18px", margin: "0", padding: "0" }}>{style === "destination" ? option.hasta : option.Localidad}</p>
            {option.Boleteria_Ubicacion != null ? (
              <small style={{ fontSize: "12px", marginBottom: "0",  lineHeight: '2px', }}>
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
          <InputAdornment position="start" className={style}>
            {icon}
          </InputAdornment>
          <TextField {...params} label={label} />
        </div>
      )}
    />
  );
}
