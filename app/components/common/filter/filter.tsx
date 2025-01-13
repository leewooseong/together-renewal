import {Dropdown} from './dropdown';

const LOCATION_LIST: ['지역 전체', '건대입구', '을지로 3가', '신림', '홍대입구', '24/05/14'] = [
  '지역 전체',
  '건대입구',
  '을지로 3가',
  '신림',
  '홍대입구',
  '24/05/14',
];
const REVIEW_SORT_LIST: ['최신 순', '리뷰 높은 순', '참여 인원 순'] = [
  '최신 순',
  '리뷰 높은 순',
  '참여 인원 순',
];

const GATHERING_SORT_LIST: ['마감 임박', '참여 인원 순'] = ['마감 임박', '참여 인원 순'];

export function Filter({pageName}: {pageName: 'GATHERING' | 'REVIEW'}) {
  return (
    <div className="flex justify-between">
      <div className="flex gap-2 mr-2">
        <Dropdown defaultValue="지역 전체" filterList={LOCATION_LIST} />
        <Dropdown defaultValue="지역 전체" filterList={LOCATION_LIST} />
      </div>
      <Dropdown
        defaultValue={pageName === 'GATHERING' ? '마감 임박' : '최신 순'}
        filterList={pageName === 'GATHERING' ? GATHERING_SORT_LIST : REVIEW_SORT_LIST}
      />
    </div>
  );
}
