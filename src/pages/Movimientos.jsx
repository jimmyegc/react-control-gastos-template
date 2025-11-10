import React from 'react'
import { MovimientosTemplate } from '..'
import styled from 'styled-components';

export const Movimientos = () => {
  return (    
    <Container>
      <MovimientosTemplate />    
    </Container>
  )
}

const Container = styled.div`
  margin-top: 60px;
`