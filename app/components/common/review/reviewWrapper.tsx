import {ReviewListType} from '../../../types/common/reviews.types';

import {Review} from './review';

export default function ReviewWrapper({data}: ReviewListType) {
  return (
    <div>
      {data.map(review => (
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
  );
}
