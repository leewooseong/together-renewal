/* eslint-disable @next/next/no-img-element */

import {useState} from 'react';

import {DropdownProps, SelectedItem} from '@/app/types/dropDown.types';

export function Dropdown({defaultValue, filterList}: DropdownProps) {
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const [selectedItem, setSelectedItem] = useState<SelectedItem>(defaultValue);

  const handleButtonClick = () => {
    setIsButtonClicked(prev => !prev);
  };
  const handleListClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const getLocationName = event.currentTarget.name as SelectedItem;
    setSelectedItem(getLocationName);
    setIsButtonClicked(false);
  };

  return (
    <div>
      {/* <div>{isButtonClicked ? 'Location: true' : 'Location: false'}</div>
      <div>{selectedItem}</div> */}
      <div>
        <button
          onClick={handleButtonClick}
          type="button"
          className={`flex ${defaultValue === '최신 순' ? 'flex-row-reverse' : 'flex-row'} h-9 ${defaultValue === '지역 전체' ? 'w-[116px]  px-[10px]' : 'w-10 xs:w-32 px-[6px] xs:px-[10px] '} xs:h-10 xs:py-1 items-center justify-between rounded-xl border-2 border-gray-100 py-[6px] ${
            selectedItem !== defaultValue ? 'bg-gray-900 text-gray-50' : ''
          }`}
        >
          <span className={`text-sm ${defaultValue === '최신 순' ? 'hidden xs:block' : ''}`}>
            {selectedItem}
          </span>
          {defaultValue === '지역 전체' ? (
            <img
              alt="아래방향 화살표"
              src={`${selectedItem !== defaultValue ? '/icons/arrow-inverse-down.svg' : '/icons/arrow-default-down.svg'}`}
            />
          ) : (
            <img
              alt="정렬 화살표"
              src={`${selectedItem !== defaultValue ? '/icons/sort-inverse.svg' : '/icons/sort-default.svg'}`}
            />
          )}
        </button>
      </div>
      {isButtonClicked && (
        <ul
          className={`flex flex-col justify-between ${defaultValue === '지역 전체' ? 'w-[116px]' : 'w-[126px]'} rounded-xl shadow-xl`}
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
                className={`flex items-center justify-start rounded-xl p-[6px] text-sm ${
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
