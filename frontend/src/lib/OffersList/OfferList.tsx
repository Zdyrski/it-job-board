/* eslint-disable no-unused-vars */
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { REQUEST_LIMIT } from '../../utils/constants';
import { getHeaders } from '../../utils/helperFunctions';
import { OffersListInterface, OfferInterface } from '../../utils/types';
import Offer from './Offer';
import { StyledInfinityScroll } from './Offer.styled';

function OfferList({ link } : OffersListInterface) {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [searchParams] = useSearchParams();

  const fetchData = () => {
    const headers = getHeaders();
    const params = new URLSearchParams(window.location.search);
    params.append('page', page.toString());
    params.append('limit', REQUEST_LIMIT.toString());

    const config = {
      headers,
      params,
    };

    axios.get(link, config).then((response) => {
      if (response.status === 200) {
        const offers:never[] = response.data;
        setData([...data, ...offers]);
        if (offers.length < REQUEST_LIMIT) {
          setHasMore(false);
        } else {
          setPage((prev) => prev + 1);
          setHasMore(true);
        }
      }
    });
  };

  useEffect(() => { // for rerendering when URL query changed
    setData([]);
    setPage(0);
    setHasMore(true);
  }, [searchParams]);

  return (
    <StyledInfinityScroll
      loadMore={fetchData}
      hasMore={hasMore}
    >
      {data.map((offer : OfferInterface) => (
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
      ))}
    </StyledInfinityScroll>
  );
}

export default OfferList;
