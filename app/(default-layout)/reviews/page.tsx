import {PageInfo} from '../../components/common/pageInfo';
import ReviewWrapper from '../../components/common/review/reviewWrapper';

export default function ReviewsPage() {
  // Todo: 초기 데이터 패칭 필요 (SSR)
  // ...

  return (
    <div>
      <div className="mb-6 tablet:mb-8">
        <PageInfo pageName="reviews" />
      </div>
      <ReviewWrapper initialData={[]} />
    </div>
  );
}
