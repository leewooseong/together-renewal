'use client';

import {useQuery} from '@tanstack/react-query';

import {postJoinGathering} from '../../../apis/gatherings/gatheringApi';
import BottomBar from '../../../components/gatherings/bottomBar';
import {JoinGatheringResponse} from '../../../route/token/gatherings/joinedGatherings/[id]/route';

export default function Gathering() {
  const gatheringId = 1706;
  const token = '';
  const {data: joinGatheringResponse} = useQuery<JoinGatheringResponse>({
    queryKey: ['gathering', gatheringId],
    queryFn: () => postJoinGathering({id: gatheringId, token}),
  });

  return (
    <>
      <div>{joinGatheringResponse?.message}</div>
      <div>
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
      </div>
      <BottomBar isOwner={false} gatheringId={1} />
    </>
  );
}
