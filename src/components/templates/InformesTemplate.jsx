import React, { useState } from 'react'
import dayjs from "dayjs";
import styled from 'styled-components'
import { 
  Header,
  CalendarioLineal,
  Tabs,
  ContentFiltros,
  BtnDesplegable,
  ListaMenuDesplegable,
  DataDesplegableMovimientos,
  useOperaciones
} from '../../index'

export const InformesTemplate = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [value, setValue] = useState(dayjs(Date.now()));
  const [formatoFecha, setFormatoFecha] = useState("");
  const [stateTipo, setStateTipo] = useState(false)
  
  const {     
    setTipoMovimientos, 
    colorCategoria, 
    bgCategoria,
    tituloBtnDesMovimientos,    
  } = useOperaciones()

  const toggleTipo = () => {
    setStateTipo(!stateTipo)    
  }

  const cambiarTipo = (p) => {
    setTipoMovimientos(p)
    setStateTipo(!stateTipo)
    setOpenMenu(false)
  }

  return (
    <Container>
      <header className='header'>
        <Header stateConfig={{ state: openMenu, setState: () => setOpenMenu(!openMenu) }} />        
      </header>
      <section className='area1'>              
        <ContentFiltros>          
          <div onClick={(e) => e.stopPropagation()}>
            <BtnDesplegable 
              bgcolor={bgCategoria}
              textcolor={colorCategoria}            
              text={tituloBtnDesMovimientos}
              funcion={toggleTipo}
            />
            { stateTipo && (
              <ListaMenuDesplegable
                top="112%"
                data={DataDesplegableMovimientos}
                funcion={(p) => cambiarTipo(p)}
              />
            )}
          </div>
        </ContentFiltros>    
        <h1>Informes</h1>
      </section>      
      <section className='area2'>
        <CalendarioLineal 
          value={value}
          setValue={setValue}
          formatoFecha={formatoFecha}
          setFormatoFecha={setFormatoFecha}
        />
      </section>
      <section className='main'>        
        <Tabs />
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
    "area1" 100px
    "area2" 70px
    "main" auto;

  .header {
    grid-area: header; 
    /* background-color: rgba(103,93,241,0.14);  */
    display: flex;
    align-items: center;
  }

  .area1 {
    grid-area: area1;
    /* background-color: rgba(229,67,26,0.14);  */
    display: flex;
    align-items: center;
    gap: 20px;
  }

  .area2 {
    grid-area: area2;
    /* background-color: rgba(77,237,106,0.14);  */
    display: flex;
    align-items: center;
    justify-content: center;
    padding-bottom: 20px;
  }
  
  .main {
    grid-area: main;
    /* background-color: rgba(179,46,241,0.14); */
    padding-bottom: 20px;
  }
`
