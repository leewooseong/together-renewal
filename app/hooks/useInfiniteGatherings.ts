import {useInfiniteQuery} from '@tanstack/react-query';

import {getGatherings} from '../apis/gatherings/gatheringApi';
import {GatheringParams, GetGatherings} from '../types/gatherings/getGatherings.types';

export const useInfiniteGatherings = (initialData: GetGatherings[]) => {
  return useInfiniteQuery({
    queryKey: ['gatherings'],
    queryFn: async ({pageParam = 0}) => {
      const params: GatheringParams = {
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
