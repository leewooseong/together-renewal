import {PageType, RequestType} from '../types/server.types';

export const isPageType = (typeName: RequestType): typeName is PageType => {
  if (typeName !== 'api' && typeName !== 'tokenApi') return true;
  return false;
};
