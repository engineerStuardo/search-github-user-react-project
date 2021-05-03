import React from 'react';

import { Pie3D, Column3D, Bar3D, Doughnut2D } from '../Charts';

import { Wrapper } from './styled';
import { useGlobalContext } from '../../context/context';
import { dataPieAndDoughnutChart } from '../utils';
import { dataColumnAndBarChart } from '../utils';

const Repos = () => {
  const { repos } = useGlobalContext();
  const { pie, doughnut } = dataPieAndDoughnutChart(repos);
  const { column, bar } = dataColumnAndBarChart(repos);

  return (
    <section className='section'>
      <Wrapper className='section-center'>
        <Pie3D data={pie} />
        <Column3D data={column} />
        <Doughnut2D data={doughnut} />
        <Bar3D data={bar} />
      </Wrapper>
    </section>
  );
};

export default Repos;
