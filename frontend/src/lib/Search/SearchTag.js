import React from 'react';
import { Tag } from './Search.styled';

function SearchTag(props) {
  // eslint-disable-next-line react/prop-types
  const { type, value, handleDelete } = props;

  const deleteTag = () => {
    handleDelete(value, type);
  };

  const pickColorType = (tagType) => {
    switch (tagType) {
      case 'skill': { return 'skill'; }
      case 'location': { return 'location'; }
      case 'company': { return 'company'; }
      default: { return 'keyword'; }
    }
  };
  return (
    <Tag colorType={pickColorType(type)} onClick={deleteTag}>{value}</Tag>
  );
}

export default SearchTag;
