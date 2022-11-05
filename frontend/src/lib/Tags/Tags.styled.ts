import { styled } from '../stitches.config';

export const TagContainer = styled('div', {
  border: '2px solid $backgroundColor',
  background: '$tertiaryColor',
  borderRadius: '1rem',
  display: 'inline-block',
  padding: '0rem 0.6rem',
  margin: '0.1rem',
  color: '$secondaryColor',
});

export const TagsContainer = styled('div', {
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'flex-end',
  flexFlow: 'row wrap',
  border: '2px solid $backgroundColor',
  borderRadius: '1.1rem',
});
