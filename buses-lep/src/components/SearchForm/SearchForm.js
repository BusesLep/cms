import React, { useState } from "react";
import "./SearchForm.scss";
import { Icon, SelectAutocomplete } from "../";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import moment from "moment";
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
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
// import { makeStyles } from "@material-ui/core/styles";
import "moment/locale/es";
import useOrigin from "../../hooks/useOrigin";
import { useTheme } from "../../context/themeContext";

export default function SearchForm() {
  const origins = useOrigin().allOrigin.nodes;
  const [goDateValue, setGoDateValue] = useState(null);
  const [returnDateValue, setReturnDateValue] = useState(null);
  const [isDateTimeEnabled, setIsDateTimeEnabled] = useState("true");
  const [destinations, setDestinations] = useState(null);
  const [initialOriginValue, setInitialOriginValue] = useState(null);
  const [initialDestinationValue, setInitialDestinationValue] = useState(null);
  const { theme } = useTheme();
  const [quantity, setQuantity] = useState({
    age1: 0,
    age2: 0,
    age3: 0,
    age4: 0,
    total: 0,
  });

  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const ageGroups = [
    { title: "Adultos", key: "age1" },
    { title: "Niños de 5 a 12 años", key: "age2" },
    { title: "Niños de 0 a 4 años", subtitle: "Sin asiento", key: "age3" },
    { title: "Niños de 0 a 4 años", subtitle: "Sin asiento", key: "age4" },
  ];

  const sumTotalAndClose = () => {
    setOpen(false);
    setQuantity((prev) => ({
      ...prev,
      total: prev.age1 + prev.age2 + prev.age3 + prev.age4,
    }));
  };

  const cleanPersons = () => {
    setOpen(false);
    setQuantity((prev) => prev);
  };

  const ageGroupsArea = ageGroups.map((group) => {
    return (
      <Grid
        container
        sx={{ padding: "10px", display: "flex", alignItems: "center" }}
        key={group.key}
      >
        <Grid
          item
          xs={7}
          sx={{ display: "flex", alignSelf: "center", padding: "5px" }}
          direction="column"
        >
          <Typography sx={{ p: 0 }}>{group.title}</Typography>
          {group.subtitle && (
            <Typography sx={{ p: 0, fontSize: "12px" }}>
              {group.subtitle}
            </Typography>
          )}
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

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => !prev);
  };

  const fetchDestinations = async (value) => {
    setInitialOriginValue(value);
    if (value !== null) {
      try {
        const response = await fetch(
          "http://localhost:8080/localidades/hasta?IDlocalidadOrigen=" +
            value.ID_Localidad
        );
        const data = await response.json();
        setDestinations(data);
        if (
          destinations !== null &&
          initialDestinationValue !== null &&
          !data.some((e) => {
            return e.id_localidad_origen === value.ID_Localidad;
          })
        ) {
          alert("No existe este destino");
        }
        setInitialDestinationValue(null);
      } catch (error) {
        console.log(error);
      }
    } else {
      setDestinations(null);
      setInitialDestinationValue(null);
    }
  };

  const handleDestination = (value) => {
    if (value === null) {
      setInitialDestinationValue(null);
    } else {
      setInitialDestinationValue(value);
    }
  };

  const sendData = (event) => {
    event.preventDefault();
    console.log(
      "http://localhost/?desde=" +
        initialOriginValue.ID_Localidad +
        "&?hasta=" +
        initialDestinationValue.id_localidad_destino +
        "&?ida=" +
        String(returnDateValue) +
        "&?regreso=" +
        String(returnDateValue)
    );
  };

  const handleGoDateChange = (newValue) => {
    setGoDateValue(newValue);
  };

  const handleReturnDateChange = (newValue) => {
    setReturnDateValue(newValue);
  };

  const handleOptionChange = (event) => {
    setIsDateTimeEnabled(event.target.value);
  };

  const changeDestination = async () => {
    console.log(initialDestinationValue, "init destination valie");

    const tempDataOrigin = {
      ID_Localidad: initialDestinationValue.id_localidad_destino,
      Localidad: initialDestinationValue.hasta,
    };

    const tempDataDestination = {
      Lat: 0,
      Long: 0,
      desde: initialDestinationValue.hasta,
      hasta: initialDestinationValue.desde,
      id_localidad_destino: initialDestinationValue.id_localidad_origen,
      id_localidad_origen: initialDestinationValue.id_localidad_destino,
    };

    setInitialOriginValue(tempDataOrigin);

    console.log(initialOriginValue, "init Origin valie");
    console.log(initialDestinationValue, "dest Origin valie");
    await fetchDestinations(tempDataOrigin);
    setInitialDestinationValue(tempDataDestination);
    // if (
    //   destinations.some(
    //     (e) =>
    //       e.id_localidad_destino === tempDataDestination.id_localidad_destino
    //   )
    // ) {
    //   alert("Existe este destino");
    // }
    //
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
        <div className="selectPeopleQuantity">
          <Icon code={"MdPerson"}></Icon>
          <Button
            disableRipple={true}
            disableElevation={true}
            endIcon={
              open ? <ExpandLessOutlinedIcon /> : <ExpandMoreOutlinedIcon />
            }
            onClick={handleClick}
            sx={{
              minWidth: "30px",
              backgroundColor: theme === "dark" && "#35373A",
              color: theme === "dark" ? "#ffffff" : "#5F6368",
              paddingLeft: "0px",
              ".MuiSvgIcon-root": {
                color: "#1A73E8",
              },
              ".MuiButton-endIcon": {
                position: "absolute",
                right: "-5px",
              },
            }}
          >
            {quantity.total}
          </Button>
          <Popper
            open={open}
            anchorEl={anchorEl}
            transition
            placement="bottom-start"
            keepMounted={true}
            sx={{
              zIndex: 1000,
              width: 315,
            }}
          >
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={350}>
                <Paper
                  sx={{
                    backgroundColor: theme === "dark" && "#35373A",
                    color: theme === "dark" && "#ffffff",
                  }}
                >
                  {ageGroupsArea}
                  <Stack
                    spacing={1}
                    direction="row"
                    sx={{ justifyContent: "end", padding: "0 10px 10px 10px" }}
                  >
                    <Button variant="text" onClick={cleanPersons}>
                      Cancelar
                    </Button>
                    <Button variant="text" onClick={sumTotalAndClose}>
                      Aceptar
                    </Button>
                  </Stack>
                </Paper>
              </Fade>
            )}
          </Popper>
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
            initialValue={initialOriginValue}
          />
          <div className="changeDestiny">
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
            handler={handleDestination}
            initialValue={initialDestinationValue}
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
            disabled={isDateTimeEnabled === "false"}
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
