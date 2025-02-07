'use client';

import {useEffect, useState} from 'react';

import {useQuery} from '@tanstack/react-query';
import {useParams} from 'next/navigation';

import {getGatheringDetail} from '../../../apis/gatherings/gatheringApi';
import BottomBar from '../../../components/gatherings/bottomBar';
import {gatheringDetailQueryKey} from '../../../queries/common/queryKeys';
import {useUserQuery} from '../../../queries/user/useUserQuries';

// const gatheringId = 1716;
// const mock = [
//   {
//     teamId: '6-6',
//     id: 1678,
//     type: 'OFFICE_STRETCHING',
//     name: '거북목 스트레칭',
//     dateTime: '2025-01-02T15:00:00.734Z',
//     registrationEnd: '2025-01-02T14:00:00.735Z',
//     location: '홍대입구',
//     participantCount: 1,
//     capacity: 6,
//     image:
//       'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/together-dallaem/1735784156150_office.jpg',
//     createdBy: 1004,
//     canceledAt: null,
//     joinedAt: '2025-01-02T02:22:38.191Z',
//     isCompleted: true,
//     isReviewed: true,
//   },
//   {
//     teamId: '6-6',
//     id: 1731,
//     type: 'WORKATION',
//     name: '프로젝트 발표',
//     dateTime: '2025-02-13T00:00:00.000Z',
//     registrationEnd: '2025-02-12T12:00:00.000Z',
//     location: '신림',
//     participantCount: 5,
//     capacity: 5,
//     image:
//       'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/together-dallaem/1738661140281_%C3%AB%C2%8B%C2%A4%C3%AC%C2%9A%C2%B4%C3%AB%C2%A1%C2%9C%C3%AB%C2%93%C2%9C%20%281%29.jpg',
//     createdBy: 1078,
//     canceledAt: null,
//     joinedAt: '2025-02-06T09:30:43.234Z',
//     isCompleted: false,
//     isReviewed: false,
//   },
//   {
//     teamId: '6-6',
//     id: 1710,
//     type: 'OFFICE_STRETCHING',
//     name: '점심시간 스트레칭',
//     dateTime: '2025-02-24T14:00:00.734Z',
//     registrationEnd: '2025-02-23T23:59:00.734Z',
//     location: '홍대입구',
//     participantCount: 1,
//     capacity: 8,
//     image:
//       'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/together-dallaem/1738548175636_office2.jpg',
//     createdBy: 1004,
//     canceledAt: null,
//     joinedAt: '2025-02-05T07:41:58.531Z',
//     isCompleted: false,
//     isReviewed: false,
//   },
//   {
//     teamId: '6-6',
//     id: 1711,
//     type: 'MINDFULNESS',
//     name: '명상으로 아침 시작하기',
//     dateTime: '2025-02-25T07:30:29.805Z',
//     registrationEnd: '2025-02-24T23:59:00.805Z',
//     location: '건대입구',
//     participantCount: 1,
//     capacity: 6,
//     image:
//       'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/together-dallaem/1738548471841_cozy%20office.jpg',
//     createdBy: 1004,
//     canceledAt: null,
//     joinedAt: '2025-02-05T08:18:59.271Z',
//     isCompleted: false,
//     isReviewed: false,
//   },
//   {
//     teamId: '6-6',
//     id: 1716,
//     type: 'OFFICE_STRETCHING',
//     name: '바른 자세 챌린지3',
//     dateTime: '2025-02-28T14:00:29.805Z',
//     registrationEnd: '2025-02-27T23:59:00.805Z',
//     location: '신림',
//     participantCount: 1,
//     capacity: 8,
//     image:
//       'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/together-dallaem/1738548948347_office6.jpg',
//     createdBy: 1004,
//     canceledAt: null,
//     joinedAt: '2025-02-05T08:35:29.875Z',
//     isCompleted: false,
//     isReviewed: false,
//   },
//   {
//     teamId: '6-6',
//     id: 1717,
//     type: 'OFFICE_STRETCHING',
//     name: '바른 자세 챌린지4',
//     dateTime: '2025-02-28T14:00:29.805Z',
//     registrationEnd: '2025-02-27T23:59:00.805Z',
//     location: '홍대입구',
//     participantCount: 1,
//     capacity: 10,
//     image:
//       'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/together-dallaem/1738548958874_office6.jpg',
//     createdBy: 1004,
//     canceledAt: null,
//     joinedAt: '2025-02-05T08:33:31.258Z',
//     isCompleted: false,
//     isReviewed: false,
//   },
//   {
//     teamId: '6-6',
//     id: 1718,
//     type: 'MINDFULNESS',
//     name: '퇴근 후 산책하기',
//     dateTime: '2025-03-03T19:30:00.805Z',
//     registrationEnd: '2025-03-02T23:59:00.805Z',
//     location: '건대입구',
//     participantCount: 1,
//     capacity: 5,
//     image:
//       'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/together-dallaem/1738549105393_park.jpg',
//     createdBy: 1004,
//     canceledAt: null,
//     joinedAt: '2025-02-05T08:27:49.877Z',
//     isCompleted: false,
//     isReviewed: false,
//   },
//   {
//     teamId: '6-6',
//     id: 1720,
//     type: 'MINDFULNESS',
//     name: '커피 마시면서 아무말도 안 하기',
//     dateTime: '2025-03-06T20:00:00.805Z',
//     registrationEnd: '2025-03-05T23:59:00.805Z',
//     location: '홍대입구',
//     participantCount: 1,
//     capacity: 5,
//     image:
//       'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/together-dallaem/1738549349056_cafe2.jpg',
//     createdBy: 1004,
//     canceledAt: null,
//     joinedAt: '2025-02-05T08:26:29.876Z',
//     isCompleted: false,
//     isReviewed: false,
//   },
//   {
//     teamId: '6-6',
//     id: 1725,
//     type: 'OFFICE_STRETCHING',
//     name: '거북목 잘가4',
//     dateTime: '2025-03-11T07:00:00.805Z',
//     registrationEnd: '2025-03-10T23:59:00.805Z',
//     location: '홍대입구',
//     participantCount: 1,
//     capacity: 9,
//     image:
//       'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/together-dallaem/1738549725508_office2.jpg',
//     createdBy: 1004,
//     canceledAt: null,
//     joinedAt: '2025-02-05T08:23:00.598Z',
//     isCompleted: false,
//     isReviewed: false,
//   },
// ];
const mock = [
  {
    teamId: '6-6',
    id: 1678,
    type: 'OFFICE_STRETCHING',
    name: '거북목 스트레칭',
    dateTime: '2025-01-02T15:00:00.734Z',
    registrationEnd: '2025-01-02T14:00:00.735Z',
    location: '홍대입구',
    participantCount: 1,
    capacity: 6,
    image:
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/together-dallaem/1735784156150_office.jpg',
    createdBy: 1004,
    canceledAt: null,
    joinedAt: '2025-01-02T02:22:38.191Z',
    isCompleted: true,
    isReviewed: true,
  },
  {
    teamId: '6-6',
    id: 1731,
    type: 'WORKATION',
    name: '프로젝트 발표',
    dateTime: '2025-02-13T00:00:00.000Z',
    registrationEnd: '2025-02-12T12:00:00.000Z',
    location: '신림',
    participantCount: 5,
    capacity: 5,
    image:
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/together-dallaem/1738661140281_%C3%AB%C2%8B%C2%A4%C3%AC%C2%9A%C2%B4%C3%AB%C2%A1%C2%9C%C3%AB%C2%93%C2%9C%20%281%29.jpg',
    createdBy: 1078,
    canceledAt: null,
    joinedAt: '2025-02-06T09:30:43.234Z',
    isCompleted: false,
    isReviewed: false,
  },
  {
    teamId: '6-6',
    id: 1710,
    type: 'OFFICE_STRETCHING',
    name: '점심시간 스트레칭',
    dateTime: '2025-02-24T14:00:00.734Z',
    registrationEnd: '2025-02-23T23:59:00.734Z',
    location: '홍대입구',
    participantCount: 1,
    capacity: 8,
    image:
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/together-dallaem/1738548175636_office2.jpg',
    createdBy: 1004,
    canceledAt: null,
    joinedAt: '2025-02-05T07:41:58.531Z',
    isCompleted: false,
    isReviewed: false,
  },
  {
    teamId: '6-6',
    id: 1711,
    type: 'MINDFULNESS',
    name: '명상으로 아침 시작하기',
    dateTime: '2025-02-25T07:30:29.805Z',
    registrationEnd: '2025-02-24T23:59:00.805Z',
    location: '건대입구',
    participantCount: 1,
    capacity: 6,
    image:
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/together-dallaem/1738548471841_cozy%20office.jpg',
    createdBy: 1004,
    canceledAt: null,
    joinedAt: '2025-02-05T08:18:59.271Z',
    isCompleted: false,
    isReviewed: false,
  },
  {
    teamId: '6-6',
    id: 1712,
    type: 'MINDFULNESS',
    name: '퇴근 후 스트레칭 오시려나요?',
    dateTime: '2025-02-26T18:00:29.805Z',
    registrationEnd: '2025-02-25T23:59:00.805Z',
    location: '신림',
    participantCount: 1,
    capacity: 5,
    image:
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/together-dallaem/1738548584603_office3.jpg',
    createdBy: 1004,
    canceledAt: null,
    joinedAt: '2025-02-06T16:07:29.149Z',
    isCompleted: false,
    isReviewed: false,
  },
  {
    teamId: '6-6',
    id: 1713,
    type: 'MINDFULNESS',
    name: '허리를 핍시다',
    dateTime: '2025-02-27T15:00:29.805Z',
    registrationEnd: '2025-02-26T23:59:00.805Z',
    location: '홍대입구',
    participantCount: 1,
    capacity: 5,
    image:
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/together-dallaem/1738548786344_office1.jpg',
    createdBy: 1004,
    canceledAt: null,
    joinedAt: '2025-02-06T16:15:52.692Z',
    isCompleted: false,
    isReviewed: false,
  },
  {
    teamId: '6-6',
    id: 1716,
    type: 'OFFICE_STRETCHING',
    name: '바른 자세 챌린지3',
    dateTime: '2025-02-28T14:00:29.805Z',
    registrationEnd: '2025-02-27T23:59:00.805Z',
    location: '신림',
    participantCount: 1,
    capacity: 8,
    image:
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/together-dallaem/1738548948347_office6.jpg',
    createdBy: 1004,
    canceledAt: null,
    joinedAt: '2025-02-05T08:35:29.875Z',
    isCompleted: false,
    isReviewed: false,
  },
  {
    teamId: '6-6',
    id: 1717,
    type: 'OFFICE_STRETCHING',
    name: '바른 자세 챌린지4',
    dateTime: '2025-02-28T14:00:29.805Z',
    registrationEnd: '2025-02-27T23:59:00.805Z',
    location: '홍대입구',
    participantCount: 1,
    capacity: 10,
    image:
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/together-dallaem/1738548958874_office6.jpg',
    createdBy: 1004,
    canceledAt: null,
    joinedAt: '2025-02-05T08:33:31.258Z',
    isCompleted: false,
    isReviewed: false,
  },
  {
    teamId: '6-6',
    id: 1714,
    type: 'OFFICE_STRETCHING',
    name: '바른 자세 챌린지1',
    dateTime: '2025-02-28T14:00:29.805Z',
    registrationEnd: '2025-02-27T23:59:00.805Z',
    location: '건대입구',
    participantCount: 1,
    capacity: 7,
    image:
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/together-dallaem/1738548924015_office6.jpg',
    createdBy: 1004,
    canceledAt: null,
    joinedAt: '2025-02-06T16:44:36.739Z',
    isCompleted: false,
    isReviewed: false,
  },
];
export default function Gathering() {
  const params = useParams();
  const gatheringId = Number(params.id);

  const [isOwner, setIsOwner] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isParticipated, setIsParticipated] = useState(false);
  const [isFull, setIsFull] = useState(false);

  const {data: gatheringDetail, isError} = useQuery({
    queryKey: gatheringDetailQueryKey.getGatheringDetail(gatheringId),
    queryFn: () => getGatheringDetail(gatheringId),
    staleTime: 0,
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
    const exists = mock.some(item => Number(item.id) === Number(gatheringId));
    setIsParticipated(exists);
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
  }, [userId, gatheringOwner, mock, gatheringDetail]);

  if (isError) {
    console.log('모임 받아오기 실패😞😞');
    return <div>모임을 찾을 수 없습니다</div>;
  }

  return (
    <>
      <div>현재 로그인한 유저 id: {userId}</div>
      <div>모임 id: {gatheringDetail?.id}</div>
      <div>모임 이름: {gatheringDetail?.name}</div>
      <div>모임 owner: {gatheringDetail?.createdBy}</div>
      <div>참여 가능 인원: {gatheringDetail?.capacity}</div>
      <div>현재 참여한 인원: {gatheringDetail?.participantCount}</div>
      <div>{isParticipated ? '이미 참여중임' : '아직 참여안함'}</div>

      <BottomBar
        isLogin={isLogin}
        isOwner={isOwner}
        isParticipated={isParticipated}
        setIsParticipated={setIsParticipated}
        isFull={isFull}
        gatheringId={gatheringDetail?.id}
      />
    </>
  );
}
