import {atom} from 'jotai';

import {Tlocation, TreviewSort} from '../types/dropDown.types';

export const reviewDropdownList = atom<Tlocation>('지역 전체');
export const howToSortReviewDropdownList = atom<TreviewSort>('최신 순');
// export const readOnlyReviewDropdownList = atom(get => get(reviewDropdownList));

// export const writeOnlyReviewDropDownList = atom(null, (get, set, newValue: Tlocation) => {
//   set(reviewDropdownList, newValue); // reviewDropdownList를 새로운 값으로 설정
// });
