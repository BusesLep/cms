import React from "react";
import Fab from '@mui/material/Fab';
import FontAwesomeIcon from "../Icons/FontAwesomeIcon";
import "./WhatsappLink.scss";
import useWhatsappLink from "../../hooks/useWhatsappLink";



const WhatsappLink = () => {
    const data = useWhatsappLink().sanityGlobalConfig;

    return <>
    <div >
        {data.url &&  <Fab sx={{ display: { sm: 'none' } }} className="floatingButton" href={data.url} target="_blank" size="medium" color="primary" aria-label="add">
        <FontAwesomeIcon  code="FaWhatsapp" />
        </Fab>}
    </div>
</>
}

export default WhatsappLink

