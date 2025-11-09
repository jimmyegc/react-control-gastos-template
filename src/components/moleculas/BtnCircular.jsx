import React from 'react'
import styled from 'styled-components'

export const BtnCircular = ({ icono, width, height, bgcolor, textColor, fontsize, translateX, translateY}) => {
  return (
    <Container
      $bgcolor={bgcolor}
      $textColor={textColor}
      $height={height}
      $width={width}
      $fontsize={fontsize}
      $translateX={translateX}
      $translateY={translateY}
    >
      <span>{icono}</span>
    </Container>
  )
}


const Container = styled.button`
  background-color: ${(props) => props.$bgcolor };
  min-width: ${(props) => props.$width };
  min-height: ${(props) => props.$height };
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  transform: translateX(${(props) => props.$translateX}) translateY(${(props) => props.$translateY});
  border: 1px solid ${(props) => props.$textColor};

  span {
    font-size: ${(props) => props.$fontsize };
    text-align: center;
    color: ${(props) => props.$textColor };
  }
`