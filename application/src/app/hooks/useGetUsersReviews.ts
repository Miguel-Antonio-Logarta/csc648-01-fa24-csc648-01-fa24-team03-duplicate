import { useState, useEffect } from 'react';


/**
 * @Notes - Use this hook in the frontend if you want to fetch all reviews for a specific user from the backend (MUST BE A CLIENT COMPONENT)
 * @pararms - userId: string
 * @description - Custom hook to fetch all reviews for a specific user  
 * @returns {usersReviews} - Array of reviews for a specific user
 */
const useGetUsersReviews = () => {
  const [usersReviews, setUsersReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUsersReviews = async (userId: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/reviews/userReviews/${userId}`, {
        cache: 'no-store'
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setUsersReviews(data);
    } catch (err: any) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { usersReviews, fetchUsersReviews, loading };

};

export default useGetUsersReviews;