import {useInfiniteQuery} from '@tanstack/react-query';

import {getGatheringsInServer} from '../apis/gatherings/gatheringApi';
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
      return getGatheringsInServer(params);
    },
    initialData: {
      pages: initialData ? [initialData] : [],
      pageParams: [0],
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === 10 ? allPages.length * 10 : undefined;
    },
  });
};
