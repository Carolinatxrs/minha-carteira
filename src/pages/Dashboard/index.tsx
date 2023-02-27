import React, { useMemo, useState } from 'react';
// componentes
import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';
import WalletBox from '../../components/WalletBox';
import MessageBox from '../../components/MessageBox';

// arquivos comuns
import expenses from '../../repositories/expenses';
import gains from '../../repositories/gains';
import listOfMonths from '../../utils/months';

// imagens
import happyImg from '../../assets/happy.svg';
// import sadImg from '../../assets/sad.svg';

import { Container, Content } from './styles';

const Dashboard: React.FC = () => {
  // estado para guardar mês e ano selecionado
  const [monthSelected, setMonthSelected] = useState<number>(new Date().getMonth() + 1);
  const [yearSelected, setYearSelected] = useState<number>(new Date().getFullYear());

  // const options = [
  //   {value: '2021', label: '2021'},
  //   {value: '2022', label: '2022'},
  //   {value: '2023', label: '2023'},
  // ];

  const years = useMemo(() => {
    let uniqueYears: number[] = [];

    [...expenses, ...gains].forEach(item => {
      const date = new Date(item.date);
      const year = date.getFullYear();
      
      if (!uniqueYears.includes(year)) {
        uniqueYears.push(year);        
      }
    });

    return uniqueYears.map(year => {
      return {
        value: year,
        label: year,
      }
    });
  },[]);

  const months = useMemo(() => {
    return listOfMonths.map((month, index) => {
      return {
        value: index + 1,
        label: month,
      }
    });
  },[]);

  // calcula total de gastos - saídas
  const totalExpenses = useMemo(() => {
    let total: number = 0;

    expenses.forEach(item => {
      const date = new Date(item.date);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;

      /*se o mês e ano forem iguais aos selecionados converte para number e incrementa*/
      if (month === monthSelected && year === yearSelected) {
        try {
          total += Number(item.amount);
        } catch {
          throw new Error('Invalid amount! Amount must be number.');    
        }        
      }
    });
    return total;
  },[monthSelected, yearSelected]);

  // calcula total de ganhos - entradas
  const totalGains = useMemo(() => {
    let total: number = 0;

    gains.forEach(item => {
      const date = new Date(item.date);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;

      /*se o mês e ano forem iguais aos selecionados converte para number e incrementa*/
      if (month === monthSelected && year === yearSelected) {
        try {
          total += Number(item.amount);
        } catch {
          throw new Error('Invalid amount! Amount must be number.');    
        }        
      }
    });
    return total;
  },[monthSelected, yearSelected]);

  const handleMonthSelected = (month: string) => {
    try {
      const parseMonth = Number(month);
      setMonthSelected(parseMonth);
    } catch (error) {
      throw new Error('invalid month value. Is accept 0 - 24.');
    }
  }

  const handleYearSelected = (year: string) => {
    try {
      const parseYear = Number(year);
      setYearSelected(parseYear);
    } catch (error) {
      throw new Error('invalid year value. Is accept integer numbers.');
    }
  }

  return (
    <Container>
      <ContentHeader title='Dashboard' lineColor='#F7931B'>
      <SelectInput 
          options={months} 
          onChange={(e) => handleMonthSelected(e.target.value)} 
          defaultValue={monthSelected} 
        />
        <SelectInput 
          options={years} 
          onChange={(e) => handleYearSelected(e.target.value)} 
          defaultValue={yearSelected} 
        />
      </ ContentHeader>

      <Content>
        <WalletBox
          title='saldo'
          amount={150.00}
          footerlabel='atualizado com base nas entradas e saídas'
          icon='dolar'
          color='#4E41F0'
        />
        <WalletBox
          title='entradas'
          amount={totalGains}
          footerlabel='atualizado com base nas entradas'
          icon='arrowUp'
          color='#F7931B'
        />
        <WalletBox
          title='saídas'
          amount={totalExpenses}
          footerlabel='atualizado com base nas saídas'
          icon='arrowDown'
          color='#E44C4E'
        />
        <MessageBox
          title='Muito bem!'
          description='Sua carteira está positiva!'
          footerText='Continue assim. Considere investir o seu saldo.'
          icon={happyImg} 
        />
      </Content>
    </Container> 
  );
}

export default Dashboard;