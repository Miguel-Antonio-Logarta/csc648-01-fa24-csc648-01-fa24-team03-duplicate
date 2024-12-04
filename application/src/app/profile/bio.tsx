'use client';
import React from 'react';
import styles from './bio.module.css';
import { Session } from 'next-auth';
import UserCircle from '../components/icons/UserCircle';

interface BioProps {
  session: Session | null;
}

const bio: React.FC<BioProps> = ({ session }) => {

  return (
    <div className="gap-5 bg-[#d1e3c3] border-7 border-[#FFFAE4] w-[30%] h-[60%] ml-[5%] mt-[5%] p-5 rounded-lg flex flex-col items-center shadow-[0px_4px_4px_rgba(0,0,0,0.1)]">

      {/* Backend doesn't allow for user profile pictures. */}
      <div className="flex justify-center items-center">
        <UserCircle size={64} />
      </div>

      <div className="text-left">
        <div className="flex items-center space-x-4">
          <div className="font-bold bg-cherry-blossom-pink font-shantell text-xl text-black m-0 text-center border-8 border-cherry-blossom-pink p-2 rounded-lg w-32 h-12 flex items-center justify-center">
            Username:
          </div>
          <p className="font-shantell text-xl text-black m-0 text-left w-32 h-12 flex items-center overflow-hidden whitespace-nowrap text-ellipsis">
            {session?.user.username || "No Username provided."}
          </p>
        </div>

        <div className="flex items-center space-x-4 mt-2">
          <div className="font-bold bg-cherry-blossom-pink font-shantell text-xl text-black m-0 text-center border-8 border-cherry-blossom-pink p-2 rounded-lg w-32 h-12 flex items-center justify-center">
            Email:
          </div>
          <p className="font-shantell text-xl text-black m-0 text-left w-32 h-12 flex items-center overflow-hidden whitespace-nowrap text-ellipsis">
            {session?.user.email || "No Email provided."}
          </p>
        </div>
      </div>

      <button className="mt-2 p-2 px-4 text-sm text-white bg-cherry-blossom-pink border-none rounded-lg cursor-pointer w-48 h-12 overflow-hidden text-ellipsis transition-all duration-300 hover:bg-pink-hover">
        Change User Credentials
      </button>
      <button className="mt-2 p-2 px-4 text-sm text-white bg-cherry-blossom-pink border-none rounded-lg cursor-pointer w-48 h-12 overflow-hidden text-ellipsis transition-all duration-300 hover:bg-pink-hover">
        My Reviews
      </button>
    </div>

  );
};

export default bio;
