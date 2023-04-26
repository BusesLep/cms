import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";

import { Icon } from "./index";

export default function ComboBox({ list }) {
  const [value, setValue] = React.useState("");
  const [inputValue, setInputValue] = React.useState("");

  return (
    <div>
      <div>{`value: ${
        value !== null ? `'${value.ID_Localidad}'` : "null"
      }`}</div>
      <div>{`inputValue: '${inputValue}'`}</div>
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        hiddenLabel
        disablePortal
        id="combo-box-demo"
        getOptionLabel={(option) => option.Localidad ?? option}
        options={list}
        sx={{ width: 300, fontSize: 25 }}
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
              {option.Localidad}
              <br />
            </Box>
          </li>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Origen"
            icon={<Icon code="FaBeer"></Icon>}
          />
        )}
      />
    </div>
  );
}
