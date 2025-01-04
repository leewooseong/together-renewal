import {useAtom} from 'jotai';
import {tokenWithStorageStore} from '../store/client-states/useUserStore';

export function useLogout() {
  const [tokenWithStorage, setTokenWithStorage] = useAtom(tokenWithStorageStore);

  const logout = () => {
    tokenWithStorage && setTokenWithStorage(null);
  };

  return {logout};
}
