import {useEffect, useState} from 'react';

import {useRouter, useSearchParams} from 'next/navigation';

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
    setFilter({
      type: searchParams.get('type') || 'DALLAEMFIT',
      location: searchParams.get('location') || '',
      date: searchParams.get('date') || '',
      sortBy: searchParams.get('sortBy') || '',
      sortOrder: searchParams.get('sortOrder') || '',
    });
  }, [searchParams]);

  const makeQueryString = (newFilter: Partial<typeof filter>) => {
    const params = new URLSearchParams();

    Object.entries(newFilter).forEach(([key, value]) => {
      if (value) {
        if (key === 'type') {
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
