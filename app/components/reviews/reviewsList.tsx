'use client';

import {useMemo} from 'react';

import {useInfiniteQuery, useQuery} from '@tanstack/react-query';

import {getReviews, getReviewsScore} from '../../apis/reviews/reviewsApi';
import {useInfiniteObserver} from '../../hooks/useInfiniteObserver';
import {useQueryStringFilter} from '../../hooks/useQueryStringFilter';
import {GatheringFilter} from '../common/gatheringFilter/gatheringFilter';
import {PageInfo} from '../common/pageInfo';
import ReviewWrapper from '../common/review/reviewWrapper';

import {AverageScores} from './averageScores';

import type {GatheringWithoutAll} from '../../types/common/gatheringFilter.types';
import type {ReviewListType, ReviewParams} from '../../types/common/reviews.types';
import type {AverageScore} from '../../types/reviews/averageScores.types';

export default function ReviewsList() {
  const {filter, setFilter, updateQueryString} = useQueryStringFilter();
  const validatedType = (filter.type || 'DALLAEMFIT') as GatheringWithoutAll;

  const {
    data: infiniteData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['reviews', filter],
    queryFn: async ({pageParam = 0}) => {
      const params: ReviewParams = {
        ...filter,
        limit: 10,
        offset: pageParam * 10,
      };
      return getReviews(params);
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      return lastPage.data.length >= (filter.limit || 10) ? lastPageParam + 1 : undefined;
    },
    enabled: !!validatedType,
  });

  // 리뷰 점수 조회
  const {data: scoreData} = useQuery<AverageScore>({
    queryKey: ['reviewScores', validatedType],
    queryFn: () => getReviewsScore(validatedType),
    enabled: validatedType !== 'DALLAEMFIT',
  });

  // 무한 스크롤 옵저버
  const observerRef = useInfiniteObserver(() => {
    if (hasNextPage) fetchNextPage();
  });

  // 데이터 정제
  const reviews: ReviewListType = useMemo(() => {
    const data = infiniteData?.pages.flatMap(page => page.data) || [];
    return {
      data,
      totalItemCount: infiniteData?.pages[0]?.totalItemCount || 0,
      currentPage: infiniteData?.pageParams.length || 0,
      totalPages: infiniteData?.pages[0]?.totalPages || 0,
    };
  }, [infiniteData]);

  return (
    <div>
      {/* 필터 표시 영역 */}
      <div className="mb-6 tablet:mb-8">
        <PageInfo pageName="reviews" />
      </div>

      <div className="border-b-2 border-b-gray-200 pb-4">
        <GatheringFilter
          updateQueryString={updateQueryString}
          filter={filter}
          setFilter={setFilter}
        />
      </div>

      {/* 평점 표시 */}
      {scoreData && (
        <div className="mt-6">
          <AverageScores {...scoreData} />
        </div>
      )}

      {/* 리뷰 목록 */}
      <div className="mt-4 flex flex-col justify-between gap-6 tablet:mt-6">
        {reviews.data.length > 0 ? (
          <ReviewWrapper initialData={reviews} />
        ) : (
          <p className="py-8 text-center text-gray-500">등록된 리뷰가 없습니다.</p>
        )}
      </div>

      {/* 페이지 끝 표시기 */}
      {!hasNextPage && reviews.data.length > 0 && (
        <div className="mt-4 border-t border-gray-200 py-4 text-center text-gray-500">
          <p>모든 리뷰를 불러왔습니다. (총 {reviews.totalItemCount}개)</p>
        </div>
      )}

      {/* 로딩 표시기 */}
      {isFetchingNextPage && (
        <div className="py-4 text-center text-gray-500">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900" />
          <p className="mt-2">리뷰를 불러오는 중입니다...</p>
        </div>
      )}

      <div ref={observerRef} className="h-2 w-full" />
    </div>
  );
}
