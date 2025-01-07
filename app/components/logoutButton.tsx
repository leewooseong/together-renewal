'use client';

import { useLogout } from '../hooks/useAuth';

function LogoutButton() {
  const {logout} = useLogout();

  const handleLogout = async () => {
    await logout();
  };

  return <button onClick={handleLogout}>로그아웃</button>;
}

export default LogoutButton;
