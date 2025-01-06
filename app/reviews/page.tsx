"use client"
// 나중에 모든 리뷰 페이지 구현 해야함.
import { useQuery } from "@tanstack/react-query";
import { getReviews } from "../apis/reviews";
import Review from "../components/reviewComponent/review";
import { IReviews } from "../types/reviews";


export default function RivewsPage({ userId, gatheringId }: { userId?: number; gatheringId?: number }) {
    const { data: reviews, isError, isPending } = useQuery<IReviews>({
        queryKey: ["reviews", { userId, gatheringId }],
        queryFn: () => getReviews(userId, gatheringId),
        staleTime: 1 * 60 * 5000, //5분
        gcTime: 60 * 1000 * 10, //10분
    })


    if (isPending) {
        console.log("로딩중...")
        return

    }
    //tanstack 적용 전
    // const [reviews, setReviews] = useState<IReviews["data"]>([])

    // const getReviewsAPI = async () => {
    //     const { data } = await getReviews();
    //     setReviews(data);
    // }

    // useEffect(() => {
    //     getReviewsAPI();
    // }, [])


    return (
        <div>
            {reviews?.data.map((review) => (
                <Review
                    key={review.id}
                    gatheringImg={review.Gathering.image}
                    score={review.score}
                    comment={review.comment}
                    gatheringType={review.Gathering.type}
                    gatheringLocation={review.Gathering.location} userImg={review.User.image}
                    userName={review.User.name}
                    createdAt={review.createdAt} />
            ))}
        </div>
    );
}

