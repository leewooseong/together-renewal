import {GetJoinedGatherings} from '../../types/gatherings/joinedGatherings.types';
import {clientInstance, serverInstance} from '../client';

export const getJoinedGatherings = async (): Promise<GetJoinedGatherings[]> => {
  try {
    const joinedGatherings = await clientInstance.get<GetJoinedGatherings[]>({
      path: `/route/token/gatherings/joinedGatherings`,
    });

    return joinedGatherings;
  } catch (error) {
    console.error('Error fetching joined gatherings:', error);
    throw error;
  }
};

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
