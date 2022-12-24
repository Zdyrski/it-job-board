import { Alert, RadioGroup } from '@mui/material';
import InfiniteScroll from 'react-infinite-scroller';
import { styled } from '../stitches.config';

export const ListContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'start',
  alignItems: 'center',
  '@xs': {
    width: '95%',
  },
  '@md': {
    width: '80%',
  },
  '@lg': {
    width: '70%',
  },
  height: '100%',
  overflowY: 'scroll',
  overflowX: 'hidden',
  backgroundColor: '$tertiaryColor',

  // DISABLE SCROLLBAR
  scrollbarWidth: 'none',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
});

export const StyledInfinityScroll = styled(InfiniteScroll, {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'start',
  alignItems: 'center',
  '@xs': {
    width: '95%',
  },
  '@md': {
    width: '80%',
  },
  '@lg': {
    width: '70%',
  },
  height: '100%',
  overflowY: 'scroll',
  overflowX: 'hidden',
  backgroundColor: '$tertiaryColor',

  // DISABLE SCROLLBAR
  scrollbarWidth: 'none',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
});

export const MainContainer = styled('div', {
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  width: '95%',
  maxHeight: '8.5rem',
  backgroundColor: '$primaryColor',
  border: '0.2rem solid grey',
  borderRadius: '1rem',
  margin: '0.2rem',
  cursor: 'pointer',
});

export const OfferDetails = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  color: '$secondaryColor',
  width: '70%',
});

export const FirstRow = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  fontSize: '$text6',
  margin: '0.5rem 0',
});

export const Name = styled('div', {
  color: '$secondaryColor',
  textOverflow: 'ellipsis',
});

export const SecondRow = styled('div', {
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
});

export const ThirdRow = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  fontSize: '$text8',
});

export const FourthRow = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
});

export const DateTag = styled('div', {
  border: '2px solid $backgroundColor',
  background: '$remoteBackgroundColor',
  color: '$violetColor',
  borderRadius: '1rem',
  fontSize: '$text8',
  display: 'inline-block',
  padding: '0.1rem 0.6rem',
});

export const RowFlex = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
});

export const StyledAlert = styled(Alert, {
  width: '95%',
  '.MuiAlert-outlined': {
    padding: '0',
  },
  '.MuiAlert-root': {
    padding: '0',
  },
  '.MuiAlert-icon': {
    padding: '0',
  },
  '.MuiAlert-message': {
    padding: '0',
  },
});

export const AdminOfferMainContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
});

export const StyledRadioGroup = styled(RadioGroup, {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
});

export const SelectsDiv = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '70%',
});
