import React from 'react'
import styled from 'styled-components'
import { LoginTemplate } from '../';

export const Login = () => {
  return (
    <Container>
      <LoginTemplate/>
    </Container>
  )
}

const Container = styled.div`  
  height: 100vh;
`