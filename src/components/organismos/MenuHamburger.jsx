import { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { v } from "../../styles/variables";
import styled, { keyframes, css } from "styled-components";
import { KiiroLogo, LinksArray, SecondarylinksArray } from "../../index";
import { NavLink } from "react-router-dom";

export function MenuHamburger() {
  const [click, setClick] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Container>
      <NavBar $scrolled={scrolled}>
        <div className="contentLogo" onClick={() => setClick(true)}>
          <KiiroLogo width="52px" height="52px" />          
          <span className="appTitle">Kiiro App</span>
        </div>

        <MenuButton
          aria-label={click ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setClick(!click)}
        >
          {click ? <FiX /> : <FiMenu />}
        </MenuButton>
      </NavBar>

      {/* Overlay: click fuera para cerrar */}
      <Overlay $visible={click.toString()} onClick={() => setClick(false)} />

      <Menu role="dialog" aria-hidden={!click} $click={click.toString()}>
        <div className="menuHeader">
          <div className="brand">
            <KiiroLogo width="32px" height="32px" />          
            <span className="appTitle">Kiiro App</span>
          </div>

          {/* Botón de cerrar dentro del menú */}
          <CloseButton
            aria-label="Cerrar menú"
            onClick={() => setClick(false)}
          >
            <FiX />
          </CloseButton>
        </div>

        <div className="menuLinks">
          {LinksArray.map(({ icon, label, to }) => (
            <NavLink
              key={label}
              to={to}
              className="linkItem"
              onClick={() => setClick(false)}
            >
              <div className="icon">{icon}</div>
              <span>{label}</span>
            </NavLink>
          ))}

          <Divider />

          {SecondarylinksArray.map(({ icon, label, to }) => (
            <NavLink
              key={label}
              to={to}
              className="linkItem"
              onClick={() => setClick(false)}
            >
              <div className="icon">{icon}</div>
              <span>{label}</span>
            </NavLink>
          ))}
        </div>
      </Menu>
    </Container>
  );
}

/* ---------------- Styled Components ---------------- */

const Container = styled.div`
  position: relative;
  z-index: 2000;
`;

const NavBar = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 12px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease;
  z-index: 2100;
  border-bottom: 1px solid gray;

  ${({ $scrolled }) =>
    $scrolled
      ? css`
          background: rgba(30, 30, 30, 0.6);
          backdrop-filter: blur(12px);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        `
      : css`
          background: transparent;
        `}

  .contentLogo {
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    
    img {
      width: 48px;
      height: 48px;      
    }

    .appTitle {
      font-size: 1.2rem;
      font-weight: 600;
      color: ${({ theme }) => theme.text};
      padding-right: 10px;
    }
  }
`;

const MenuButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.text};
  font-size: 1.8rem;
  z-index: 2200;
  transition: transform 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px;
  border-radius: 8px;

  &:hover {
    transform: scale(1.05);
    background: rgba(255, 255, 255, 0.03);
  }
`;

/* Overlay para click fuera */
const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(2px);
  opacity: ${({ $visible }) => ($visible === "true" ? 1 : 0)};
  pointer-events: ${({ $visible }) => ($visible === "true" ? "auto" : "none")};
  transition: opacity 0.35s ease;
  z-index: 2050;
`;

const slideIn = keyframes`
  from { transform: translateX(100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

const slideOut = keyframes`
  from { transform: translateX(0); opacity: 1; }
  to { transform: translateX(100%); opacity: 0; }
`;

const Menu = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 320px;
  max-width: 85vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  backdrop-filter: blur(18px);
  background: linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01));
  background-color: rgba(30, 30, 30, 0.45);
  border-left: 1px solid rgba(255, 255, 255, 0.06);
  box-shadow: -10px 0 30px rgba(0, 0, 0, 0.28);
  padding: 22px;
  animation: ${({ $click }) =>
      $click === "true"
        ? css`
            ${slideIn} 0.36s ease forwards
          `
        : css`
            ${slideOut} 0.36s ease forwards
          `};
  z-index: 2100;
  transform-origin: right center;

  .menuHeader {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    margin-bottom: 1.2rem;

    .brand {
      display: flex;
      align-items: center;
      
      gap: 10px;

      img {
        width: 40px;
        height: 40px;
      }

      .appTitle {
        font-size: 1.1rem;
        font-weight: 700;
        color: ${({ theme }) => theme.text};
      }
    }
  }

  .menuLinks {
    display: flex;
    flex-direction: column;
    gap: 8px;
    overflow-y: auto;
    padding-right: 6px;
  }

  .linkItem {
    display: flex;
    align-items: center;
    gap: 12px;
    text-decoration: none;
    color: ${({ theme }) => theme.text};
    padding: 10px;
    border-radius: 10px;
    transition: all 0.25s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.06);
      transform: translateX(6px);
    }

    &.active {
      background: rgba(255, 255, 255, 0.08);
    }

    .icon svg {
      font-size: 20px;
    }
  }
`;

const CloseButton = styled.button`
  background: rgba(255, 255, 255, 0.04);
  border: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border-radius: 10px;
  cursor: pointer;
  color: ${({ theme }) => theme.text};
  font-size: 1.1rem;
  transition: all 0.2s ease;
  z-index: 2200;

  &:hover {
    transform: scale(1.05);
    background: rgba(255, 255, 255, 0.07);
  }
`;

const Divider = styled.div`
  height: 1px;
  background: rgba(255, 255, 255, 0.06);
  margin: 14px 0;
`;
