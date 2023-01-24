import React from "react";
import useHome from "../../hooks/useHome";
import Banner from "../Banner/Banner";
import { HelpCenter} from "../"

const Home = () => {
  const data = useHome().sanityHome;
  console.log(data)
  return data !== null ? <div className="container">
  {data.banner !== null ? <Banner banner={data.banner}/> : <></>}
  <HelpCenter questions={data.dinamicContent[1]}/>
</div> : <div className="d-flex justify-content-center" >
  <h2>Home in Sanity has no content</h2>
</div>;
};

export default Home;
