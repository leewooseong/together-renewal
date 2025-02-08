'use client';

import {useEffect, useState} from 'react';

import {useQuery} from '@tanstack/react-query';
import {useParams} from 'next/navigation';

import {getGatheringDetail, getJoinedGatherings} from '../../../apis/gatherings/gatheringApi';
import BottomBar from '../../../components/gatherings/bottomBar';
import {gatheringsQueryKey} from '../../../queries/common/queryKeys';
import {useUserQuery} from '../../../queries/user/useUserQuries';

export default function Gathering() {
  const params = useParams();
  const gatheringId = Number(params.id);

  const [isOwner, setIsOwner] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isParticipated, setIsParticipated] = useState(false);
  const [isFull, setIsFull] = useState(false);

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

  if (isError) {
    console.log('모임 받아오기 실패😞😞');
    return <div>모임을 찾을 수 없습니다</div>;
  }

  return (
    <>
      <div>
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
        현재 모임 상태: {gatheringDetail?.canceledAt ? '취소된 모임임' : '아직 활성중인 모임임'}
      </div>
      <div>{isParticipated ? '이미 참여중임' : '아직 참여안함'}</div>

      <BottomBar
        isLogin={isLogin}
        isOwner={isOwner}
        isParticipated={isParticipated}
        setIsParticipated={setIsParticipated}
        isFull={isFull}
        isCancel={gatheringDetail?.canceledAt}
        gatheringId={gatheringDetail?.id}
      />
    </>
  );
}
