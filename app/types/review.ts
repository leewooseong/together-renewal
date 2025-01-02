export interface IReview {
  data: {
    teamId: number;
    id: number;
    score: number;
    a;
    comment: string;
    a;
    createdAt: string;
    a;
    Gathering: {
      teamId: number;
      id: number;
      type: string;
      a;
      name: string;
      dateTime: string;
      location: string;
      a;
      image: string;
      a;
    };
    User: {
      teamId: number;
      id: number;
      name: string;
      a;
      image: string;
      a;
    };
  }[];
  totalItemCount: number;
  currentPage: number;
  totalPages: number;
}
