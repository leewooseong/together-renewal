import {useState} from 'react';

import {useAtom} from 'jotai';
import Image from 'next/image';

import {howToSortReviewDropdownList, reviewDropdownList} from '@/app/store/atoms/dropDownAtom';
import {Tlocation, TreviewSort} from '@/app/store/types/dropDown.types';

import Date from './date';
import {DropDownList} from './dropDownList';

const locations = ['지역 전체', '건대입구', '을지로 3가', '신림', '홍대입구'];
const howToSortReview = ['최신 순', '리뷰 높은 순', '참여 인원 순'];

export default function DropDown() {
  const [isLocationClicked, setIsLocationClicked] = useState(false);
  const [isHowToSortClicked, setIsHowToSortClicked] = useState(false);

  const [selectedLocation, setSelectedLocation] = useAtom(reviewDropdownList);
  const [selectedHowToSortReview, setSelectedHowToSortReview] = useAtom(
    howToSortReviewDropdownList,
  );

  // Location 클릭
  function handleLocationBtnClick() {
    setIsLocationClicked(prev => !prev);
  }
  function handleLocationClick(event: React.MouseEvent<HTMLButtonElement>) {
    const getLocationName = event.currentTarget.name as Tlocation;
    setSelectedLocation(getLocationName);
    setIsLocationClicked(false);
  }
  // 정렬방법 클릭
  function handleHowToSortBtnClick() {
    setIsHowToSortClicked(prev => !prev);
  }
  function handleHowToSortClick(event: React.MouseEvent<HTMLButtonElement>) {
    const getSortName = event.currentTarget.name as TreviewSort;
    setSelectedHowToSortReview(getSortName);
    setIsHowToSortClicked(false);
  }

  // Date클릭
  // function handleDateBtnClick() {
  //   setIsHowToSortClicked(prev => !prev);
  // }
  // function handleDateClick(event: React.MouseEvent<HTMLButtonElement>) {
  //   const getDate = event.currentTarget.value;
  //   console.log(typeof getDate);
  // }

  return (
    <div>
      <div>{isLocationClicked ? 'Location: true' : 'Location: false'}</div>
      <div>{selectedLocation}</div>
      <div>{isHowToSortClicked ? 'Sort: true' : 'Sort: false'}</div>
      <div>{selectedHowToSortReview}</div>
      <div>
        <button
          onClick={handleLocationBtnClick}
          type="button"
          className={`flex justify-between items-center gap border-2 border-gray-100 rounded-xl p-2 w-28 h-10 ${selectedLocation !== '지역 전체' ? 'bg-gray-900 rounded-xl text-gray-50' : ''}`} // 클릭된 버튼 배경색 고정
        >
          <span className="text-sm">{selectedLocation}</span>
          <Image
            width={24}
            height={24}
            alt="아래방향 검은 화살표"
            src={`${selectedLocation !== '지역 전체' ? '/arrow-inverse-down.png' : '/arrow-default-down.png'}`}
          />
        </button>
        {isLocationClicked && (
          <DropDownList
            lists={locations}
            // eslint-disable-next-line react/jsx-no-bind
            onclick={handleLocationClick}
            selectedItem={selectedLocation}
            width={112}
          />
        )}
      </div>
      <div>
        <button
          onClick={handleHowToSortBtnClick}
          type="button"
          className={`flex justify-between items-center gap border-2 border-gray-100 rounded-xl p-2 w-[123px] 28 h-10 ${selectedHowToSortReview !== '최신 순' ? 'bg-gray-900 rounded-xl text-gray-50' : ''}`} // 클릭된 버튼 배경색 고정
        >
          <span className="text-sm">{selectedHowToSortReview}</span>
          <Image
            width={24}
            height={24}
            alt="아래방향 검은 화살표"
            src={`${selectedHowToSortReview !== '최신 순' ? '/arrow-inverse-down.png' : '/arrow-default-down.png'}`}
          />
        </button>
        {isHowToSortClicked && (
          <DropDownList
            lists={howToSortReview}
            // eslint-disable-next-line react/jsx-no-bind
            onclick={handleHowToSortClick}
            selectedItem={selectedHowToSortReview}
            width={123}
          />
        )}
      </div>
      <Date />
    </div>
  );
}
