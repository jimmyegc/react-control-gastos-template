import { useState } from "react";
import { v } from "../../styles/variables";
import styled, { keyframes } from "styled-components";
import { LinksArray, SecondarylinksArray } from "../../index";
import { NavLink } from "react-router-dom";

export function MenuHamburger() {
  const [click, setClick] = useState(false);

  return (
    <Container>
      <NavBar>
        <div className="contentLogo" onClick={() => setClick(!click)}>
          <img src={v.logo} alt="logo" />
          <span className="appTitle">Kiiro App</span>
        </div>

        {/* <HamburgerMenu
          $click={click.toString()}
          onClick={() => setClick(!click)}
        >
          <div className="burgerIcon">
            <span />
            <span />
            <span />
          </div>
        </HamburgerMenu> */}
      </NavBar>

      <Menu $click={click.toString()}>
        {LinksArray.map(({ icon, label, to }) => (
          <div
            key={label}
            className="LinkContainer"
            onClick={() => setClick(false)}
          >
            <NavLink to={to} className="Links">
              <div className="Linkicon">{icon}</div>
              <span>{label}</span>
            </NavLink>
          </div>
        ))}
        <Divider />
        {SecondarylinksArray.map(({ icon, label, to }) => (
          <div
            key={label}
            className="LinkContainer"
            onClick={() => setClick(false)}
          >
            <NavLink to={to} className="Links">
              <div className="Linkicon">{icon}</div>
              <span>{label}</span>
            </NavLink>
          </div>
        ))}
      </Menu>
    </Container>
  );
}

const Container = styled.div`
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const NavBar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background: linear-gradient(
    to right,
    rgba(41, 40, 90, 0.6),
    rgba(236, 92, 44, 0.6)
  );
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  position: sticky;
  top: 0;
  z-index: 1100;

  .contentLogo {
    display: flex;
    align-items: center;
    gap: 10px;
    img {
      width: 35px;
      height: 35px;
    }
    .appTitle {
      font-size: 1.2rem;
      font-weight: 600;
      color: ${({ theme }) => theme.text};
    }
  }
`;

const HamburgerMenu = styled.div`
  display: none;
  z-index: 1200;
  cursor: pointer;

  @media (max-width: 64em) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 6px;
  }

  .burgerIcon span {
    display: block;
    width: 28px;
    height: 3px;
    background: ${({ theme }) => theme.text};
    border-radius: 2px;
    transition: all 0.3s ease;
  }

  ${({ $click }) =>
    $click === "true" &&
    `
      .burgerIcon span:nth-child(1) {
        transform: rotate(45deg) translateY(8px);
      }
      .burgerIcon span:nth-child(2) {
        opacity: 0;
      }
      .burgerIcon span:nth-child(3) {
        transform: rotate(-45deg) translateY(-8px);
      }
  `}
`;

const slideIn = keyframes`
  from { transform: translateY(100%); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const Menu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  list-style: none;

  @media (max-width: 64em) {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    backdrop-filter: blur(18px);
    background: rgba(25, 25, 25, 0.4);
    box-shadow: inset 0 0 80px rgba(255, 255, 255, 0.05);
    transform: ${({ $click }) =>
      $click === "true" ? "translateY(0)" : "translateY(100%)"};
    transition: all 0.4s ease-in-out;
    flex-direction: column;
    justify-content: center;
    animation: ${({ $click }) => $click === "true" && slideIn} 0.4s ease;
  }

  .LinkContainer {
    &:hover {
      background: ${({ theme }) => theme.bgAlpha};
    }

    .Links {
      width: 100vw;
      display: flex;
      align-items: center;
      text-decoration: none;
      color: ${({ theme }) => theme.text};
      height: 70px;

      .Linkicon {
        padding: ${v.smSpacing} ${v.mdSpacing};
        display: flex;
        svg {
          font-size: 24px;
        }
      }

      &.active .Linkicon {
        color: ${({ theme }) => theme.bg5};
      }
    }
  }
`;

const Divider = styled.div`
  height: 1px;
  width: 80%;
  background: ${({ theme }) => theme.bg4};
  margin: ${v.lgSpacing} 0;
`;
