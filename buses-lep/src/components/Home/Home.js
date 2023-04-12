import React, {useState} from "react";
import { CustomSection, Banner, HelpCenter, LastTravels,SearchForm, Promotions } from "../";
import useQuestions from "../../hooks/useQuestions";

  
const Home = (info) => {
  const data = info.data
  console.log(data, "data")
  // const [send, setSend] = useState(null);
  const questions = useQuestions().allSanityQuestion.nodes.filter(
    question => question.inHomePage 
  )

  return ( 
    <>
      {data !== null ? (
        <div className="container">
          
          {data.banner !== null && data.banner.length !== 0 ? (
            <Banner banner={data.banner} />
          ) : (
            <></>
          )}
          {/* <SearchForm handler={setSend}></SearchForm>
          <LastTravels data={send}></LastTravels> */}
                    {data.dinamicContent !== null && data.dinamicContent.length !== 0 ? (
            <CustomSection sections={data.dinamicContent} />
          ) : (
            <></>
          )}
          {questions !== null && questions.length !== 0 ? (
            <HelpCenter questions={questions} title={"Centro de ayuda"} type="categories"/>
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
