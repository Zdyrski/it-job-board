import { styled } from '../stitches.config';

export const MainContainer = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
});

export const MainContainer2 = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  position: 'relative',
  top: '2rem',
});

export const SubContainer = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  '& svg path': {
    fill: '$secondaryColor',
  },
});

export const DetailContainer = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  position: 'relative',
  top: '50%',
  width: '22.5%',
  backgroundColor: '$primaryColor',
  borderRadius: '1rem',
  boxShadow: '0rem 2px 5px #d9d9d9',

  '& > div': {
    position: 'relative',
    top: '-1rem',
  },
});

export const DetailData = styled('div', {

});

export const DetailDescription = styled('div', {

});

export const DetailSvg = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '2.5rem',
  height: '2.5rem',
  borderRadius: '50%',
  boxShadow: '0rem 2px 5px #d9d9d9',
  backgroundColor: '$primaryColor',

  '& svg path': {
    fill: '$secondaryColor',
  },
});

export const CompanyTags = styled('div', {
  display: 'flex',
  justifyContent: 'flex-start',
});

export const CompanyTags2 = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
});

export const BlockLocation = styled('div', {
  display: 'inline-block',
  justifyContent: 'flex-start',
  whiteSpace: 'nowrap',
});

export const RemoteTag = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  border: '2px solid $backgroundColor',
  background: '$remoteBackgroundColor',
  color: '$violetColor',
  borderRadius: '1rem',
  padding: '0.2rem 0.6rem',
  margin: '0.5rem',
});
