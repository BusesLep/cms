import * as React from "react";
import { Layout, Categories, Banner } from "../components";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/global.scss";
import useHome from "../hooks/useHome";

const CategoriesPage = ({ location }) => {
  const data = useHome().sanityHome;
  return (
    <Layout
      location={location}
      title="Centro de ayuda"
      description="Preguntas frecuentes sobre pasajes, compras, devoluciones y servicios de Buses Lep.">
      <div >
        {data.banner !== null && data.banner.length !== 0 ? (
          <Banner banner={data.banner} />
        ) : (
          <></>
        )}
        <Categories />
      </div>
    </Layout>
  );
};

export default CategoriesPage;
