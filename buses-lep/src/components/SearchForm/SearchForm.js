import React, { useState } from "react";
import "./SearchForm.scss";
import { Icon, SelectAutocomplete } from "../";
import { Button } from "@mui/material";
import useOrigin from "../../hooks/useOrigin";
import DatePicker from "./DatePicker";
import SelectPersons from "./SelectPersons";

export default function SearchForm({ handler }) {
  const origins = useOrigin().allOrigin.nodes;
  const [goDateValue, setGoDateValue] = useState(null);
  const [returnDateValue, setReturnDateValue] = useState(null);
  const [isDateTimeEnabled, setIsDateTimeEnabled] = useState(true);
  const [destinations, setDestinations] = useState(null);
  const [initialOriginValue, setInitialOriginValue] = useState(null);
  const [initialDestinationValue, setInitialDestinationValue] = useState(null);
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState({
    age1: 1,
    age2: 0,
    age3: 0,
    age4: 0,
    total: 1,
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

        setLoading(true)
        const response = await fetch(
          `${process.env.GATSBY_URL_BFF}/localidades/hasta?IDlocalidadOrigen=${value.ID_Localidad}`
        );
        const data = await response.json();
        setDestinations(data);
        setLoading(false)
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
    setInitialDestinationValue(value);
  };

  const sendData = (event) => {
    let temp_array = [];
    event.preventDefault();
    if (typeof window !== "undefined") {
      temp_array = localStorage.getItem("lastTravels") ? JSON.parse(localStorage.getItem("lastTravels")) : []
    }


    if (temp_array.length === 2) {
      temp_array.pop()
    }

    temp_array.unshift({ 'nameO': initialOriginValue.Localidad, 'idO': initialOriginValue.ID_Localidad, 'nameD': initialDestinationValue.hasta, 'idD': initialDestinationValue.id_localidad_destino })
    if (typeof window !== "undefined") {
      localStorage.setItem("lastTravels", JSON.stringify(temp_array))
    }


    const locality = `locality=${initialOriginValue.ID_Localidad}`
    const destination = `&destination=${initialDestinationValue.id_localidad_destino}`
    const adult = `&adult=${quantity.age1}`
    const minor = `&minor=${quantity.age2}`
    const infant = `&infant=${quantity.age3}`
    const infantsit = `&infantsit=${quantity.age4}`
    const departuredate = `&departuredate=${getDateParam(goDateValue)}`
    const returndate = returnDateValue ? `&returndate=${getDateParam(returnDateValue)}` : ''

    const url = `${process.env.GATSBY_URL_ECOMMERCE}?${locality}${destination}${adult}${minor}${infant}${infantsit}${departuredate}${returndate}`

    handler({ locality, destination })

    window.location.href = url

  };

  const getDateParam = (date) => {
    return `${date._d.getDate()}-${date._d.getMonth() + 1}-${date._d.getFullYear()}`
  }

  const handleGoDateChange = (newValue) => {
    setGoDateValue(newValue);
  };

  const handleReturnDateChange = (newValue) => {
    setReturnDateValue(newValue);
  };

  const handleButtonClick = (value) => {

    if (!value) return
    setIsDateTimeEnabled(!isDateTimeEnabled);

  }

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

  const validateSubmit = () => {
    return initialOriginValue === null
      || initialDestinationValue === null
      || goDateValue === null
      || quantity.total === 0
      || (isDateTimeEnabled && (returnDateValue === null))
      || open === true

  }

  return (
    <form onSubmit={sendData} className="searchForm">
      <div className="selectContainer">
        {/* <SelectMode
          isDateTimeEnabled={isDateTimeEnabled}
          handleOptionChange={handleOptionChange}
        /> */}

        
          <Button
            variant={isDateTimeEnabled ? "contained" : "outlined"}
            className="selectContainer__button"
            startIcon={<Icon code={"MdCompareArrows"}></Icon>}
            onClick={() => handleButtonClick(!isDateTimeEnabled)}
          >
            Ida y Vuelta
          </Button>
          <Button
            variant={isDateTimeEnabled ? "outlined" : "contained"}
            className="selectContainer__button"
            startIcon={<Icon code={"MdArrowRightAlt"}></Icon>}
            onClick={() => handleButtonClick(isDateTimeEnabled)}
          >
            Solo Ida
          </Button>
        
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
            loading={loading}
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
