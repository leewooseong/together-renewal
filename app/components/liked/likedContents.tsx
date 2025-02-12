import {useEffect, useState} from 'react';

import {useQuery} from '@tanstack/react-query';

import {useQueryStringFilter} from '../../hooks/useQueryStringFilter';
import {gatheringsQueryKey} from '../../queries/common/queryKeys';
import {Gathering} from '../../types/common/gatheringFilter.types';
import {EmptyMessage} from '../common/emptyMessage';
import {GatheringFilter} from '../common/gatheringFilter/gatheringFilter';
import {PageInfo} from '../common/pageInfo';
import {TextRender} from '../common/textRender';
import {ListCard} from '../list/listCard';

export function LikedContents() {
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
  } = useQuery(gatheringsQueryKey.likedGatherings(gatheringType, id));

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
        {isError && <TextRender effect="shake" text="찜한 목록을 불러오지 못했습니다." />}

        {!isLoading && !isError && (
          <div className="mt-4 flex flex-col items-center justify-between gap-6 tablet:mt-6">
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
