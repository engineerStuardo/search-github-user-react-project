import React from 'react';

import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from '../Charts';

import { Wrapper } from './styled';
import { useGlobalContext } from '../../context/context';
import { dataPie3DChart } from '../utils';

const Repos = () => {
  const { repos } = useGlobalContext();
  const languages = dataPie3DChart(repos);

  return (
    <section className='section'>
      <Wrapper className='section-center'>
        <Pie3D data={languages} />
      </Wrapper>
    </section>
  );
};

export default Repos;
