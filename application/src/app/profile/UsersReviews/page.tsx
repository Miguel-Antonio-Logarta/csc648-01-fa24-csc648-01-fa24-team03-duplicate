"use client";

import Unauthorized from "@/app/components/Unauthorized";
import { useSession } from "next-auth/react";
import useGetUsersReviews from "../../hooks/useGetUsersReviews";
import { useEffect } from "react";
import ReviewCard from "@/app/locationInfo/ReviewCard";
import Paper from '../../locationInfo/paper_bg.svg';

interface Review {
    id: string;
    location: {
        id: string;
        name: string;
        category: string;
        imageWebLink: string;
    };
    rating: number;
    busynessStatus: number;
    content: string;
    creationDate: string;
}

const Page = () => {
    const { data: session, status } = useSession();
    const { usersReviews, fetchUsersReviews } = useGetUsersReviews();

    useEffect(() => {
        if (session) {
            fetchUsersReviews(session.user.id);
        }

        // DO NOT INCLUDE fetchUsersReviews IN DEPENDENCIES | It will cause infinite loop
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [session]);

    if (status === "loading") return;
    if (status === 'unauthenticated') return <Unauthorized />

    return (
        <div className="flex justify-center items-center p-5" style={{ background: 'linear-gradient(to right, #FCE0D3, #E89CA8)' }}>

            <div className="p-24 w-full max-w-3xl" style={{
                backgroundImage: `url(${Paper.src})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}>
                <h1 className="text-2xl font-bold text-center mb-5 bg-cherry-blossom-pink p-2 rounded-md shadow-md">
                    Your Reviews
                </h1>
                {usersReviews.length > 0 ? (
                    usersReviews.map((review: Review) => (
                        <ReviewCard
                            key={review.id}
                            author={review.location.name}
                            rating={review.rating}
                            review={review.content}
                            creationDate={review.creationDate}
                        />
                    ))
                ) : (
                    <p className="text-center text-gray-500">You have no reviews yet.</p>
                )}
            </div>
        </div>

    );
}

export default Page;