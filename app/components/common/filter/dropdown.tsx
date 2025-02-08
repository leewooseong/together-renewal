/* eslint-disable @next/next/no-img-element */

import {Dispatch, SetStateAction, useState} from 'react';

import {DefaultValue, SelectedItem} from '../../../types/dropDown.types';
import {GetReviewsProps} from '../../../types/reviews/reviewsApi.types';

export type DropdownProps = {
  defaultValue: DefaultValue;
  filterList: SelectedItem[];
  updateQueryString: (newFilter: Partial<GetReviewsProps>) => void;
  filter: GetReviewsProps;
  setFilter: Dispatch<SetStateAction<GetReviewsProps>>;
};

export function Dropdown({
  defaultValue,
  filterList,
  updateQueryString,
  filter,
  setFilter,
}: DropdownProps) {
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const [selectedItem, setSelectedItem] = useState<SelectedItem>(defaultValue);

  const convertSortBy = (item: string) => {
    if (item === '최신 순') {
      return 'createdAt';
    }
    if (item === '리뷰 높은 순') {
      return 'score';
    }
    if (item === '참여 인원 순') {
      return 'participantCount';
    }
    return '';
  };

  const handleButtonClick = () => {
    setIsButtonClicked(prev => !prev);
  };
  const handleListClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const getSelectedName = event.currentTarget.name as SelectedItem;
    if (defaultValue === '지역 전체') {
      if (getSelectedName !== '지역 전체') {
        setFilter({
          ...filter,
          location: getSelectedName,
        });
        updateQueryString({
          ...filter,
          location: getSelectedName,
        });
      } else {
        setFilter({
          ...filter,
          location: '',
        });
        updateQueryString({
          ...filter,
          location: '',
        });
      }
    } else if (defaultValue === '최신 순' || defaultValue === '마감 임박') {
      const sortByFormat = convertSortBy(getSelectedName);
      setFilter({
        ...filter,
        sortBy: sortByFormat,
      });
      updateQueryString({
        ...filter,
        sortBy: sortByFormat,
      });
    }
    setSelectedItem(getSelectedName);
    setIsButtonClicked(false);
  };

  // Tailwind 조건별 클래스 설정
  const IS_SORT = defaultValue === '최신 순' || defaultValue === '마감 임박';

  const DROPDOWN_BUTTON_DEFAULT_CLASS =
    defaultValue === '지역 전체' ? 'w-[116px] px-[10px]' : ' xs:w-32 px-[6px] xs:px-[10px]';
  const DROPDOWN_BUTTON_PADDING_CLASS = 'py-[6px] xs:h-10 xs:py-1';
  const DROPDOWN_BUTTON_DIRECTION_CLASS = IS_SORT ? 'flex-row-reverse' : 'flex-row';
  const DROPDOWN_BUTTON_ACTIVE_CLASS =
    selectedItem !== defaultValue ? 'bg-gray-900 text-gray-50' : '';

  return (
    <div className={`${IS_SORT && 'flex justify-end'} relative`}>
      <div>
        <button
          onClick={handleButtonClick}
          type="button"
          className={`flex h-9 items-center justify-between rounded-xl border-2 border-gray-100 ${DROPDOWN_BUTTON_DEFAULT_CLASS} ${DROPDOWN_BUTTON_PADDING_CLASS} ${DROPDOWN_BUTTON_DIRECTION_CLASS} ${DROPDOWN_BUTTON_ACTIVE_CLASS}`}
        >
          <span className={`text-sm ${IS_SORT ? 'xs:block hidden' : ''}`}>{selectedItem}</span>
          {IS_SORT ? (
            <img
              alt="정렬 화살표"
              src={`${selectedItem !== defaultValue ? '/icons/sort-inverse.svg' : '/icons/sort-default.svg'}`}
            />
          ) : (
            <img
              alt="아래방향 화살표"
              src={`${selectedItem !== defaultValue ? '/icons/arrow-inverse-down.svg' : '/icons/arrow-default-down.svg'}`}
            />
          )}
        </button>
      </div>
      {isButtonClicked && (
        <ul
          className={`xs:mt-2 absolute z-10 mt-[6px] flex flex-col justify-between bg-white ${defaultValue === '지역 전체' ? 'w-[116px]' : 'xs:w-32 w-[105px]'} ${IS_SORT ? 'xs:top-10 top-9' : ''} rounded-xl shadow-xl`}
        >
          {filterList.map(list => (
            <button
              type="button"
              className={`group h-10 p-1 ${selectedItem === list ? 'rounded-xl bg-gray-900 text-gray-50' : ''}`}
              key={list}
              name={list}
              onClick={handleListClick}
            >
              <li
                className={`flex items-center ${IS_SORT ? 'justify-end' : 'justify-start'} justify-start rounded-xl p-[6px] text-sm ${
                  selectedItem === list ? '' : 'group-hover:bg-orange-100'
                }`}
              >
                {list}
              </li>
            </button>
          ))}
        </ul>
      )}
    </div>
  );
}
