import React from 'react';

import { GetItems } from './GetItems.jsx';
import { Wrapper } from './styled';
import Item from './Item.jsx';

const UserInfo = () => {
  const items = GetItems();

  return (
    <section className='section'>
      <Wrapper className='section-center'>
        {items.map(item => (
          <Item key={item.id} {...item} />
        ))}
      </Wrapper>
    </section>
  );
};

export default UserInfo;
