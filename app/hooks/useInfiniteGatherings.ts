import {useInfiniteQuery} from '@tanstack/react-query';

import {getGatherings, getJoinedGatherings} from '../apis/gatherings/gatheringApi';
import {GatheringsFilter} from '../types/gatherings/filters';
import {GetGatherings} from '../types/gatherings/getGatherings.types';
import {GetJoinedGatherings} from '../types/gatherings/joinedGatherings.types';
import {myGatheringSort} from '../utils/myGatheringSort';

export const useInfiniteGatherings = (initialData: GetGatherings[]) => {
  return useInfiniteQuery({
    queryKey: ['gatherings'],
    queryFn: async ({pageParam = 0}) => {
      const params: GatheringsFilter = {
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

export function useInfiniteJoinedGatherings(
  userId: number,
  initialData: GetJoinedGatherings[] = [],
) {
  return useInfiniteQuery({
    queryKey: ['joinedGatherings', userId],
    queryFn: async ({pageParam = 0}) => {
      const response = await getJoinedGatherings({
        sortBy: 'dateTime',
        sortOrder: 'asc',
        limit: 10,
        offset: pageParam,
      });
      return myGatheringSort(response ?? []);
    },
    initialPageParam: 0,
    getNextPageParam: lastPage => (lastPage.length === 10 ? lastPage.length : undefined),
    initialData: {
      pages: [initialData],
      pageParams: [0],
    },
    enabled: !!userId,
  });
}
