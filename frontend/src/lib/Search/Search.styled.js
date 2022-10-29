import { styled } from '../stitches.config';

export const MainContainer = styled('div', {
  display: 'flex',
  height: '70%',
  width: '50%',
  borderRadius: '2rem',
  padding: '0rem 1rem 0rem 1rem',
  backgroundColor: '$tertiaryColor',

  '&:hover': {
    border: '1px solid $quaternaryColor',
    backgroundColor: '$tertiaryColor',
  },

});

export const BackButton = styled('div', {
  cursor: 'pointer',

  '& svg ': {
    height: '100%',
    width: '100%',
    backgroundColor: '$tertiaryColor',
  },

  '& svg path': {
    fill: '$secondaryColor',
  },
});

export const Tag = styled('div', {
  border: '2px solid $backgroundColor',
  background: '$tertiaryColor',
  color: '$primaryColor',
  borderRadius: '1rem',
  display: 'flex',
  alignContent: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  padding: '0rem 0.6rem',
  margin: '0.1rem',
  variants: {
    colorType: {
      skill: {
        backgroundColor: 'Green',
      },
      location: {
        backgroundColor: 'Grey',
      },
      company: {
        backgroundColor: 'Yellow',
      },
      keyword: {
        backgroundColor: 'Red',
      },
    },
  },

});

export const SearchInput = styled('input', {
  width: '100%',
  border: 'none',
  backgroundColor: '$tertiaryColor',
  paddingLeft: '0.5rem',
  '&:focus': {
    outline: 'none',
  },
});
