import { useState } from 'react';
import toast from 'react-hot-toast';

/**
 * @Notes - Use this hook in the frontend to create a location.
 * @param {any} formData - The data to create a location.
 * @param {any} session - The session object.
 * @description - A custom hook that creates a location.
 * @returns {Object} - Returns an object containing the createLocation function and a loading state.
 */
const useCreateLocation = () => {
    const [loading, setLoading] = useState(false);

    const createLocation = async (formData: any, session: any) => {
        setLoading(true);
        try {
            if(!session || session.user.role !== 'ADMIN') throw new Error('Unauthorized');
            const res = await fetch(`/api/locations`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            if(data.error) throw new Error(data.error);
            toast.success('Location created successfully!');
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { createLocation, loading };
};

export default useCreateLocation;