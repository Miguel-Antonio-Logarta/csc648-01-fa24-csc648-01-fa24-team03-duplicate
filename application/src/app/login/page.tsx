"use client"
import React from 'react';
import image from './login_cat.png';
import Image from 'next/image';
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from 'react-hot-toast';
import { useSession } from "next-auth/react";

interface FormInputProps {
  label: string;
  id: string;
  type?: string;
}

const formFields = [
  { label: "Name", id: "name" },
  { label: "Password", id: "password", type: "password" }
];

function FormInput({label, id, type = "text" }: FormInputProps) {
  return (
    <>
      <label htmlFor={id} className="font-josefin mt-2.5">
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        className="shrink-0 self-stretch mt-1 pl-1 h-6 bg-yellow-50 border-b-2 border-rose-400 border-dashed w-full"
        aria-label={label}
      />
    </>
  );
}

function LoginForm() {
  return (
    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
      <main className="flex flex-col mx-auto max-w-[594px] max-h-[415px] bg-transparent">
        <section className="flex overflow-hidden flex-col pb-16 px-10 mx-auto w-full bg-yellow-50 border-4 border-rose-400 border-solid rounded-[35px] shadow-[0px_3px_3px_rgba(0,0,0,0.25)]">
          <h1 className="font-shantell z-10 mx-auto px-16 pt-5 pb-3 mt-0 mb-1 max-w-full text-4xl font-extrabold text-center text-rose-500 bg-rose-300 rounded-2xl border-rose-400 border-dashed border-[3px] tracking-[3.38px] w-[370px] max-md:px-5">
            Log In
          </h1>
          <div className="flex flex-col mx-auto mt-1.5 max-md:max-w-full">
            <div className="flex gap-5 max-md:flex-col">
              <figure className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
                <Image src={image} className="object-contain grow ml-0 w-full aspect-[1.03]" alt={'Login Cat Logo'} />
              </figure>
              <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
                <form className="flex flex-col items-start -mr-0.5 text-xs text-stone-400 max-md:mt-10">
                  <h2 className="text-2xl font-bold text-stone-600 tracking-[2.25px]">
                    Log In
                  </h2>
                  {formFields.map((field) => (
                    <FormInput key={field.id} {...field} />
                  ))}
                  <a href="signup" className="font-josefin mt-2.5 text-xs tracking-wider text-stone-600">
                    don&apos;t have an account?
                  </a>
                  <button 
                    type="submit"
                    className="font-shantell self-center px-3.5 py-1.5 mt-10 text-sm font-bold text-center text-white bg-sage shadow-sm rounded-[35px] w-[86px]"
                  >
                    Log In!
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

const LoginFormV2: React.FC = () => {
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
      toast.success(`Welcome ${userInfo.login}!`);
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
  const { data: session, status } = useSession();
  const router = useRouter();

  // user is already logged in, redirect to home page
  if(status === 'authenticated') {
    router.push('/');
  }
  
  return (
    <main className="flex flex-col max-w-[594px] mx-auto mt-larger">
      <section className="flex overflow-hidden flex-col pr-6 pb-16 pl-6 w-full bg-yellow-50 border-4 border-rose-400 border-solid shadow-sm rounded-[35px] max-md:px-5 max-md:max-w-full">
        {/* <Header /> */}
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