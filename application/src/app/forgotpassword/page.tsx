'use client';
import React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import useCreateUser from '../hooks/useCreateUser';

// TODO: Move into /components. Only one component per file.
const SignUpForm: React.FC = () => {
  const [userInfo, setUserInfo] = useState({ username: "", email: "", password: "" });
  const { createUser, loading } = useCreateUser();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createUser(userInfo);
    router.push('/login');
  };


  return (
    <div className="flex flex-col ml-5 w-[45%] max-md:ml-0 max-md:w-full">
      <form onSubmit={handleSubmit} className="flex flex-col gap-1.5 items-start self-stretch my-auto -ml-px text-stone-600 max-md:mt-10">
        <h2 className="text-2xl font-bold tracking-[2.25px]">Password reset</h2>
        <div className="mt-3 text-xs text-stone-400">
          <label htmlFor="usernname" className="sr-only">Username</label>
          <input
            type="text"
            id="username"
            className="w-full bg-transparent border-b-2 border-rose-400 border-dashed"
            value={userInfo.username}
            onChange={(e) => setUserInfo({ ...userInfo, username: e.target.value })}
            aria-label="Name"
            autoComplete="off"
            placeholder='Username'
            required />
        </div>
    
        <div className="mt-3 text-xs text-stone-400">
          <label htmlFor="password" className="sr-only">Password</label>
          <input 
          type="password" 
          id="password"
          value={userInfo.password}
          onChange={(e) => setUserInfo({ ...userInfo, password: e.target.value })} 
          className="w-full bg-transparent border-b-2 border-rose-400 border-dashed" 
          aria-label="Password" 
          autoComplete="off" 
          placeholder='Password'
          required 
          />
        </div>
        <button type="submit" className="self-center px-4 py-1.5 mt-10 text-sm font-bold text-center text-white drop-shadow-mdç bg-sage rounded-[35px]  max-md:mt-10 hover:bg-white hover:text-sage border-[#D1DAAF] border-2">
          Reset password
        </button>
      </form>
    </div>
  );
};

const Page = () => {

  const { data: session, status } = useSession();
  const router = useRouter();

  // user is already logged in, redirect to home page
  if (status === 'authenticated') {
    router.push('/');
  }

  return (
    <main className="flex flex-col max-w-[594px] mx-auto mt-larger">
      <section className="flex overflow-hidden flex-col pr-6 pb-16 pl-6 w-full bg-yellow-50 border-4 border-rose-400 border-solid shadow-sm rounded-[35px] max-md:px-5 max-md:max-w-full">
        {/* <Header /> */}
        <div className="self-stretch mt-1.5 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col">
            <div className="flex flex-col w-[55%] max-md:ml-0 max-md:w-full">
              {/* TODO: Change into Next.js <Image /> Component */}
              <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/d0540ee4e9866f761379c86adda960de2ef26a725a46efeb28976bd1c2e7fecf?placeholderIfAbsent=true&apiKey=dae5425d3b3c4cdc84ccb32ea9568225" alt="Login illustration" className="object-contain grow w-full aspect-[1.03] max-w-[279px]" />
            </div>
            <SignUpForm />
          </div>
        </div>
      </section>
    </main>
  );
}

// const SignupPage: React.FC = () => {

// }
export default Page