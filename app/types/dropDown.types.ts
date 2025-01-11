export type Location = '지역 전체' | '건대입구' | '을지로 3가' | '신림' | '홍대입구';
export type SortReview = '최신 순' | '리뷰 높은 순' | '참여 인원 순';

export type DropdownListProps = {
  filterList: string[];
  onDropdownListClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  selectedItem: string;
  width: number;
};
