import React from 'react';

import { Pie3D, Column3D, Bar3D, Doughnut2D } from '../Charts';

import { Wrapper } from './styled';
import { useGlobalContext } from '../../context/context';
import { dataPieAndDoughnutChart } from '../utils';
import { dataColumnAndBarChart } from '../utils';

const Repos = () => {
  const { repos } = useGlobalContext();
  const { pieData, doughnutData } = dataPieAndDoughnutChart(repos);
  const { columnData, barData } = dataColumnAndBarChart(repos);

  return (
    <section className='section'>
      <Wrapper className='section-center'>
        <Pie3D data={pieData} />
        <Column3D data={columnData} />
        <Doughnut2D data={doughnutData} />
        <Bar3D data={barData} />
      </Wrapper>
    </section>
  );
};

export default Repos;
