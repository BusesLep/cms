import React, { useState, useEffect, useCallback } from "react";
import useHome from "../../hooks/useHome";

import {CustomSection, Banner} from "../"
import SearchForm from "../SearchForm/SearchForm"

const Home = () => {
  const data = useHome().sanityHome;
  // Client-side Runtime Data Fetching
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch("http://localhost:8080/localidades/desde");
        const data = await response.json();
        setCities(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPost();
  }, []);

  
  return data !== null ? (
    <div className="container">
      
      {data.banner !== null ? <Banner banner={data.banner} /> : <></>}
      {/* <ComboBox list={cities}></ComboBox>
      <ComboBox list={origins}></ComboBox> */}
      <SearchForm></SearchForm>
      {data.dinamicContent !== null ? (
        <CustomSection sections={data.dinamicContent} />
      ) : (
        <></>
      )}
    </div>
  ) : (
    <div className="d-flex justify-content-center">
      <h2>Home in Sanity has no content</h2>
    </div>
  );
};

export default Home;
