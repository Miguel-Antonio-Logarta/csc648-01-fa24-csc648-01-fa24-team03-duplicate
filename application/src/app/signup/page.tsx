"use client"
import React from 'react';
import { useState } from 'react';
import Image from 'next/image';
import image from '../login/login_cat.png';

interface FormInputProps {
  label: string;
  id: string;
  type?: string;
}

const formFields = [
  { label: "Name", id: "name" },
  { label: "Password", id: "password", type: "password" },
  { label: "Email", id: "email", type: "email" }
];

function FormInput({label, id, type = "text" }: FormInputProps) {

  return (
    <>
      <label htmlFor={id} className="mt-2.5">
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

function SignUpForm() {
  return (
    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
      <main className="flex flex-col justify-center items-center mx-auto max-w-[594px] max-h-[415px]">
        <section className="flex overflow-hidden flex-col pb-16 px-10 mx-auto w-full bg-yellow-50 border-4 border-rose-400 border-solid rounded-[35px] shadow-[0px_3px_3px_rgba(0,0,0,0.25)]">
        <h1 className="z-10 mx-auto px-16 pt-5 pb-3 mt-0 mb-1 max-w-full text-4xl font-extrabold text-center text-rose-500 bg-rose-300 rounded-2xl border-rose-400 border-dashed border-[3px] tracking-[3.38px] w-[370px] max-md:px-5">
            Sign Up
          </h1>
          <div className="flex flex-col mx-auto mt-1.5 max-md:max-w-full">
            <div className="flex gap-5 max-md:flex-col">
              <figure className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
              <Image src={image} className="object-contain grow ml-0 w-full aspect-[1.03]" alt={'Login Cat Logo'}></Image>
              </figure>
              <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
                <form className="flex flex-col items-start -mr-0.5 mt-4 text-xs text-stone-400">
                  <h2 className="text-2xl font-bold text-stone-600 tracking-[2.25px] -mt-1 -mb-1">
                    Sign Up
                  </h2>
                  {formFields.map((field) => (
                    <FormInput key={field.id} {...field} />
                  ))}
                  <a href="login" className="mt-2.5 text-xs tracking-wider text-stone-600">
                    already have an account?
                  </a>
                  <button type="submit" className="self-center px-3.5 py-1.5 mt-6 text-sm font-bold text-center text-white bg-blue-200 shadow-sm rounded-[35px] w-[86px]">
                    Sign Up!
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

export default SignUpForm;


