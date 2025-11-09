import styled from 'styled-components'
import { Icono } from '../../index'

export const BtnSave = ({ funcion, titulo, bgcolor, icono, disabled = false }) => {
  return (
    <Container 
      type="submit" 
      bgcolor={bgcolor} 
      onClick={!disabled ? funcion : undefined}
      disabled={disabled}
    >
      <Icono>{icono}</Icono>
      <span className='btn'>{titulo}</span>
    </Container>
  )
}

const Container = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border: none;
  background: none;
  text-decoration: none;      
  z-index: 2;
  
  .btn {
    background: ${(props) => props.bgcolor };
    padding: 0.6em 1.3em;
    font-weight: 900;
    font-size: 18px;
    border: 3px solid black;
    border-radius: 0.5em;
    box-shadow: 0.1em 0.1em #000;
    transition: 0.2s;
    white-space: 1px;
    color: black;
    cursor: pointer;
    user-select: none;

    &:hover {
      transform: translate(-0.05em, -0.05em);
      box-shadow: 0.15em 0.15em #000;
    }

    &:active {
      transform: translate(0.05em, 0.05em);
      box-shadow: 0.05em 0.05em #000;
    }    
  }

  &:disabled .btn {
      background: #ccc;
      border-color: #999;
      color: #666;
      box-shadow: none;
      cursor: not-allowed;
      transform: none;
  } 
  
`;
