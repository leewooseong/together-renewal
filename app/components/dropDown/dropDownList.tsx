import {IdropDownListProps} from '@/app/store/types/dropDown.types';

export default function DropDownList({lists, onclick, selectedItem, width}: IdropDownListProps) {
  return (
    <ul className={` flex flex-col justify-between w-[${width}px] rounded-xl shadow-xl`}>
      {lists.map(list => (
        <button
          type="button"
          className={`p-1 h-10 group ${selectedItem === list ? 'bg-gray-900 rounded-xl text-gray-50' : ''}`}
          key={list}
          name={list}
          onClick={onclick}
        >
          <li
            className={`flex items-center justify-start p-[6px] rounded-xl text-sm ${
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
