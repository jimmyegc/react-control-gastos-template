import React from 'react'
import styled from 'styled-components'
import { HomeTemplate } from '../index'

export const Home = () => {

  return (    
    <Container>
      <HomeTemplate />
    </Container>
  )
}

const Container = styled.div`  
  height: 100vh;
  margin-top: 60px;
`;