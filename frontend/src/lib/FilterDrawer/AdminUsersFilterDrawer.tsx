import { Button, Checkbox, FormControlLabel } from '@mui/material';
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FilterDrawerInterface } from '../../types';
import GlitchedButton from '../Buttons/GlitchedButton/GlitchedButton';
import { StyledTextField } from '../Inputs/Inputs.styled';
import { StyledDrawer } from './FilterDrawer.styled';

const initialKeywords = {
  userId: '',
  email: '',
};

const initialCheckboxes = {
  active: false,
  locked: false,
};

function AdminUsersFilterDrawer({ open, handleOpen } : FilterDrawerInterface) {
  const [keywords, setKeywords] = useState(initialKeywords);
  const [checkboxes, setCheckboxes] = useState(initialCheckboxes);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleKeywordsChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    setKeywords({ ...keywords, [e.target.name]: e.target.value });
  };

  const handleCheckboxes = (e : React.ChangeEvent<HTMLInputElement>) => {
    const field = e.target.name;
    if (field !== undefined) {
      setCheckboxes({ ...checkboxes, [field]: !(checkboxes as any)[field] });
    }
  };

  const handleClear = () => {
    setKeywords(initialKeywords);
    setCheckboxes(initialCheckboxes);
  };

  const handleFilter = () => {
    searchParams.delete('userId');
    searchParams.delete('email');
    if (keywords.userId !== '') {
      searchParams.set('userId', keywords.userId);
    }
    if (keywords.email !== '') {
      searchParams.set('email', keywords.email);
    }

    searchParams.delete('active');
    searchParams.delete('locked');
    Object.entries(checkboxes).forEach((field) => {
      if (field[1] === true) {
        searchParams.append(field[0], field[0]);
      }
    });
    setSearchParams(searchParams);
  };

  return (
    <StyledDrawer anchor="left" open={open} onClose={handleOpen}>
      <StyledTextField name="userId" autoComplete="off" value={keywords.userId} label="UserId" variant="standard" onChange={handleKeywordsChange} />
      <StyledTextField name="email" autoComplete="off" value={keywords.email} label="E-mail" variant="standard" onChange={handleKeywordsChange} />
      <FormControlLabel control={<Checkbox name="active" checked={checkboxes.active} onChange={handleCheckboxes} />} label="Is active" />
      <FormControlLabel control={<Checkbox name="locked" checked={checkboxes.locked} onChange={handleCheckboxes} />} label="Is locked" />
      <Button type="button" onClick={handleClear}>Clear All</Button>
      <GlitchedButton placeholder="Filter" onClick={handleFilter} />
    </StyledDrawer>
  );
}

export default AdminUsersFilterDrawer;
