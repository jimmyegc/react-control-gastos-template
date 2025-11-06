import React from 'react'
import { ConfiguracionTemplate } from '../index'
import styled from 'styled-components'

export const Configuracion = () => {
  return (
    <Container>
      <ConfiguracionTemplate/>
    </Container>
  )
}

const Container = styled.main`
  height: 100vh;
`
