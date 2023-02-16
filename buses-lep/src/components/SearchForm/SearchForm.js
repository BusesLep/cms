import React, { useState } from "react";
import "./SearchForm.scss";
import { Icon, SelectAutocomplete } from "../";
import { Button } from "@mui/material";
import useOrigin from "../../hooks/useOrigin";
import DatePicker from "./DatePicker";
import SelectPersons from "./SelectPersons";
import SelectMode from "./SelectMode";

export default function SearchForm({handler}) {
  const origins = useOrigin().allOrigin.nodes;
  const [goDateValue, setGoDateValue] = useState(null);
  const [returnDateValue, setReturnDateValue] = useState(null);
  const [isDateTimeEnabled, setIsDateTimeEnabled] = useState("true");
  const [destinations, setDestinations] = useState(null);
  const [initialOriginValue, setInitialOriginValue] = useState(null);
  const [initialDestinationValue, setInitialDestinationValue] = useState(null);
  const [quantity, setQuantity] = useState({
    age1: 0,
    age2: 0,
    age3: 0,
    age4: 0,
    total: 0,
  });
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [order, setOrder] = useState(null);

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
    
    let origin1 = JSON.parse(localStorage.getItem("origin_1"))
    let destination1 = JSON.parse(localStorage.getItem("destination_1"))
    let origin2 = JSON.parse(localStorage.getItem("origin_2"))
    let destination2 = JSON.parse(localStorage.getItem("destination_2"))
    if(origin1 === null && destination1 === null || order === 1){
      localStorage.setItem("origin_1", JSON.stringify({ 'name': initialOriginValue.Localidad, 'id':initialOriginValue.ID_Localidad }));
      localStorage.setItem("destination_1", JSON.stringify({ 'name': initialDestinationValue.hasta, 'id':initialDestinationValue.id_localidad_destino }) );
      setOrder(2)
      origin1 = JSON.parse(localStorage.getItem("origin_1"))
      destination1 = JSON.parse(localStorage.getItem("destination_1"))
    }else if (origin2 === null && destination2 === null || order === 2){
      localStorage.setItem("origin_2", JSON.stringify({ 'name': initialOriginValue.Localidad, 'id':initialOriginValue.ID_Localidad }));
      localStorage.setItem("destination_2", JSON.stringify({ 'name': initialDestinationValue.hasta, 'id':initialDestinationValue.id_localidad_destino }) );
      setOrder(1)
      origin2 = JSON.parse(localStorage.getItem("origin_2"))
      destination2 = JSON.parse(localStorage.getItem("destination_2"))
    }
    handler({origin1, destination1, origin2, destination2})
    console.log(
      "http://localhost/?desde=" +
        initialOriginValue.ID_Localidad +
        "&?hasta=" +
        initialDestinationValue.id_localidad_destino +
        "&?ida=" +
        String(goDateValue) +
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

  const validateSubmit = ()=>{
    const value = initialOriginValue !== null 
    && initialDestinationValue !== null
    && goDateValue !== null

    return !value
  }

  return (
    <form onSubmit={sendData} className="searchForm">
      <div className="selectContainer">
        <SelectMode
          isDateTimeEnabled={isDateTimeEnabled}
          handleOptionChange={handleOptionChange}
        />
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
              ></Icon>
            }
            styleOption="origin"
            label={"¿Desde dónde viajas?"}
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
               
              ></Icon>
            }
            styleOption="destination"
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
        <button type="submit" disabled={validateSubmit()} >BUSCAR</button>
      </div>
    </form>
  );
}
