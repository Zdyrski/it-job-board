import {
  Checkbox, Divider, FormControlLabel, Autocomplete,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GlitchedButton from '../Buttons/GlitchedButton/GlitchedButton';
import { StyledTextField } from '../Inputs/Inputs.styled';
import { StyledDrawer } from './FilterDrawer.styled';

const TAGS_URL = 'http://localhost:8080/offers/tags';

interface FilterDrawerInterface {
  open: boolean
  handleOpen: React.Dispatch<React.SetStateAction<boolean>>
}

function FilterDrawer({ open, handleOpen } : FilterDrawerInterface) {
  const [options, setOptions] = useState<string[]>([]);

  useEffect(() => {
    axios.get(TAGS_URL).then((response) => {
      if (response.status === 200) {
        console.log(response);
        setOptions(response.data);
      }
    }).catch((error) => {
      console.log(error);
    });
  }, []);

  return (
    <StyledDrawer anchor="left" open={open} onClose={handleOpen}>
      <StyledTextField label="Title keyword" variant="standard" />
      <StyledTextField label="City" variant="standard" />
      <Divider />
      <Autocomplete
        multiple
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
      <Divider />
      <FormControlLabel control={<Checkbox />} label="No remote" />
      <FormControlLabel control={<Checkbox />} label="Partially remote" />
      <FormControlLabel control={<Checkbox />} label="Full time remote" />
      <Divider />
      <FormControlLabel control={<Checkbox />} label="Contract of employment" />
      <FormControlLabel control={<Checkbox />} label="Contract of mandate" />
      <FormControlLabel control={<Checkbox />} label="B2B" />
      <FormControlLabel control={<Checkbox />} label="Other" />
      <Divider />
      <FormControlLabel control={<Checkbox />} label="Intern" />
      <FormControlLabel control={<Checkbox />} label="Junior" />
      <FormControlLabel control={<Checkbox />} label="Medium" />
      <FormControlLabel control={<Checkbox />} label="Senior" />
      <FormControlLabel control={<Checkbox />} label="Expert" />
      <GlitchedButton placeholder="Filter" />
    </StyledDrawer>
  );
}

export default FilterDrawer;
