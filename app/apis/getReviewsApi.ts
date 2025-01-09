// import {BASE_API_URL, LOCATIONS, SORT_BY, TYPES} from '../constants/commonConstants';
// import {IReviews} from '../types/reviews';
// import fetchWithToken from '../utils/fetchWithTokenUtil';
// import validationUtil from '../utils/validationUtil';

// export default async function GetReviewsApi(filters: {
//   gatheringId?: number;
//   userId?: number;
//   type?: (typeof TYPES)[number];
//   location?: (typeof LOCATIONS)[number];
//   date?: string;
//   registrationEnd?: string;
//   sortBy?: (typeof SORT_BY)[number];
//   sortOrder?: 'asc' | 'desc';
//   limit?: number;
//   offset?: number;
// }): Promise<IReviews> {
//   const queryParams = new URLSearchParams();

//   if (filters.sortBy) {
//     validationUtil(filters.sortBy, SORT_BY, 'sortBy');
//   }
//   if (filters.sortOrder) {
//     validationUtil(filters.sortOrder, ['asc', 'desc'], 'sortOrder');
//   }
//   if (filters.location) {
//     validationUtil(filters.location, LOCATIONS, 'location');
//   }
//   if (filters.type) {
//     validationUtil(filters.type, TYPES, 'type');
//   }

//   Object.entries(filters).forEach(([key, value]) => {
//     if (value !== undefined) {
//       queryParams.append(key, String(value));
//     }
//   });

//   const req = `${BASE_API_URL}/reviews${queryParams ? `?${queryParams.toString()}` : ''}`;

//   return fetchWithToken(req, {method: 'GET'});
// }
