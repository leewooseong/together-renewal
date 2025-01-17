/* eslint-disable no-nested-ternary */

'use client';

// 나중에 모든 리뷰 페이지 구현 해야함.

import {useQuery} from '@tanstack/react-query';

import {getReviews, getReviewsScore} from '../../apis/reviews/reviewsApi';
import {GatheringFilter} from '../../components/common/gatheringFilter/gatheringFilter';
import {PageInfo} from '../../components/common/pageInfo';
import {Review} from '../../components/common/review/review';
import {AverageScores} from '../../components/reviews/averageScores';
import {useGatheringFilter} from '../../hooks/useGatheringFilter';
import {ReviewListType} from '../../types/common/reviews.types';
import {AverageScoreList} from '../../types/reviews/averageScores.types';

export default function ReviewsPage() {
  const {gatheringType, setGatheringType} = useGatheringFilter();
  // const location = '홍대입구';
  // const sortBy = 'participantCount';

  const location = '';
  const sortBy = '';
  const date = '';
  const {data: reviewList, isPending} = useQuery<ReviewListType>({
    queryKey: ['reviewList', gatheringType],
    queryFn: () => getReviews({gatheringType, location, date, sortBy}),
  });

  // 두 번째 쿼리: 리뷰 점수 가져오기
  const {data: scoreData} = useQuery<AverageScoreList>({
    queryKey: ['reviewScores', gatheringType],
    queryFn: () => getReviewsScore({gatheringType}),
  });

  if (isPending) {
    return <div>로딩중!</div>;
  }

  return (
    <div>
      <div className="mb-6 tablet:mb-8">
        <PageInfo pageName="reviews" />
      </div>
      <div className="border-b-2 border-b-gray-200 pb-4">
        <GatheringFilter gatheringType={gatheringType} setGatheringType={setGatheringType} />
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
