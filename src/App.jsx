
import { useState, createContext } from 'react'
import { Light, Dark, AuthContextProvider, MyRoutes, Sidebar, Device, Menu } from './index'
import { ThemeProvider } from 'styled-components'
import { styled } from 'styled-components'

export const ThemeContext = createContext(null);

function App() {
  const [theme, setTheme] = useState("light");
  const themeStyle = theme === "light" ? Light : Dark

  return (   
    <ThemeContext.Provider value={{ setTheme, theme }}>
      <ThemeProvider theme={themeStyle}>
        <AuthContextProvider>
          <Container>
            <div className="ContentSidebar">
              <Sidebar/>
            </div>      
            <div className='ContentMenu'>
              <Menu />
            </div>      
            <ContainerBody>
              <MyRoutes />   
            </ContainerBody>
          </Container>
        </AuthContextProvider>
      </ThemeProvider>        
    </ThemeContext.Provider>
  )
}

const Container = styled.div`  
  display: grid;
  grid-template-columns: 1fr;
  background: ${({ theme }) => theme.bgtotal };
  .ContentSidebar {
    display: none;
  }
  .ContentMenu {
      display: block;
    }
  @media ${Device.tablet} {    
    grid-template-columns: 65px 1fr;
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
