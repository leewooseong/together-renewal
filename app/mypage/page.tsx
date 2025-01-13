'use client';

import {useEffect, useState} from 'react';

import joinedGatheringsApi from '../apis/joinedGatheringsApi';
import MyPageCard from '../components/mypageComponent/myPageCard';
import ProfileLayout from '../components/profileComponent/profileLayout';
import getUserIdFromToken from '../utils/decodeTokenUtil';

export default function MyPage() {
  const [userId, setUserId] = useState<number | null>(null);
  const [joinedGatherings, setJoinedGatherings] = useState<IGetJoinedGatherings[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [activeTab, setActiveTab] = useState<'myGatherings' | 'myReviews' | 'createdGatherings'>(
    'myGatherings',
  );
  const [reviewed, setReviewed] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const id = getUserIdFromToken();
        console.log('로그인된 유저 ID:', id);
        setUserId(id);
      } catch (err) {
        console.error('인증 실패:', err);
      }
    };

    checkLogin();
  }, []);

  useEffect(() => {
    if (userId === null) return; // userId가 null인 경우 API 호출 방지

    const fetchData = async () => {
      setIsLoading(true);
      try {
        setIsError(false);
        const data = await joinedGatheringsApi({sortBy: 'dateTime', sortOrder: 'asc'});

        const now = new Date();
        const sortedData = data.sort((a, b) => {
          if (a.canceledAt && !b.canceledAt) return -1;
          if (!a.canceledAt && b.canceledAt) return 1;

          const aIsPast = new Date(a.dateTime) < now;
          const bIsPast = new Date(b.dateTime) < now;
          if (aIsPast && !bIsPast) return -1;
          if (!aIsPast && bIsPast) return 1;

          if (a.isCompleted && !b.isCompleted) return -1;
          if (!a.isCompleted && b.isCompleted) return 1;

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

    fetchData();
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
      <div className="ml-[24px] mt-[16px] flex h-[40px] w-[228px] gap-[8px]">
        <button
          type="button"
          className={`h-[40px] w-[124px] rounded-xl text-xs font-medium ${
            !reviewed ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-900'
          }`}
          onClick={() => setReviewed(false)}
        >
          작성 가능한 리뷰
        </button>
        <button
          type="button"
          className={`h-[40px] w-[96px] rounded-xl text-xs font-medium ${
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

    if (filteredGatherings.length === 0) {
      return (
        <div className="absolute left-1/2 top-[180px] h-[20px] w-[220px] translate-x-[-50%]">
          <p className="text-sm font-medium text-gray-500">{getComment()}모임이 없어요.</p>
        </div>
      );
    }

    return filteredGatherings.map(joinedGathering => (
      <MyPageCard
        key={joinedGathering.id}
        {...joinedGathering}
        isMyGathering={activeTab === 'myGatherings'}
      />
    ));
  };

  return (
    <div className="flex w-full min-w-[360px] max-w-[1200px] flex-col items-center justify-center bg-gray-50 px-[16px] py-[24px] sm:px-[24px]">
      <h2 className="w-full max-w-[996px] text-left text-2xl font-semibold text-gray-900">
        마이 페이지
      </h2>
      <div className="mt-[24px] w-full max-w-[996px]">
        <ProfileLayout />
      </div>
      <div className="min-w-sm mt-[30px] flex w-full max-w-[996px] flex-col items-start justify-start border-t-2 border-gray-900 bg-white sm:min-h-[720px]">
        <div className="ml-[24px] mt-[24px] flex h-[34px] w-[300px] gap-[12px] text-gray-400">
          {tabOptions.map(tab => (
            <button
              type="button"
              key={tab.key}
              className={`text-sm font-semibold ${
                activeTab === tab.key ? 'border-b-2 border-gray-900 text-gray-900' : 'text-gray-400'
              }`}
              onClick={() => setActiveTab(tab.key as typeof activeTab)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        {renderButton()}
        <div className="relative mt-[24px] flex w-full flex-col items-center justify-center gap-[24px] px-[24px]">
          {renderContents()}
        </div>
      </div>
    </div>
  );
}
