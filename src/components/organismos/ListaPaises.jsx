import React, { useState } from 'react'
import styled from 'styled-components'
import { v, InputBuscadorLista, ConvertirCapitalize, Device, BtnCerrar } from '../../index'
import iso from 'iso-country-currency'

export const ListaPaises = ({ setSelect, setState }) => {
  const isoCodigos = iso.getAllISOCodes();
  const [dataResult, setDataResult] = useState([])

  const seleccionar = (p) => {
    setSelect(p)
    setState()
  }

  const buscar = (e) => {
    let filtrado = isoCodigos.filter((item) => {
      return item.countryName == ConvertirCapitalize(e.target.value)
    })
    setDataResult(filtrado)
    console.log(filtrado)
  }

  return (
    <Container>
      <header className='header'>
        <span>Busca tu país</span>
        <BtnCerrar funcion={setState} />        
      </header>   
      <Divider/> 
      <InputBuscadorLista
        placeholder="buscar..."
        onChange={buscar}
      />
      { dataResult.length > 0 && 
        dataResult.map((item, index) => (
          <ItemContainer key={index} onClick={() => seleccionar(item)}>
            <span>{item.countryName}</span>
            <span>{item.symbol}</span>
          </ItemContainer>
      ))}
    </Container>
  )
}

const Container = styled.div`
  margin-top: 15px;
  position: absolute;
  top: 88%;
  width: 100%;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.bgtotal};
  border-radius: 10px; 
  border: 3px solid ${(props) => props.color};
  box-shadow: 4px 9px 20px -12px ${(props) => props.color};
  padding: 10px;
  gap: 10px;
  color: ${({ theme }) => theme.text};  
  z-index: 5;

  @media ${() => Device.tablet} {
    width: 400px;
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: inherit;
    
    .close {
      cursor: pointer;
      font-size: 25px;
      transition: all 0.2s;
      
      &:hover {
        color: ${() => v.colorselector};
        transform: scale(1.2);
      }
    }
  }
`

const ItemContainer = styled.section`
  gap: 10px;
  display: flex;
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    background-color: ${({theme})=>theme.bgtotal};
  }
`;

const Divider = styled.div`
  height: 1px;
  width: 100%;
  background: ${(props) => props.theme.bg4};
  margin: ${() => v.xsSpacing } 0;
`;