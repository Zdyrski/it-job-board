/* eslint-disable react/no-array-index-key */
import { TagContainer, TagsContainer } from './Tags.styled';

interface Props {
    tagsArray: string[]
}

function Tags({ tagsArray } : Props) {
  return (
    <TagsContainer>
      {tagsArray?.map((tag : String, index) => (
        <TagContainer key={index}>{tag}</TagContainer>
      ))}
    </TagsContainer>
  );
}

export default Tags;
