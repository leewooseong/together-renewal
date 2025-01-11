import {useState} from 'react';

import Image from 'next/image';

import {Location, SortReview} from '@/app/types/dropDown.types';

import Date from './date';
import {DropdownList} from './dropdownList';

const locationList = ['지역 전체', '건대입구', '을지로 3가', '신림', '홍대입구'];
const sortList = ['최신 순', '리뷰 높은 순', '참여 인원 순'];

export function Dropdown() {
  const [isLocationClicked, setIsLocationClicked] = useState(false);
  const [isSortClicked, setIsSortClicked] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<Location>('지역 전체');
  const [selectedSort, setSelectedSort] = useState<SortReview>('최신 순');

  // Location 클릭
  function handleLocationButtonClick() {
    setIsLocationClicked(prev => !prev);
  }
  function handleLocationListClick(event: React.MouseEvent<HTMLButtonElement>) {
    const getLocationName = event.currentTarget.name as Location;
    setSelectedLocation(getLocationName);
    setIsLocationClicked(false);
  }
  // 정렬방법 클릭
  function handleSortButtonClick() {
    setIsSortClicked(prev => !prev);
  }
  function handleSortListClick(event: React.MouseEvent<HTMLButtonElement>) {
    const getSortName = event.currentTarget.name as SortReview;
    setSelectedSort(getSortName);
    setIsSortClicked(false);
  }

  return (
    <div>
      <div>{isLocationClicked ? 'Location: true' : 'Location: false'}</div>
      <div>{selectedLocation}</div>
      <div>{isSortClicked ? 'Sort: true' : 'Sort: false'}</div>
      <div>{selectedSort}</div>
      <div>
        <button
          onClick={handleLocationButtonClick}
          type="button"
          className={`gap flex h-10 w-28 items-center justify-between rounded-xl border-2 border-gray-100 p-2 ${selectedLocation !== '지역 전체' ? 'rounded-xl bg-gray-900 text-gray-50' : ''}`} // 클릭된 버튼 배경색 고정
        >
          <span className="text-sm">{selectedLocation}</span>
          <Image
            width={24}
            height={24}
            alt="아래방향 검은 화살표"
            src={`${selectedLocation !== '지역 전체' ? '/icons/arrow-inverse-down.svg' : '/icons/arrow-default-down.svg'}`}
          />
        </button>
        {isLocationClicked && (
          <DropdownList
            filterList={locationList}
            // eslint-disable-next-line react/jsx-no-bind
            onDropdownListClick={handleLocationListClick}
            selectedItem={selectedLocation}
            width={112}
          />
        )}
      </div>
      <div>
        <button
          onClick={handleSortButtonClick}
          type="button"
          className={`gap 28 flex h-10 w-[123px] items-center justify-between rounded-xl border-2 border-gray-100 p-2 ${selectedSort !== '최신 순' ? 'rounded-xl bg-gray-900 text-gray-50' : ''}`} // 클릭된 버튼 배경색 고정
        >
          <span className="text-sm">{selectedSort}</span>
          <Image
            width={24}
            height={24}
            alt="아래방향 검은 화살표"
            src={`${selectedSort !== '최신 순' ? '/icons/arrow-inverse-down.svg' : '/icons/arrow-default-down.svg'}`}
          />
        </button>
        {isSortClicked && (
          <DropdownList
            filterList={sortList}
            // eslint-disable-next-line react/jsx-no-bind
            onDropdownListClick={handleSortListClick}
            selectedItem={selectedSort}
            width={123}
          />
        )}
      </div>
      <Date />
    </div>
  );
}
