import styled from 'styled-components'
import { BtnSave, v, useAuthStore } from '../../index'

export const LoginTemplate = () => {
  const { signInWithGoogle } = useAuthStore()

  return (
    <Container imagenfondo={v.imagenfondo}>
      <div className='contentCard'>
        <span className='version'>versión 1.0</span>
        <div className='contentImg'>
          <img src={v.logo} alt="" />
        </div>      
        <Titulo>Control de Gastos</Titulo>
        <p className='frase'>Tome el control de tus 💸 gastos e 💰 ingresos.</p>      
        <ContainerBtn>
          <BtnSave 
            bgcolor={v.colorSecundario}
            icono={<v.iconogoogle/>}
            titulo="Iniciar con Google"
            funcion={signInWithGoogle}
          />
        </ContainerBtn>
      </div>
    </Container>
  )
}

const Container = styled.div`
  background-image: url(${(props) => props.imagenfondo});
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.87);
  .contentCard {
    background-color: #131313;
    border-radius: 20px;
    gap: 30px;
    display: flex;
    flex-direction: column;
    margin: 20px;
    padding: 20px;
    box-shadow: 8px 5px 18px 3px rgba(0, 0, 0, 0.35);
    justify-content:center;
    width:auto;
    height:80%;

    .version {
      color: #727272;
      text-align: start;
    }
    .contentImg {
      width: 100%;
      display: flex;
      justify-content: center;
      img {
        width: 60%;
        animation: flotar 1.5s ease-in-out infinite alternate;
      }
    }
    .frase {
      color: #909090;
      font-size: 1.2rem;
    }
  }
  

  @keyframes flotar {
    0% {
      transform: translate(0, 0px);
    }
    50% {
      transform: translate(0, 15px);
    }
    100% {
      transform: translate(0, -0px);
    }
  }
`;

const Titulo = styled.span`
  font-size: 5rem;
  font-weight: 700;
`

const ContainerBtn = styled.div`
  display: flex;
  justify-content: center;
`