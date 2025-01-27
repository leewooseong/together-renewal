import {useEffect, useState} from 'react';

import {useRouter, useSearchParams} from 'next/navigation';

export const useQueryStringFilter = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [filter, setFilter] = useState({
    gatheringType: 'DALLAEMFIT',
    location: '',
    date: '',
    sortBy: '',
    sortOrder: '',
  });

  useEffect(() => {
    setFilter({
      gatheringType: searchParams.get('type') || 'DALLAEMFIT',
      location: searchParams.get('location') || '',
      date: searchParams.get('date') || '',
      sortBy: searchParams.get('sortBy') || '',
      sortOrder: searchParams.get('sortOrder') || '',
    });
  }, [searchParams]);

  const makeQueryString = (newFilter: Partial<typeof filter>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(newFilter).forEach(([key, value]) => {
      if (value) {
        if (key === 'gatheringType') {
          params.set('type', value);
        } else {
          params.set(key, value);
        }
      } else {
        params.delete(key);
      }
    });

    router.replace(`?${params.toString()}`);
  };

  return {filter, setFilter, makeQueryString};
};
