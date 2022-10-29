import React from 'react';
import Search from '../Search/Search';
import { MainContainer } from './FilterBar.styled';

function FilterBar() {
  return (
    <MainContainer>
      <Search />
      <div>Location</div>
      <div>Technologies</div>
      <div>More Filters</div>
    </MainContainer>
  );
}

export default FilterBar;
