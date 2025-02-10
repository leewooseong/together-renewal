import {GatheringDetailType} from '../../types/gatherings/getGatheringDetail';
import {
  GetJoinedGatherings,
  PostJoinGatheringResponse,
} from '../../types/gatherings/joinedGatherings.types';
import {clientInstance, serverInstance} from '../client';

type ApiResponse<T> = {
  data: T;
  message: string;
};

export const getJoinedGatherings = async (): Promise<GetJoinedGatherings[]> => {
  try {
    const joinedGatherings = await clientInstance.get<ApiResponse<GetJoinedGatherings[]>>({
      path: `/route/token/gatherings/joinedGatherings`,
    });
    return joinedGatherings.data;
  } catch (error) {
    console.error('Error fetching joined gatherings:', error);
    throw error;
  }
};

// export const getJoinedGatherings = async (): Promise<GetJoinedGatherings[]> => {
//   try {
//     const joinedGatherings = await clientInstance.get<GetJoinedGatherings[]>({
//       path: `/route/token/gatherings/joinedGatherings`,
//     });
//     return joinedGatherings;
//   } catch (error) {
//     console.error('Error fetching joined gatherings:', error);
//     throw error;
//   }
// };

export const getJoinedGatheringsInServer = async (
  token: string,
): Promise<GetJoinedGatherings[]> => {
  try {
    const defaultParams = {
      sortBy: 'dateTime',
      sortOrder: 'asc',
    };

    // 쿼리 문자열 생성
    const queryString = new URLSearchParams(
      defaultParams as unknown as Record<string, string>,
    ).toString();

    const joinedGatherings = await serverInstance.get<GetJoinedGatherings[]>({
      path: `/gatherings/joined?${queryString}`,
      token,
    });
    console.log(joinedGatherings);
    return joinedGatherings;
  } catch (error) {
    console.error('Error fetching joined gatherings in server:', error);
    throw error;
  }
};

export const leaveJoinedGatherings = async (gatheringId: number): Promise<void> => {
  try {
    await clientInstance.delete<GetJoinedGatherings[]>({
      path: `/route/token/gatherings/joinedGatherings/${gatheringId}`,
    });
  } catch (error) {
    console.error('Error fetching leave joined gatherings:', error);
    throw error;
  }
};

export const deleteLeaveGathering = async (id: number): Promise<void> => {
  try {
    await clientInstance.delete<GetJoinedGatherings[]>({
      path: `/route/token/gatherings/${id}`,
    });
  } catch (error) {
    console.error('Error fetching leave joined gatherings:', error);
    throw error;
  }
};

export const leaveJoinedGatheringsInServer = async (
  token: string,
  gatheringId: number,
): Promise<void> => {
  try {
    await serverInstance.delete({
      path: `/gatherings/${gatheringId}/leave`,
      token,
    });
  } catch (error) {
    console.error('참여한 모임 삭제 실패: ', error);
    throw error;
  }
};

export const postJoinGathering = async (id: number): Promise<PostJoinGatheringResponse> => {
  try {
    const response = await clientInstance.post<PostJoinGatheringResponse>({
      path: `/route/token/gatherings/${id}`,
      body: {id},
    });

    return response;
  } catch (error) {
    console.error('현재 error 객체:', error);
    throw new Error(error instanceof Error ? error.message : '모임 참여 요청 실패');
  }
};

export const postJoinGatheringInServer = async (
  token: string,
  id: number,
): Promise<PostJoinGatheringResponse> => {
  console.log(`postJoinGatheringInServer 서버 요청 시작 - ID: ${id}`);
  try {
    const response = await serverInstance.post<PostJoinGatheringResponse>({
      path: `/gatherings/${id}/join`,
      token,
    });
    console.log(`postJoinGatheringInServer 요청 성공 - ID: ${id}, 응답:`, response);
    return response;
  } catch (error) {
    console.error(`postJoinGatheringInServer 요청 실패 - ID: ${id}`, error);
    throw new Error(error instanceof Error ? error.message : '모임 참여 요청 중 오류 발생');
  }
};

export const getGatheringDetail = async (id: number): Promise<GatheringDetailType> => {
  try {
    const response = await clientInstance.get<GatheringDetailType>({
      path: `/route/gatherings/${id}`,
    });
    return response;
  } catch (error) {
    console.error('현재 error 객체:', error);
    throw new Error(error instanceof Error ? error.message : '모임 상세 정보 가져오기 실패');
  }
};

export const putCancelGathering = async (id: number): Promise<{message: string}> => {
  try {
    const response = await clientInstance.put<{message: string}>({
      path: `/route/token/gatherings/${id}`,
      body: {id},
    });
    console.log('클라이언트에서 받은 모임 취소 응답:', response);
    return response;
  } catch (error) {
    console.error('현재 error 객체:', error);
    throw new Error(error instanceof Error ? error.message : '모임 취소 실패');
  }
};

export const putCancelGatheringInServer = async (
  token: string,
  id: number,
): Promise<{message: string}> => {
  console.log(`putCancelGatheringInServer 서버 요청 시작 - ID: ${id}`);
  try {
    const response = await serverInstance.put<{message: string}>({
      path: `/gatherings/${id}/cancel`,
      token,
    });
    console.log(`putCancelGatheringInServer 요청 성공 - ID: ${id}`, response);
    return response; // ✅ 응답 메시지 반환
  } catch (error) {
    console.error(`putCancelGatheringInServer 요청 실패 - ID: ${id}`, error);
    throw new Error(error instanceof Error ? error.message : '모임 참여 요청 중 오류 발생');
  }
};
