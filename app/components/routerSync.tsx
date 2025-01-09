'use client';

import {useEffect} from 'react';

import {AUTH_ERROR_EVENT} from '../constants/event';
import useClearAuth from '../hooks/useAuth';

function RouterSync() {
  const {clearAuth} = useClearAuth();

  const handleAuthError = async () => {
    await clearAuth();
  };

  useEffect(() => {
    window.addEventListener(AUTH_ERROR_EVENT, handleAuthError);

    return () => {
      window.removeEventListener(AUTH_ERROR_EVENT, handleAuthError);
    };
  }, [clearAuth]);

  return null;
}

export default RouterSync;
