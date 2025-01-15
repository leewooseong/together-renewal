import {ReviewScore} from '../common/review/reviewScore';

/* eslint-disable react/no-array-index-key */
export type ScoreListProps = {
  data: {
    teamId: string; // 팀 ID, 문자열 형식
    type: string; // 팀 유형, 문자열 형식
    oneStar: number; // 1성 리뷰 수, 숫자 형식
    twoStars: number; // 2성 리뷰 수, 숫자 형식
    threeStars: number; // 3성 리뷰 수, 숫자 형식
    fourStars: number; // 4성 리뷰 수, 숫자 형식
    fiveStars: number; // 5성 리뷰 수, 숫자 형식
    averageScore: number; // 평균 점수, 숫자 형식
  };
};

export function Scores({data}: ScoreListProps) {
  const scoreArray = Object.values(data).reverse().slice(1, 6);

  return (
    <div>
      <div>
        <div>
          <span>{data.averageScore}</span>
          <span>/5</span>
        </div>
        <div>
          <ReviewScore score={data.averageScore} />
        </div>
      </div>
      <div>
        <div className="flex w-[150px] flex-col gap-1 border border-red-400">
          {scoreArray.map((score, index) => (
            <div key={`${score}-${index}`} className="flex items-center gap-3">
              <span className="text-sm text-gray-700">{scoreArray.length - index}점</span>
              <div className="h-1 w-[84px] rounded-sm bg-gray-200" />
              <span className="text-sm text-gray-400">{score}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
