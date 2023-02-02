import React, { useState } from "react";
import "./SearchForm.scss";
import { Icon, SelectAutocomplete } from "../";
import { DesktopDatePicker} from "@mui/x-date-pickers";
import moment from 'moment';
import MomentUtils from '@date-io/moment';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { TextField} from "@mui/material";
import "moment/locale/es";

export default function SearchForm() {
  const [goDateValue, setGoDateValue] = useState(new Date());
  const [returnDateValue, setReturnDateValue] = useState(new Date());
  const [isDateTimeEnabled, setIsDateTimeEnabled] = useState(true);

  const handleGoDateChange = (newValue) => {
    setGoDateValue(newValue);
  };

  const handleReturnDateChange = (newValue) => {
    setReturnDateValue(newValue);
  };

  const handleOptionChange = (event) => {
    setIsDateTimeEnabled(event.target.value === 'true');
  };

  moment.locale('es');

  return (

      <form action="" className="py-5">
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
          <select name="" id="">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
          </select>
        </div>
      </div>

      <div className="searchContainer">
        <div className="searchBars">
          <SelectAutocomplete
            icon={<Icon code={"MdOutlineTripOrigin"}></Icon>}
            style="origin"
          />
          <SelectAutocomplete
            icon={<Icon code={"MdOutlineLocationOn"}></Icon>}
            style="destination"
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
          />{" "}
          <DesktopDatePicker
            label="Fecha regreso"
            inputFormat="DD/MM/YYYY"
            value={returnDateValue}
            onChange={handleReturnDateChange}
            renderInput={(params) => <TextField {...params} />}
            disabled={!isDateTimeEnabled}
            minDate={new Date()}
          />
        </LocalizationProvider>
      </div>
      <div className="buttonContainer">
        <button type="submit">BUSCAR</button>
      </div>
    </form>

    
  );
}
