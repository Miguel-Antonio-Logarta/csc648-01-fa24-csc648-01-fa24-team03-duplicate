import { useState } from 'react';

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

        // user not logged in or is not an admin
        if (!session || session?.user.role !== 'ADMIN') return;

        try {
            const res = await fetch(`/api/locations`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            if(data.error) throw new Error(data.error);
            
            // TODO: Remove this alert in production
            // could use a react toast notification library here
            // this should be removed in production
            alert('Location created successfully!');
        } catch (error: any) {

            // TODO: Remove this alert in production
            // could use a react toast notification library here
            // this should be removed in production
            alert(error.message);
            return;
        }
    };

    return { createLocation, loading };
};

export default useCreateLocation;