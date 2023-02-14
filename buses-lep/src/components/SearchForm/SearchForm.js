import React, { useState } from "react";
import "./SearchForm.scss";
import { Icon, SelectAutocomplete } from "../";
import {
  Button,
  Select,
  MenuItem,
} from "@mui/material";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import useOrigin from "../../hooks/useOrigin";
import { useTheme } from "../../context/themeContext";
import DatePicker from "./DatePicker";
import SelectPersons from "./SelectPersons";

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
    await fetchDestinations(tempDataOrigin);
    setInitialDestinationValue(tempDataDestination);
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
        <SelectPersons
          quantity={quantity}
          open={open}
          cleanPersons={cleanPersons}
          sumTotalAndClose={sumTotalAndClose}
          handleClick={handleClick}
          anchorEl={anchorEl}
          setQuantity={setQuantity}
        />
      </div>

      <div className="searchContainer d-flex flex-wrap">
        <div className="searchBars col-12 col-lg-6 d-flex flex-wrap">
          <SelectAutocomplete
            icon={
              <Icon
                code={"MdOutlineTripOrigin"}
                style={{
                  fontSize: "18px",
                  padding: "2rem",
                  backgroundColor: "red",
                }}
              ></Icon>
            }
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
            icon={
              <Icon
                code={"MdOutlineLocationOn"}
                style={{
                  fontSize: "18px",
                  padding: "2rem",
                  backgroundColor: "red",
                }}
              ></Icon>
            }
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
        <DatePicker
          goDateValue={goDateValue}
          handleGoDateChange={handleGoDateChange}
          returnDateValue={returnDateValue}
          handleReturnDateChange={handleReturnDateChange}
          isDateTimeEnabled={isDateTimeEnabled}
        />
      </div>
      <div className="buttonContainer">
        <button type="submit">BUSCAR</button>
      </div>
    </form>
  );
}
