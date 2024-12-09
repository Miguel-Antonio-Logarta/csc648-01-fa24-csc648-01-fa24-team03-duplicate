"use client"
import React from 'react';
import { signIn } from "next-auth/react";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from 'next/image';
import signupCatTrimmed from "./signup_cat_trimmed.png";
import useCreateUser from '../hooks/useCreateUser';
import SignUpForm from '../components/SignUpForm';
import SignUpFormOld from '../components/SignUpFormOld';




const Page: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  // user is already logged in, redirect to home page
  if (status === 'authenticated') {
    router.push('/');
  }

  return (
          <SignUpFormOld />
  );
};

export default Page;