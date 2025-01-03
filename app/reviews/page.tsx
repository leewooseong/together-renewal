"use client"

import { useEffect, useState } from "react";
import { getReviews } from "../apis/reviews";
import Review from "../components/reviewComponent/review";
import { IReviews } from "../types/reviews";

export default function RivewsPage() {
    const [reviews, setReviews] = useState<IReviews["data"]>([])

    const getReviewsAPI = async () => {
        const { data } = await getReviews();
        setReviews(data);
    }

    useEffect(() => {
        getReviewsAPI();
    }, [])


    return (
        <div>
            {reviews.map((review) => (
                <Review
                    key={review.id}
                    gatheringImg={review.Gathering.image}
                    score={review.score}
                    comment={review.comment}
                    gatheringType={review.Gathering.type} gatheringLocation={review.Gathering.location} userImg={review.User.image}
                    userName={review.User.name}
                    createdAt={review.createdAt} />
            ))}
        </div>
    );
}

