import styled from "styled-components";
import { Device, v, BtnCerrar } from "../../index";

export function ListaGenerica({ data, setState, funcion, scroll, bottom }) {
  function seleccionar(p) {
    funcion(p);
    setState();
  }
  return (
    <Container $scroll={scroll} $bottom={bottom}>
      <header className="contentHeader">
        <span className="title">Seleccione:</span>
        <BtnCerrar funcion={setState} />
      </header>
      <Divider />
      <section className="contentItems">
        {data?.map((item, index) => {
          return (
            <ItemContainer key={index} onClick={() => seleccionar(item)}>
              <span>{item.icono}</span>
              <span>{item.descripcion}</span>
            </ItemContainer>
          );
        })}
      </section>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.bgtotal};
  color: ${({ theme }) => theme.text};
  position: absolute;
  margin-bottom: 15px;  
  bottom: ${(props) => props.$bottom};
  width: 100%;
  padding: 10px;
  border-radius: 10px;
  border: 3px solid ${(props) => props.color};
  box-shadow: 4px 9px 20px -12px ${(props) => props.color};
  gap: 10px;
  z-index: 5;
    
  @media ${() => Device.tablet} {
    width: 400px;
  } 

  .contentHeader  {
    display: flex;
    justify-content: space-between;
    align-items: center;    
    width: 100%;
    gap: 8px;

    .title {
      font-weight: 500;
      font-size: 1rem;
    }
  }

  .contentItems {
    max-height: 360px;
    overflow-y: ${(props) => props.$scroll};
  }

`;

const ItemContainer = styled.div`
  gap: 10px;
  display: flex;
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: ${(props) => props.theme.bgAlpha }    
  }
`;

const Divider = styled.div`
  height: 1px;
  width: 100%;
  background: ${(props) => props.theme.bg4};
  margin: ${() => v.xsSpacing } 0;
`;
