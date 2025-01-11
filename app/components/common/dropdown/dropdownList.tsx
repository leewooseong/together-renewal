import {DropdownListProps} from '@/app/types/dropDown.types';

export function DropdownList({
  filterList,
  onDropdownListClick,
  selectedItem,
  width,
}: DropdownListProps) {
  return (
    <ul className={`flex flex-col justify-between w-[${width}px] rounded-xl shadow-xl`}>
      {filterList.map(list => (
        <button
          type="button"
          className={`group h-10 p-1 ${selectedItem === list ? 'rounded-xl bg-gray-900 text-gray-50' : ''}`}
          key={list}
          name={list}
          onClick={onDropdownListClick}
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
  );
}
