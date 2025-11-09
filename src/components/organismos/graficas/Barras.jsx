import styled from "styled-components";
import { 
  formatCurrency,
  useUsuariosStore,
} from '../../../index'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export function Barras({ datagrafica, data,titulo }) {
  const { dataUsuarios } = useUsuariosStore()
  const { moneda } = dataUsuarios  
  const style ={
    width:"400px"
  }
  return (
    <Container>
      <section>
        <Bar data={datagrafica} style={style}/>
      </section>
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

`;
const ContentCars = styled.div`
  display: flex;
  justify-content: space-between;
  .contentDescripcion{
    display: flex;
    gap: 10px;
  }
`;
