'use client';

import {useMemo, useCallback} from 'react';

import {useInfiniteGatherings} from '../../hooks/useInfiniteGatherings';
import {useInfiniteObserver} from '../../hooks/useInfiniteObserver';
import {GetGatherings} from '../../types/gatherings/getGatherings.types';

import ListCard from './listCard';

export default function GatheringsList({initialData}: {initialData: GetGatherings[]}) {
  const {data, fetchNextPage, hasNextPage, isFetchingNextPage} = useInfiniteGatherings(initialData);

  const handleFetchNextPage = useCallback(() => {
    if (hasNextPage) fetchNextPage();
  }, [hasNextPage, fetchNextPage]);

  const observerRef = useInfiniteObserver(handleFetchNextPage);

  const gatherings = useMemo(() => {
    const uniqueGatherings = new Map<number, GetGatherings>();
    data?.pages.flat().forEach(gathering => {
      uniqueGatherings.set(gathering.id, gathering);
    });
    return Array.from(uniqueGatherings.values());
  }, [data]);

  return (
    <div className="flex flex-col gap-6">
      {gatherings.map(gathering => (
        <ListCard key={gathering.id} {...gathering} />
      ))}

      {!hasNextPage && gatherings.length > 0 && (
        <div className="mt-4 border-t border-gray-200 py-4 text-center text-gray-500">
          <p>모든 모임을 불러왔습니다. ({gatherings.length}개)</p>
        </div>
      )}

      {isFetchingNextPage && (
        <div className="py-4 text-center text-gray-500">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900" />
          <p className="mt-2">모임을 불러오는 중입니다...</p>
        </div>
      )}

      <div ref={observerRef} className="h-2 w-full" />
    </div>
  );
}
