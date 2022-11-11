/* eslint-disable no-unused-vars */
import {
  Checkbox, Divider, FormControlLabel, Autocomplete, Button,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import GlitchedButton from '../Buttons/GlitchedButton/GlitchedButton';
import { StyledTextField } from '../Inputs/Inputs.styled';
import { StyledDrawer, FilterSection } from './FilterDrawer.styled';

const TAGS_URL = 'http://localhost:8080/offers/tags';

interface FilterDrawerInterface {
  open: boolean
  handleOpen: React.Dispatch<React.SetStateAction<boolean>>
}

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

function FilterDrawer({ open, handleOpen } : FilterDrawerInterface) {
  const [keywords, setKeywords] = useState(initialKeywords);
  const [checkboxes, setCheckboxes] = useState(initialCheckboxes);
  const [skills, setSkills] = useState<string[]>([]);
  const [options, setOptions] = useState<string[]>([]);
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

  const handleClear = () => {
    setKeywords(initialKeywords);
    setCheckboxes(initialCheckboxes);
    setSkills([]);
  };

  const handleFilter = () => {
    // TODO add filters to URL string and navigate there

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
          searchParams.append(field[0], subField[0]);
        }
      });
    });

    // TODO navigate to main with params
    setSearchParams(searchParams);

    // console.log(searchParams.getAll);
    // console.log(keywords);
    // console.log(skills);
    // console.log(checkboxes);
    // console.log(searchParams);
    // console.log('filter');
  };

  useEffect(() => {
    axios.get(TAGS_URL).then((response) => {
      if (response.status === 200) {
        // console.log(response);
        setOptions(response.data);
      }
    }).catch((error) => {
      console.log(error);
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
      <FormControlLabel control={<Checkbox name="remote.no" checked={checkboxes.remote.no} onChange={handleCheckboxes} />} label="No remote" />
      <FormControlLabel control={<Checkbox name="remote.partial" checked={checkboxes.remote.partial} onChange={handleCheckboxes} />} label="Partially remote" />
      <FormControlLabel control={<Checkbox name="remote.fullTime" checked={checkboxes.remote.fullTime} onChange={handleCheckboxes} />} label="Full time remote" />
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
      <Button type="button" onClick={handleClear}>Clear All</Button>
      <GlitchedButton placeholder="Filter" onClick={handleFilter} />
    </StyledDrawer>
  );
}

export default FilterDrawer;
