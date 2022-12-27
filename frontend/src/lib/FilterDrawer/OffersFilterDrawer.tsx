/* eslint-disable no-unused-vars */
import {
  Checkbox, FormControlLabel, Autocomplete, Button,
  FormControl, InputLabel, MenuItem, Select, SelectChangeEvent,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import GlitchedButton from '../Buttons/GlitchedButton/GlitchedButton';
import { StyledTextField } from '../Inputs/Inputs.styled';
import { StyledDrawer, FilterSection } from './FilterDrawer.styled';
import { FilterDrawerInterface } from '../../utils/types';
import { hasAuthority } from '../../utils/helperFunctions';
import { APPROVAL_MAP, FILTER_MAP } from '../../utils/constants';

const TAGS_URL = 'http://localhost:8080/tags';

const initialKeywords = {
  title: '',
  city: '',
};

const initialCheckboxes = {
  remote: {
    no: false,
    partial: false,
    fullTime: false,
  },
  contract: {
    employment: false,
    mandate: false,
    B2B: false,
    other: false,
  },
  expLevel: {
    intern: false,
    junior: false,
    medium: false,
    senior: false,
    expert: false,
  },
};

const initialOfferState = {
  approvalStatus: -1,
  archived: -1,
};

function OffersFilterDrawer({ open, handleOpen } : FilterDrawerInterface) {
  const [keywords, setKeywords] = useState(initialKeywords);
  const [checkboxes, setCheckboxes] = useState(initialCheckboxes);
  const [skills, setSkills] = useState<string[]>([]);
  const [options, setOptions] = useState<string[]>([]);
  const [offerState, setOfferState] = useState(initialOfferState);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleFiltersChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    setKeywords({ ...keywords, [e.target.name]: e.target.value });
  };

  const handleCheckboxes = (e : React.ChangeEvent<HTMLInputElement>) => {
    const field = e.target.name.split('.').at(0);
    const subField = e.target.name.split('.').at(1);
    if (field !== undefined && subField !== undefined) {
      setCheckboxes({
        ...checkboxes,
        [field]: {
          ...(checkboxes as any)[field],
          [subField]: !(checkboxes as any)[field][subField],
        },
      });
    }
  };

  const handleOfferStateChange = (e : SelectChangeEvent<number>) => {
    setOfferState({ ...offerState, [e.target.name]: e.target.value });
  };

  const handleClear = () => {
    setKeywords(initialKeywords);
    setCheckboxes(initialCheckboxes);
    setSkills([]);
  };

  const handleFilter = () => {
    searchParams.delete('title');
    searchParams.delete('city');
    if (keywords.title !== '') {
      searchParams.set('title', keywords.title);
    }
    if (keywords.city !== '') {
      searchParams.set('city', keywords.city);
    }

    searchParams.delete('skill');
    skills.forEach((skill) => {
      if (!searchParams.getAll('skill').find((el) => el === skill)) {
        searchParams.append('skill', skill);
      }
    });

    searchParams.delete('remote');
    searchParams.delete('contract');
    searchParams.delete('expLevel');
    Object.entries(checkboxes).forEach((field) => {
      Object.entries(field[1]).forEach((subField) => {
        if (subField[1] === true) {
          const value = FILTER_MAP.get(subField[0]);
          if (value !== undefined) {
            searchParams.append(field[0], value);
          }
        }
      });
    });

    if (hasAuthority('adminPanel:manage')) {
      searchParams.delete('approvalStatus');
      searchParams.delete('archived');
      if (offerState.approvalStatus !== -1) {
        searchParams.append('approvalStatus', offerState.approvalStatus.toString());
      }
      if (offerState.archived !== -1) {
        searchParams.append('archived', offerState.archived.toString());
      }
    }

    setSearchParams(searchParams);
  };

  useEffect(() => {
    axios.get(TAGS_URL).then((response) => {
      if (response.status === 200) {
        setOptions(response.data);
      }
    });
  }, []);

  return (
    <StyledDrawer anchor="left" open={open} onClose={handleOpen}>
      <StyledTextField name="title" autoComplete="off" value={keywords.title} label="Title keyword" variant="standard" onChange={handleFiltersChange} />
      <StyledTextField name="city" autoComplete="off" value={keywords.city} label="City" variant="standard" onChange={handleFiltersChange} />
      <Autocomplete
        multiple
        value={skills}
        onChange={(_e, newValue) => setSkills(newValue)}
        options={options}
        getOptionLabel={(option) => option}
        filterSelectedOptions
        renderInput={(params) => (
          <StyledTextField
            {...params}
            label="Skills"
            placeholder="Search"
            variant="standard"
          />
        )}
      />
      <FilterSection>Remote work</FilterSection>
      <FormControlLabel control={<Checkbox name="remote.no" id="NO" checked={checkboxes.remote.no} onChange={handleCheckboxes} />} label="No remote" />
      <FormControlLabel control={<Checkbox name="remote.partial" id="NO" checked={checkboxes.remote.partial} onChange={handleCheckboxes} />} label="Partially remote" />
      <FormControlLabel control={<Checkbox name="remote.fullTime" id="NO" checked={checkboxes.remote.fullTime} onChange={handleCheckboxes} />} label="Full time remote" />
      <FilterSection>Contract type</FilterSection>
      <FormControlLabel control={<Checkbox name="contract.employment" checked={checkboxes.contract.employment} onChange={handleCheckboxes} />} label="Contract of employment" />
      <FormControlLabel control={<Checkbox name="contract.mandate" checked={checkboxes.contract.mandate} onChange={handleCheckboxes} />} label="Contract of mandate" />
      <FormControlLabel control={<Checkbox name="contract.B2B" checked={checkboxes.contract.B2B} onChange={handleCheckboxes} />} label="B2B" />
      <FormControlLabel control={<Checkbox name="contract.other" checked={checkboxes.contract.other} onChange={handleCheckboxes} />} label="Other" />
      <FilterSection>Experience level</FilterSection>
      <FormControlLabel control={<Checkbox name="expLevel.intern" checked={checkboxes.expLevel.intern} onChange={handleCheckboxes} />} label="Intern" />
      <FormControlLabel control={<Checkbox name="expLevel.junior" checked={checkboxes.expLevel.junior} onChange={handleCheckboxes} />} label="Junior" />
      <FormControlLabel control={<Checkbox name="expLevel.medium" checked={checkboxes.expLevel.medium} onChange={handleCheckboxes} />} label="Medium" />
      <FormControlLabel control={<Checkbox name="expLevel.senior" checked={checkboxes.expLevel.senior} onChange={handleCheckboxes} />} label="Senior" />
      <FormControlLabel control={<Checkbox name="expLevel.expert" checked={checkboxes.expLevel.expert} onChange={handleCheckboxes} />} label="Expert" />
      {hasAuthority('adminPanel:manage') && (
      <div>
        <FilterSection>Status</FilterSection>
        <FormControl variant="standard" fullWidth>
          <InputLabel>Approval status</InputLabel>
          <Select
            name="approvalStatus"
            value={offerState.approvalStatus}
            label="Approval status"
            onChange={handleOfferStateChange}
          >
            <MenuItem value={-1}>All</MenuItem>
            {APPROVAL_MAP.map((option) => (
              <MenuItem key={option.name} value={option.value}>{option.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant="standard" fullWidth>
          <InputLabel>Archived</InputLabel>
          <Select
            name="archived"
            value={offerState.archived}
            label="Archived"
            onChange={handleOfferStateChange}
          >
            <MenuItem value={-1}>All</MenuItem>
            <MenuItem value={0}>False</MenuItem>
            <MenuItem value={1}>True</MenuItem>
          </Select>
        </FormControl>
      </div>
      )}
      <Button type="button" onClick={handleClear}>Clear All</Button>
      <GlitchedButton placeholder="Filter" onClick={handleFilter} />
    </StyledDrawer>
  );
}

export default OffersFilterDrawer;
