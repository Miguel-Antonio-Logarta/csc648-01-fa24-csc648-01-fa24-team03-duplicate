import React from 'react';
import ReviewCard from './ReviewCard';

interface Review {
  id: string;
  rating: number;
  content: string;
  creationDate: string;
  userId: string;
}

interface ReviewProps {
  reviews: Review[];
}

const ReviewSection = async ({ reviews } : ReviewProps) => {
  
  console.log(`[INFO]: Number of reviews: ${reviews.length}`);
  
  return (
    <section>
      <h2 className="text-xl font-bold whitespace-nowrap text-stone-600 tracking-[2px] mb-6">Reviews</h2>
      {reviews.map((review, index) => (
        <ReviewCard key={index} author={review.userId} rating={review.rating} review={review.content} />
      ))}
    </section>
  );
};

export default ReviewSection;