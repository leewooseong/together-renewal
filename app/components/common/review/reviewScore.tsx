/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-array-index-key */

import Image from 'next/image';

import {ReviewScoreprops} from '../../../types/common/reviewScore.types';

const heartStateList = [false, false, false, false, false];
export function ReviewScore({score, isAverage}: ReviewScoreprops) {
  const heartList = heartStateList.map((_, index) => index < score);

  return (
    <div className={`flex gap-[2px] ${isAverage && 'gap-2'}`}>
      {heartList.map((heart, index) => (
        <Image
          unoptimized
          width={24}
          height={24}
          key={`score-${score}-${index}`}
          src={heart ? '/icons/heart-active.svg' : '/icons/heart-default.svg'}
          alt={heart ? '찬 하트' : '빈 하트'}
        />
      ))}
    </div>
  );
}
