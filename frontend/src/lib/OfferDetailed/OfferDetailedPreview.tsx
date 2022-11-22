/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import OfferDataContext from '../../contexts/OfferDataContext';
import GlitchedButton from '../Buttons/GlitchedButton/GlitchedButton';
import OfferAndCompanyShort from './OfferAndCompanyShort';
import OfferDescription from './OfferDescription';
import { ListContainer, MainContainer } from './OfferDetailed.styled';
import TechStack from './TechStack';

const dummyData = {
  companyName: 'ItJobBoard',
  companySize: 200,
  companyLogoUrl: '',
  companySiteUrl: '',
};

function OfferDetailedPreview() {
  const {
    offerData,
    addressData,
    employmentContract,
    mandateContract,
    b2bContract,
    otherContract,
    techStack,
    description,
  } = useContext(OfferDataContext);

  const getContractData = (contract: any) => ({
    name: contract.name,
    undisclosed: contract.undisclosed,
    minMoney: contract.undisclosed ? null : contract.money[0],
    maxMoney: contract.undisclosed ? null : contract.money[1],
  });

  const getContractsArray = () => {
    const result = [];
    if (employmentContract.checked) {
      result.push(getContractData(employmentContract));
    }
    if (mandateContract.checked) {
      result.push(getContractData(mandateContract));
    }
    if (b2bContract.checked) {
      result.push(getContractData(b2bContract));
    }
    if (otherContract.checked) {
      result.push(getContractData(otherContract));
    }
    return result;
  };

  return (
    <MainContainer>
      <ListContainer>
        <OfferAndCompanyShort
          title={offerData.title}
          companyName={dummyData.companyName}
          companySize={dummyData.companySize}
          companyLogoUrl={dummyData.companyLogoUrl}
          companySiteUrl={dummyData.companySiteUrl}
          experienceLevel={offerData.expLevel}
          addressData={addressData}
          remoteStatus={offerData.remoteWork}
          contracts={getContractsArray()}
          date={new Date().toDateString()}
        />
        <TechStack data={techStack} />
        <OfferDescription data={description} />
        <GlitchedButton placeholder="Apply" />
      </ListContainer>
    </MainContainer>
  );
}

export default OfferDetailedPreview;
