import { useState } from 'react';
import { User } from '@prisma/client';


/**
 * @Notes - Use this hook in the frontend if you want to fetch a specific user's information from the backend (MUST BE A CLIENT COMPONENT)
 * @params - userId: string
 * @description - Custom hook to fetch a specific user's information
 * @returns {specificUserInfo} - Object containing the specific user's information
 */
const useGetSpecificUserInfo = () => {
  const [specificUserInfo, setSpecificUserInfo] = useState<User>();
  const [loading, setLoading] = useState(false);

  const fetchSpecificUserInfo = async (userId: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/users/${userId}`);
      const data = await res.json();
      if(data.error) throw new Error(data.error);
      setSpecificUserInfo(data);
    } catch (err: any) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { specificUserInfo, fetchSpecificUserInfo, loading };
};

export default useGetSpecificUserInfo;