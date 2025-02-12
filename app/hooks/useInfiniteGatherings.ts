import {useInfiniteQuery} from '@tanstack/react-query';

import {getGatherings} from '../apis/gatherings/gatheringApi';
import {GatheringsFilter} from '../types/gatherings/filters';
import {GetGatherings} from '../types/gatherings/getGatherings.types';

export const useInfiniteGatherings = (initialData: GetGatherings[], filter: GatheringsFilter) => {
  return useInfiniteQuery({
    queryKey: ['gatherings', filter],
    queryFn: async ({pageParam = 0}) => {
      const params: GatheringsFilter = {
        sortBy: 'dateTime',
        sortOrder: 'asc',
        limit: 10,
        offset: pageParam,
        ...filter,
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

// 해결 못한 오류(캐싱 관련 문제로 추측)로 인해 미사용 상태
// export function useInfiniteJoinedGatherings(initialData: GetJoinedGatherings[]) {
//   return useInfiniteQuery({
//     queryKey: ['joinedGatherings'],
//     queryFn: async ({pageParam = 0}) => {
//       const params: JoinedGatheringsFilter = {
//         sortBy: 'dateTime',
//         sortOrder: 'asc',
//         limit: 10,
//         offset: pageParam,
//       };
//       return getJoinedGatherings(params);
//     },
//     initialPageParam: 0,
//     getNextPageParam: (lastPage, allPages) => {
//       return lastPage && lastPage.length === 10 ? allPages.length * 10 : undefined;
//     },
//     initialData: {
//       pages: [initialData],
//       pageParams: [0],
//     },
//   });
// }
