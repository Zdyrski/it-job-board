import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../lib/Navbar/Navbar';
import OfferList from '../lib/OffersList/OfferList';
// import SAMPLE_DATA from '../assets/TestOfferList';
import { FlexColumnCenterContainer } from '../lib/Containers/Containers.styled';

const OFFERS_URL = 'http://localhost:8080/offers';

function Main() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.post(OFFERS_URL).then((response) => {
      if (response.status === 200) {
        console.log(response);
        setData(response.data);
      }
    }).catch((error) => {
      console.log(error);
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
