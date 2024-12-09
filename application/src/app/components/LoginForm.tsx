'use client';

import React from 'react';
import Image from 'next/image';
import { signIn } from 'next-auth/react';
import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import styles from './components.module.css';

type LoginFormProps = {
  close: () => void;
  redirectToSignup: () => void;
};

const LoginForm = (props: LoginFormProps) => {
  const [userInfo, setUserInfo] = useState({ login: '', password: '' });
  const [error, setError] = useState('');
  const [isInvalid, setIsInvalid] = useState(false);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); // Reset error state

    const result = await signIn('credentials', {
      redirect: false,
      username: userInfo.login,
      password: userInfo.password,
    });

    if (result?.error) {
      setError('Username or password is incorrect');
      setIsInvalid(true); // Set invalid state
      setUserInfo({ ...userInfo, password: '' }); // Clear the password field
      passwordRef.current?.focus(); // Set focus to password field
    } else {
      toast.success(`Welcome ${userInfo.login}!`);
      props.close();
    }
  };

  return (
    <div
      className="flex h-screen w-screen fixed inset-x-0 items-center justify-center bg-black bg-opacity-25 z-50"
      onClick={(e) => props.close()}
    >
      <div
        className="w-[650px] h-[450px] relative bg-cornsilk border-4 border-salmon-pink border-solid rounded-3xl shadow-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute inset-x-0 flex align-center justify-center -top-8">
          <div className={`${styles['left-triangle']}`}></div>
          <div
            className={`${styles['form-title']} bg-cherry-blossom-pink w-3/4 py-5 text-center border-4 border-dashed border-light-coral rounded-b-3xl rounded-t-xl font-shantell font-bold text-indian-red text-3xl`}
          >
            Log in
          </div>
          <div className={`${styles['right-triangle']}`}></div>
        </div>
        <div className="grid grid-cols-8 px-10 pt-16 pb-10 h-full">
          <div className="col-span-3 items-center">
            <Image
              src="https://9otnordlgmffpjra.public.blob.vercel-storage.com/login_cat_trimmed-8cBhzQHseraBvAqW7578pVsK3Uq30p.png"
              width={512}
              height={512}
              className="object-contain w-full h-full"
              alt={'Login Cat Logo'}
            />
          </div>
          <div className="col-span-5 flex ml-10 max-md:ml-0 max-md:w-full">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-start text-xs text-umber font-josefin"
            >
              <h2 className="text-3xl font-bold text-umber font-josefin">
                Log In
              </h2>
              <div className="relative w-full mb-2">
                {error && (
                  <p className="absolute text-red-500 font-josefin text-sm">
                    {error}
                  </p>
                )}
              </div>
              <div className="mt-3 text-xs text-umber font-josefin">
                <label htmlFor="login" className="sr-only">
                  Username
                </label>
                <input
                  type="text"
                  id="login"
                  value={userInfo.login}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, login: e.target.value })
                  }
                  placeholder="Username"
                  className={`shrink-0 text-black mt-1 pl-2 pr-14 py-3 h-10 text-lg bg-yellow-50 border-b-2 border-dashed w-full w-[18rem] hover:bg-[#fef9c3] ${
                    isInvalid
                      ? 'outline outline-2 outline-red-500 rounded-sm shadow-red-500/70'
                      : ''
                  }`}
                  aria-label="login"
                  autoComplete="off"
                  required
                />
              </div>
              <div className="mt-3 text-xs text-umber font-josefin">
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  ref={passwordRef}
                  value={userInfo.password}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, password: e.target.value })
                  }
                  className={`shrink-0 text-black self-stretch mt-1 pl-2 pr-14 py-3 h-10 text-lg bg-yellow-50 border-b-2 border-dashed w-full w-[18rem] hover:bg-[#fef9c3] ${
                    isInvalid
                      ? 'outline outline-2 outline-red-500 rounded-sm'
                      : ''
                  }`}
                  placeholder="Password"
                  aria-label="Password"
                  autoComplete="off"
                  required
                />
              </div>
              <div className="relative w-full"></div>
              <a
                href="signup"
                className="font-josefin mt-2.5 text-xs tracking-wider text-stone-600 hover:text-[#22c55e]"
                onClick={(e) => {
                    e.preventDefault();
                    props.redirectToSignup();
                }}
              >
                Don&apos;t have an account?
              </a>
              <a
                href="forgotpassword"
                className="font-josefin mt-2.5 text-xs tracking-wider text-stone-600 hover:text-[#22c55e]"
              >
                Forgot password?
              </a>
              <button
                type="submit"
                className="font-shantell self-center px-3.5 py-1.5  mt-10 text-lg font-bold text-center text-white bg-sage shadow-md rounded-[35px] w-[136px] hover:bg-white hover:text-sage border-[#D1DAAF] border-2"
              >
                Log In!
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
