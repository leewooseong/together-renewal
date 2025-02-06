'use client';

import {useEffect, useState} from 'react';

import {useQuery} from '@tanstack/react-query';
import {useParams} from 'next/navigation';

import {getGatheringDetail} from '../../../apis/gatherings/gatheringApi';
import BottomBar from '../../../components/gatherings/bottomBar';
import {gatheringDetailQueryKey} from '../../../queries/common/queryKeys';
import {useUserQuery} from '../../../queries/user/useUserQuries';

// const gatheringId = 1716;

export default function Gathering() {
  const params = useParams(); // URL에서 동적 파라미터 가져오기
  const gatheringId = Number(params.id);

  const [isOwner, setIsOwner] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  const {data: gatheringDetail, isError} = useQuery({
    queryKey: gatheringDetailQueryKey.getGatheringDetail(gatheringId),
    queryFn: () => getGatheringDetail(gatheringId),
    retry: false,
    enabled: !!gatheringId, // gatheringId가 있을 때만 요청
  });

  const {data: userInfo} = useUserQuery().getMyInfo();
  const userId = userInfo?.data?.id as number;
  const gatheringOwner = gatheringDetail?.createdBy;

  useEffect(() => {
    if (!userId) {
      console.log('로그인해라');
      return;
    }

    if (userId === gatheringOwner) {
      console.log('유저 주인임');
      setIsOwner(true);
      setIsLogin(true);
    } else {
      console.log('일반유저임');
      setIsOwner(false);
      setIsLogin(true);
    }
  }, [userId, gatheringOwner]);

  if (isError) {
    console.log('모임 받아오기 실패😞😞');
    return <div>모임을 찾을 수 없습니다</div>;
  }

  return (
    <>
      <div>{userId}</div>
      <div>{gatheringDetail?.id}</div>
      <div>{gatheringDetail?.name}</div>
      <div>{gatheringDetail?.createdBy}</div>

      <BottomBar isLogin={isLogin} isOwner={isOwner} gatheringId={gatheringDetail?.id} />
    </>
  );
}
