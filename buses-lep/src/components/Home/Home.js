import React from "react";
import useHome from "../../hooks/useHome";
import Banner from "../Banner/Banner";
import {CustomSection} from "../"

const Home = () => {
  const data = useHome().sanityHome;
  return data !== null ? <div className="container">
  {data.banner !== null ? <Banner banner={data.banner}/> : <></>}
  {data.dinamicContent !== null ? <CustomSection sections={data.dinamicContent} /> : <></> }
</div> : <div className="d-flex justify-content-center" >
  <h2>Home in Sanity has no content</h2>
</div>;
};

export default Home;
