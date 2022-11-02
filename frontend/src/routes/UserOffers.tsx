import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../lib/Navbar/Navbar';
import OfferList from '../lib/OffersList/OfferList';
import { FlexColumnCenterContainer } from '../lib/Containers/Containers.styled';
import { getHeaders } from '../constants';

const OFFERS_URL = 'http://localhost:8080/offers/my-offers';

function UserOffers() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const headers = getHeaders();
    axios.get(OFFERS_URL, { headers }).then((response) => {
      if (response.status === 200) {
        console.log(response);
        setData(response.data);
        // sessionStorage.setItem('jwt-token', response.headers['jwt-token']);
        // setSuccessAlert();
        // setState(initialState);
        // setTimeout(() => navigate('/'), 2000);
      }
    }).catch((error) => {
      console.log(error);
      // setErrorAlert(error);
    });
  }, []);
  return (
    <FlexColumnCenterContainer>
      <Navbar filterBar={false} />
      <OfferList data={data} />
    </FlexColumnCenterContainer>
  );
}

export default UserOffers;
