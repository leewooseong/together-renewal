'use client';

// 나중에 모든 리뷰 페이지 구현 해야함.
import {useEffect} from 'react';

import {useQuery} from '@tanstack/react-query';
import {useRouter} from 'next/navigation';

import {getReviews} from '../apis/reviews';
import {GatheringFilter} from '../components/common/gatheringFilter/gatheringFilter';
import {PageInfo} from '../components/common/pageInfo';
import {Review} from '../components/common/review/review';
import {AverageScores} from '../components/reviews/averageScores';
import {useGatheringFilter} from '../hooks/useGatheringFilter';
import {ReviewListType} from '../types/common/reviews.types';
import {AverageScoreListProps} from '../types/reviews/averageScores.types';

const mock: AverageScoreListProps['data'] = {
  teamId: '6-6',
  type: 'DALLAEMFIT',
  oneStar: 0,
  twoStars: 0,
  threeStars: 1,
  fourStars: 1,
  fiveStars: 1,
  averageScore: 4,
};

// const emptyMock = {};
// Helper 함수: 쿼리스트링 생성
type QueryStringParams = Record<string, string | number | boolean | undefined | null>;

const makeQueryString = (params: QueryStringParams): string => {
  const queryParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      queryParams.append(key, value.toString());
    }
  });
  return queryParams.toString();
};

export default function ReviewsPage() {
  const router = useRouter();

  const {gatheringType, setGatheringType} = useGatheringFilter();
  // const location = '홍대입구';
  // const sortBy = 'participantCount';

  const location = '';
  const sortBy = '';
  const date = '';
  const {data: reviewList, isPending} = useQuery<ReviewListType>({
    queryKey: ['reviewList', gatheringType],
    queryFn: () => getReviews({gatheringType, location, date, sortBy}),
    staleTime: 1 * 60 * 5000, // 5분
    gcTime: 60 * 1000 * 10, // 10분
  });

  // URL에 쿼리스트링 반영
  useEffect(() => {
    const queryString = makeQueryString({gatheringType, location, sortBy, date});
    router.replace(`/reviews?${queryString}`);
  }, [gatheringType, location, sortBy, date, router]);

  if (isPending) {
    return <div>로딩중!</div>;
  }

  return (
    <div>
      <div>
        <PageInfo pageName="reviews" />
      </div>
      <div className="m-7">
        <GatheringFilter gatheringType={gatheringType} setGatheringType={setGatheringType} />
      </div>
      <div>
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
      <div>
        <AverageScores data={mock} />
      </div>
    </div>
  );
}
