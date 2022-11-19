import React, { useState } from 'react';
import OfferDataContext from '../contexts/OfferDataContext';
import GlitchedButton from '../lib/Buttons/GlitchedButton/GlitchedButton';
import { FlexColumnCenterContainer } from '../lib/Containers/Containers.styled';
import Navbar from '../lib/Navbar/Navbar';
import OfferAdder from '../lib/OfferAdder/OfferAdder';
import OfferDetailedPreview from '../lib/OfferDetailed/OfferDetailedPreview';

function AddOffer() {
  const [editMode, setEditMode] = useState(true);

  const handleEditMode = () => {
    setEditMode((prev) => !prev);
  };

  return (
    <OfferDataContext.Provider value={1}>
      <FlexColumnCenterContainer>
        <Navbar filterBar={false} />
        {editMode ? <OfferAdder /> : <OfferDetailedPreview />}
        <GlitchedButton placeholder={editMode ? 'Preview' : 'Edit'} onClick={handleEditMode} />
      </FlexColumnCenterContainer>
    </OfferDataContext.Provider>
  );
}

export default AddOffer;
