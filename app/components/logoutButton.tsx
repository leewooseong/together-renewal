'use client';

import {useClearAuth} from '../hooks/useAuth';

export function LogoutButton() {
  const {clearAuth} = useClearAuth();

  const handleLogout = async () => {
    await clearAuth();
  };

  return (
    <button type="button" onClick={handleLogout}>
      로그아웃
    </button>
  );
}
