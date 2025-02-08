import {useEffect, useState} from 'react';

import {usePathname} from 'next/navigation';
import {match} from 'ts-pattern';

import {PageName, ReviewListType} from '../../../types/common/reviews.types';

import {Review} from './review';

export default function ReviewWrapper({data}: ReviewListType) {
  const pathName = usePathname();
  const [pageName, setPageName] = useState('');

  useEffect(() => {
    const name = match(pathName)
      .when(
        p => p.startsWith('/gatherings'),
        () => 'gatherings',
      )
      .when(
        p => p.startsWith('/reviews'),
        () => 'reviews',
      )
      .when(
        p => p.startsWith('/mypage'),
        () => 'mypage',
      )
      .otherwise(() => 'unknown');

    setPageName(name);
    console.log(`이 페이지는 ${name} 관련 페이지입니다.`);
  }, [pathName]);

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
          pageName={pageName as PageName}
        />
      ))}
    </div>
  );
}
