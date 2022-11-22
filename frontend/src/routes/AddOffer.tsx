import React, { useState, useMemo } from 'react';
import OfferDataContext from '../contexts/OfferDataContext';
import GlitchedButton from '../lib/Buttons/GlitchedButton/GlitchedButton';
import { FlexColumnCenterContainer } from '../lib/Containers/Containers.styled';
import Navbar from '../lib/Navbar/Navbar';
import OfferAdder from '../lib/OfferAdder/OfferAdder';
import OfferDetailedPreview from '../lib/OfferDetailed/OfferDetailedPreview';

const initialData = {
  title: '',
  remoteWork: 'NO',
  expLevel: 'INTERN',
};

const initialAddressData = {
  country: 'Poland',
  city: '',
  street: '',
};

const initialContractData = {
  checked: false,
  undisclosed: true,
  money: [0, 100000],
};

function AddOffer() {
  const [editMode, setEditMode] = useState(true);
  const [offerData, setOfferData] = useState(initialData);
  const [addressData, setAddressData] = useState(initialAddressData);
  const [employmentContract, setEmploymentContract] = useState({ ...initialContractData, name: 'employment' });
  const [mandateContract, setMndateContract] = useState({ ...initialContractData, name: 'mandate' });
  const [b2bContract, setB2bContract] = useState({ ...initialContractData, name: 'B2B' });
  const [otherContract, setOtherContract] = useState({ ...initialContractData, name: 'other' });
  const [techStack, setTechStack] = useState([]);
  const [description, setDescription] = useState('');

  const values = useMemo(() => ({
    offerData,
    setOfferData,
    addressData,
    setAddressData,
    employmentContract,
    setEmploymentContract,
    mandateContract,
    setMndateContract,
    b2bContract,
    setB2bContract,
    otherContract,
    setOtherContract,
    techStack,
    setTechStack,
    description,
    setDescription,
  }), [offerData,
    setOfferData,
    addressData,
    setAddressData,
    employmentContract,
    setEmploymentContract,
    mandateContract,
    setMndateContract,
    b2bContract,
    setB2bContract,
    otherContract,
    setOtherContract,
    techStack,
    setTechStack,
    description,
    setDescription]);

  const handleEditMode = () => {
    setEditMode((prev) => !prev);
  };

  return (
    <OfferDataContext.Provider value={values}>
      <FlexColumnCenterContainer>
        <Navbar filterBar={false} />
        {editMode ? <OfferAdder /> : <OfferDetailedPreview />}
        <GlitchedButton placeholder={editMode ? 'Preview' : 'Edit'} onClick={handleEditMode} />
      </FlexColumnCenterContainer>
    </OfferDataContext.Provider>
  );
}

export default AddOffer;
