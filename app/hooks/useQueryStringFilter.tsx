import {useEffect, useState} from 'react';

import {useRouter, useSearchParams} from 'next/navigation';

import {buildQueryParams} from '../utils/buildQueryParamsUtil';
import {checkQueryStringObject} from '../utils/checkQueryStringObjectUtil';

export const useQueryStringFilter = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [filter, setFilter] = useState({
    type: 'DALLAEMFIT',
    location: '',
    date: '',
    sortBy: '',
    sortOrder: '',
  });

  useEffect(() => {
    const getUrlObject = {
      type: searchParams.get('type') || 'DALLAEMFIT',
      location: searchParams.get('location') || '',
      date: searchParams.get('date') || '',
      sortBy: searchParams.get('sortBy') || '',
      sortOrder: searchParams.get('sortOrder') || '',
    };
    const validQueryStringObject = checkQueryStringObject(getUrlObject);
    console.log(`바뀐 type값: ${validQueryStringObject.type}`);
    console.log(`바뀐 location값: ${validQueryStringObject.location}`);
    console.log(`바뀐 sortBy값: ${validQueryStringObject.sortBy}`);
    console.log(`바뀐 sortOrder값: ${validQueryStringObject.sortOrder}`);
    console.log(`------------------------------`);
    setFilter(validQueryStringObject);
  }, [searchParams]);

  const updateQueryString = (newFilter: Partial<typeof filter>) => {
    const queryString = buildQueryParams(newFilter);

    router.replace(`?${queryString}`);
  };

  return {filter, setFilter, updateQueryString};
};
