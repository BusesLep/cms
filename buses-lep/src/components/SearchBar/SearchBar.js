import React, { useState } from "react";
import "./SearchBar.scss";

function SearchBar({ placeholder, data, icon, style }) {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = data.filter((value) => {
      return value.title.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  return (
    <div className="search">
      <div className={`searchInputContainer ${style}`}>
        {icon}
        <input
          type="text"
          placeholder={placeholder}
          value={wordEntered}
          onChange={handleFilter}
        />
      </div>
      {filteredData.length != 0  && (
        <ul className="dataResult">
          {filteredData.slice(0, 15).map((value, key) => {
            return (
              <li  className={`dataItem ${style}`} onClick={() => setWordEntered(value.title)}>
               {value.title} 
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;
