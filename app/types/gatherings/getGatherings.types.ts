import {LOCATIONS, SORT_BY, TYPES} from '../../constants/commonConstants';

export type GetGatherings = {
  id: number; // 모임 ID
  type: (typeof TYPES)[number]; // 모임 종류
  name: string; // 모임 이름
  dateTime: string; // 모임 날짜
  registrationEnd: string; // 모임 모집 마감일
  location: (typeof LOCATIONS)[number]; // 모임 위치
  participantCount: number; // 참여 인원
  capacity: number; // 모임 정원
  image: string; // 모임 대표 이미지
  createdBy: number; // 모임 생성자 ID
  canceledAt?: string | null; // 모임 취소일
};

export type GatheringParams = {
  id?: string;
  type?: (typeof TYPES)[number];
  location?: (typeof LOCATIONS)[number];
  createdBy?: number;
  sortBy?: (typeof SORT_BY)[number];
  sortOrder?: 'asc' | 'desc';
  limit?: number; // 한 번에 조회할 모임 수 (기본값 10)
  offset?: number; // 조회 시작 위치 (기본값 0)
};
