import React from 'react'
import styled from 'styled-components'
import { ContentHeader, DataUser } from '../../index';

export const Header = ({ stateConfig }) => {
  return (    
    <ContentHeader>
      <div onClick={(e) => e.stopPropagation()}>
        <DataUser stateConfig={stateConfig} />
      </div>
    </ContentHeader>          
  )
}

const Container = styled.div`

`;
