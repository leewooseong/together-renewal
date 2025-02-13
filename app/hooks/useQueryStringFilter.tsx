'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { GetReviewsProps } from '../types/reviews/reviewsApi.types';
import { checkQueryStringObject } from '../utils/checkQueryStringObjectUtil';

export const useQueryStringFilter = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [filter, setFilter] = useState<GetReviewsProps>({
    type: 'DALLAEMFIT',
  });

  useEffect(() => {
    //URL에서 현재 쿼리스트링을 가져와서 필터를 최신화
    const queryEntries = Object.fromEntries(searchParams.entries());

    const newFilter: GetReviewsProps = checkQueryStringObject({
      ...queryEntries,
      type: queryEntries.type || 'DALLAEMFIT', // 기본값 설정
    });

    setFilter(newFilter);
  }, [searchParams]); //searchParams가 변경될 때마다 필터 업데이트

  const updateQueryString = (newFilter: Partial<GetReviewsProps>) => {
    const updatedFilter = { ...filter, ...newFilter };
    const queryString = new URLSearchParams(updatedFilter as any).toString();
    router.replace(`?${queryString}`);
  };

  const resetFilter = () => {
    setFilter({ type: 'DALLAEMFIT' });
    router.replace('/');
  };

  return { filter, setFilter, updateQueryString, resetFilter};
};
