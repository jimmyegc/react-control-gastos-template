import styled from "styled-components";
import { v } from "../../index";
export function BtnCerrar({ funcion }) {
  return <Container onClick={funcion}>{<v.iconocerrar />}</Container>;
}
const Container = styled.span`  
  cursor: pointer;
  font-size: 1.5rem;
  transition: all 0.2s ease-in-out;
  
  &:hover {
    color: ${() => v.colorselector};    
  }
`;
