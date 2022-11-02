import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../lib/Navbar/Navbar';
import OfferList from '../lib/OffersList/OfferList';
// import SAMPLE_DATA from '../assets/TestOfferList';
import { FlexColumnCenterContainer } from '../lib/Containers/Containers.styled';

const OFFERS_URL = 'http://localhost:8080/offers';

const initialData = {
  offerId: '',
  city: '',
  companyLogoUrl: '',
  companyName: '',
  date: '',
  remote: '',
  salary: '',
  tags: [],
  title: '',
};

function Main() {
  const [data, setData] = useState([initialData]);

  useEffect(() => {
    axios.post(OFFERS_URL).then((response) => {
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
      <Navbar />
      <OfferList data={data} />
    </FlexColumnCenterContainer>
  );
}

export default Main;
