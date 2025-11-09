
import { useState, createContext } from 'react'
import {   
  AuthContextProvider, 
  MyRoutes, 
  Sidebar, 
  Device, 
  MenuHamburger, 
  useUsuariosStore,
  Login,
  SpinnerLoader,  
  ThemeProviderWithContext,
} from './index'
import { useLocation } from 'react-router-dom'
import { styled } from 'styled-components'
import { useQuery } from '@tanstack/react-query'

export const ThemeContext = createContext(null);

function App() {
  const { dataUsuarios, mostrarUsuarios } = useUsuariosStore()
  const theme = dataUsuarios?.tema === "0" ? 'light':'dark';    
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { pathname } = useLocation()
    
  const { isLoading, error } = useQuery({
    queryKey: ['mostrar usuarios'],
    queryFn: () => mostrarUsuarios()
  })

  if (isLoading) {
    return (<ThemeProviderWithContext theme={theme}>
      <SpinnerLoader />
    </ThemeProviderWithContext>)
  }

  if(error) { 
    return <h1>Error...</h1>
  }

  return (   
    <ThemeProviderWithContext theme={theme}>
      <AuthContextProvider>
        {pathname !== "/login" ? (
          <Container className={sidebarOpen ? "active" : ""}>
            <div className="ContentSidebar">
              <Sidebar state={sidebarOpen} setState={setSidebarOpen} />
            </div>
            <div className="ContentMenuHamburger">
              <MenuHamburger />
            </div>
            <ContainerBody>
              <MyRoutes />
            </ContainerBody>
          </Container>
        ) : (
          <Login />
        )}
      </AuthContextProvider>
    </ThemeProviderWithContext>
  )
}

const Container = styled.div`  
  display: grid;
  grid-template-columns: 1fr;
  background: ${({ theme }) => theme.bgtotal };
  transition: 0.3s ease-in-out;

  .ContentSidebar {
    display: none;
  }
  .ContentMenuHamburger {
    display: block;
    position: absolute;
    left: 20px;
  }
  @media ${Device.tablet} {    
    grid-template-columns: 65px 1fr;
    &.active {
      grid-template-columns: 220px 1fr;
    }
    .ContentSidebar {
      display: initial;
    }
    .ContentMenuHamburger {
      display: none;
    }
  }
`

const ContainerBody = styled.div`  
  width: 100%;
  grid-column: 1;

  @media ${Device.tablet} {    
    grid-column: 2;
  }
`

export default App
