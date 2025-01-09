/* eslint-disable @next/next/no-img-element */

import Image from 'next/image';

/* eslint-disable react/no-array-index-key */
const hearts = [false, false, false, false, false];

export function ReviewScore({score}: {score: number}) {
  const heartScore = hearts.fill(true, 0, score);

  return (
    <div className=" flex gap-1">
      {heartScore.map((heart, index) => (
        <Image
          key={`score-${score}-${index}`}
          src={heart ? '/heart-active.svg' : '/heart-default.svg'}
          alt={heart ? '찬 하트' : '빈 하트'}
        />
      ))}
    </div>
  );
}
