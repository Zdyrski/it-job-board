import moment from 'moment';
import {
  DetailContainer, DetailSvg, DetailData, DetailDescription, MainContainer2,
} from './OfferTagline.styled';
import { ReactComponent as Company } from '../../assets/company.svg';
import { ReactComponent as People } from '../../assets/people.svg';
import { ReactComponent as ExpLvl } from '../../assets/exp.svg';
import { ReactComponent as Clock } from '../../assets/clock.svg';

interface OfferTagline2Interface {
  companyName: string
  companySize: number
  experienceLevel: string
  date: string
}

function OfferTagline2({
  companyName, companySize, experienceLevel, date,
} : OfferTagline2Interface) {
  return (
    <MainContainer2>
      <DetailContainer>
        <DetailSvg><Company /></DetailSvg>
        <DetailData>{companyName}</DetailData>
        <DetailDescription>Company name</DetailDescription>
      </DetailContainer>
      <DetailContainer>
        <DetailSvg><People /></DetailSvg>
        <DetailData>{companySize}</DetailData>
        <DetailDescription>Company size</DetailDescription>
      </DetailContainer>
      <DetailContainer>
        <DetailSvg><ExpLvl /></DetailSvg>
        <DetailData>
          {experienceLevel.charAt(0).toUpperCase() + experienceLevel.slice(1).toLowerCase()}
        </DetailData>
        <DetailDescription>EXP. lvl</DetailDescription>
      </DetailContainer>
      <DetailContainer>
        <DetailSvg><Clock /></DetailSvg>
        <DetailData>{moment(new Date(date)).fromNow()}</DetailData>
        <DetailDescription>Added</DetailDescription>
      </DetailContainer>
    </MainContainer2>
  );
}

export default OfferTagline2;
