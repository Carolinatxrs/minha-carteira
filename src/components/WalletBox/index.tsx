import React from 'react';

// importação de icones
import dollarImg from '../../assets/dollar.svg';
import arrowUpImg from '../../assets/arrow-up.svg';
import arrowDownImg from '../../assets/arrow-down.svg';

import { Container } from './styles';

// interface do cartão
interface IWalletBoxProps {
  title: string;
  amount: number;
  footerlabel: string;
  icon: 'dollar' | 'arrowUp' | 'arrowDown';
  color: string;
}

const WalletBox: React.FC<IWalletBoxProps> = ({
  title,
  amount,
  footerlabel,
  icon,
  color
}) => {
  return (
    <Container color={color}>
      <span>{title}</span>
      <h1>{amount}</h1>
      <small>{footerlabel}</small>
      <img src={dollarImg} alt={title} />
    </ Container>
  );
}

export default WalletBox;