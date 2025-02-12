'use client';

import {useQuery} from '@tanstack/react-query';
import {useInfiniteQuery} from '@tanstack/react-query';

import {useQueryStringFilter} from '../../../hooks/useQueryStringFilter';
import {reviewListQuery} from '../../../queries/common/queryKeys';
import {ReviewListDataType} from '../../../types/common/reviews.types';
import AverageScoresWrapper from '../../reviewComponent/AverageScoresWrapper';
import {Filtering} from '../filter/filtering';
import {GatheringFilter} from '../gatheringFilter/gatheringFilter';
import {useInfiniteObserver} from '../../../hooks/useInfiniteObserver';

import ReviewListWrapper from './reviewListWrapper';

type ReviewWrapperProps = {
  initialData: ReviewListDataType[];
};

// Todo: useInfiniteQuery 적용 필요
export default function ReviewWrapper({initialData}: ReviewWrapperProps) {
  console.log(initialData);

  const {filter, setFilter, updateQueryString} = useQueryStringFilter();
  const {data: reviewList} = useQuery(reviewListQuery.getReviewList(filter));

  return (
    <>
      <div className="border-b-2 border-b-gray-200 pb-4">
        <GatheringFilter
          updateQueryString={updateQueryString}
          filter={filter}
          setFilter={setFilter}
        />
      </div>

      <AverageScoresWrapper filter={filter} />
      <div className="mt-4 border-t-2 border-t-gray-900 bg-white px-4 py-6 tablet:mt-6 tablet:px-6">
        <div className="mb-6">
          <Filtering
            pageName="REVIEW"
            updateQueryString={updateQueryString}
            filter={filter}
            setFilter={setFilter}
          />
        </div>
        {reviewList && <ReviewListWrapper {...reviewList} />}
      </div>
    </>
  );
}
