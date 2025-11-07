import React from 'react'
import styled from 'styled-components'
import { useAuthStore, UserAuth } from '../index'

export const Home = () => {
  const { signOut } = useAuthStore();
  const { user } = UserAuth();
  
  return (
    <Container>
      <div>Welcome Home {user.full_name}</div>      
      <img src={user?.picture} alt="" width={62} />      
      <button onClick={signOut}>Logout</button>
    </Container>
  )
}

const Container = styled.div`
  height: 100vh
`;