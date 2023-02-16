import React, {useState} from "react";
import useHome from "../../hooks/useHome";

import { CustomSection, Banner, Seo, LastTravels } from "../";
import SearchForm from "../SearchForm/SearchForm";

const Home = () => {
  const data = useHome().sanityHome;
  const [send, setSend] = useState(null);

  return ( 
    <>
      <Seo title="Home" description="" keywords="" />
      {data !== null ? (
        <div className="container">
          
          {data.banner !== null && data.banner.length !== 0 ? (
            <Banner banner={data.banner} />
          ) : (
            <></>
          )}
          <SearchForm handler={setSend}></SearchForm>
          <LastTravels data={send}></LastTravels>
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
      )}
    </>
  );
};

export default Home;
