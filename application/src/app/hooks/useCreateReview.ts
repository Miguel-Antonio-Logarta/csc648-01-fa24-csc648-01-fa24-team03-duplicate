import { useState } from 'react';


/**
 * @Notes - Use this hook in the frontend to create a review for a location.
 * @param {string} locationId - The ID of the location to create a review for.
 * @param {string} content - The comment to create.
 * @param {number} rating - The rating to give the location.
 * @param {any} session - The session object.
 * @returns {Object} - Returns an object containing the createReview function and a loading state.
 * @description - A custom hook that creates a review for a location.
 * @returns {Object} - Returns an object containing the createReview function and a loading state.
 */
const useCreateReview = () => {
    const [loading, setLoading] = useState(false);

    const createReview = async (locationId: string, content: string, rating: number, session: any) => {
        setLoading(true);

        // user not logged in
        if (!session) return;

        try {
            const res = await fetch(`/api/reviews/createReview/${locationId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    content: content,
                    rating: rating,
                }),
            });

            const data = await res.json();
            if(data.error) throw new Error(data.error);

            // TODO: Remove this alert in production
            // could use a react toast notification library here
            // this should be removed in production
            alert('Review created successfully!');
        } catch(error: any) {
            
            // TODO: Remove this alert in production
            // could use a react toast notification library here
            // this should be removed in production
            alert(error.message);
            return;
        }
    }

    return { createReview, loading };
};

export default useCreateReview;