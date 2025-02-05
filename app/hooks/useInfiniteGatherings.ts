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
    // ✅ 올바른 initialData 제공 방식
    initialData: {
      pages: [initialData], // ✅ 초기 데이터를 pages 배열에 포함
      pageParams: [0], // ✅ 첫 번째 페이지 param을 0으로 설정
    },
  });
};
