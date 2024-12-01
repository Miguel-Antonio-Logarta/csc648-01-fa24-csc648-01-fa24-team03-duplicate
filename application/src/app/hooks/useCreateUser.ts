import { useState } from 'react';
import toast from 'react-hot-toast';

/**
 * @Notes - Use this hook in the frontend to create a user. (Client Component)
 * @param {any} formData - The user data to create.
 * @description - A custom hook that creates a user.
 * @returns {Object} - Returns an object containing the createUser function and a loading state.
 */
const useCreateUser = () => {
    const [loading, setLoading] = useState(false);

    /**
     * @param formData - The user data to create.
     * @description - Creates a user.
     * @returns - Returns a boolean indicating whether the user was created successfully.
     */
    const createUser = async (formData: any) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            if(data.error) throw new Error(data.error);
            toast.success('User created successfully!');
            return true;
        } catch(err: any) {
            toast.error(err.message);
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { createUser, loading };
}

export default useCreateUser;