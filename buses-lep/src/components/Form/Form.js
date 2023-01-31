import * as React from "react";
import BookData from "./data.json";
import "./Form.scss";
import { SearchBar, Icon, SelectAutocomplete } from "../";

export default function Form() {
  return (
    <form action="" className="py-5">
      <div className="selectContainer">
        <select name="" id="">
          <option value="return">Ida y vuelta</option>
          <option value="oneWay">Solo ida</option>
        </select>
        <select name="" id="">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
        </select>
      </div>
      <div className="searchContainer">
        <div className="searchBars">
          {/* <SearchBar
            placeholder="¿Desde dónde viajas?"
            data={BookData}
            icon={<Icon code={"MdOutlineTripOrigin"}></Icon>}
          />
          <SearchBar
            placeholder="¿A dónde viajas?"
            data={BookData}
            icon={<Icon code={"MdOutlineLocationOn"}></Icon>}
            style="destination"
          /> */}
          <SelectAutocomplete />
          <SelectAutocomplete />
        </div>

        <input className="dateInput" type="date" name="" id="" />
        <input className="dateInput" type="date" name="" id="" />
      </div>
    </form>
  );
}
