'use client';

// 나중에 모든 리뷰 페이지 구현 해야함.
import {useQuery} from '@tanstack/react-query';
import {useAtom} from 'jotai';

import {getReviews} from '../apis/reviews';
import GatheringNav from '../components/gatheringNav/gatheringNav';
import PageInfo from '../components/pageInfo';
import Review from '../components/reviewComponent/review';
import {getWhatGatheringTypeAtom} from '../store/atoms/gatheringNavAtoms';
import {IReviews} from '../types/reviews.types';

export default function ReviewsPage() {
  const [gatheringType] = useAtom(getWhatGatheringTypeAtom);
  const {
    data: reviews,

    isPending,
  } = useQuery<IReviews>({
    queryKey: ['reviews', gatheringType],
    queryFn: () => getReviews(undefined, undefined, gatheringType),
    staleTime: 1 * 60 * 5000, // 5분
    gcTime: 60 * 1000 * 10, // 10분
  });

  if (isPending) {
    return <div>로딩중!</div>;
  }

  return (
    <div>
      <div>
        <PageInfo pageName="reviews" />
      </div>
      <div className="m-7">
        <GatheringNav />
      </div>
      <div>
        {reviews?.data.map(review => (
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
