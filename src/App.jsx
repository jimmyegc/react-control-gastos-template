
import { useState, createContext } from 'react'
import { Light, Dark, AuthContextProvider, MyRoutes, Sidebar, Device, Menu } from './index'
import { useLocation } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { styled } from 'styled-components'

export const ThemeContext = createContext(null);

function App() {
  const [theme, setTheme] = useState("dark");
  const themeStyle = theme === "light" ? Light : Dark
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { pathname } = useLocation()

  return (   
    <ThemeContext.Provider value={{ setTheme, theme }}>
      <ThemeProvider theme={themeStyle}>
        <AuthContextProvider>
          {pathname != "/login" ? (
            <Container className={sidebarOpen?'active':''}>
              <div className="ContentSidebar">
                <Sidebar state={sidebarOpen} setState={setSidebarOpen} />
              </div>      
              <div className='ContentMenu'>
                <Menu />
              </div>      
              <ContainerBody>
                <MyRoutes />   
              </ContainerBody>
            </Container>) : (<MyRoutes />)}
          
        </AuthContextProvider>
      </ThemeProvider>        
    </ThemeContext.Provider>
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
  .ContentMenu {
      display: block;
    }
  @media ${Device.tablet} {    
    grid-template-columns: 65px 1fr;
    &.active {
      grid-template-columns: 220px 1fr;
    }
    .ContentSidebar {
      display: initial;
    }
    .ContentMenu {
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
