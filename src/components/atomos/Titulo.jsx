import React from 'react'
import styled from 'styled-components'

export const Titulo = ({ title, align = "left", className }) => {
  return (
    <Wrapper className={className} $align={align}>
      <Left $align={align}>
        <Heading >{title}</Heading>
      </Left>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  justify-content: ${(p) => 
    p.$align === "center" ? "center" : 
    p.$align === "right" ? "flex-end" : "flex-start"};
  width: 100%;
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${(p) =>
    p.$align === "center" ? "center" :
    p.$align === "right" ? "flex-end" : "flex-start"};
  gap: 0.25rem;
  min-width: 0;
`;

const Heading = styled.h1`
  margin: 0;
  line-height: 1.05;
  color: ${(p) => p.theme.text};
  font-weight: 700;
  font-size: clamp(1.25rem, 1.5rem + 0.8vw, 2rem);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: 480px) {
    white-space: normal;
  }
`;