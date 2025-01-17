import {Metadata} from 'next';
import {cookies} from 'next/headers';

import {getUserInfoInServer} from '../apis/user/userApi';
import {AUTH_TOKEN} from '../constants/auth';

export const metadata: Metadata = {
  title: '서비스 명',
  description: '서비스 메인 페이지 설명',
};

export default async function Home() {
  try {
    const token = cookies().get(AUTH_TOKEN);
    const userInfoData = await getUserInfoInServer(token?.value);
    console.log(userInfoData);
  } catch (error) {
    console.log(error);
  }
  return (
    <div>
      <p>메인 페이지</p>
    </div>
  );
}
