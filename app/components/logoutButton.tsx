'use client';

import {useClearAuth} from '../hooks/useAuth';

function LogoutButton() {
  const {clearAuth} = useClearAuth();

  const handleLogout = async () => {
    await clearAuth();
  };

  return <button onClick={handleLogout}>로그아웃</button>;
}

export default LogoutButton;
