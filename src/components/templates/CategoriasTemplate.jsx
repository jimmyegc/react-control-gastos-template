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
  v
} from '../../index'

export const CategoriasTemplate = () => {
  const [openMenu, setOpenMenu] = useState(false)
  const [stateTipo, setStateTipo] = useState(false)
  const { colorCategoria, tituloBtnDes, bgCategoria, setTipo } = useOperaciones()
  const [openRegistro, setOpenRegistro] = useState(false);
  const [accion, setAccion] = useState("");
  const [dataSelect, setdataSelect] = useState([]);

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
    setdataSelect([]);
  }
  
  return (
    <Container onClick={cerrarDesplegables}>
      <header className='header'>
        <Header stateConfig={{ state: openMenu, setState: toggleMenuUser }} />        
      </header>
      <section className='tipo'>
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
                funcion={(p)=> cambiarTipo(p)}
              />
            )}
          </div>
        </ContentFiltros>            
      </section>      
      <section className='area2'>
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
        area3
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
    background-color: rgba(103,93,241,0.14);
    display: flex;
    align-items: center;
  }

  .tipo {
    grid-area: tipo;
    background-color: rgba(229,67,26,0.14);
    display: flex;
    align-items: center;
  }

  .area2 {
    grid-area: area2;
    background-color: rgba(77,237,106,0.14);
    display: flex;
    align-items: center;
    justify-content: end;
  }
  .main {
    grid-area: main;
    background-color: rgba(179,46,241,0.14);
  }
`

const ContentFiltro = styled.div`
  display: flex;
  flex-wrap: wrap;
`;


