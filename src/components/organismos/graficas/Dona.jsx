import styled from "styled-components";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { 
  formatCurrency,
  useUsuariosStore,
} from '../../../index'

ChartJS.register(ArcElement, Tooltip, Legend);

export function Dona({ datagrafica, data,titulo }) {
  const { dataUsuarios } = useUsuariosStore()
  const { moneda } = dataUsuarios  
    
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "bottom" },
    },
  };

  return (
    <Container>
      <ChartWrapper >
        <Doughnut 
          data={datagrafica} 
          options={options}
        />
      </ChartWrapper>
      <section>
        <h2>{titulo} por categoría</h2>
        {data?.map((item) => {
          return (
            <ContentCars>
              <div className="contentDescripcion">
                <span>{item.icono}</span>
                <span className="descripcion">{item.descripcion}</span>
              </div>              
              <span>{formatCurrency(item.total, moneda)}</span>
            </ContentCars>
          );
        })}
      </section>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  width: 100%;
  max-width: 100vw;
  overflow-x: hidden;
`;

const ChartWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 350px;
  aspect-ratio: 1;
`;

const ContentCars = styled.div`
  display:flex;
  justify-content: space-between;
  width: 100%;

  .contentDescripcion{
    display: flex;
    gap: 10px;
  }
`;
