'use client';

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import Unauthorized from "../../components/Unauthorized";
import useUpdateUserData from "../../hooks/useUpdateUserData";
import { useRouter } from "next/navigation";
import useGetSpecificUserInfo from "@/app/hooks/useGetSpecificUserInfo";

const Page = () => {
  const { data: session, status } = useSession();
  const { specificUserInfo, fetchSpecificUserInfo } = useGetSpecificUserInfo();
  const { updateUserData, loading } = useUpdateUserData();
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  useEffect(() => { 
    // we have to dynamically fetch the user's information, 
    // because the session object will have the old email on the token
    if (session) {
      fetchSpecificUserInfo(session.user.id);
    }

    // DO NOT INCLUDE fetchSpecificUserInfo IN DEPENDENCIES | It will cause infinite loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) return;
    const status = await updateUserData(formData, session);
    if (status) router.push('/profile');
  }

  // Prevent rendering if session is loading
  if (status === 'loading') return;

  // If the user is not authenticated or not an admin, show Unauthorized page
  if (status === 'unauthenticated') return <Unauthorized />;

  return (
    <div className="p-8 flex items-center justify-center min-h-screen" style={{ background: 'linear-gradient(to right, #FCE0D3, #E89CA8)' }}>
      <form
        onSubmit={handleSubmit}
        className="space-y-6 p-8 bg-white shadow-lg rounded-lg max-w-lg w-full"
        autoComplete="off"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800">Account Settings</h2>

        <div className="space-y-4">
          <div>
            {specificUserInfo && specificUserInfo.email ? (
              <p className="break-words text-gray-700 py-2">
                <span className="font-semibold">Your Current Email Address is:</span> {specificUserInfo.email}
              </p>
            ) : (
              <p className="break-words text-gray-700">
                You do not have an email set
              </p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 py-4">Change Email:</label>
            <input
              type="email"
              id="email"
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Enter your new email"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 py-4">Change Password:</label>
            <input
              type="password"
              id="password"
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="Enter your new password"
            />
          </div>
        </div>

        <div className="space-y-4 py-4">
          <button
            type="submit"
            className="w-full p-3 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition duration-200"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>

  );
}

export default Page;