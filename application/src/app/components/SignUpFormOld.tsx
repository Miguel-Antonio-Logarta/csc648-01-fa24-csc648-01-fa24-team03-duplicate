'use client';

import React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import useCreateUser from '../hooks/useCreateUser';
import styles from './components.module.css';

const SignUpFormOld: React.FC = () => {
  const [userInfo, setUserInfo] = useState({
    username: '',
    email: '',
    password: '',
  });
  const { createUser, loading } = useCreateUser();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await createUser(userInfo);
    if (success) router.push('/login');
  };

  return (
    <div className="grid h-screen fixed inset-x-0 bottom-16 items-center justify-center">
      <div className="mx-auto max-w-[594px] max-h-[415px] bg-transparent ">
        <section className=" pb-14 px-10 mx-auto w-full bg-yellow-50 border-4 border-rose-400 border-solid rounded-[35px] shadow-[0px_3px_3px_rgba(0,0,0,0.25)]">
          <h1 className="font-shantell z-10 mx-auto px-16 pt-5 pb-5 mt-[-2rem] mb-1 max-w-full text-4xl font-extrabold text-center text-rose-500 bg-rose-300 rounded-2xl border-rose-400 border-dashed border-[3px] tracking-[3.38px] w-[370px] max-md:px-5">
            Sign up!
          </h1>
          <div className="grid grid-cols-8 mt-1.5 max-md:max-w-full">
            <figure className="col-span-3 items-center max-md:ml-0 max-md:w-full">
              <Image
                src="https://9otnordlgmffpjra.public.blob.vercel-storage.com/login_cat_trimmed-8cBhzQHseraBvAqW7578pVsK3Uq30p.png"
                width={512}
                height={512}
                className="object-contain w-[120%] h-[120%] max-md:w-full max-md:h-full"
                alt={'Login Cat Logo'}
              />
            </figure>
            <div className="col-span-5 flex ml-5 max-md:ml-0 max-md:w-full">
              <form
                onSubmit={handleSubmit}
                className="flex flex-col items-start -mr-0.5 text-xs text-stone-400"
              >
                <h2 className="text-2xl font-bold text-stone-600 tracking-[2.25px]">
                  Enter info
                </h2>
                <div className="mt-3 text-xs text-stone-400">
                  <label htmlFor="login" className="sr-only">
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    value={userInfo.username}
                    onChange={(e) =>
                      setUserInfo({ ...userInfo, username: e.target.value })
                    }
                    placeholder="Username"
                    className={`shrink-0 text-black mt-1 pl-2 pr-14 py-3 h-10 text-lg bg-yellow-50 border-b-2 border-dashed w-full w-full font-josefin hover:bg-[#fef9c3] }`}
                    aria-label="username"
                    autoComplete="off"
                    required
                  />
                </div>
                <div className="mt-3 text-xs text-stone-400">
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={userInfo.email}
                    onChange={(e) =>
                      setUserInfo({ ...userInfo, email: e.target.value })
                    }
                    className={`shrink-0 text-black self-stretch mt-1 pl-2 pr-14 py-3 h-10 text-lg bg-yellow-50 border-b-2 border-dashed w-full w-full font-josefin hover:bg-[#fef9c3] }`}
                    placeholder="Email"
                    aria-label="Email"
                    autoComplete="off"
                    required
                  />
                </div>
                <div className="mt-3 text-xs text-stone-400">
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={userInfo.password}
                    onChange={(e) =>
                      setUserInfo({ ...userInfo, password: e.target.value })
                    }
                    className={`shrink-0 text-black self-stretch mt-1 pl-2 pr-14 py-3 h-10 text-lg bg-yellow-50 border-b-2 border-dashed w-full w-full font-josefin hover:bg-[#fef9c3] }`}
                    placeholder="Password"
                    aria-label="Password"
                    autoComplete="off"
                    required
                  />
                </div>
                <div className="relative w-full"></div>
                <button
                  type="submit"
                  className="font-shantell self-center px-3.5 py-1.5  mt-10 text-lg font-bold text-center text-white bg-sage shadow-md rounded-[35px] w-[136px] hover:bg-white hover:text-sage border-[#D1DAAF] border-2"
                >
                  Submit!
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SignUpFormOld;
