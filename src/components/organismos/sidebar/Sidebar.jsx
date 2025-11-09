import {styled } from 'styled-components'
import { NavLink } from 'react-router-dom'
import { 
  v, 
  LinksArray, 
  SecondarylinksArray, 
  SidebarCard,    
  useThemeContext,
  KiiroLogo,
} from '../../../index'

export const Sidebar = ({ state, setState }) => {  
  const { theme  } = useThemeContext();  
  const toggleState = () => setState(!state)

  return (
    <Main $isOpen={state}>
      <span className='SidebarButton' onClick={toggleState}>
        {<v.iconoflechaderecha/>}
      </span>
      <Container $isOpen={state} className={state?'active':''}>
        <div className='LogoContent'>
          <div className='imgContent'>
            <KiiroLogo />            
          </div>  
          <div>
            <h2>Kiiro</h2>             
            <span>Control de Gastos</span>    
          </div>                      
        </div>            
        {LinksArray.map(({ icon, label, to })=> (
          <div key={label} className={state ? 'LinkContainer active': 'LinkContainer'}>
            <NavLink to={to} 
              className={({ isActive }) => `Links${isActive?` active`: ``}`}
            >
              <div className="LinkIcon">{icon}</div>
              {state && <span>{label}</span>}
              
            </NavLink>
          </div>
        ))}
        <Divider />
        {SecondarylinksArray.map(({ icon, label, to })=> (
          <div key={label} className={state ? 'LinkContainer active': 'LinkContainer'}>
            <NavLink to={to} 
              className={({ isActive }) => `Links${isActive?` active`: ``}`}
            >
              <div className="LinkIcon">{icon}</div>
              {state && <span>{label}</span>}
              
            </NavLink>
          </div>
        ))}
        <Divider />
        {state && (<SidebarCard/>)}        
      </Container>
    </Main>
  )
}

const Container = styled.div`
  color: ${(props) => props.theme.text};
  background: ${(props) => props.theme.bg};
  position: fixed;
  padding-top: 20px;
  z-index: 1;
  height: 100%;
  width: 65px;
  transition: 0.3s ease-in-out;
  overflow-y: auto;
  overflow-x: hidden;
  &::-webkit-scrollbar { width: 8px; }
  &::-webkit-scrollbar-thumb { background: ${(props) => props.theme.colorScroll}; border-radius: 10px; }
  
  &.active {
    width: 220px;
  }
  .LogoContent {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 60px;
    gap: 10px;
    
    .imgContent {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 48px;      
      transition: all 0.35s ease;
      transform: ${({ $isOpen }) => ($isOpen?`scale(0.95)`:`scale(1.5)`)} rotate(${({ theme }) => theme.logorotate});
      
      img {
        width: 100%;
        animation: flotar 1.7s ease-in-out infinite alternate;
      }
    }

    h2, span {
      display: ${({ $isOpen }) => ($isOpen ? `block` : `none`)};
    }

    span {
      font-size: 0.85rem;
      padding-top: 1px;
    }
    
    @keyframes flotar {
      0% {
        transform: translate(0, 0px);
      }
      50% {
        transform: translate(0, 4px);
      }
      100% {
        transform: translate(0, -0px);
      }
    }
  }
  .LinkContainer {
    margin: 5px 0;
    transition: all 0.3s;
    padding: 0 5%;
    position: relative;
    &:hover {
      background: ${(props) => props.theme.bgAlpha }
    }
    .Links {
      display: flex;
      align-items: center; 
      text-decoration: none; 
      padding: calc(${() => v.smSpacing} - 2px) 0;
      color: ${(props) => props.theme.text};
      height: 60px;
      .LinkIcon {
        padding: ${() => v.smSpacing} ${() => v.mdSpacing};
        display: flex;
        svg {
          font-size: 25px;
        }
      }
      &.active {
        &::before {
          content: "";
          position: absolute; 
          height: 100%;
          background: ${(props) => props.theme.bg5 };
          width: 4px;
          border-radius: 10px;
          left: 0;
        }        
        color: ${(props) => props.theme.bg5 };        
      }
      
    }
  }
`

const Main = styled.div`
  .SidebarButton {
    position: fixed;
    top: 70px;
    left: 42px;  
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: ${(props) => props.theme.bgtgderecha};
    box-shadow: 0 0 4px ${(props) => props.theme.bg3}, 0 0 7px ${(props) => props.theme.bg};
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: all 0.2s;
    z-index: 2;
    transform: ${({ $isOpen }) => ($isOpen ? `translateX(162px) rotate(3.15rad)` : `initial`) };      
    color: ${(props) => props.theme.text};
  }
`

const Divider = styled.div`
  height: 1px;
  width: 100%;
  background: ${(props) => props.theme.bg4};
  margin: ${() => v.lgSpacing} 0;
`;
