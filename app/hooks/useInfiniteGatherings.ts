import {useInfiniteQuery} from '@tanstack/react-query';

import {getGatherings} from '../apis/gatherings/gatheringApi';
import {GatheringsFilter} from '../types/gatherings/filters';
import {GetGatherings} from '../types/gatherings/getGatherings.types';

export const useInfiniteGatherings = (initialData: GetGatherings[], filter: GatheringsFilter) => {
  return useInfiniteQuery({
    queryKey: ['gatherings', filter],
    queryFn: async ({pageParam = 0}) => {
      const params: GatheringsFilter = {
        ...filter,
        sortBy: 'dateTime',
        sortOrder: 'asc',
        limit: 10,
        offset: pageParam,
      };
      return getGatherings(params);
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage && lastPage.length === 10 ? allPages.length * 10 : undefined;
    },
    initialData: {
      pages: [initialData],
      pageParams: [0],
    },
  });
};
