export type AverageScore = {
  teamId: string;
  type: string; // Gathering 타입이 정의되지 않은 경우 string으로 변경
  oneStar: number;
  twoStars: number;
  threeStars: number;
  fourStars: number;
  fiveStars: number;
  averageScore: number;
};

export type AverageScoreProps = {
  oneStar: number;
  twoStars: number;
  threeStars: number;
  fourStars: number;
  fiveStars: number;
  averageScore: number;
};

export type AverageScoreList = AverageScore[]; // 배열로 정의
