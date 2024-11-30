import { Session } from 'next-auth';
import { useState } from 'react';
import toast from 'react-hot-toast';

/**
 * @Notes - Use this hook in the frontend to edit a location.
 * @param {any} formData - The data used to edit a location.
 * @param {Session} session - The session object.
 * @description - A custom hook that edits a location.
 * @returns {Object} - Returns an object containing the editLocation function and a loading state.
 */
const useEditLocation = () => {
  const [loading, setLoading] = useState(false);

  /**
   * @param locationId id of location to edit
   * @param formData form data to edit location
   * @param session used to check if user is admin
   */
  const editLocation = async (locationId: string, formData: any, session: Session) => {
    setLoading(true);
    try {
      if(!session || session.user.role !== 'ADMIN') throw new Error('Unauthorized');
      const res = await fetch(`/api/locations/${locationId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if(data.error) throw new Error(data.error);
      toast.success('Location updated successfully!');
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { editLocation, loading };
};

export default useEditLocation;