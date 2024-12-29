import {Metadata, NextPage} from 'next';
import ReactQueryProviders from '../components/queryProvider';

export const metadata: Metadata = {
  title: 'React Query 예제 페이지',
  description: 'React Query를 사용하는 페이지 또는 컴포넌트는 다음과 같이 구성합니다.',
};

const QueryExamplePage: NextPage = () => {
  return (
    <ReactQueryProviders>
      <h1>리액트 쿼리 테스트 페이지</h1>
      <p>해당 영역에서 useQuery문을 사용해서 서버로부터 데이터를 fetch 합니다.</p>
    </ReactQueryProviders>
  );
};

export default QueryExamplePage;
