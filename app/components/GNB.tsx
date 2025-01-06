export default function GNB() {
  return (
    <div className="flex items-center justify-center w-full h-[60px] bg-orange-600 mx-auto">
      <div className="flex w-full max-w-[1200px] items-center justify-between text-white">
        <ul className="flex gap-3">
          <li>
            <a href="">같이달램</a>
          </li>
          <li>
            <a href="">모임 찾기</a>
          </li>
          <li>
            <a href="">찜한 모임</a>
          </li>
          <li>
            <a href="">모든 리뷰</a>
          </li>
        </ul>
        <a href="">로그인</a>
      </div>
    </div>
  );
}
