import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getHeaders } from '../../constants';
import { OffersListInterface, OfferInterface } from '../../types';
import Offer from './Offer';
import { StyledInfinityScroll } from './Offer.styled';

function OfferList({ link } : OffersListInterface) {
  const [data, setData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [searchParams] = useSearchParams();

  const fetchData = () => {
    // TODO make pagination work
    const headers = getHeaders();
    const config = {
      headers,
      params: searchParams,
    };

    axios.get(link, config).then((response) => {
      if (response.status === 200) {
        console.log(response);
        const offers:never[] = response.data;
        setData([...data, ...offers]);
        setHasMore(false);
      }
    }).catch((error) => {
      console.log(error);
    });
  };

  useEffect(() => { // for rerendering when URL query changed
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

export default OfferList;
