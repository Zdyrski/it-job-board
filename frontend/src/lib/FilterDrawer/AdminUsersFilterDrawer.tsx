import {
  Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent,
} from '@mui/material';
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { USER_STATUS_MAP } from '../../utils/constants';
import { FilterDrawerInterface } from '../../utils/types';
import GlitchedButton from '../Buttons/GlitchedButton/GlitchedButton';
import { StyledTextField } from '../Inputs/Inputs.styled';
import { FilterSection, StyledDrawer } from './FilterDrawer.styled';

const initialKeywords = {
  userId: '',
  email: '',
};

const initialUserState = {
  active: -1,
  locked: -1,
};

function AdminUsersFilterDrawer({ open, handleOpen } : FilterDrawerInterface) {
  const [keywords, setKeywords] = useState(initialKeywords);
  const [userState, setUserState] = useState(initialUserState);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleKeywordsChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    setKeywords({ ...keywords, [e.target.name]: e.target.value });
  };

  const handleUserStateChange = (e : SelectChangeEvent<number>) => {
    setUserState({ ...userState, [e.target.name]: e.target.value });
  };

  const handleClear = () => {
    setKeywords(initialKeywords);
    setUserState(initialUserState);
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
    if (userState.active !== -1) {
      searchParams.append('active', userState.active.toString());
    }
    if (userState.locked !== -1) {
      searchParams.append('locked', userState.locked.toString());
    }
    setSearchParams(searchParams);
  };

  return (
    <StyledDrawer anchor="left" open={open} onClose={handleOpen}>
      <FilterSection>Keywords</FilterSection>
      <StyledTextField name="userId" autoComplete="off" value={keywords.userId} label="UserId" variant="standard" onChange={handleKeywordsChange} />
      <StyledTextField name="email" autoComplete="off" value={keywords.email} label="E-mail" variant="standard" onChange={handleKeywordsChange} />
      <FilterSection>Status</FilterSection>
      <FormControl variant="standard" fullWidth>
        <InputLabel>Is active</InputLabel>
        <Select
          name="active"
          value={userState.active}
          label="Approval status"
          onChange={handleUserStateChange}
        >
          <MenuItem value={-1}>All</MenuItem>
          {USER_STATUS_MAP.map((option) => (
            <MenuItem key={option.name} value={option.value}>{option.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl variant="standard" fullWidth>
        <InputLabel>Is locked</InputLabel>
        <Select
          name="locked"
          value={userState.locked}
          label="Approval status"
          onChange={handleUserStateChange}
        >
          <MenuItem value={-1}>All</MenuItem>
          {USER_STATUS_MAP.map((option) => (
            <MenuItem key={option.name} value={option.value}>{option.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button type="button" onClick={handleClear}>Clear All</Button>
      <GlitchedButton placeholder="Filter" onClick={handleFilter} />
    </StyledDrawer>
  );
}

export default AdminUsersFilterDrawer;
