import React from 'react';
import Navbar from '../lib/Navbar/Navbar';
import OfferAdder from '../lib/OfferAdder/OfferAdder';

function AddOffer() {
  return (
    <div>
      <Navbar filterBar={false} />
      <OfferAdder />
    </div>
  );
}

export default AddOffer;
