import React from 'react'
import styled from 'styled-components'
import { ContentHeader, DataUser } from '../../index';

export const Header = ({ stateConfig }) => {
  return (    
      <ContentHeader>
        <DataUser stateConfig={stateConfig} />
      </ContentHeader>          
  )
}

const Container = styled.div`

`;
