import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Alert, Collapse } from '@mui/material';
import GlitchedButton from '../Buttons/GlitchedButton/GlitchedButton';
import OfferAndCompanyShort from './OfferAndCompanyShort';
import OfferDescription from './OfferDescription';
import { ApplyAlert, ListContainer, MainContainer } from './OfferDetailed.styled';
import TechStack from './TechStack';
import { getHeaders, hasAuthority } from '../../utils/helperFunctions';

const OFFERS_URL = 'http://localhost:8080/offers/';
const APPLICATIONS_URL = 'http://localhost:8080/applications/';

const inititalData = {
  title: '',
  companyName: '',
  companySize: 0,
  companyLogoUrl: '',
  companySiteUrl: '',
  experienceLevel: '',
  addressData: {
    country: '',
    city: '',
    street: '',
  },
  remoteStatus: '',
  contracts: [],
  techStack: [],
  description: '',
  date: '',
};

const initialErrorState = {
  isOpen: false,
  errorMessage: '',
};

function OfferDetailed() {
  const [data, setData] = useState(inititalData);
  const [errorState, setErrorState] = useState(initialErrorState);
  const [canApply, setCanApply] = useState('CANT_APPLY');
  const { id } = useParams();
  const headers = getHeaders();

  const handleApply = () => {
    if (!hasAuthority('offer:apply')) {
      return;
    }
    axios.post(APPLICATIONS_URL + id, null, { headers }).then((response) => {
      if (response.status === 200) {
        setCanApply(response.data);
      }
    }).catch((_error) => {
      setCanApply('ERROR');
    });
  };

  useEffect(() => { // get offer details
    axios.get(OFFERS_URL + id, { headers }).then((response) => {
      if (response.status === 200) {
        setData(response.data);
        setErrorState(initialErrorState);
      }
    }).catch((error) => {
      switch (error.response.status) {
        case 400: { setErrorState({ isOpen: true, errorMessage: 'Invalid offer id' }); break; }
        case 401: { setErrorState({ isOpen: true, errorMessage: 'Unauthorized' }); break; }
        case 403: { setErrorState({ isOpen: true, errorMessage: 'Offer not available' }); break; }
        default: { setErrorState({ isOpen: true, errorMessage: 'Error' }); break; }
      }
    });
  }, []);

  useEffect(() => { // check if user can apply
    if (!hasAuthority('offer:apply')) {
      return;
    }
    axios.get(APPLICATIONS_URL + id, { headers }).then((response) => {
      if (response.status === 200) {
        setCanApply(response.data);
      }
    });
  }, []);

  return (
    <MainContainer>
      {data === inititalData
        ? (
          <Collapse in={errorState.isOpen}>
            <Alert variant="outlined" severity="error">
              {errorState.errorMessage}
            </Alert>
          </Collapse>
        )
        : (
          <ListContainer>
            <OfferAndCompanyShort
              title={data.title}
              companyName={data.companyName}
              companySize={data.companySize}
              companyLogoUrl={data.companyLogoUrl}
              companySiteUrl={data.companySiteUrl}
              experienceLevel={data.experienceLevel}
              addressData={data.addressData}
              remoteStatus={data.remoteStatus}
              contracts={data.contracts}
              date={data.date}
            />
            <TechStack data={data.techStack} />
            <OfferDescription data={data.description} />
            {
        {
          CANT_APPLY: <ApplyAlert severity="info">Login as Employee if you want to apply</ApplyAlert>,
          CAN_APPLY: <GlitchedButton placeholder="Apply" onClick={handleApply} />,
          APPLIED: <ApplyAlert severity="info">Already applied</ApplyAlert>,
          NO_CV: <ApplyAlert severity="info">Add your CV in Account page.</ApplyAlert>,
          ERROR: <ApplyAlert severity="error">Error</ApplyAlert>,
        }[canApply]
      }
          </ListContainer>
        )}
    </MainContainer>
  );
}

export default OfferDetailed;
