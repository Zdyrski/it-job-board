import { Button } from '@mui/material';
import React, { useState } from 'react';
import {
  DiJava, DiJavascript1, DiPython, DiHtml5, DiPhp, DiAndroid, DiApple, DiDotnet, DiReact, DiScala,
} from 'react-icons/di';
import FilterDrawer from '../FilterDrawer/FilterDrawer';
import { Icon, IconAndText, MainContainer } from './FilterBar.styled';

const filtersList = [
  { icon: <DiJava />, name: 'Java', link: '' },
  { icon: <DiJavascript1 />, name: 'JS', link: '' },
  { icon: <DiPython />, name: 'Python', link: '' },
  { icon: <DiPhp />, name: 'PHP', link: '' },
  { icon: <DiHtml5 />, name: 'HTML5', link: '' },
  { icon: <DiAndroid />, name: 'Android', link: '' },
  { icon: <DiApple />, name: 'IOS', link: '' },
  { icon: <DiDotnet />, name: '.NET', link: '' },
  { icon: <DiReact />, name: 'React', link: '' },
  { icon: <DiScala />, name: 'Scala', link: '' },
];

function FilterBar() {
  // TODO quickfilters navigation and filtrt
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleOpeningDrawer = () => {
    setDrawerOpen((prev) => !prev);
  };

  return (
    <MainContainer>
      <Button type="button" onClick={handleOpeningDrawer}>More Filters</Button>
      <FilterDrawer open={drawerOpen} handleOpen={handleOpeningDrawer} />
      <div>QuickFilters:</div>
      {filtersList.map((filter) => (
        <IconAndText key={filter.name}>
          <Icon>{filter.icon}</Icon>
          {filter.name}
        </IconAndText>
      ))}
    </MainContainer>
  );
}

export default FilterBar;
