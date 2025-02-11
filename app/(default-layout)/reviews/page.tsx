import {HydrationBoundary, QueryClient, dehydrate} from '@tanstack/react-query';
import {getReviews, getReviewsScore} from '../../apis/reviews/reviewsApi';
import ReviewsList from '../../components/reviews/reviewsList';

export default async function ReviewsPage() {
  const queryClient = new QueryClient();
  const initialFilter = {type: 'DALLAEMFIT', limit: 10};

  await queryClient.prefetchInfiniteQuery({
    queryKey: ['reviews', initialFilter],
    queryFn: () => getReviews(initialFilter),
    initialPageParam: 0,
  });

  await queryClient.prefetchQuery({
    queryKey: ['reviewScores', 'DALLAEMFIT'],
    queryFn: () => getReviewsScore('DALLAEMFIT'),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ReviewsList />
    </HydrationBoundary>
  );
}
