import React from 'react';
import ReviewCard from './ReviewCard';

const reviews = [
  {
    author: "Susie Jane",
    rating: 5,
    review: "Great little café with a cozy vibe! The coffee is fantastic, and the staff is super friendly. Perfect spot to relax or get some work done. Definitely worth a visit!"
  },
  {
    author: "Peter Parker",
    rating: 4,
    review: "Great little café with a cozy vibe! The coffee is fantastic, and the staff is super friendly. Perfect spot to relax or get some work done. Definitely worth a visit!"
  }
];

const ReviewSection = () => {
  return (
    <section>
      <h2 className="text-xl font-bold whitespace-nowrap text-stone-600 tracking-[2px] mb-6">Reviews</h2>
      {reviews.map((review, index) => (
        <ReviewCard key={index} {...review} />
      ))}
    </section>
  );
};

export default ReviewSection;