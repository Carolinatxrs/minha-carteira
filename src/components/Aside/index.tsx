import React from 'react';
import {
  MdDashboard,
  MdArrowDownward,
  MdArrowUpward,
  MdExitToApp
} from 'react-icons/md';
import { Link } from 'react-router-dom';

import logoImg from '../../assets/logo.svg';

import {
  Container,
  Header,
  LogImg,
  Title,
  MenuContainer
} from './styles';

const Aside: React.FC = () => (
  <Container>
    <Header>
      <LogImg src={logoImg} alt="Logo Minha Carteira" />
      <Title>Minha Carteira</Title>
    </Header>

    <MenuContainer>
      <Link to="/">
        <MdDashboard />
        Dashboard
      </Link>

      <Link to="/list/entry-balance">
        <MdArrowDownward />
        Entradas
      </Link>

      <Link to="/list/exit-balance">
        <MdArrowUpward />
        Saídas
      </Link>

      <Link to="#">
        <MdExitToApp />
        Sair
      </Link>
    </MenuContainer>
  </Container>
);

export default Aside;