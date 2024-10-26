import { useState } from 'react';


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

        // user not logged in
        if(!session) return;

        try {
            const res = await fetch(`/api/users`, {
                method: 'PATCH',
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
            alert('User data updated successfully!');

        } catch(error: any) {
            // TODO: Remove this alert in production
            // could use a react toast notification library here
            // this should be removed in production
            alert(`${error.message}`);
            return;
        }
    }
    
    return { updateUserData, loading };
};

export default useUpdateUserData;