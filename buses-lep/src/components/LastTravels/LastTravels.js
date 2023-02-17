import React, { useEffect , useState} from "react";
import Icon from "../Icons/Icon";
import Divider from "@mui/material/Divider";
import "./LastTravels.scss";

const LastTravels = (data) => {
  const [origin1, setOrigin1] = useState(null);
  const [origin2, setOrigin2] = useState(null);
  const [destination1, setDestination1] = useState(null);
  const [destination2, setDestination2] = useState(null);

  useEffect(() => {
    if(data.data !== null){
      setOrigin1(data.data?.origin1?.name)
      setDestination1(data?.data?.destination1?.name)
      setOrigin2(data.data?.origin2?.name)
      setDestination2(data?.data?.destination2?.name)
    }else {
      setData()
    }
  }, [data]);
  
  const setData = ()=> {
    setOrigin1(JSON.parse(localStorage.getItem("origin_1"))?.name);
    setDestination1(JSON.parse(localStorage.getItem("destination_1"))?.name);
    setOrigin2(JSON.parse(localStorage.getItem("origin_2"))?.name);
    setDestination2(JSON.parse(localStorage.getItem("destination_2"))?.name);
  }
  return (
    <section className="lastTravels d-flex flex-wrap">
      <div className="lastTravels__header col-12 col-md-6">
        <div className="d-flex flex-nowrap pb-3">
          <Icon code={"FaBusAlt"}></Icon>
          <h4>Ultimos destinos buscados</h4>
        </div>
        <p className="body-medium">
          Para una mejor experiencia de viaje {' '}
          <a href="http://">inicia sesión</a> con tu cuenta , podrás comprar más
          rápido y acceder al historial de destinos y compras realizadas.
        </p>
      </div>
      <div className="col-12 col-md-6">
        <ul className="lastTravels__list">
          {origin1 !== null && origin1 !== undefined ? (
            
              <li role={"button"} className="d-flex align-items-center p-3">
                <div className="iconContainer">
                  <Icon code={"FaBusAlt"}></Icon>
                </div>
                <h6 className="flex-grow-1 py-0 ps-3 mb-0">
                  {origin1} - {destination1}
                </h6>
                <div className="iconContainerEnd">
                  <Icon code={"MdOutlineKeyboardArrowRight"}></Icon>
                </div>
              </li>
              
            
          ) : (
            <></>
          )}
          {origin2 !== null && origin2 !== undefined ? (
            <>
            <Divider />
            <li role={"button"} className="d-flex align-items-center p-3">
              <div className="iconContainer">
                <Icon code={"FaBusAlt"}></Icon>
              </div>
              <h6 className="flex-grow-1 py-0 ps-3 mb-0">
                {origin2} - {destination2}
              </h6>
              <div className="iconContainerEnd">
                <Icon code={"MdOutlineKeyboardArrowRight"}></Icon>
              </div>
            </li>
            </>
            
          ) : (
            <></>
          )}
        </ul>
      </div>
    </section>
  );
};

export default LastTravels;
