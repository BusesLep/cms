import React from "react";
import useHome from "../../hooks/useHome";
import {CustomSection, Banner} from "../"
import SearchForm from "../SearchForm/SearchForm"

const Home = () => {
  
  const data = useHome().sanityHome;
  return data !== null ? <div className="container">
  {data.banner !== null ? <Banner banner={data.banner}/> : <></>}
  <SearchForm />
  {data.dinamicContent !== null ? <CustomSection sections={data.dinamicContent} /> : <></> }
</div> : <div className="d-flex justify-content-center" >
  <h2>Home in Sanity has no content</h2>
</div>;
};

export default Home;
