import { useState } from "react";
import styled from "styled-components";
import {
  Device,
  v,
  Dona,
  Lineal,
  useMovimientosStore,
  useOperaciones,
  useUsuariosStore,
  Barras,
  SpinnerLoader,
} from "../../index";
import { useQuery } from "@tanstack/react-query";

export function Tabs() {
  const [activeTab, setActiveTab] = useState(0);

  const handleClick = (index) => {
    setActiveTab(index);
  };

  const { id_usuario } = useUsuariosStore();
  const { anio, mes, tipo, tituloBtnDesMovimientos } = useOperaciones();
  const { 
    dataRptMovimientosAñoMes, 
    rptMovimientosAñoMes 
  } = useMovimientosStore();

  const datagrafica = {
    labels: dataRptMovimientosAñoMes?.map((item) => item.descripcion),
    datasets: [
      {
        label: "Total",
        data: dataRptMovimientosAñoMes?.map((item) => item.total),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 2,
      },
    ],
  };

  const { isLoading, error } = useQuery({
    queryKey: ["reporte movimientos", { anio, mes, tipocategoria: tipo, p_id_usuario: id_usuario }],
    queryFn: () => rptMovimientosAñoMes({ anio, mes, tipocategoria: tipo, p_id_usuario: id_usuario }),
  });

  if (isLoading) return <SpinnerLoader />;
  if (error) return <h1>Error</h1>;

  return (
    <Container activeTab={activeTab}>
      <ul className="tabs">
        <li
          className={activeTab === 0 ? "active" : ""}
          onClick={() => handleClick(0)}
        >
          <v.iconopie />
        </li>
        <li
          className={activeTab === 1 ? "active" : ""}
          onClick={() => handleClick(1)}
        >
          <v.iconolineal />
        </li>
        <li
          className={activeTab === 2 ? "active" : ""}
          onClick={() => handleClick(2)}
        >
          <v.iconobars />
        </li>
        <span className="glider" />
      </ul>

      <div className="tab-content">
        {activeTab === 0 && (
          <Dona datagrafica={datagrafica} data={dataRptMovimientosAñoMes} titulo={tituloBtnDesMovimientos} />
        )}
        {activeTab === 1 && (
          <Lineal datagrafica={datagrafica} data={dataRptMovimientosAñoMes} titulo={tituloBtnDesMovimientos} />
        )}
        {activeTab === 2 && (
          <Barras datagrafica={datagrafica} data={dataRptMovimientosAñoMes} titulo={tituloBtnDesMovimientos} />
        )}
      </div>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;    
  overflow-x: hidden;
  max-width: 100vw;

  .tabs {
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 75%;
    background-color: ${(props) => props.theme.bg};
    position: relative;
    border-radius: 100px;
    overflow: hidden;
    box-shadow: 0px 10px 20px -3px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;

    @media ${()=>Device.tablet} {  
      width: 25%;
    }

    li {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 54px;
      font-size: 1.25rem;
      font-weight: 500;
      border-radius: 99px;
      cursor: pointer;
      color: ${(props) => props.theme.textColor};
      transition: color 0.25s ease-in;
      z-index: 2;

      &.active {
        color: #fff; /* texto blanco cuando activo */
      }
    }

    .glider {
      position: absolute;
      top: 0;
      left: 0;
      height: 54px;
      width: calc(100% / 3);
      background-color: ${(props) => props.theme.carouselColor};
      border-radius: 99px;
      transition: transform 0.3s ease, background-color 0.3s ease;
      transform: translateX(${(props) => props.activeTab * 100}%);
      box-shadow: 0px 10px 20px -3px ${(props) => props.theme.carouselColor};
      z-index: 1;
    }
  }

  .tab-content {
    width: 100%;
    margin-top: 1rem;
  }
`;
