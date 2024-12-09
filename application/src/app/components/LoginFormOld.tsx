'use client';
import React from 'react';
// import image from './login_cat_trimmed.png';
import Image from 'next/image';
import { signIn } from 'next-auth/react';
import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useSession } from 'next-auth/react';

function LoginFormOld() {
  const [userInfo, setUserInfo] = useState({ login: '', password: '' });
  const [error, setError] = useState('');
  const [isInvalid, setIsInvalid] = useState(false);
  const router = useRouter();
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
      router.push('/');
    }
  };

  return (
    <div className="grid place-items-center h-screen fixed inset-x-0 bottom-16 bg-opacity-50 items-center justify-center">
      <main className="mx-auto max-w-[594px] max-h-[415px] bg-transparent ">
        <section className=" pb-14 px-10 mx-auto w-full bg-yellow-50 border-4 border-rose-400 border-solid rounded-[35px] shadow-[0px_3px_3px_rgba(0,0,0,0.25)]">
          <h1 className="font-shantell z-10 mx-auto px-16 pt-5 pb-5 mt-[-2rem] mb-1 max-w-full text-4xl font-extrabold text-center text-rose-500 bg-rose-300 rounded-2xl border-rose-400 border-dashed border-[3px] tracking-[3.38px] w-[370px] max-md:px-5">
            Welcome!
          </h1>
          <div className="grid grid-cols-8 mt-1.5 max-md:max-w-full">
            <figure className="col-span-3 items-center max-md:ml-0 max-md:w-full">
              <Image
                src="https://9otnordlgmffpjra.public.blob.vercel-storage.com/login_cat_trimmed-8cBhzQHseraBvAqW7578pVsK3Uq30p.png"
                width={512}
                height={512}
                className="object-contain w-[120%] h-[120%] max-md:w-full max-md:h-full"
                alt="Login Cat Logo"
              />
            </figure>
            <div className="col-span-5 flex ml-5 max-md:ml-0 max-md:w-full">
              <form
                onSubmit={handleSubmit}
                className="flex flex-col items-start -mr-0.5 text-xs text-stone-400"
              >
                <h2 className="text-2xl font-bold text-stone-600 tracking-[2.25px]">
                  Log In
                </h2>
                <div className="relative w-full mb-2">
                  {error && (
                    <p className="absolute text-red-500 text-sm">{error}</p>
                  )}
                </div>
                <div className="mt-3 text-xs text-stone-400">
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
                <div className="mt-3 text-xs text-stone-400">
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
        </section>
      </main>
    </div>
  );
}

export default LoginFormOld;
