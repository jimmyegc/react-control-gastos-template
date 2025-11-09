import styled from "styled-components";
import { v, useUsuariosStore, BtnCircular, formatCurrency } from "../../index";

export function CardTotales({ color, total, title, icono }) {
  const { dataUsuarios } = useUsuariosStore();
  return (
    <Container>      
      <div className="contentTextos">
        <section>
          <span className="title">{title}</span>
          <b>{<v.iconoFlechabajo />}</b>
        </section>
        <span className="total">
          {dataUsuarios.moneda} {formatCurrency(total, dataUsuarios.moneda)}
        </span>
      </div>
      <div className="contentIcono">
        <BtnCircular
          height="50px"
          width="50px"
          bgcolor={color}
          fontsize="25px"
          icono={icono}
          textColor="#ffffff"
          translateX="-45px"
          translateY="-15px"
        />
      </div>
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.bg};
  border-radius: 25px;
  padding: 20px;
  width: 100%;
  justify-content: space-between;

  .contentTextos {
    display: flex;
    flex-direction: column;

    .title {
      font-size: 14px;
    }

    .total {
      font-size: 22px;
      font-weight: 500;
    }

    section {
      display: flex;
      gap: 10px;
      display: flex;
      align-items: center;
    }

  }

  .contentIcono {
    display: flex;
  }
`;
