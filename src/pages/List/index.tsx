import React, {useMemo} from 'react';

import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';
import HistoryFinanceCard from '../../components/HistoryFinanceCard';

import {useParams} from 'react-router-dom';

import { Container, Content, Filters } from './styles';

const List: React.FC = () => {

  const {type} = useParams();

  const title = useMemo(() => {
    return type === 'entry-balance' ? 'Entradas' : 'Saídas'
  },[type]);

  const lineColor = useMemo(() => {
    return type === 'entry-balance' ? '#F7931B' : '#E44C4E'
  },[type]);


  const months = [
    {value: '7', label: 'Julho'},
    {value: '6', label: 'Agosto'},
    {value: '5', label: 'Setembro'},
  ];

  const years = [
    {value: '2023', label: '2023'},
    {value: '2021', label: '2021'},
    {value: '2022', label: '2022'},
  ];

  return (
    <Container>
      <ContentHeader title={title} lineColor={lineColor}>
        <SelectInput options={months} />
        <SelectInput options={years} />
      </ ContentHeader>

      <Filters>
        <button 
          type='button'
          className='tag-filter tag-filter-recurrent'
        >
          Recorrentes
        </button>

        <button 
          type='button'
          className='tag-filter tag-filter-eventual'
        >
          Eventuais
        </button>
      </Filters>
      
      <Content>
        <HistoryFinanceCard
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