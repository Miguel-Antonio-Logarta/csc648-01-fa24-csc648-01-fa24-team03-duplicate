"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import React from 'react';


const Header: React.FC = () => {
  return (
    <header className="z-10 self-center px-larger pt-5 pb-1.5 mt-0 mb-0 max-w-full text-4xl font-extrabold text-rose-500 bg-rose-300 rounded-2xl border-rose-400 border-dashed border-[3px] tracking-[3.38px] w-[378px] max-md:px-5">
      Log In
    </header>
  );
};

const LoginForm: React.FC = () => {
    const [userInfo, setUserInfo] = useState({ login: "", password: "" });
    const [error, setError] = useState("");
    const router = useRouter();


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Reset error state

    const result = await signIn("credentials", {
      redirect: false,
      username: userInfo.login,
      password: userInfo.password,
    });

    if (result?.error) {
      setError(result.error);
    } else {
      router.push("/");
    }
  }
  
  return (
    <div className="flex flex-col ml-5 w-[45%] max-md:ml-0 max-md:w-full">
      <form onSubmit={handleSubmit} className="flex flex-col gap-1.5 items-start self-stretch my-auto -ml-px text-stone-600 max-md:mt-10">
        <h2 className="text-2xl font-bold tracking-[2.25px]">log in</h2>
        <div className="mt-3 text-xs text-stone-400">
          <label htmlFor="name" className="sr-only">Name</label>
          <input 
          type="text" 
          id="login" 
          value={userInfo.login}
          onChange={(e) => setUserInfo({ ...userInfo, login: e.target.value })}
          className="w-full bg-transparent border-b-2 border-rose-400 border-dashed" 
          aria-label="login" 
          autoComplete="off" 
          required 
          />
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
          required />
        </div>
        <a href="/signup" className="mt-3 text-xs tracking-wider">don&apos;t have an account?</a>
        <button type="submit" className="self-center px-4 py-1.5 mt-10 text-sm font-bold text-center text-white drop-shadow-mdç bg-sage rounded-[35px] w-[86px] max-md:mt-10">
          Log In!
        </button>
      </form>
    </div>
  );
};

const LoginPage: React.FC = () => {
  return (
    <main className="flex flex-col max-w-[594px] mx-auto mt-larger">
      <section className="flex overflow-hidden flex-col pr-6 pb-16 pl-6 w-full bg-yellow-50 border-4 border-rose-400 border-solid shadow-sm rounded-[35px] max-md:px-5 max-md:max-w-full">
        <Header />
        <div className="self-stretch mt-1.5 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col">
            <div className="flex flex-col w-[55%] max-md:ml-0 max-md:w-full">
              {/* <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/d0540ee4e9866f761379c86adda960de2ef26a725a46efeb28976bd1c2e7fecf?placeholderIfAbsent=true&apiKey=dae5425d3b3c4cdc84ccb32ea9568225" alt="Login illustration" className="object-contain grow w-full aspect-[1.03] max-w-[279px]" /> */}
            </div>
            <LoginForm />
          </div>
        </div>
      </section>
    </main>
  );
};

export default LoginPage;


