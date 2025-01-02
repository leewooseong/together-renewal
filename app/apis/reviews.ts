import {IReviews} from '../types/reviews';

const BASE_URL = 'https://fe-adv-project-together-dallaem.vercel.app/6-6/reviews';

export async function getReviews(): Promise<IReviews> {
  const response = await fetch(BASE_URL);
  return response.json();
}
