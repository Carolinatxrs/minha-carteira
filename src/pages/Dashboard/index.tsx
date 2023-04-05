import React, { useMemo, useState } from 'react';
// componentes
import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';
import WalletBox from '../../components/WalletBox';
import MessageBox from '../../components/MessageBox';
import PieChartBox from '../../components/PieChartBox';
import HistoryBox from '../../components/HistoryBox';
import BarChartBox from '../../components/BarChartBox';

// arquivos comuns
import expenses from '../../repositories/expenses';
import gains from '../../repositories/gains';
import listOfMonths from '../../utils/months';

// imagens
import happyImg from '../../assets/happy.svg';
import sadImg from '../../assets/sad.svg';
import grinningImg from '../../assets/grinning.svg';

import { Container, Content } from './styles';
import { forEachChild } from 'typescript';

const Dashboard: React.FC = () => {
  // estado para guardar mês e ano selecionado
  const [monthSelected, setMonthSelected] = useState<number>(new Date().getMonth() + 1);
  const [yearSelected, setYearSelected] = useState<number>(new Date().getFullYear());

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
  }, []);

  const months = useMemo(() => {
    return listOfMonths.map((month, index) => {
      return {
        value: index + 1,
        label: month,
      }
    });
  }, []);

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
  }, [monthSelected, yearSelected]);

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
  }, [monthSelected, yearSelected]);

  //calcula o saldo
  const totalBalance = useMemo(() => {
    return totalGains - totalExpenses;
  }, [totalExpenses, totalGains]);

  // tratamento da mensagem de carteira
  const message = useMemo(() => {
    if (totalBalance < 0) {
      return {
        title: 'Que triste!',
        description: 'Neste mês, você gastou mais do que deveria.',
        footerText: 'Verifique seus gastos e tente cortar algumas coisas desnecessárias.',
        icon: sadImg
      }
    } else if (totalBalance === 0) {
      return {
        title: 'Ufaa!',
        description: 'Neste mês, você gastou exatamente o que ganhou.',
        footerText: 'Tenha cuidado. No próximo tente poupar o seu dinheiro.',
        icon: grinningImg
      }
    } else {
      return {
        title: 'Muito bem!',
        description: 'Sua carteira está positiva!',
        footerText: 'Continue assim. Considere investir o seu saldo.',
        icon: happyImg
      }
    }
  }, [totalBalance]);

  const relationExpensesVersusGains = useMemo(() => {
    const total = totalGains + totalExpenses;

    const percentGains = (totalGains / total) * 100;
    const percentExpenses = (totalExpenses / total) * 100;

    const data = [
      {
        name: 'Entradas',
        value: totalGains,
        percent: Number(percentGains.toFixed(1)),
        color: '#F7931B'
      },
      {
        name: 'Saídas',
        value: totalExpenses,
        percent: Number(percentExpenses.toFixed(1)),
        color: '#E44C4E'
      },
    ];

    return data;
  }, [totalGains, totalExpenses])

  const historyData = useMemo(() => {
    return listOfMonths.map((_, month) => {

      let amountEntry = 0;

      gains.forEach(gain => {
        const date = new Date(gain.date);
        const gainMonth = date.getMonth();
        const gainYear = date.getFullYear();

        if (gainMonth === month && gainYear === yearSelected) {
          try {
            amountEntry += Number(gain.amount);
          } catch {
            throw new Error('amountEntry is invalid. amountEntry must be valid number');
          }
        }
      });

      let amountOutput = 0;

      expenses.forEach(expense => {
        const date = new Date(expense.date);
        const expenseMonth = date.getMonth();
        const expenseYear = date.getFullYear();

        if (expenseMonth === month && expenseYear === yearSelected) {
          try {
            amountOutput += Number(expense.amount);
          } catch {
            throw new Error('amountOutput is invalid. amountOutput must be valid number');
          }
        }
      });

      return {
        monthNumber: month,
        month: listOfMonths[month].substring(0, 3),
        amountEntry,
        amountOutput
      }
    })

      .filter(item => {
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();

        return (yearSelected === currentYear && item.monthNumber <= currentMonth) || (yearSelected < currentYear)

      })
  }, [yearSelected]);

  //tratamento dos dados para gráfico de barra saídas
  const relationExpensevesRecurrentVersusEventual = useMemo(() => {
    let amountRecurrent = 0;
    let amountEventual = 0;

    expenses
      .filter((expense) => {
        const date = new Date(expense.date);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;

        return month === monthSelected && year === yearSelected;
      })
      .forEach((expense) => {
        if (expense.frequency === 'recorrente') {
          return amountRecurrent += Number(expense.amount);
        }

        if (expense.frequency === 'eventual') {
          return amountEventual += Number(expense.amount);
        }
      });

    const total = amountRecurrent + amountEventual;

    return [
      {
        name: 'Recorrente',
        amount: amountRecurrent,
        percent: Number(((amountRecurrent / total) * 100).toFixed(1)),
        color: '#F7931B'
      },
      {
        name: 'Eventuais',
        amount: amountEventual,
        percent: Number(((amountEventual / total) * 100).toFixed(1)),
        color: '#E44C4E'
      }
    ]
  }, [monthSelected, yearSelected]);

  //tratamento dos dados para gráfico de barra entradas
  const relationGainsRecurrentVersusEventual = useMemo(() => {
    let amountRecurrent = 0;
    let amountEventual = 0;

    gains
      .filter((gain) => {
        const date = new Date(gain.date);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;

        return month === monthSelected && year === yearSelected;
      })
      .forEach((gain) => {
        if (gain.frequency === 'recorrente') {
          return amountRecurrent += Number(gain.amount);
        }

        if (gain.frequency === 'eventual') {
          return amountEventual += Number(gain.amount);
        }
      });

    const total = amountRecurrent + amountEventual;

    return [
      {
        name: 'Recorrente',
        amount: amountRecurrent,
        percent: Number(((amountRecurrent / total) * 100).toFixed(1)),
        color: '#F7931B'
      },
      {
        name: 'Eventuais',
        amount: amountEventual,
        percent: Number(((amountEventual / total) * 100).toFixed(1)),
        color: '#E44C4E'
      }
    ]
  }, [monthSelected, yearSelected]);

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
          amount={totalBalance}
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
          title={message.title}
          description={message.description}
          footerText={message.footerText}
          icon={message.icon}
        />
        <PieChartBox data={relationExpensesVersusGains} />

        <HistoryBox
          data={historyData}
          lineColorAmountEntry='#F7931B'
          lineColorAmountOutput='#E44C4E'
        />
        <BarChartBox
          title='Saídas'
          data={relationExpensevesRecurrentVersusEventual}
        />
        <BarChartBox
          title='Entradas'
          data={relationGainsRecurrentVersusEventual}
        />
      </Content>
    </Container >
  );
}

export default Dashboard;