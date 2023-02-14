import { useStaticQuery, graphql } from "gatsby";

const useOffices = () => {
  return useStaticQuery(graphql`
    {
      allOffices {
        nodes {
          Boleteria_Telefono
          Boleteria_Ubicacion
          Localidad
          id
          latitud
          longitud
          linkfoto
        }
      }
    }
  `);
};

export default useOffices;
