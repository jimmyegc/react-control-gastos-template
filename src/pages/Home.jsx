import React from 'react'
import styled from 'styled-components'
import { useAuthStore, UserAuth } from '../index'

export const Home = () => {
  const { signOut } = useAuthStore();
  const { user } =UserAuth();

  return (
    <Container>
      <div>Bienvenido Home {user.full_name}</div>
      <img src={user.picture} alt="" />

      <button onClick={signOut}>Cerrar sesión</button>
    </Container>
  )
}


const Container = styled.div`
height: 100vh`;