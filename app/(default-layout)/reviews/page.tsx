/* eslint-disable no-nested-ternary */

'use client';

// 나중에 모든 리뷰 페이지 구현 해야함.

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
  // const searchParams = useSearchParams();
  // const router = useRouter();
  // const [filter, setFilter] = useState({
  //   gatheringType: 'DALLAEMFIT',
  //   location: '',
  //   date: '',
  //   sortBy: '',
  //   sortOrder: '',
  // });

  // // const location = '홍대입구';
  // // const sortBy = 'participantCount';
  // // const location = '';
  // // const date = '';
  // // const sortOrder = '';

  // useEffect(() => {
  //   setFilter({
  //     gatheringType: searchParams.get('type') || 'DALLAEMFIT',
  //     location: searchParams.get('location') || '',
  //     date: searchParams.get('date') || '',
  //     sortBy: searchParams.get('sortBy') || '',
  //     sortOrder: searchParams.get('sortOrder') || '',
  //   });
  // }, [searchParams]);

  // // const makeQueryString = (filterItem: string) => {
  // //   const params = new URLSearchParams(searchParams.toString());
  // //   params.set('type', filterItem);

  // //   router.replace(`?${params.toString()}`);
  // // };

  // const makeQueryString = (newFilter: Partial<typeof filter>) => {
  //   const params = new URLSearchParams(searchParams.toString());

  //   // 새로운 필터 값을 쿼리 스트링에 추가
  //   Object.entries(newFilter).forEach(([key, value]) => {
  //     if (value) {
  //       if (key === 'gatheringType') {
  //         params.set('type', value); // 값이 있으면 설정
  //       } else {
  //         params.set(key, value); // 값이 있으면 설정
  //       }
  //     } else {
  //       params.delete(key); // 값이 없으면 제거
  //     }
  //   });

  //   router.replace(`?${params.toString()}`);
  // };

  // const reviewsQueryKey = getReviewListQueryKey({gatheringType, location, date, sortBy, sortOrder});
  const reviewsQueryKey = getReviewListQueryKey(filter);

  const {data: reviewList} = useQuery<ReviewListType>({
    queryKey: reviewsQueryKey,
    queryFn: () => getReviews(filter),
  });

  // 두 번째 쿼리: 리뷰 점수 가져오기
  const {gatheringType} = filter; // gatheringType 추출
  const {data: scoreData} = useQuery<AverageScoreList>({
    queryKey: ['reviewScores', gatheringType],
    queryFn: () => getReviewsScore(gatheringType as GatheringWithoutAll),
  });

  return (
    <div>
      <div>
        <p>Category: {filter.gatheringType}</p>
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
