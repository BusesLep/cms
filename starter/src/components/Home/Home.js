import React from "react";
import useHome from "../../hooks/useHome";
import Banner from "../Banner/Banner";
import { TextExample} from "../"

const Home = () => {
  const data = useHome().sanityHome;

  return <div className="container">
    {data.banner !== null ? <Banner banner={data.banner}/> : <></>}
    <TextExample></TextExample>
  </div>;
};

export default Home;
