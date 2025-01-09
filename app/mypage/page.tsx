'use client';

import {useEffect, useState} from 'react';

import getUserInfoApi from '../apis/getUserInfoApi';
import joinedGatheringsApi from '../apis/joinedGatheringsApi';
import MyPageCard from '../components/mypageComponent/myPageCard';
import ProfileLayout from '../components/profileComponent/profileLayout';
import Review from '../components/reviewComponent/review';
import getUserIdFromToken from '../utils/decodeTokenUtil';

export default function myPage() {
  const [userId, setUserId] = useState<number>(0);
  const [userInfo, setUserInfo] = useState<IGetUserInfo>();
  const [joinedGatherings, setJoinedGatherings] = useState<IGetJoinedGatherings[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [activeTab, setActiveTab] = useState<'myGatherings' | 'myReviews' | 'createdGatherings'>(
    'myGatherings',
  );
  const [reviewed, setReviewed] = useState(false);

  useEffect(() => {
    /// ////////// 인증 만료 or 비정상적 접근 시 재인증 진행
    // 인증 성공 -> 사용자 정보 불러옴
    // 인증 실패 -> 로그인 화면으로 이동
    const checkLogin = async () => {
      try {
        setUserId(Number(getUserIdFromToken()));
        console.log('로그인된 유저 ID:', userId);

        const fetchUserInfo = await getUserInfoApi();
        setUserInfo(fetchUserInfo);
      } catch (err) {
        if (err instanceof Error) {
          console.error('오류: ', err.message);
        } else {
          console.error('오류: ', err);
        }
        window.location.href = '/login';
      }
    };

    const fetchData = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const data = await joinedGatheringsApi({sortBy: 'dateTime'});

        const now = new Date();

        // 정렬 로직
        const sortedData = data.sort((a, b) => {
          // 취소된 모임
          if (a.canceledAt && !b.canceledAt) return 1;
          if (!a.canceledAt && b.canceledAt) return -1;

          // 참여 시간이 지난 모임
          const aIsPast = new Date(a.dateTime) < now;
          const bIsPast = new Date(b.dateTime) < now;
          if (aIsPast && !bIsPast) return 1;
          if (!aIsPast && bIsPast) return -1;

          // 참여 완료 여부
          if (a.isCompleted && !b.isCompleted) return 1;
          if (!a.isCompleted && b.isCompleted) return -1;

          return 0;
        });

        setJoinedGatherings(sortedData);
      } catch (error) {
        console.error('데이터를 불러오는 중 에러 발생:', error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    checkLogin();
    if (userId) {
      fetchData();
    }
  }, [userId]);

  if (isLoading) {
    return <div className="text-center">로딩 중...</div>;
  }

  if (isError) {
    return <div className="text-center text-orange-600">데이터를 불러오는 데 실패했습니다.</div>;
  }

  const tabOptions = [
    {key: 'myGatherings', label: '나의 모임'},
    {key: 'myReviews', label: '나의 리뷰'},
    {key: 'createdGatherings', label: '내가 만든 모임'},
  ];

  const renderButton = () => {
    if (activeTab !== 'myReviews') {
      return null;
    }

    return (
      <div className="gap-[8px] flex w-[228px] h-[40px] mt-[16px] ml-[24px]">
        <button
          type="button"
          className={`w-[124px] h-[40px] rounded-xl font-medium text-xs ${
            !reviewed ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-900'
          }`}
          onClick={() => setReviewed(false)}
        >
          작성 가능한 리뷰
        </button>
        <button
          type="button"
          className={`w-[96px] h-[40px] rounded-xl font-medium text-xs ${
            reviewed ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-900'
          }`}
          onClick={() => setReviewed(true)}
        >
          작성한 리뷰
        </button>
      </div>
    );
  };

  const renderContents = () => {
    const getComment = () => {
      switch (activeTab) {
        case 'myGatherings':
          return '신청한 ';
        case 'myReviews':
          return '리뷰 작성 가능한 ';
        case 'createdGatherings':
          return '아직 만든 ';
        default:
          return '';
      }
    };

    const filteredGatherings = (() => {
      if (!joinedGatherings || joinedGatherings.length === 0) {
        return [];
      }

      switch (activeTab) {
        case 'myGatherings':
          return joinedGatherings;
        case 'myReviews':
          return joinedGatherings.filter(
            gathering => gathering.isCompleted && gathering.isReviewed === reviewed,
          );
        case 'createdGatherings':
          return joinedGatherings.filter(gathering => gathering.createdBy === userId);
        default:
          return [];
      }
    })();

    if (activeTab === 'myReviews' && reviewed === true) {
      return (
        /// ///////////// 작성한 리뷰 없으면 아직 작성한 리뷰가 없어요 출력
        <div className="w-full flex flex-col gap-[24px]">
          <Review
            gatheringImg=""
            score={2}
            comment="좋아용"
            gatheringType="test11111"
            gatheringLocation="을지로3가"
            userImg=""
            userName="testUser"
            createdAt="2025-01-10T14:00:00"
          />
        </div>
      );
    }

    if (filteredGatherings.length === 0) {
      return (
        <div className="w-[220px] h-[20px] absolute top-[180px] left-1/2 translate-x-[-50%]">
          <p className="text-gray-500 font-medium text-sm">{getComment()}모임이 없어요.</p>
        </div>
      );
    }

    return (
      Array.isArray(filteredGatherings) &&
      filteredGatherings.map(joinedGathering => (
        <MyPageCard
          key={joinedGathering.id}
          {...joinedGathering}
          isMyGathering={activeTab === 'myGatherings'}
        />
      ))
    );
  };

  return (
    <div className="w-full max-w-[1200px] min-w-[360px] bg-gray-50 flex flex-col items-center justify-center py-[24px] sm:px-[24px] px-[16px]">
      <h2 className="w-full max-w-[996px] font-semibold text-gray-900 text-left text-2xl">
        마이 페이지
      </h2>
      <div className="w-full max-w-[996px] mt-[24px]">
        {userInfo && <ProfileLayout {...userInfo} />}
      </div>
      <div className="bg-white mt-[30px] flex flex-col w-full min-w-sm max-w-[996px] items-start justify-start border-t-2 border-gray-900 sm:min-h-[720px]">
        <div className="gap-[12px] h-[34px] w-[300px] flex text-gray-400 ml-[24px] mt-[24px]">
          {tabOptions.map(tab => (
            <button
              type="button"
              key={tab.key}
              className={`text-sm font-semibold ${
                activeTab === tab.key ? 'text-gray-900 border-b-2 border-gray-900' : 'text-gray-400'
              }`}
              onClick={() => setActiveTab(tab.key as typeof activeTab)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        {renderButton()}
        <div className="w-full flex flex-col items-center justify-center gap-[24px] px-[24px] mt-[24px] relative">
          {renderContents()}
        </div>
      </div>
    </div>
  );
}
