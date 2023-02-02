import * as React from "react";
import { TextField, InputAdornment, Box } from "@mui/material";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import { Icon } from "../";
import "./SelectAutocomplete.scss";

export default function SelectAutocomplete({
  style,
  icon,
  label,
  options,
  handler,
  initualValue
}) {
  const [value, setValue] = React.useState(initualValue);
  const [inputValue, setInputValue] = React.useState("");
  // console.log(options);
  console.log('Valor de ' + style + ': ' + inputValue)

  return (
    <Autocomplete
      value={e.target.value}
      onChange={(event, newValue) => {
        setValue(newValue);
        if (style === "origin") {
          handler(newValue?.ID_Localidad || null);
        } else if (style === "destination" && newValue !== null) {
          handler(newValue.id_localidad_destino);
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
        style === "origin"
          ? (option) => option.Localidad ?? option
          : (option) => option.hasta ?? option
      }
      options={options}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Icon code={"MdOutlineLocationOn"} />
          <Box
            sx={{
              flexGrow: 1,
              "& span": {
                color: "#586069",
              },
            }}
          >
            {style === "origin" ? option.Localidad : option.hasta}
            <br />
          </Box>
        </li>
      )}
      renderInput={(params) => (
        <div
          style={{
            position: "relative",
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
