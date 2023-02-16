import React from "react";


import { CustomSection, Banner, Seo } from "../";
import SearchForm from "../SearchForm/SearchForm";

const Home = (info) => {
  const data = info.data

  return ( 
    <>
      {data !== null ? (
        <div className="container">
          
          {data.banner !== null && data.banner.length !== 0 ? (
            <Banner banner={data.banner} />
          ) : (
            <></>
          )}
          <SearchForm></SearchForm>
          {data.dinamicContent !== null && data.dinamicContent.length !== 0 ? (
            <CustomSection sections={data.dinamicContent} />
          ) : (
            <></>
          )}
        </div>
      ) : (
        <div className="d-flex justify-content-center">
          <h2>Home in Sanity has no content</h2>
        </div>
      )}{" "}
      ;
    </>
  );
};

export default Home;
