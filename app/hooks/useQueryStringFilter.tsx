'use client';

import {useEffect, useState} from 'react';

import {useRouter, useSearchParams} from 'next/navigation';

import {GetReviewsProps} from '../types/reviews/reviewsApi.types';
import {buildQueryParams} from '../utils/buildQueryParamsUtil';
import {checkQueryStringObject} from '../utils/checkQueryStringObjectUtil';

export const useQueryStringFilter = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [filter, setFilter] = useState<GetReviewsProps>({
    type: 'DALLAEMFIT',
  });

  useEffect(() => {
    const deletedEmptyQuery = Object.fromEntries(
      Array.from(searchParams.entries()).filter(([, value]) => value !== '' && value !== null),
    );

    const getUrlObject: GetReviewsProps = {
      ...deletedEmptyQuery,
      type: (deletedEmptyQuery.type as string) || 'DALLAEMFIT',
    };

    const validQueryStringObject = checkQueryStringObject(getUrlObject);

    setFilter(validQueryStringObject);
  }, []);

  const updateQueryString = (newFilter: Partial<GetReviewsProps>) => {
    const updatedFilter = {...filter, ...newFilter};
    setFilter(updatedFilter);
    const queryString = buildQueryParams(updatedFilter);
    router.replace(`?${queryString}`);
  };

  return {filter, setFilter, updateQueryString};
};
