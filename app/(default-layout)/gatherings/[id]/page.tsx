'use client';

import {useState} from 'react';

import BottomBar from '../../../components/gatherings/bottomBar';
import {useUserQuery} from '../../../queries/user/useUserQuries';

const gatheringId = 1716;
const createdBy = 1004;

// 모임 id랑 createdBy(모임 주인 id)는 모임상세 api조회로 받아와야함

// 모임 id는 메인 페이지에서 받아오는게 맞는듯?
// 근데 굳이 메인 페이지에서 안 받아와도 될듯 modal은 모임상세 페이지에서 있는 하단바에서 받는거니까 모임상세페이지에서 줘도 된다.
export default function Gathering() {
  const [isOwner, setIsOwner] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  const {data: userInfo} = useUserQuery().getMyInfo();
  const userId: number = userInfo?.data?.id as number;
  const gatheringOwner = createdBy;
  if (userId) {
    if (userId === gatheringOwner) {
      console.log('유저 주인임');
      setIsOwner(true);
    } else {
      console.log('일반유저임');
      setIsLogin(true);
    }
  } else {
    console.log('로그인해라');
  }

  // const {data: joinGatheringResponse} = useQuery<JoinGatheringResponse>({
  //   queryKey: ['postJoinGathering', gatheringId],
  //   queryFn: () => postJoinGathering({id: gatheringId}),
  // });

  return (
    <>
      <div>{userId}</div>
      <div>{userInfo?.name}</div>
      {/* <div>
        <div className="size-44 bg-pink-400" />
        <div className="size-44 bg-pink-400" />
        <div className="size-44 bg-pink-400" />
        <div className="size-44 bg-pink-400" />
        <div className="size-44 bg-pink-400" />
        <div className="size-44 bg-pink-400" />
        <div className="size-44 bg-pink-400" />
        <div className="size-44 bg-pink-400" />
        <div className="size-44 bg-pink-400" />
        <div className="size-44 bg-pink-400" />
        <div className="size-44 bg-pink-400" />
        <div className="size-44 bg-pink-400" />
        <div className="size-44 bg-pink-400" />
      </div> */}
      <BottomBar isLogin={isLogin} isOwner={isOwner} gatheringId={1} />
    </>
  );
}
