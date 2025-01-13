import {Dropdown} from './dropdown';

const LOCATION_LIST: ['지역 전체', '건대입구', '을지로 3가', '신림', '홍대입구', '24/05/14'] = [
  '지역 전체',
  '건대입구',
  '을지로 3가',
  '신림',
  '홍대입구',
  '24/05/14',
];
const SORT_LIST: ['최신 순', '리뷰 높은 순', '참여 인원 순'] = [
  '최신 순',
  '리뷰 높은 순',
  '참여 인원 순',
];

export function Filter() {
  return (
    <div className="flex justify-between">
      <div className="flex gap-2">
        <Dropdown defaultValue="지역 전체" filterList={LOCATION_LIST} />
        <Dropdown defaultValue="지역 전체" filterList={LOCATION_LIST} />
      </div>
      <Dropdown defaultValue="최신 순" filterList={SORT_LIST} />
    </div>
  );
}
