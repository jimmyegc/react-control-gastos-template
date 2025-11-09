import React, { useState } from 'react'
import styled from 'styled-components'
import { 
  Header, 
  Selector, 
  v, 
  ListaPaises, 
  useUsuariosStore, 
  ListaGenerica, 
  TemasData, 
  BtnSave,
  CardEliminarData
} from '../../index'

export const ConfiguracionTemplate = () => {
  const { dataUsuarios, editarTemaMonedaUser } = useUsuariosStore();
  const [select, setSelect] = useState([])
  const [selectTema, setSelectTema] = useState([])

  const [openMenu, setOpenMenu] = useState(false)
  const [stateListaPaises, setStateListaPaises] = useState(false)
  const [stateListaTemas, setStateListaTemas] = useState(false)

  // Moneda
  const moneda = select.symbol ? select.symbol : dataUsuarios.moneda;
  const pais = select.countryName ? select.countryName : dataUsuarios.pais;
  const paisSeleccionado = "🐷 " + moneda + " " + pais;  
  
  // Tema
  const iconoBd = dataUsuarios.tema === "0" ? "🌞" : "🌚";
  const temaBd = dataUsuarios.tema === "0" ? "light" : "dark";
  const temaInicial = selectTema.descripcion ? selectTema.descripcion : temaBd;  
  const iconoinicial = selectTema.icono ? selectTema.icono : iconoBd;  
  const temaSeleccionado = iconoinicial + " " + temaInicial;

  const editar = async () => {        
    const temaElegido = selectTema.descripcion === "light" ? "0" : "1"
    const p = {
      tema: temaElegido,
      moneda: moneda,
      pais: pais,         
      id: dataUsuarios.id
    }    
    await editarTemaMonedaUser(p)
  }

  return (
    <Container>
      <header className='header'>
        <Header stateConfig={{ state: openMenu, setState: () => setOpenMenu(!openMenu) }} />        
      </header>      
      <section className='area2'>
        <h1>Ajustes</h1>        
        <ContentCard>
          <span>Moneda:</span>
          <Selector            
            state={stateListaPaises}
            color={v.colorselector}
            texto1={paisSeleccionado}
            funcion={() => setStateListaPaises(!stateListaPaises)}
          />
          { stateListaPaises && (
            <ListaPaises               
              setSelect={(p) => setSelect(p)}
              setState={() => setStateListaPaises(!stateListaPaises)}
            />
          )}
          
        </ContentCard>
        <ContentCard>
          <span>Tema:</span>
          <Selector 
            texto1={temaSeleccionado} 
            color={v.colorselector}
            state={stateListaTemas}
            funcion={() => setStateListaTemas(!stateListaTemas)}
          />
          { stateListaTemas && (
            <ListaGenerica 
              data={TemasData}
              setState={() => setStateListaTemas(!stateListaTemas)}
              funcion={setSelectTema}
              bottom="-20px"
            />
          )}          
        </ContentCard>
        <BtnSave
          titulo="Guardar"
          bgcolor={v.colorselector}
          icono={<v.iconoguardar/>}
          funcion={editar}
        />
        <CardEliminarData />
      </section>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 15px;  
  background: ${({ theme}) => theme.bgtotal };
  color: ${({ theme}) => theme.text }; 
  display: grid;
  grid-template: 
    "header" 100px    
    "area2" auto;    

  .header {
    grid-area: header; 
    /* background-color: rgba(103,93,241,0.14); */
    display: flex;
    align-items: center;
  }

  .area1 {
    grid-area: area1;
    /* background-color: rgba(229,67,26,0.14); */
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .area2 {
    grid-area: area2;
    /* background-color: rgba(77,237,106,0.14); */
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: start;
    gap: 30px;
    /* align-self: center; */
    
    h1 { 
      font-size: 2.5rem;
    }
  }
/*   .main {
    grid-area: main;
    background-color: rgba(179,46,241,0.14);
  } */
`

const ContentCard = styled.div`
  display: flex;
  text-align: start;
  align-items: center;
  gap: 20px;
  position: relative;
  width: 100%;
  justify-content: center;
`;
