import React, { useState } from 'react'
import styled from 'styled-components'
import { 
  Header,
  ContentFiltros,
  BtnDesplegable,
  useOperaciones,
  ListaMenuDesplegable,
  DataDesplegableTipo,
  BtnFiltro,
  v,
  TablaCategorias,
  RegistrarCategorias,
  LottieAnimacion,
  Titulo,
} from '../../index'

import vacioverde from "../../assets/vacioverde.json";
import vaciorojo from "../../assets/vaciorojo.json";

export const CategoriasTemplate = ({ data }) => {

  const [openMenu, setOpenMenu] = useState(false)
  const [stateTipo, setStateTipo] = useState(false)
  const { colorCategoria, tituloBtnDes, bgCategoria, setTipo, tipo } = useOperaciones()
  const [openRegistro, setOpenRegistro] = useState(false);
  const [accion, setAccion] = useState("");
  const [dataSelect, setDataSelect] = useState([]);

  const cambiarTipo = (p) => {
    setTipo(p)
    setStateTipo(!stateTipo)
    setOpenMenu(false)
  }

  const cerrarDesplegables = () => {
    setOpenMenu(false)
    setStateTipo(false)
  }

  const toggleTipo = () => {
    setStateTipo(!stateTipo)
    setOpenMenu(false)
  }

  const toggleMenuUser = () => {
    setOpenMenu(!openMenu)
    setStateTipo(false)
  }

  const nuevoRegistro = () => {
    setOpenRegistro(!openRegistro);
    setAccion("Nuevo");
    setDataSelect([]);
  }
  
  return (
    <Container onClick={cerrarDesplegables}>
      {openRegistro && (
        <RegistrarCategorias
          dataSelect={dataSelect}
          accion={accion}          
          onClose={() => setOpenRegistro(!openRegistro)}
        />
      )}
      <header className='header'>
        <Header stateConfig={{ state: openMenu, setState: toggleMenuUser }} />        
      </header>
      <section className='tipo'>
        <Titulo title="Categorías" />            
      </section>      
      <section className='area2'>
        <ContentFiltros>          
          <div onClick={(e) => e.stopPropagation()}>
            <BtnDesplegable 
              bgcolor={bgCategoria}
              textcolor={colorCategoria}            
              text={tituloBtnDes}
              funcion={toggleTipo}
            />
            { stateTipo && (
              <ListaMenuDesplegable
                top="112%"
                data={DataDesplegableTipo}
                funcion={(p) => cambiarTipo(p)}
              />
            )}
          </div>
        </ContentFiltros>       
        
        <ContentFiltro>
          <BtnFiltro 
            funcion={nuevoRegistro}
            bgcolor={bgCategoria}
            textcolor={colorCategoria}
            icono={<v.agregar />}
          />
        </ContentFiltro>
        
      </section>
      <section className='main'>
        {data.length == 0 && (
          <div className='mensaje-nodata'>
            <LottieAnimacion
              alto="300"
              ancho="300"
              animacion={tipo == "i" ? vacioverde : vaciorojo}
            />
            <p><strong>No</strong> hay {tipo == "i" ? "Categorías de Ingresos": "Categorías de Gastos"} registrados todavía.</p>
          </div>
        )}
        <TablaCategorias 
          data={data}
          SetopenRegistro={setOpenRegistro}
          setdataSelect={setDataSelect}
          setAccion={setAccion}
        />
      </section>
    </Container>
  )
}

const Container = styled.div`
  min-height: 100vh;
  padding: 15px;
  width: 100%;  
  background: ${({ theme}) => theme.bgtotal };  
  color: ${({ theme}) => theme.text }; 
  display: grid;
  grid-template: 
    "header" 100px
    "tipo" 100px
    "area2" 50px
    "main" auto;
  
  .header {
    grid-area: header; 
    /* background-color: rgba(103,93,241,0.14); */
    display: flex;
    align-items: center;
  }

  .tipo {
    grid-area: tipo;
    /* background-color: rgba(229,67,26,0.14); */
    display: flex;
    align-items: center;
    gap: 20px;
  }

  .area2 {
    grid-area: area2;
    /* background-color: rgba(77,237,106,0.14); */
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .main {
    grid-area: main;
    /* background-color: rgba(179,46,241,0.14); */
    .mensaje-nodata {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
    }
  }
`

const ContentFiltro = styled.div`
  display: flex;
  flex-wrap: wrap;
`;


