'use client';

import {useEffect, useState} from 'react';

import {useQuery} from '@tanstack/react-query';
import Image from 'next/image';
import {useParams} from 'next/navigation';

import {getGatheringDetail, getJoinedGatherings} from '../../../apis/gatherings/gatheringApi';
import ReviewWrapper from '../../../components/common/review/reviewWrapper';
import BottomBar from '../../../components/gatherings/bottomBar';
import {gatheringsQueryKey, reviewListQuery} from '../../../queries/common/queryKeys';
import {useUserQuery} from '../../../queries/user/useUserQuries';

export default function Gathering() {
  const params = useParams();
  const gatheringId = Number(params.id);

  const [isOwner, setIsOwner] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isParticipated, setIsParticipated] = useState(false);
  const [isFull, setIsFull] = useState(false);
  const [isDeadlineApproaching, setIsDeadlineApproaching] = useState(false);
  const [deadLine, setDeadline] = useState('');

  const {data: gatheringReviewList} = useQuery(
    reviewListQuery.getGatheringReviewList({gatheringId, sortOrder: 'desc'}),
  );

  const {data: gatheringDetail, isError} = useQuery({
    queryKey: gatheringsQueryKey.GatheringDetails(gatheringId),
    queryFn: () => getGatheringDetail(gatheringId),
    staleTime: 0,
  });

  const {data: joinedGatherings} = useQuery({
    queryKey: gatheringsQueryKey.joinedGatherings(),
    queryFn: () => getJoinedGatherings(),
  });

  const {data: userInfo} = useUserQuery().getMyInfo();
  const userId = userInfo?.data?.id as number;

  const gatheringOwner = gatheringDetail?.createdBy;

  console.log('userInfo:', userInfo);
  console.log('userID:', userId);

  const checkFull = () => {
    if (gatheringDetail) {
      const {capacity, participantCount} = gatheringDetail;
      if (capacity === participantCount) {
        console.log('예약 풀');
        console.log('총 인원: ', capacity);
        console.log('참여 인원: ', participantCount);
        setIsFull(true);
      } else {
        console.log('예약 가능');
        console.log('총 인원: ', capacity);
        console.log('참여 인원: ', participantCount);
        setIsFull(false);
      }
    }
  };

  const checkParticipated = () => {
    if (joinedGatherings) {
      const exists = joinedGatherings.some(item => Number(item.id) === Number(gatheringId));
      setIsParticipated(exists);
    }
  };

  useEffect(() => {
    if (!userId) {
      console.log('로그인해라');
      return;
    }
    checkFull();
    checkParticipated();
    if (userId === gatheringOwner) {
      console.log('유저 주인임');
      setIsOwner(true);
      setIsLogin(true);
    } else {
      console.log('일반유저임');
      setIsOwner(false);
      setIsLogin(true);
    }
  }, [userId, gatheringOwner, joinedGatherings, gatheringDetail]);

  const getHoursDifference = (timestamp: string): number => {
    const EndDate = new Date(timestamp);
    setDeadline(String(EndDate.getHours()));
    const currentDate = new Date();
    console.log(EndDate.getHours());
    console.log('🕒 마감시간 (UTC 기준):', EndDate.getUTCHours());
    console.log('🕒 마감시간 (로컬 기준):', EndDate.getHours());
    const diffMs = EndDate.getTime() - currentDate.getTime();
    return diffMs / (1000 * 60 * 60);
  };

  useEffect(() => {
    if (!gatheringDetail?.registrationEnd) {
      return;
    }

    const EndTime = gatheringDetail.registrationEnd;
    console.log('📌 마감 시간 (UTC):', EndTime);

    const checkDeadline = () => {
      const res = getHoursDifference(EndTime);
      console.log('⏳ 남은 시간:', res);

      if (res > 0 && res < 24) {
        setIsDeadlineApproaching(true);
        console.log('⏳ 마감임박!');
      } else {
        setIsDeadlineApproaching(false);
      }
    };

    checkDeadline();
  });

  if (isError) {
    console.log('모임 받아오기 실패😞😞');
    return <div>모임을 찾을 수 없습니다</div>;
  }

  return (
    <>
      {/* <div>
        현재 참여중인 모임:
        {joinedGatherings && joinedGatherings.length > 0
          ? joinedGatherings.map(item => (
              <div key={item.id}>
                <div>{item.name}</div>
                <div>{item.id}</div>
              </div>
            ))
          : '참여한 모임 없음'}
      </div>
      <div>현재 로그인한 유저 id: {userId}</div>

      <div>모임 id: {gatheringDetail?.id}</div>
      <div>모임 이름: {gatheringDetail?.name}</div>
      <div>모임 owner: {gatheringDetail?.createdBy}</div>
      <div>참여 가능 인원: {gatheringDetail?.capacity}</div>
      <div>현재 참여한 인원: {gatheringDetail?.participantCount}</div>
      <div>
        현재 모임 상태: {gatheringDetail?.canceledAt ? '취소된 모임임' : '아직 취소 안 된 모임임'}
      </div>
      <div>{isParticipated ? '이미 참여중임' : '아직 참여안함'}</div> */}
      <div>마감시간 UTC기준: {gatheringDetail?.registrationEnd}</div>
      <div>마감시간 시간만(로컬): {deadLine}</div>
      <div className="mb-4 flex flex-col items-center gap-4 md:mb-[21px] md:flex-row md:justify-center md:gap-[14px] lg:mb-6 lg:gap-6">
        <div className="relative h-[180px] w-[343px] rounded-3xl border-2 border-gray-200 md:h-60 md:w-[340px] lg:h-[270px] lg:w-[486px] lg:gap-6">
          {gatheringDetail?.image ? (
            <Image src={gatheringDetail.image} alt="모임 이미지" fill className="rounded-3xl" />
          ) : (
            <div className="size-full rounded-3xl bg-gray-800" />
          )}
          {isDeadlineApproaching ? (
            <div className="absolute right-0 top-0 flex h-8 w-[123px] items-center gap-[2px] rounded-bl-xl rounded-tr-3xl bg-orange-600 py-1 pl-[7px]">
              <Image src="/icons/watch.svg" alt="시계 아이콘" width={24} height={24} />
              <div className="text-xs text-white">{`오늘 ${deadLine}시 마감`}</div>
            </div>
          ) : (
            ''
          )}
        </div>
        <div className="h-60 w-[343px] rounded-3xl border border-gray-600 md:w-[340px] lg:h-[270px] lg:w-[486px]">
          건희님 컴포넌트
        </div>
      </div>
      <div className="border-t-2 border-t-gray-200 px-6 pt-6">
        <div className="mb-[10px] font-semibold text-gray-900 tablet:text-lg md:mb-4">
          이용자들은 이 프로그램을 이렇게 느꼈어요!
        </div>
        {gatheringReviewList && <ReviewWrapper {...gatheringReviewList} />}
      </div>
      <div>
        <BottomBar
          isLogin={isLogin}
          isOwner={isOwner}
          isParticipated={isParticipated}
          setIsParticipated={setIsParticipated}
          isFull={isFull}
          isCancel={gatheringDetail?.canceledAt}
          gatheringId={gatheringDetail?.id}
        />
      </div>
    </>
  );
}
