'use client';
import { useState, useEffect } from 'react';
import RatingSelector from '../RatingSelector';
import ImageAttachment from '../ImageAttachment';
import useGetSpecificLocation from '../../hooks/useGetSpecificLocation';
import { useSession } from "next-auth/react";
import Unauthorized from "../../components/Unauthorized";
import useCreateReview from '../../hooks/useCreateReview';
import { useRouter } from 'next/navigation';

interface SpecificLocation {
    id: string;
    name: string;
}

const Page = ({ params }: { params: { id: string } }) => {
    const { data: session, status } = useSession();
    const { id } = params;
    const { specificLocation, fetchSpecificLocation, loading } = useGetSpecificLocation();
    const { createReview } = useCreateReview();
    const location: SpecificLocation = specificLocation || { id: '', name: '' };
    const [rating, setRating] = useState('1');
    const [review, setReview] = useState('');
    const router = useRouter();

    // Handle loading state correctly
    useEffect(() => {
        if (status === 'loading') return; // Early return if loading
        if (status === 'unauthenticated') return; // Early return if unauthenticated
        fetchSpecificLocation(id);
    }, [id, status]); // Include status in dependencies

    const handleRatingChange = (newRating: string) => {
        setRating(newRating);
    }
    const handleReviewChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setReview(e.target.value);
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!review) return;

        //console.log(`{ location.id: ${location.id}, review: ${review}, rating: ${parseInt(rating)}, session: ${session} }`);

        await createReview(location.id, review, parseInt(rating), session);

        router.push(`/locationInfo/${location.id}`);
    }

    if (status === 'loading') return;

    if (status === 'unauthenticated') {
        return <Unauthorized />;
    }

    return (
        <form onSubmit={handleSubmit} className="flex overflow-hidden flex-col gap-[30px] items-start mx-auto px-20 py-11 text-xl font-bold border-rose-300 border-solid bg-[rgb(255,250,228)] border-[3px] max-w-[844px] rounded-[50px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] text-stone-600 max-md:px-5">
            <div className='m-xlarge p-medium mx-auto'>
                <header className="font-josefin text-3xl p-2 tracking-[3.2px] max-md:max-w-full">
                    {location.name}
                </header>
                <RatingSelector onRatingChange={handleRatingChange} />
                <textarea
                    className="font-josefin flex shrink-0 self-stretch mt-9 p-smed w-[650px] bg-gray rounded-[8px] border border-rose-300 border-solid border-t- h-[229px]"
                    aria-label="Write your review"
                    onChange={handleReviewChange}
                />
                <ImageAttachment />
                <div className="flex gap-2 justify-end p-smed mt-large -mb-2 text-2xl text-center whitespace-nowrap text-stone-50 tracking-[2.4px]">
                    <button className='font-shantell bg-sage h-12 text-white p-large px-3 rounded-[100px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] max-md:px-5'>cancel</button>
                    <button className='font-shantell bg-blue-200 text-white px-3 rounded-[100px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] max-md:px-5'>submit!</button>
                </div>
            </div>
        </form>
    );
};

export default Page;