// 'use client';

// import {useEffect, useState} from 'react';

// import {useQuery} from '@tanstack/react-query';

// import {getGatherings} from '../../apis/gatherings/gatheringApi';
// import {EmptyMessage} from '../../components/common/emptyMessage';
// import {GatheringFilter} from '../../components/common/gatheringFilter/gatheringFilter';
// import {PageInfo} from '../../components/common/pageInfo';
// import {TextRender} from '../../components/common/textRender';
// import {ListCard} from '../../components/list/listCard';
// import {useQueryStringFilter} from '../../hooks/useQueryStringFilter';
// import {Gathering} from '../../types/common/gatheringFilter.types';
// import {GetGatherings} from '../../types/gatherings/getGatherings.types';

// export default function Home() {
//   // const {gatheringType, setGatheringType} = useGatheringFilter();
//   const {filter, setFilter, updateQueryString} = useQueryStringFilter();
//   const [storedIds, setStoredIds] = useState<string[]>([]);

//   useEffect(() => {
//     const stored = localStorage.getItem('likedGatherings');
//     if (stored) {
//       setStoredIds(JSON.parse(stored));
//     }
//   }, []);
//   const id: string = storedIds.join(',');
//   // TODO: 타입 개선 필요
//   const gatheringType = filter.type as Gathering;
//   const {
//     data: gatheringList,
//     isLoading,
//     isError,
//   } = useQuery<GetGatherings[]>({
//     queryKey: ['likedGatherings', gatheringType, id],
//     queryFn: () => getGatherings({id, type: gatheringType || ''}),
//   });

//   return (
//     <div>
//       <div className="mb-6 tablet:mb-8">
//         <PageInfo pageName="liked" />
//       </div>
//       <div className="border-b-2 border-b-gray-200 pb-4">
//         <GatheringFilter
//           updateQueryString={updateQueryString}
//           filter={filter}
//           setFilter={setFilter}
//         />
//       </div>

//       <div>
//         {isLoading && <TextRender effect="bounce" text="로딩중..." />}
//         {isError && <TextRender effect="shake" text="참여자 정보를 불러오지 못했습니다." />}

//         {!isLoading && !isError && (
//           <div className="mt-4 flex flex-col justify-between gap-6 tablet:mt-6">
//             {gatheringList && gatheringList.length > 0 ? (
//               gatheringList.map(gathering => <ListCard key={gathering.id} {...gathering} />)
//             ) : (
//               <EmptyMessage message="찜한 모임이 없어요." />
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

'use client';

import {Suspense, useEffect, useState} from 'react';

import {useQuery} from '@tanstack/react-query';

import {getGatherings} from '../../apis/gatherings/gatheringApi';
import {EmptyMessage} from '../../components/common/emptyMessage';
import {GatheringFilter} from '../../components/common/gatheringFilter/gatheringFilter';
import {PageInfo} from '../../components/common/pageInfo';
import {TextRender} from '../../components/common/textRender';
import {ListCard} from '../../components/list/listCard';
import {useQueryStringFilter} from '../../hooks/useQueryStringFilter';
import {Gathering} from '../../types/common/gatheringFilter.types';
import {GetGatherings} from '../../types/gatherings/getGatherings.types';

function LikedContent() {
  const {filter, setFilter, updateQueryString} = useQueryStringFilter();
  const [storedIds, setStoredIds] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('likedGatherings');
    if (stored) {
      setStoredIds(JSON.parse(stored));
    }
  }, []);

  const id: string = storedIds.join(',');
  const gatheringType = filter.type as Gathering;

  const {
    data: gatheringList,
    isLoading,
    isError,
  } = useQuery<GetGatherings[]>({
    queryKey: ['likedGatherings', gatheringType, id],
    queryFn: () => getGatherings({id, type: gatheringType || ''}),
  });

  return (
    <div>
      <div className="mb-6 tablet:mb-8">
        <PageInfo pageName="liked" />
      </div>
      <div className="border-b-2 border-b-gray-200 pb-4">
        <GatheringFilter
          updateQueryString={updateQueryString}
          filter={filter}
          setFilter={setFilter}
        />
      </div>

      <div>
        {isLoading && <TextRender effect="bounce" text="로딩중..." />}
        {isError && <TextRender effect="shake" text="참여자 정보를 불러오지 못했습니다." />}

        {!isLoading && !isError && (
          <div className="mt-4 flex flex-col justify-between gap-6 tablet:mt-6">
            {gatheringList && gatheringList.length > 0 ? (
              gatheringList.map(gathering => <ListCard key={gathering.id} {...gathering} />)
            ) : (
              <EmptyMessage message="찜한 모임이 없어요." />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<TextRender effect="bounce" text="페이지 로딩 중..." />}>
      <LikedContent />
    </Suspense>
  );
}
