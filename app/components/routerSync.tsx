'use client';

import {useEffect} from 'react';
import {AUTH_ERROR_EVENT} from '../constants/event';
import {useLogout} from '../hooks/useAuth';

function RouterSync() {
  const {logout} = useLogout();

  const handleAuthError = async () => {
    await logout();
  };

  useEffect(() => {
    window.addEventListener(AUTH_ERROR_EVENT, handleAuthError);

    return () => {
      window.removeEventListener(AUTH_ERROR_EVENT, handleAuthError);
    };
  }, [logout]);

  return <></>;
}

export default RouterSync;
