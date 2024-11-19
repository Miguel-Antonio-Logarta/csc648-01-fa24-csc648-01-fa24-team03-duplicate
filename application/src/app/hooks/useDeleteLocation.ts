import { useState } from "react";
import toast from 'react-hot-toast';

/**
 * @Auth - Required (Admin)
 * @Notes - Use this hook in the frontend to delete a location.
 * @params - locationId - The id of the location to delete.
 * @description - This hook is used to delete a location from the database.
 * @returns - Returns a function to delete a location and a loading state.
 */
const useDeleteLocation = () => {
    const [loading, setLoading] = useState(false);

    const deleteLocation = async (locationId: string, session: any) => {
        setLoading(true);
        try {
            if(!session || session.user.role !== 'ADMIN') throw new Error('Unauthorized');
            const res = await fetch(`/api/locations/${locationId}`, {
                method: 'DELETE',
            })
            const data = await res.json();
            if(data.error) throw new Error(data.error);
            toast.success('Location deleted successfully!');
            window.location.reload();
        } catch(err: any) {
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    }

    return { deleteLocation, loading };
};

export default useDeleteLocation;