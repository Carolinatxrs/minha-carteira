import React from 'react';

import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';

import { Container } from './styles';

const Dashboard: React.FC = () => {

  const options = [
    {value: '2021', label: '2021'},
    {value: '2022', label: '2022'},
    {value: '2023', label: '2023'},
  ];

  return (
    <Container>
      <ContentHeader title='Dashboard' lineColor='#F7931B'>
        <SelectInput options={options} onChange={() => {}} />
      </ ContentHeader>
    </Container> 
  );
}

export default Dashboard;