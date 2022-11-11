import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getHeaders } from '../../constants';
import { OfferInterface } from '../../types';
import Offer from './Offer';
import { StyledInfinityScroll } from './Offer.styled';

const ADMIN_OFFERS_URL = '';

function AdminOfferList() {
  const [data, setData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [searchParams] = useSearchParams();

  const fetchData = () => {
    console.log(ADMIN_OFFERS_URL);

    const headers = getHeaders();
    const config = {
      headers,
      params: searchParams,
    };
    axios.get(ADMIN_OFFERS_URL, config).then((response) => {
      if (response.status === 200) {
        console.log(response);
        setData(response.data);
        setHasMore(false);
      }
    }).catch((error) => {
      console.log(error);
    });
  };

  useEffect(() => {
    setData([]);
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
          city={offer.city}
          remote={offer.remote}
          salary={offer.salary}
          tags={offer.tags}
          offerId={offer.offerId}
          date={offer.date}
        />
      ))}
    </StyledInfinityScroll>
  );
}

export default AdminOfferList;
