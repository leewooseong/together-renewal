type QueryStringObject = {
  type: string;
  location: string;
  date: string;
  sortBy: string;
  sortOrder: string;
};
const GATHERING_TYPES = ['DALLAEMFIT', 'OFFICE_STRETCHING', 'MINDFULNESS', 'WORKATION'];
const STRING_ONLY_GATHERING_TYPES = ['DALLAEMFIT', 'OFFICESTRETCHING', 'MINDFULNESS', 'WORKATION'];

const LOCATIONS = ['건대입구', '을지로3가', '신림', '홍대입구'];

const SORT_BY = ['createdAt', 'score', 'participantCount'];
const UPPER_CASE_SORT_BY = ['CREATEDAT', 'SCORE', 'PARTICIPANTCOUNT'];

const SORT_ORDER = ['asc', 'desc'];

export const checkQueryStringObject = (params: QueryStringObject) => {
  const newQueryStringObject = {...params};
  // 모임 타입 확인
  if (params.type) {
    console.log('1. 받은 type값은:', params.type);
    const noSpaces = params.type.replace(/\s/g, '');
    console.log('2. 공백을 제거했습니다:', noSpaces);
    const upperCase = noSpaces.toUpperCase();
    console.log('3. 공백 제거 후 대문자로 변환!', upperCase);
    const isEnglish = /^[a-zA-Z]+$/.test(upperCase);
    const isOfficeStretching = upperCase === 'OFFICE_STRETCHING';

    if (isEnglish || isOfficeStretching) {
      const isGatheringType = STRING_ONLY_GATHERING_TYPES.includes(upperCase);
      console.log('4. 배열에 있는 값인가요?', GATHERING_TYPES.includes(upperCase));

      if (isGatheringType || isOfficeStretching) {
        if (upperCase === 'OFFICESTRETCHING') {
          console.log('있는데 오피스 스트레칭이네요');
          newQueryStringObject.type = 'OFFICE_STRETCHING';
        } else {
          console.log('있네요');
          newQueryStringObject.type = upperCase;
        }
      }
    } else {
      console.log('없음!!!');
      console.log('정제한 니가 준 값:', upperCase);
      newQueryStringObject.type = 'DALLAEMFIT';
    }
  } else {
    console.log('모임타입에 빈값을 줬구나나');
  }

  console.log('모임 타입이-잘 반영됐니?', newQueryStringObject.type);
  console.log('----------------------');
  console.log('location확인 시작');
  // 모임 위치 확인
  if (params.location) {
    console.log('1. 받은값 location값은:', params.location);
    const noSpaces = params.location.replace(/\s/g, '');
    console.log('2. 공백을 제거했습니다:', noSpaces);
    const isEnglish = /^[a-zA-Z]+$/.test(noSpaces);
    console.log(
      isEnglish ? '3. 영어인가요? 영어네요' : '3. 영어인가요?: 한글 or 특수문자가 있네요',
    );
    const isLocationType = LOCATIONS.includes(noSpaces);
    console.log('4. 배열에 있는 값인가요?', isLocationType);

    if (!isEnglish && isLocationType) {
      console.log('한글이고');
      console.log('있네용');
      newQueryStringObject.location = noSpaces;
    } else {
      console.log('영어이거나');
      console.log('특수문자있음음');
      console.log('정제를 거친 니가 준 값:', noSpaces);
      newQueryStringObject.location = '';
    }
  } else {
    console.log('모임 위치에 빈값을 줬구나나');
  }
  console.log('위치가-잘 반영됐니?', newQueryStringObject.location);
  console.log('----------------------');
  console.log('sortBy확인 시작');

  // sortBy 확인
  if (params.sortBy) {
    console.log('1. 받은값은:', params.sortBy);
    const noSpaces = params.sortBy.replace(/\s/g, '');
    console.log('2. 공백을 제거했습니다:', noSpaces);
    const isEnglish = /^[a-zA-Z]+$/.test(noSpaces);
    console.log('3. 영어인가가요?', isEnglish);
    const upperCase = noSpaces.toUpperCase();
    console.log('4. 대문자로 변환!', upperCase);
    const isSortByType = UPPER_CASE_SORT_BY.includes(upperCase);
    console.log('5. 배열에 있는 값인가요?', UPPER_CASE_SORT_BY.includes(upperCase));

    if (isEnglish && isSortByType) {
      console.log('영어이고 있네요');
      const index = UPPER_CASE_SORT_BY.indexOf(upperCase);
      newQueryStringObject.sortBy = SORT_BY[index];
    } else {
      console.log('없음!!!');
      console.log('정제를 거친 니가 준 값:', upperCase);
      newQueryStringObject.sortBy = '';
    }
  } else {
    console.log('sortBy에 빈값을 줬구나나');
  }

  console.log('sortBy가-잘 반영됐니?', newQueryStringObject.sortBy);
  console.log('----------------------');
  console.log('sortOrder 확인 시작');

  // sortOrder 확인
  if (params.sortOrder) {
    console.log('1. 받은값 sortOrder값은:', params.sortOrder);
    const noSpaces = params.sortOrder.replace(/\s/g, '');
    console.log('2. 공백을 제거했습니다:', noSpaces);
    const lowerCase = noSpaces.toLowerCase();
    console.log('3. 공백 제거 후 소문자로로 변환!', lowerCase);
    const isEnglish = /^[a-zA-Z]+$/.test(lowerCase);
    console.log(
      isEnglish ? '4. 영어인가요? 영어네요' : '3. 영어인가요?: 한글 or 특수문자가 있네요',
    );
    const isSortOrderType = SORT_ORDER.includes(lowerCase);
    console.log('5. 배열에 있는 값인가요?', isSortOrderType);

    if (isEnglish && isSortOrderType) {
      console.log('영어이고고');
      console.log('있네용');
      newQueryStringObject.sortOrder = lowerCase;
    } else {
      console.log('한글이거나나');
      console.log('특수문자있음음');
      console.log('정제를 거친 니가 준 값:', lowerCase);
      newQueryStringObject.sortOrder = '';
    }
  } else {
    console.log('sortOrder에 빈값을 줬구나');
  }
  console.log('sortOrder가가-잘 반영됐니?', newQueryStringObject.sortOrder);
  console.log('----------------------');

  console.log('끝이다');
  return newQueryStringObject;
};

// const changedValue = checkQueryStringObject({
//   // 이모지
//   // 띄어쓰기
//   // 영어 or 한글
//   // 원래 정답값

//   type: '',
//   location: '',
//   date: '',
//   sortBy: 'a',
//   sortOrder: 'a          sc',
// });

// console.log(`바뀐 type값: ${changedValue.type}`);
// console.log(`바뀐 location값: ${changedValue.location}`);
// console.log(`바뀐 sortBy값: ${changedValue.sortBy}`);
// console.log(`바뀐 sortOrder값: ${changedValue.sortOrder}`);
// console.log(`------------------------------`);
