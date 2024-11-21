import { useState } from 'react';
import toast from 'react-hot-toast';

const useCreateUser = () => {
    const [loading, setLoading] = useState(false);

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