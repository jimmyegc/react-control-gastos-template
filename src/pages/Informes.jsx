import React from 'react'
import { InformesTemplate } from '..';
import styled from 'styled-components';

export const Informes = () => {
  return (    
    <Container>
      <InformesTemplate/>    
    </Container>
  )
}

const Container = styled.div`
  margin-top: 60px;
`