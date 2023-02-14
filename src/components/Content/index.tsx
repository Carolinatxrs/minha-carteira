import React from 'react';

import { Container } from './styles';

// Cria a interface para children
interface ChildrenProps {
  children: React.ReactNode;
}

const Content: React.FC<ChildrenProps> = ({children}) => {
  return (
    <Container>
      {children}
    </ Container>
  );
}

export default Content;