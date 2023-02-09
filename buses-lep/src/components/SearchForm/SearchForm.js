import React, { useState, useEffect } from "react";
import "./SearchForm.scss";
import { Icon, SelectAutocomplete } from "../";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import moment from "moment";
import MomentUtils from "@date-io/moment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  Popper,
  Paper,
  Stack,
  Grid,
  Typography,
  Fade,
} from "@mui/material";

import "moment/locale/es";
import useOrigin from "../../hooks/useOrigin";
import { useTheme } from "../../context/themeContext";
import { convertLength } from "@mui/material/styles/cssUtils";

export default function SearchForm() {
  const origins = useOrigin().allOrigin.nodes;
  const [goDateValue, setGoDateValue] = useState(null);
  const [returnDateValue, setReturnDateValue] = useState(null);
  const [isDateTimeEnabled, setIsDateTimeEnabled] = useState(true);
  const [destinations, setDestinations] = useState(null);
  const [passengers, setPassengers] = useState(1);
  const [selectedDestination, setSelectedDestination] = useState("");
  const [selectedOrigin, setSelectedOrigin] = useState("");
  const [reset, setReset] = useState(false);
  const { theme } = useTheme();

  const [quantity, setQuantity] = useState({
    age1: 0,
    age2: 0,
    age3: 0,
    age4: 0,
    total: 0,
  });
  console.log(quantity);
  const [total, setTotal] = useState(0);

  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const ageGroups = [
    { title: "Adultos", key: "age1" },
    { title: "Niños de 0 a 4 años", key: "age2" },
    { title: "Niños de 0 a 4 años", subtitle: "Sin asiento", key: "age3" },
    { title: "Niños de 5 a 12 años", subtitle: "Sin asiento", key: "age4" },
  ];

    const sumTotalAndClose = () => {
    setOpen(false);
    setQuantity((prev) => ({
      ...prev,
      total: prev.age1 + prev.age2 + prev.age3 + prev.age4,
    }));
  };

  const ageGroupsArea = ageGroups.map((group) => {
    return (
      <Grid container sx={{ padding: "15px" }} key={group.key}>
        <Grid item xs={7} sx={{ display: "flex", alignItems: "center" }}>
          <Typography paragraph={false} sx={{ p: 0 }}>
            {group.title}
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Button
            sx={{ minWidth: "35px", padding: "6px" }}
            variant="contained"
            onClick={() =>
              setQuantity({ ...quantity, [group.key]: quantity[group.key] - 1 })
            }
            disabled={quantity[group.key] === 0}
          >
            -
          </Button>
        </Grid>
        <Grid
          item
          xs={1}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography paragraph={false} sx={{ p: 0, minWidth: "20px" }}>
            {quantity[group.key]}
          </Typography>
        </Grid>
        <Grid xs={2}>
          <Button
            sx={{ minWidth: "35px", padding: "6px" }}
            variant="contained"
            className="counterButton"
            onClick={() =>
              setQuantity({ ...quantity, [group.key]: quantity[group.key] + 1 })
            }
          >
            +
          </Button>
        </Grid>
      </Grid>
    );
  });

  // const handlePersonsClick = (event) => {
  //   setOpen((prev) => !prev);
  //   setAnchorEl(event.currentTarget);
  // };

  // const handlePersonsClose = () => {
  //   setOpen(false);
  //   setQuantity((prev) => ({
  //     ...prev,
  //     total: prev.group1 + prev.group2 + prev.group3,
  //   }));
  // };

  // const addQuantity = (group) => {
  //   setQuantity((prev) => ({
  //     ...prev,
  //     [group]: prev[group] + 1,
  //   }));
  // };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => !prev);
  };

  // console.log(selectedOrigin, "selectedOrigin");
  // console.log(selectedDestination, "selectedDestination");

  const fetchDestinations = async (id) => {
    console.log(id, "id");
    if (id !== null) {
      try {
        const response = await fetch(
          "http://localhost:8080/localidades/hasta?IDlocalidadOrigen=" + id
        );
        const data = await response.json();
        setDestinations(data);
        setSelectedOrigin(id);
        setReset(false);
      } catch (error) {
        console.log(error);
      }
    } else {
      setSelectedOrigin(null);
      setDestinations(null);
      // setReset(true);
    }
  };

  const sendData = (event) => {
    event.preventDefault();
    console.log("destination: " + destinations);
    console.log(
      "http://localhost/?desde=" +
        selectedOrigin +
        "&?hasta=" +
        selectedDestination +
        "&?ida=" +
        String(returnDateValue) +
        "&?regreso=" +
        String(returnDateValue) +
        "&?cant=" +
        passengers
    );
  };

  const handleGoDateChange = (newValue) => {
    setGoDateValue(newValue);
  };

  const handleReturnDateChange = (newValue) => {
    setReturnDateValue(newValue);
  };

  const handleOptionChange = (event) => {
    setIsDateTimeEnabled(event.target.value === "true");
  };
  const handlePassengers = (event) => {
    setPassengers(event.target.value);
  };

  const changeDestination = (event) => {
    // setSelectedOrigin(selectedDestination);
    // setSelectedDestination(selectedOrigin);
    fetchDestinations(selectedDestination);
  };

  moment.locale("es");

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

  return (
    <form onSubmit={sendData} className="searchForm">
      <div className="selectContainer">
        <div className="selectMode">
          <Icon code={"MdCompareArrows"}></Icon>
          <Select
            name="selectMode"
            id=""
            className=""
            value={isDateTimeEnabled}
            onChange={handleOptionChange}
            sx={{
              boxShadow: "none",
              ".MuiOutlinedInput-notchedOutline": { border: "0 !important" },
              ".MuiOutlinedInput-input": {
                paddingBottom: "14px",
                paddingLeft: "10px",
              },
              ".css-1xryphn-MuiInputBase-root-MuiOutlinedInput-root-MuiSelect-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                { borderWidth: 0 },
            }}
          >
            <MenuItem value={true}>Ida y vuelta</MenuItem>
            <MenuItem value={false}>Solo ida</MenuItem>
          </Select>
        </div>
        <div className="selectPeopleQuantity">
          <Icon code={"MdPerson"}></Icon>

          <Button onClick={handleClick}>0</Button>
          <Popper
            open={open}
            anchorEl={anchorEl}
            transition
            placement="bottom-start"
            sx={{
              zIndex: 1000,
              width: 330,
            }}
          >
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={350}>
                <Paper>
                  {ageGroupsArea}
                  <Stack spacing={1} direction="row" sx={{justifyContent: "end", padding:"10px"}}>
                    <Button variant="text">Aceptar</Button>
                    <Button variant="text">Cancelar</Button>
                  </Stack>
                </Paper>
              </Fade>
            )}
          </Popper>

          {/* <select name="" id="" value={passengers} onChange={handlePassengers}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
          </select> */}
        </div>
      </div>

      <div className="searchContainer d-flex flex-wrap">
        <div className="searchBars col-12 col-lg-6 d-flex flex-wrap">
          <SelectAutocomplete
            icon={<Icon code={"MdOutlineTripOrigin"}></Icon>}
            style="origin"
            label={"Origen"}
            options={origins}
            handler={fetchDestinations}
          />
          <div className="changeDestiny">
            {/* <p className="d-block d-lg-none">Intercambiar Origen/Destino</p> */}
            <Button variant="contained" onClick={changeDestination}>
              <Icon code={"MdSyncAlt"}></Icon>
            </Button>
          </div>

          <SelectAutocomplete
            icon={<Icon code={"MdOutlineLocationOn"}></Icon>}
            style="destination"
            label={"¿A dónde viajas?"}
            options={
              destinations !== null && destinations !== undefined
                ? destinations
                : [{ hasta: "Debe seleccionar origen" }]
            }
            handler={setSelectedDestination}
            // reset={reset}
          />
        </div>
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
            disabled={!isDateTimeEnabled}
            minDate={new Date()}
            className="col-12 col-lg-3 mb-3 mb-lg-0 ps-lg-3"
            PopperProps={{
              sx: theme === "dark" && popperSxDatePicker,
            }}
          />
        </LocalizationProvider>
      </div>
      <div className="buttonContainer">
        <button type="submit">BUSCAR</button>
      </div>
    </form>
  );
}

// import React, { useState, useEffect } from "react";
// import Autocomplete from "@mui/material/Autocomplete";
// import { TextField } from "@mui/material";
// import useOrigin from "../../hooks/useOrigin";

// function SearchForm() {
//   const origins = useOrigin().allOrigin.nodes;
//   const [firstAutocompleteValue, setFirstAutocompleteValue] = useState(null);
//   const [secondAutocompleteValue, setSecondAutocompleteValue] = useState("");
//   const [inputValue, setInputValue] = useState("");
//   const [destinations, setDestinations] = useState([]);

//   useEffect(() => {
// console.log(firstAutocompleteValue, "id")

//     if (!firstAutocompleteValue) {
//       setDestinations([]);
//       return;
//     }

//     const fetchData = async () => {
//       try {
//         const response = await fetch(
//           "http://localhost:8080/localidades/hasta?IDlocalidadOrigen=" + firstAutocompleteValue
//         );
//         const data = await response.json();
//         setDestinations(data);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     fetchData();
//   }, [firstAutocompleteValue]);

//   return (
//     <form>
//       <Autocomplete
//         options={origins}
//         getOptionLabel={(option) => {
//           return option.Localidad
//         }}
//         value={firstAutocompleteValue}
//         onChange={(event, newValue) => {
//           console.log(newValue);
//           setFirstAutocompleteValue(newValue?.ID_Localidad || null);
//         }}
//         renderInput={(params) => (
//           <TextField {...params} label="Choose an option" variant="outlined" />
//         )}
//         inputValue={inputValue}
//         onInputChange={(event, newInputValue) => {
//           setInputValue(newInputValue);
//         }}
//       />

//       <Autocomplete
//         options={
//           destinations !== null && destinations !== undefined
//             ? destinations
//             : [{ hasta: "Debe seleccionar origen" }]
//         }
//         getOptionLabel={(option) => option.hasta}
//         // value={secondAutocompleteValue}
//         // onChange={(event, newValue) => {
//         //   setSecondAutocompleteValue(newValue);
//         // }}
//         inputValue={inputValue}
//         onInputChange={(event, newInputValue) => {
//           setInputValue(newInputValue);
//         }}
//         renderInput={(params) => (
//           <TextField
//             {...params}
//             label="Choose an option"
//             variant="outlined"
//             disabled={destinations.length === 0}
//           />
//         )}
//       />
//     </form>
//   );
// }

// export default SearchForm;
