import React from 'react';

import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';
import HistoryFinanceCard from '../../components/HistoryFinanceCard';

import { Container, Content } from './styles';

const List: React.FC = () => {

  const options = [
    {value: '2021', label: '2021'},
    {value: '2022', label: '2022'},
    {value: '2023', label: '2023'},
  ];

  return (
    <Container>
      <ContentHeader title='Saídas' lineColor='#E44C4E'>
        <SelectInput options={options} />
      </ ContentHeader>
      
      <Content>
        <HistoryFinanceCard
        cardColor="#313862"
        tagColor="#E44C4E"
        title="Conta de Luz"
        subtitle="20/02/2023" 
        amount="R$ 140,00"
        />
        <HistoryFinanceCard
        cardColor="#313862"
        tagColor="#E44C4E"
        title="Conta de Luz"
        subtitle="20/02/2023" 
        amount="R$ 140,00"
        />
        <HistoryFinanceCard
        cardColor="#313862"
        tagColor="#E44C4E"
        title="Conta de Luz"
        subtitle="20/02/2023" 
        amount="R$ 140,00"
        />
        <HistoryFinanceCard
        cardColor="#313862"
        tagColor="#E44C4E"
        title="Conta de Luz"
        subtitle="20/02/2023" 
        amount="R$ 140,00"
        />
        <HistoryFinanceCard
        cardColor="#313862"
        tagColor="#E44C4E"
        title="Conta de Luz"
        subtitle="20/02/2023" 
        amount="R$ 140,00"
        />
        <HistoryFinanceCard
        cardColor="#313862"
        tagColor="#E44C4E"
        title="Conta de Luz"
        subtitle="20/02/2023" 
        amount="R$ 140,00"
        />
        <HistoryFinanceCard
        cardColor="#313862"
        tagColor="#E44C4E"
        title="Conta de Luz"
        subtitle="20/02/2023" 
        amount="R$ 140,00"
        />
        <HistoryFinanceCard
        cardColor="#313862"
        tagColor="#E44C4E"
        title="Conta de Luz"
        subtitle="20/02/2023" 
        amount="R$ 140,00"
        />
      </ Content>
    </Container>
  );
}

export default List;