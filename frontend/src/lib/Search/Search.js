/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BackButton, MainContainer, SearchInput,
} from './Search.styled';
import { ReactComponent as BackArrow } from '../../assets/backArrow.svg';
import SearchTag from './SearchTag';

function Search() {
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const [tags, setTags] = useState([{ type: 'skill', value: 'FirstTag' }, { type: 'location', value: '2sdw' }, { type: 'keyword', value: 'aaa' }]);

  const handleInputChange = () => {
    // TODO
    // call to api to search for skill/location/company and update list that will be showed below
    // when pressed update query
    console.log(1);
  };

  const handleRemoveTag = (value, type) => {
    // TODO
    // when pressed => update query
    setTags((tag) => tag.filter((toRemove) => (toRemove.value !== value && toRemove.type !== type)));
  };

  // const updateLink = () => {
  //   // TODO
  //   // update tags that will be showed below when pressed update query
  //   console.log(1);
  // };

  // const navigateToLink = () => {
  //   // TODO
  //   // after query is updated go to that path(refresh offers)
  //   navigate({
  //     pathname: '/',
  //     search: `?${createSearchParams()}`,
  //   });
  // };

  return (
    <MainContainer>
      <BackButton onClick={() => navigate('/')}><BackArrow /></BackButton>
      {tags.map((tag) => (
        <SearchTag
          key={tag.value}
          value={tag.value}
          type={tag.type}
          handleDelete={handleRemoveTag}
        />
      ))}
      <SearchInput placeholder="Skill, location, company" onChange={handleInputChange} />
    </MainContainer>
  );
}

export default Search;
