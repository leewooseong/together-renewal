import {NextResponse} from 'next/server';

import {serverInstance} from '../../apis/client';
import {SORT_BY} from '../../constants/commonConstants';
import {GetGatherings} from '../../types/gatherings/getGatherings.types';

export async function GET(req: Request) {
  try {
    const {searchParams} = new URL(req.url);

    const rawSortBy = searchParams.get('sortBy');
    const sortBy: (typeof SORT_BY)[number] | undefined =
      rawSortBy && SORT_BY.includes(rawSortBy as (typeof SORT_BY)[number])
        ? (rawSortBy as (typeof SORT_BY)[number])
        : undefined;

    const rawSortOrder = searchParams.get('sortOrder');
    const sortOrder: 'asc' | 'desc' | undefined =
      rawSortOrder === 'desc' || rawSortOrder === 'asc' ? rawSortOrder : undefined;

    const queryString = new URLSearchParams(
      Object.entries({
        sortBy,
        sortOrder,
        limit: searchParams.has('limit') ? Number(searchParams.get('limit')) : 10,
        offset: searchParams.has('offset') ? Number(searchParams.get('offset')) : 0,
      })
        .filter(([, value]) => value !== undefined)
        .map(([key, value]) => [key, String(value)]),
    ).toString();

    const data = await serverInstance.get<GetGatherings[]>({
      path: `/gatherings?${queryString}`,
    });

    return NextResponse.json(data, {status: 200});
  } catch (error) {
    console.error('API 호출 실패:', error);
    return NextResponse.json({message: '데이터를 가져올 수 없습니다.'}, {status: 500});
  }
}
