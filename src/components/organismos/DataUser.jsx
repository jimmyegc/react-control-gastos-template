import React from 'react'
import styled from 'styled-components'
import { BiUserCircle } from 'react-icons/bi'
import { BtnCircular, UserAuth, v, ListaMenuDesplegable, DesplegableUser, useAuthStore } from '../../index'

export const DataUser = ({ stateConfig }) => {
  const { user } = UserAuth();
  const { signOut } = useAuthStore();

  //console.log("User actual:", user);

  const funcionXtipo = async (tipo) => {    
    if (tipo === 'cerrarsesion') {
      await signOut();
    }
  };

  return (
    <Container onClick={stateConfig.setState}>            
      <div className='imgContainer'>
        {user?.picture ? (
          <img src={user.picture} alt="Foto de usuario" />
        ) : (
          <BiUserCircle className="iconUser" />
        )}
      </div>      

      <BtnCircular 
        icono={<v.iconocorona />}
        width="25px"
        height="25px"
        bgcolor={`linear-gradient(15deg, rgba(255, 88, 58, 0.86) 9%, #f8bf5b 100%);`}
        textColor="#181616"
        fontsize="11px"          
        translateX="-50px"
        translateY="-12px"
      />

      <span className='nombre'>{user?.name || 'Usuario'}</span>

      {stateConfig.state && (
        <ListaMenuDesplegable 
          data={DesplegableUser}
          top="62px" 
          funcion={(p) => funcionXtipo(p)}
        />
      )}
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  top: 0;
  right: 0;
  width: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
  border-radius: 50px;
  margin: 15px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  .imgContainer {
    height: 40px;
    width: 40px;
    min-height: 40px;
    min-width: 40px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 22px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => theme.bg3};
    transition: background-color 0.3s ease;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .iconUser {
      font-size: 2rem;
      color: ${({ theme }) => theme.mode === 'dark' ? '#f0f0f0' : '#3d3d3d'};
      opacity: 0.8;
      transition: color 0.3s ease, opacity 0.3s ease;
    }
  }

  &:hover {
    background-color: ${({ theme }) => theme.hover || theme.bg3};
  }

  .nombre {
    width: 100%;
    font-weight: 500;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-wrap: break-word;
  }
`;
