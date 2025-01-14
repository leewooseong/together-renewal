/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-array-index-key */
const heartStateList = [false, false, false, false, false];
export function ReviewScore({score}: {score: number}) {
  const heartList = heartStateList.fill(true, 0, score);

  return (
    <div className="flex gap-1">
      {heartList.map((heart, index) => (
        <img
          key={`score-${score}-${index}`}
          src={heart ? '/icons/heart-active.svg' : '/icons/heart-default.svg'}
          alt={heart ? '찬 하트' : '빈 하트'}
        />
      ))}
    </div>
  );
}
