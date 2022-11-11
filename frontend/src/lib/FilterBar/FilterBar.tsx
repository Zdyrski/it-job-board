import { Button } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  DiJava, DiJavascript1, DiPython, DiHtml5, DiPhp, DiAndroid, DiApple, DiDotnet, DiReact, DiScala,
} from 'react-icons/di';
import FilterDrawer from '../FilterDrawer/FilterDrawer';
import { Icon, IconAndText, MainContainer } from './FilterBar.styled';

const filtersList = [
  { icon: <DiJava />, name: 'Java' },
  { icon: <DiJavascript1 />, name: 'JavaScript' },
  { icon: <DiPython />, name: 'Python' },
  { icon: <DiPhp />, name: 'PHP' },
  { icon: <DiHtml5 />, name: 'HTML5' },
  { icon: <DiAndroid />, name: 'Android' },
  { icon: <DiApple />, name: 'IOS' },
  { icon: <DiDotnet />, name: '.NET' },
  { icon: <DiReact />, name: 'React' },
  { icon: <DiScala />, name: 'Scala' },
];

function FilterBar() {
  // TODO quickfilters navigation and filtrt
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const handleOpeningDrawer = () => {
    setDrawerOpen((prev) => !prev);
  };

  return (
    <MainContainer>
      <Button type="button" onClick={handleOpeningDrawer}>More Filters</Button>
      <FilterDrawer open={drawerOpen} handleOpen={handleOpeningDrawer} />
      <div>QuickFilters:</div>
      {filtersList.map((filter) => (
        <IconAndText key={filter.name} onClick={() => navigate(`/?skill=${filter.name}`)}>
          <Icon>{filter.icon}</Icon>
          {filter.name}
        </IconAndText>
      ))}
    </MainContainer>
  );
}

export default FilterBar;
