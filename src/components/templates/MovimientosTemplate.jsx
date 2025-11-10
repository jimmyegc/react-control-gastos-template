import React, { useState } from 'react'
import styled from 'styled-components'
import dayjs from 'dayjs'
import { 
  Header, 
  CalendarioLineal, 
  CardTotales,
  useOperaciones,
  v,
  useMovimientosStore,
  useUsuariosStore,
  TablaMovimientos,  
  useCuentaStore,
  useCategoriasStore,
  DataDesplegableMovimientos,
  ContentFiltros,
  ListaMenuDesplegable,
  BtnDesplegable,
  BtnFiltro,
  RegistrarMovimientos,
  Titulo,
} from '../../index'
import { Device } from '../../styles/breakpoints'
import { useQuery } from '@tanstack/react-query'

export const MovimientosTemplate = () => {
  const [value, setValue] = useState(dayjs(Date.now()))
  const [formatoFecha, setFormatoFecha] = useState("")
  const [openMenu, setOpenMenu] = useState(false)
  const [openTipo, setOpenTipo] = useState(false)
  const [stateTipo, setStateTipo] = useState(false)
  const [openRegistro, setOpenRegistro] = useState(false);
  const [accion, setAccion] = useState("");
  const [dataSelect, setDataSelect] = useState([]);

  const { 
    tipo, 
    setTipoMovimientos, 
    colorCategoria, 
    bgCategoria,
    tituloBtnDesMovimientos,
    anio, 
    mes 
  } = useOperaciones()
  const { id_usuario } = useUsuariosStore()
  const { mostrarCuentas } = useCuentaStore()
  const { mostrarCategorias } = useCategoriasStore()

  const { 
    totalMesAño, 
    totalMesAñoPagados, 
    totalMesAñoPendientes,
    datamovimientos,
    mostrarMovimientos,
  } = useMovimientosStore()

  const toggleTipo = () => {
    setStateTipo(!stateTipo)    
  }

  const cambiarTipo = (p) => {
    setTipoMovimientos(p)
    setStateTipo(!stateTipo)
    setOpenMenu(false)
  }

  const nuevoRegistro = () => {
    setOpenRegistro(!openRegistro);
    setAccion("Nuevo");
    setDataSelect([]);
  }

  useQuery({
    queryKey: ["mostrar movimientos", {
      anio: anio,
      mes: mes,
      p_id_usuario: id_usuario,
      tipocategoria: tipo,
    }],
    queryFn: () => mostrarMovimientos({ 
      anio: anio,
      mes: mes,
      p_id_usuario: id_usuario,
      tipocategoria: tipo,
    })
  })

  useQuery({
    queryKey: ["mostrar cuentas"],
    queryFn: () => mostrarCuentas({ id_usuario: id_usuario })
  })

  useQuery({
    queryKey: ["mostrar categorias", { id_usuario: id_usuario, tipo: tipo }],
    queryFn: () => mostrarCategorias({ id_usuario: id_usuario, tipo: tipo })
  })

  return (
    <Container>
      {openRegistro && (
        <RegistrarMovimientos 
          dataSelect={dataSelect}
          state={openRegistro}
          accion={accion}
          setState={() => setOpenRegistro(!openRegistro)}
        />
      )}
      <header className='header'>
        <Header stateConfig={{ state: openMenu, setState: () => setOpenMenu(!openMenu) }} />                
      </header>      
      <section className='titulo'>
<Titulo title="Movimientos" align='center' />    
      </section>
      <section className='tipo'>
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
                top="58px"
                data={DataDesplegableMovimientos}
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
      <section className='totales'>
        
        <CardTotales 
          title={tipo == "g" ? "Gastos Pendientes" : "Ingresos Pendientes"}
          total={totalMesAñoPendientes}
          color={colorCategoria}
          icono={<v.flechaarribalarga/>}
        />
        <CardTotales 
          title={tipo == "g" ? "Gastos Pagados" : "Ingresos Pagados"}
          total={totalMesAñoPagados}
          color={colorCategoria}
          icono={<v.flechaabajolarga/>}
        />
        <CardTotales 
          title="Total"
          total={totalMesAño}
          color={colorCategoria}
          icono={<v.balance/>}
        />
      </section>      
      <section className='calendario'>
       <CalendarioLineal
          value={value}
          setValue={setValue}
          formatoFecha={formatoFecha}
          setFormatoFecha={setFormatoFecha}
        />
      </section>
      <section className='main'>        
        <TablaMovimientos           
          data={datamovimientos}
          dataSelect={dataSelect}
          setDataSelect={setDataSelect}
          setAccion={setAccion}
          setOpenRegistro={() => setOpenRegistro(!openRegistro)}
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
    "titulo" 100px
    "tipo" 100px
    "totales" 360px
    "calendario" 100px
    "main" auto;

    @media ${Device.tablet} {
      grid-template: 
        "header" 100px        
        "titulo" 100px
        "tipo" 100px
        "totales" 100px
        "calendario" 100px
        "main" auto;      
    }

  .header {
    grid-area: header; 
    /* background-color: rgba(103,93,241,0.14); */
    display: flex;
    align-items: center;
  }

  .tipo {
    grid-area: tipo; 
    /* background-color: rgba(60, 88, 22, 0.14); */
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .titulo {
    grid-area: titulo; 
    /* background-color: rgba(60, 88, 22, 0.14); */
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .totales {
    grid-area: totales;
   /*  background-color: rgba(229,67,26,0.14);   */
    display: grid;
    align-items: center;
    grid-template-columns: 1fr;
    gap: 10px;

    @media ${Device.tablet} {
      grid-template-columns: repeat(3, 1fr);
    }

  }

  .calendario {
    grid-area: calendario;
    /* background-color: rgba(77,237,106,0.14); */
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .main {
    grid-area: main;
    /*background-color: rgba(179,46,241,0.14);*/
  }
`

const ContentFiltro = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

