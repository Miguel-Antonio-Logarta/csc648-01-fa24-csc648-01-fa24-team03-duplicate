import { useState } from 'react';
import { toast } from 'react-hot-toast'

/**
 * @Notes - Use this hook in the frontend if you want to update the user data in the database (MUST BE A CLIENT COMPONENT)
 * @description - This hook is used to update the user data in the database.
 * @param {Object} formData - must contain the following fields: 
 * email, password, settings: { notifications, darkMode }
 * @param {Object} session - the user session object
 * @returns {Object} - Returns an object containing the loading state
 * 
 * formData is expected to be of format:
 * {
 *     email: ''
 *     password: ''
 *     settings: {
 *        notifications: false,
 *        darkMode: false
 *     }
 * }
 */
const useUpdateUserData = () => {
    const [loading, setLoading] = useState(false);

    const updateUserData = async (formData: any, session: any) => {
        setLoading(true);

        
        try {
            // user not logged in
            if(!session) throw new Error('You must be logged in to update user data');
            const res = await fetch(`/api/users`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            if(data.error) throw new Error(data.error);

            toast.success('User data updated successfully');
        } catch(error: any) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }
    
    return { updateUserData, loading };
};

export default useUpdateUserData;