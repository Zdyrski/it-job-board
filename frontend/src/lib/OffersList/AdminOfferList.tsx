/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import {
  Alert,
  AlertColor,
  AppBar,
  Button, Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Radio, Select, SelectChangeEvent, Toolbar,
} from '@mui/material';
import axios from 'axios';
import { off } from 'process';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { APPROVAL_MAP } from '../../utils/constants';
import { getHeaders } from '../../utils/helperFunctions';
import { AdminOfferInterface } from '../../utils/types';
import Offer from './Offer';
import {
  RowFlex, StyledInfinityScroll, StyledRadioGroup, AdminOfferMainContainer, SelectsDiv,
} from './Offer.styled';

const ADMIN_OFFERS_URL = 'http://localhost:8080/offers/admin';

const initialOfferState = {
  approvalStatus: 0,
  archived: false,
};

function AdminOfferList() {
  const [offerId, setOfferId] = useState<string>('');
  const [data, setData] = useState([]);
  const [offerState, setOfferState] = useState(initialOfferState);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [searchParams] = useSearchParams();

  const fetchData = () => {
    const headers = getHeaders();
    const params = new URLSearchParams(window.location.search);
    params.append('page', page.toString());
    params.append('limit', '10');

    const config = {
      headers,
      params,
    };

    axios.get(ADMIN_OFFERS_URL, config).then((response) => {
      if (response.status === 200) {
        console.log(response);
        const offers:never[] = response.data;
        setData([...data, ...offers]);
        if (offers.length < 10) {
          setHasMore(false);
        } else {
          setPage((prev) => prev + 1);
          setHasMore(true);
        }
      }
    }).catch((error) => {
      console.log(error);
    });
  };

  const handleOfferIdAndStatusChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    setOfferId(e.target.value);
    setOfferState({ ...offerState, approvalStatus: e.target.tabIndex, archived: e.target.required });
  };

  const handleOfferStateChange = (e : SelectChangeEvent<number>) => {
    setOfferState({ ...offerState, [e.target.name]: e.target.value });
  };

  const handleArchived = () => {
    setOfferState({ ...offerState, archived: !offerState.archived });
  };

  const handleSetStatus = () => {
    const headers = getHeaders();
    if (offerId === '') {
      return;
    }
    axios.post(`${ADMIN_OFFERS_URL}/${offerId}`, offerState, { headers }).then((response) => {
      if (response.status === 200) {
        console.log(response);
      }
    }).catch((error) => {
      console.log(error);
    });
  };

  useEffect(() => { // for rerendering when URL query changed
    setData([]);
    setPage(0);
    setHasMore(true);
  }, [searchParams]);

  return (
    <AdminOfferMainContainer>
      <StyledRadioGroup value={offerId} onChange={handleOfferIdAndStatusChange}>
        <StyledInfinityScroll
          loadMore={fetchData}
          hasMore={hasMore}
        >

          {data.map((offer : AdminOfferInterface) => (
            <RowFlex key={offer.offerId}>
              <Offer
                key={offer.offerId}
                title={offer.title}
                companyLogoUrl={offer.companyLogoUrl}
                companyName={offer.companyName}
                addressData={offer.addressData}
                remoteStatus={offer.remoteStatus}
                salary={offer.salary}
                tags={offer.tags}
                offerId={offer.offerId}
                date={offer.date}
                approvalStatus={offer.approvalStatus}
                archived={offer.archived}
              />
              <Radio value={offer.offerId} tabIndex={offer.approvalStatus} required={offer.archived} />
            </RowFlex>
          ))}
        </StyledInfinityScroll>
      </StyledRadioGroup>
      <AppBar position="sticky" color="primary" sx={{ top: 'auto', bottom: 0 }}>
        <Toolbar>
          <SelectsDiv>
            <FormControl variant="standard">
              <InputLabel>Approval status</InputLabel>
              <Select
                name="approvalStatus"
                value={offerState.approvalStatus}
                label="Approval status"
                onChange={handleOfferStateChange}
              >
                {APPROVAL_MAP.map((option) => (
                  <MenuItem key={option.name} value={option.value}>{option.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControlLabel control={<Checkbox checked={offerState.archived} onChange={handleArchived} />} label="Archived" />
          </SelectsDiv>
          <Button onClick={handleSetStatus}>Set status</Button>
        </Toolbar>
      </AppBar>
    </AdminOfferMainContainer>
  );
}

export default AdminOfferList;
