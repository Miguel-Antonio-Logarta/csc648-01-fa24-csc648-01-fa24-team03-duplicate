"use client"
import React from 'react';
import { signIn } from "next-auth/react";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from 'next/image';
import signupCatTrimmed from "./signup_cat_trimmed.png";
import useCreateUser from '../hooks/useCreateUser';


const PasswordReset: React.FC = () => {
  const [userInfo, setUserInfo] = useState({ username: "", email: ""});
  const { createUser, loading } = useCreateUser();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createUser(userInfo);
    router.push('/forgotpassword');
  };

  

  return (
    <div className="grid place-items-center h-screen fixed inset-x-0 bottom-16 bg-opacity-50 items-center justify-center">
      <main className="mx-auto max-w-[594px] max-h-[415px] bg-transparent ">
        <section className=" pb-14 px-10 mx-auto w-full bg-yellow-50 border-4 border-rose-400 border-solid rounded-[35px] shadow-[0px_3px_3px_rgba(0,0,0,0.25)]">
          <h1 className="font-shantell z-10 mx-auto px-16 pt-5 pb-5 mt-[-2rem] mb-1 max-w-full text-4xl font-extrabold text-center text-rose-500 bg-rose-300 rounded-2xl border-rose-400 border-dashed border-[3px] tracking-[3.38px] w-[370px] max-md:px-5">
            Password Reset
          </h1>
          <div className="grid grid-cols-8 mt-1.5 max-md:max-w-full">
          <figure className="col-span-3 items-center max-md:ml-0 max-md:w-full">
              <Image
                src={signupCatTrimmed}
                className="object-contain w-[120%] h-[120%] max-md:w-full max-md:h-full"
                alt={'Login Cat Logo'}
              />
            </figure>
            <div className="col-span-5 flex ml-5 max-md:ml-0 max-md:w-full">
              <form onSubmit={handleSubmit} className="flex flex-col items-start -mr-0.5 text-xs text-stone-400">
                <h2 className="text-2xl font-bold text-stone-600 tracking-[2.25px]">
                  Reset info
                </h2>
                <div className="mt-3 text-xs text-stone-400">
                  <label htmlFor="login" className="sr-only">Username</label>
                  <input
                    type="text"
                    id="username"
                    value={userInfo.username}
                    onChange={(e) => setUserInfo({ ...userInfo, username: e.target.value })}
                    placeholder='Username'
                    className={`shrink-0 text-black mt-1 pl-2 pr-14 py-3 h-10 text-lg bg-yellow-50 border-b-2 border-dashed w-full w-[18rem] hover:bg-[#fef9c3] }`}
                    aria-label="username"
                    autoComplete="off"
                    required
                  />
                </div>
                <div className="mt-3 text-xs text-stone-400">
                  <label htmlFor="email" className="sr-only">Password</label>
                  <input
                    type="email"
                    id="email"
                    value={userInfo.email}
                    onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                    className={`shrink-0 text-black self-stretch mt-1 pl-2 pr-14 py-3 h-10 text-lg bg-yellow-50 border-b-2 border-dashed w-full w-[18rem] hover:bg-[#fef9c3] }`}
                    placeholder='Email'
                    aria-label="Email"
                    autoComplete="off"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="font-shantell self-center px-3.5 py-1.5  mt-10 text-lg font-bold text-center text-white bg-sage shadow-md rounded-[35px] w-[236px] hover:bg-white hover:text-sage border-[#D1DAAF] border-2"
                >
                  Reset password!
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

const Page: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  // user is already logged in, redirect to home page
  if (status === 'authenticated') {
    router.push('/');
  }

  return (
          <PasswordReset />
  );
};

export default Page;