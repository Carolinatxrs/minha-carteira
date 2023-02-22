import React, {useEffect, useMemo, useState} from 'react';

import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';
import HistoryFinanceCard from '../../components/HistoryFinanceCard';

import {useParams} from 'react-router-dom';

import gains from '../../repositories/gains';
import expenses from '../../repositories/expenses';

import { Container, Content, Filters } from './styles';

interface IData {
  id: string;
  description: string;
  amountFormatted: string;
  frequency: string;
  dataFormatted: string;
  tagColor: string;
}

const List: React.FC = () => {

  const [data, setData] = useState<IData[]>([]);

  const {type} = useParams();

  const title = useMemo(() => {
    return type === 'entry-balance' ? 'Entradas' : 'Saídas'
  },[type]);

  const lineColor = useMemo(() => {
    return type === 'entry-balance' ? '#F7931B' : '#E44C4E'
  },[type]);

  const listData = useMemo(() => {
    return type === 'entry-balance' ? gains : expenses;
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

  // dispara quando a tela é carregada
  useEffect(() => {

    const response = listData.map(item => {
      return {
        id: String(Math.random() * listData.length),
        description: item.description,
        amountFormatted: item.amount,
        frequency: item.frequency,
        dataFormatted: item.date,
        tagColor: item.frequency === 'recorrente' ? '#4E41F0' : '#E44C4E'
      };
    });
    setData(response);
    // type para carregamento do <content> de entradas e saídas
  },[type]);

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
        {
          data.map(item => (
            <HistoryFinanceCard
              key={item.id}
              tagColor={item.tagColor}
              title={item.description}
              subtitle={item.amountFormatted}
              amount={item.amountFormatted}
            /> 
          ))
        }
        
      </ Content>
    </Container>
  );
}

export default List;