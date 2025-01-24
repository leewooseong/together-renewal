/* eslint-disable no-nested-ternary */

'use client';

import {useQuery} from '@tanstack/react-query';

import {getReviews, getReviewsScore} from '../../apis/reviews/reviewsApi';
import {GatheringFilter} from '../../components/common/gatheringFilter/gatheringFilter';
import {PageInfo} from '../../components/common/pageInfo';
import {Review} from '../../components/common/review/review';
import {AverageScores} from '../../components/reviews/averageScores';
import {useQueryStringFilter} from '../../hooks/useQueryStringFilter';
import {getReviewListQueryKey} from '../../queries/common/queryKeys';
import {GatheringWithoutAll} from '../../types/common/gatheringFilter.types';
import {ReviewListType} from '../../types/common/reviews.types';
import {AverageScoreList} from '../../types/reviews/averageScores.types';

export default function ReviewsPage() {
  const {filter, setFilter, makeQueryString} = useQueryStringFilter();

  const reviewsQueryKey = getReviewListQueryKey(filter);

  const {data: reviewList} = useQuery<ReviewListType>({
    queryKey: reviewsQueryKey,
    queryFn: () => getReviews(filter),
  });

  // 두 번째 쿼리: 리뷰 점수 가져오기
  const {type} = filter;
  const {data: scoreData} = useQuery<AverageScoreList>({
    queryKey: ['reviewScores', type],
    queryFn: () => getReviewsScore(type as GatheringWithoutAll),
  });

  return (
    <div>
      <div>
        <p>Category: {filter.type}</p>
        <p>location: {filter.location}</p>
        <p>date: {filter.date}</p>
        <p>sortBy: {filter.sortBy}</p>
        <p>sortOrder: {filter.sortOrder}</p>
      </div>
      <div className="mb-6 tablet:mb-8">
        <PageInfo pageName="reviews" />
      </div>
      <div className="border-b-2 border-b-gray-200 pb-4">
        <GatheringFilter makeQueryString={makeQueryString} filter={filter} setFilter={setFilter} />
      </div>

      <div className="mt-6">
        {scoreData && scoreData.length > 0 ? (
          <AverageScores
            oneStar={scoreData[0].oneStar}
            twoStars={scoreData[0].twoStars}
            threeStars={scoreData[0].threeStars}
            fourStars={scoreData[0].fourStars}
            fiveStars={scoreData[0].fiveStars}
            averageScore={scoreData[0].averageScore}
          />
        ) : (
          <AverageScores
            oneStar={0}
            twoStars={0}
            threeStars={0}
            fourStars={0}
            fiveStars={0}
            averageScore={0}
          />
        )}
      </div>

      <div className="mt-4 flex flex-col justify-between gap-6 tablet:mt-6">
        {reviewList?.data.map(review => (
          <Review
            key={review.id}
            gatheringImg={review.Gathering.image}
            score={review.score}
            comment={review.comment}
            gatheringType={review.Gathering.type}
            gatheringLocation={review.Gathering.location}
            userImg={review.User.image}
            userName={review.User.name}
            createdAt={review.createdAt}
          />
        ))}
      </div>
    </div>
  );
}
