import React from 'react'
import { MiPerfilTemplate } from '../index'
import styled from 'styled-components';

export const MiPerfil = () => {
  return (
    <Container>
      <MiPerfilTemplate />
    </Container>
  )
}

const Container = styled.div`
  margin-top: 60px;
`