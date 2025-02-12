import {useMyGatheringsData} from '../../hooks/useMyGatherings';
import {useMyGatheringsFilter} from '../../hooks/useMyGatheringsFilter';
import {ReviewedGatheringFilter} from '../../types/common/gatheringFilter.types';
import {getCommentByTab} from '../../utils/getCommentByTab';
import {EmptyMessage} from '../common/emptyMessage';
import ReviewListWrapper from '../common/review/reviewListWrapper';
import {TextRender} from '../common/textRender';

import {GatheringList} from './myGatherings/gatheringList';

export function MyGatherings({
  activeTab,
  reviewed,
}: {
  activeTab: ReviewedGatheringFilter;
  reviewed: boolean;
}) {
  const {joinedGatherings, reviewedGatherings, isLoading, isError, userInfo} =
    useMyGatheringsData();

  const filteredGatherings = useMyGatheringsFilter(joinedGatherings ?? [], activeTab, userInfo?.id);

  if (isLoading) {
    return <TextRender effect="bounce" text="로딩중..." />;
  }

  if (isError) {
    return <TextRender effect="shake" text="데이터를 불러오는 데 실패했습니다." />;
  }

  if (activeTab === 'myReviews' && reviewed) {
    return reviewedGatherings && reviewedGatherings.data.length > 0 ? (
      <div className="relative flex h-[352px] w-[311px] max-w-[996px] flex-col justify-between sm:h-[180px] sm:w-full sm:flex-col">
        <ReviewListWrapper
          data={reviewedGatherings.data}
          totalItemCount={reviewedGatherings.totalItemCount}
          currentPage={reviewedGatherings.currentPage}
          totalPages={reviewedGatherings.totalPages}
        />
      </div>
    ) : (
      <EmptyMessage message="리뷰가 없어요." />
    );
  }

  return filteredGatherings.length > 0 ? (
    <GatheringList gatherings={filteredGatherings} isMyGathering={activeTab === 'myGatherings'} />
  ) : (
    <EmptyMessage message={`${getCommentByTab(activeTab)}모임이 없어요.`} />
  );
}
