import React, { useState, useEffect } from "react";
import "./SearchForm.scss";
import { Icon, SelectAutocomplete } from "../";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import moment from "moment";
import MomentUtils from "@date-io/moment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { TextField } from "@mui/material";
import "moment/locale/es";
import Button from "@mui/material/Button";
import useOrigin from "../../hooks/useOrigin";

export default function SearchForm() {
  const origins = useOrigin().allOrigin.nodes;
  const [goDateValue, setGoDateValue] = useState(null);
  const [returnDateValue, setReturnDateValue] = useState(null);
  const [isDateTimeEnabled, setIsDateTimeEnabled] = useState(true);
  const [destination, setDestination] = useState(null);
  const [passengers, setPassengers] = useState(1);
  const [selectedDestination, setSelectedDestination] = useState('');
  const [selectedOrigin, setSelectedOrigin] = useState('');

  const fetchDestination = async (id) => {
    if(id !== null){
      try {
        const response = await fetch(
          "http://localhost:8080/localidades/hasta?IDlocalidadOrigen=" + id
        );
        const data = await response.json();
        setDestination(data);
        setSelectedOrigin(id);
        console.log("destinos: " + data);
      } catch (error) {
        console.log(error);
      }
    }else {
      setSelectedOrigin('')
      setDestination('');
    }
  };

  const sendData = (event) => {
    event.preventDefault();
    console.log("destination: " + destination);
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

  moment.locale("es");

  return (
    <form onSubmit={sendData} className="searchForm">
      <div className="selectContainer">
        <div className="selectMode">
          <Icon code={"MdCompareArrows"}></Icon>
          <select
            name="selectMode"
            id=""
            className=""
            value={isDateTimeEnabled}
            onChange={handleOptionChange}
          >
            <option value={true}>Ida y vuelta</option>
            <option value={false}>Solo ida</option>
          </select>
        </div>
        <div className="selectPeopleQuantity">
          <Icon code={"MdPerson"}></Icon>
          <select name="" id="" value={passengers} onChange={handlePassengers}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
          </select>
        </div>
      </div>

      <div className="searchContainer d-flex flex-wrap">
        <div className="searchBars col-12 col-lg-6 d-flex flex-wrap">
          <SelectAutocomplete
            icon={<Icon code={"MdOutlineTripOrigin"}></Icon>}
            style="origin"
            label={"Origen"}
            options={origins}
            handler={fetchDestination}
            initialValue={selectedOrigin}
          />
          <div className="changeDestiny">
            <p className="d-block d-lg-none">Intercambiar Origen/Destino</p>
            <Button variant="contained">
              <Icon code={"MdSyncAlt"}></Icon>
            </Button>
          </div>

          <SelectAutocomplete
            icon={<Icon code={"MdOutlineLocationOn"}></Icon>}
            style="destination"
            label={"¿A dónde viajas?"}
            options={
              destination !== null && destination !== undefined
                ? destination
                : [{ hasta: "Debe seleccionar origen" }]
            }
            handler={setSelectedDestination}
            initialValue={selectedDestination}
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
            className="col-12 col-lg-3 mb-3 mb-lg-0 ps-lg-3 "
          />{" "}
          <DesktopDatePicker
            label="Fecha regreso"
            inputFormat="DD/MM/YYYY"
            value={returnDateValue}
            onChange={handleReturnDateChange}
            renderInput={(params) => <TextField {...params} />}
            disabled={!isDateTimeEnabled}
            minDate={new Date()}
            className="col-12 col-lg-3 mb-3 mb-lg-0 ps-lg-3 "
          />
        </LocalizationProvider>
      </div>
      <div className="buttonContainer">
        <button type="submit">BUSCAR</button>
      </div>
    </form>
  );
}
