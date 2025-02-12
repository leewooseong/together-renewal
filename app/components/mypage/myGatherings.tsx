import {useMyGatheringsData} from '../../hooks/useMyGatherings';
import {useMyGatheringsFilter} from '../../hooks/useMyGatheringsFilter';
import {ReviewedGatheringFilter} from '../../types/common/gatheringFilter.types';
import {getCommentByTab} from '../../utils/getCommentByTab';
import {EmptyMessage} from '../common/emptyMessage';
import ReviewWrapper from '../common/review/reviewWrapper';
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
      // TODO: response로 totalItemCount, currentPage, totalPages도 받아와야함
      // <ReviewList reviewsData={reviewedGatherings.data} />
      <ReviewWrapper
        data={reviewedGatherings.data}
        totalItemCount={0}
        currentPage={0}
        totalPages={0}
      />
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
