import {
  DetailContainer, DetailSvg, DetailData, DetailDescription, MainContainer,
} from './OfferTagline.styled';
import { ReactComponent as Company } from '../../assets/company.svg';
import { ReactComponent as People } from '../../assets/people.svg';
import { ReactComponent as ExpLvl } from '../../assets/exp.svg';
import { ReactComponent as Clock } from '../../assets/clock.svg';

function OfferTagline2() {
  return (
    <MainContainer>
      <DetailContainer>
        <DetailSvg><Company /></DetailSvg>
        <DetailData>Infobip</DetailData>
        <DetailDescription>Company name</DetailDescription>
      </DetailContainer>
      <DetailContainer>
        <DetailSvg><People /></DetailSvg>
        <DetailData>1000+</DetailData>
        <DetailDescription>Company size</DetailDescription>
      </DetailContainer>
      <DetailContainer>
        <DetailSvg><ExpLvl /></DetailSvg>
        <DetailData>Junior</DetailData>
        <DetailDescription>EXP. lvl</DetailDescription>
      </DetailContainer>
      <DetailContainer>
        <DetailSvg><Clock /></DetailSvg>
        <DetailData>New</DetailData>
        <DetailDescription>Added</DetailDescription>
      </DetailContainer>
    </MainContainer>
  );
}

export default OfferTagline2;
