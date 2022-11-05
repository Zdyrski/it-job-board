import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import GlitchedButton from '../Buttons/GlitchedButton/GlitchedButton';
import OfferAndCompanyShort from './OfferAndCompanyShort';
import OfferDescription from './OfferDescription';
import { ListContainer, MainContainer } from './OfferDetailed.styled';
import TechStack from './TechStack';
import { getHeaders } from '../../constants';

const OFFERS_URL = 'http://localhost:8080/offers/';
const APPLICATION_URL = '/application';

const inititalData = {
  title: '',
  companyName: '',
  companySize: 0,
  companyLogoUrl: '',
  companySiteUrl: '',
  experienceLevel: '',
  city: '',
  remote: '',
  contracts: [],
  techStack: [],
  description: '',
  date: '',
};

function OfferDetailed() {
  const [data, setData] = useState(inititalData);
  const [canApply, setCanApply] = useState(0);
  const { id } = useParams();
  const headers = getHeaders();

  const handleApply = () => {
    axios.post(OFFERS_URL + id + APPLICATION_URL, null, { headers }).then((response) => {
      if (response.status === 200) {
        console.log(response);
      }
    }).catch((error) => {
      console.log(error);
    });
  };

  useEffect(() => { // get offer details
    axios.get(OFFERS_URL + id, { headers }).then((response) => {
      if (response.status === 200) {
        console.log(response);
        setData(response.data);
      }
    }).catch((error) => {
      console.log(error);
    });
  }, []);

  useEffect(() => { // check if user can apply
    if (sessionStorage.getItem('jwt-token') === null) {
      return;
    }
    axios.get(OFFERS_URL + id + APPLICATION_URL, { headers }).then((response) => {
      if (response.status === 200) {
        console.log(response);
        setCanApply(response.data);
      }
    }).catch((error) => {
      console.log(error);
    });
  }, []);

  return (
    <MainContainer>
      {data.title !== ''
      && (
      <ListContainer>
        <OfferAndCompanyShort
          title={data.title}
          companyName={data.companyName}
          companySize={data.companySize}
          companyLogoUrl={data.companyLogoUrl}
          companySiteUrl={data.companySiteUrl}
          experienceLevel={data.experienceLevel}
          city={data.city}
          remote={data.remote}
          contracts={data.contracts}
          date={data.date}
        />
        <TechStack data={data.techStack} />
        <OfferDescription data={data.description} />
        {
        {
          0: <div>Login as Employee if you want to apply</div>,
          1: <GlitchedButton placeholder="Apply" onClick={handleApply} />,
          2: <div>Already applied</div>,
        }[canApply]
      }
      </ListContainer>
      )}
    </MainContainer>
  );
}

export default OfferDetailed;
