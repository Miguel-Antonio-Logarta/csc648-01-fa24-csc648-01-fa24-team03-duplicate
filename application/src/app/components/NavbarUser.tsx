"use client"

import { useSession } from 'next-auth/react';
import UserCircle from './icons/UserCircle';
import LogoutButton from './LogoutButton';
import Link from 'next/link';
import Modal from './Modal';
import SignUpForm from './SignUpForm';
import { useState } from 'react';
import LoginForm from './LoginForm';

// TODO: Lots of duplicate code, but it should work for now.
// TODO: Make a default profile picture that is clickable instead of an svg icon
const NavbarUser = () => {
  const { data: session } = useSession();

  const [signupVisible, setSignupVisible] = useState(false);
  const [loginVisible, setloginVisible] = useState(false);

  const handleSignUpClose = () => {
    setSignupVisible(false);
  }

  const handleLoginClose = () => {
    setloginVisible(false);
  }

  const handleSignUpRedirect = () => {
    setloginVisible(false);
    setSignupVisible(true);
  }

  if (!session) {
    return (
      <div className="flex no-wrap items-stretch gap-x-4">
        <ul className="font-josefin flex no-wrap gap-x-6 mx-6">
          {/* We can move these links into a footer component */}
          {/* <li><Link className="flex items-center capitalize w-full h-full align-middle hover:underline" href={"/about"}>About</Link></li> */}
          {/* <li><Link className="flex items-center capitalize w-full h-full align-middle hover:underline" href={"/contact"}>Contact</Link></li> */}
          <li><Link className="flex items-center capitalize w-full h-full align-middle hover:underline" href={"/"}>Home</Link></li>
          {/* <li><Link className="flex items-center capitalize w-full h-full align-middle hover:underline" href={"/help"}>Help</Link></li> */}
        </ul>
        <div className="flex no-wrap items-center gap-5">
          {/* <Link
            href="/login"
            className="bg-[#D1DAAF] border-[#D1DAAF] border-2 font-josefin px-4 py-2 shadow-md rounded-full hover:bg-white"
          >
            Log in
          </Link> */}
          <button
            className="bg-[#D1DAAF] border-[#D1DAAF] border-2 font-josefin px-4 py-2 shadow-md rounded-full hover:bg-white"
            onClick={(e) => setloginVisible(true)}
          >
            Log in
          </button>
          <button
            className="bg-[#C6E2FF] border-[#C6E2FF] border-2 font-josefin px-4 py-2 shadow-md rounded-full hover:bg-white"
            onClick={(e) => setSignupVisible(true)}
          >
            Sign up
          </button>
        </div>
        {signupVisible && <SignUpForm close={handleSignUpClose}/>}
        {loginVisible && <LoginForm close={handleLoginClose} redirectToSignup={handleSignUpRedirect}/>}
      </div>
    );
  } else if (session.user.role === "CUSTOMER") {
    return (
      <div className="flex no-wrap items-stretch gap-x-4">
        <ul className="font-josefin flex no-wrap gap-x-6 mx-6">
          {/* We can move these links into a footer component */}
          {/* <li><Link className="flex items-center capitalize w-full h-full align-middle hover:underline" href={"/about"}>About</Link></li> */}
          {/* <li><Link className="flex items-center capitalize w-full h-full align-middle hover:underline" href={"/contact"}>Contact</Link></li> */}
          <li><Link className="flex items-center capitalize w-full h-full align-middle hover:underline" href={"/"}>Home</Link></li>
          <li><Link className="flex items-center capitalize w-full h-full align-middle hover:underline" href={"/profile"}>My Profile</Link></li>
          {/* <li><Link className="flex items-center capitalize w-full h-full align-middle hover:underline" href={"/help"}>Help</Link></li> */}
        </ul>
        <div className="flex no-wrap items-center gap-5">
            <UserCircle size={32} />
            <LogoutButton />
        </div>
      </div>
    )
  } else if (session.user.role === "BUSINESS_OWNER") {
    return (
      <div className="flex no-wrap items-stretch gap-x-4">
          <ul className="font-josefin flex no-wrap gap-x-6 mx-6">
            <li><Link className="flex items-center capitalize w-full h-full align-middle hover:underline" href={"/"}>Home</Link></li>
            <li><Link className="flex items-center capitalize w-full h-full align-middle hover:underline" href={"/businessdashboard"}>Dashboard/Analytics</Link></li>
            {/* <li><Link className="flex items-center capitalize w-full h-full align-middle hover:underline" href={"/help"}>Help</Link></li> */}
          </ul>
          <div className="flex no-wrap items-center gap-5">
              <UserCircle size={32} />
              <LogoutButton />
          </div>
      </div>
    )
  } else if (session.user.role === "ADMIN") {
    return (
      <div className="flex no-wrap items-stretch gap-x-4">
          <ul className="font-josefin flex no-wrap gap-x-6 mx-6">
            <li><Link className="flex items-center capitalize w-full h-full align-middle hover:underline" href={"/"}>Home</Link></li>
            <li><Link className="flex items-center capitalize w-full h-full align-middle hover:underline" href={"/admin"}>Dashboard/Analytics</Link></li>
            <li><Link className="flex items-center capitalize w-full h-full align-middle hover:underline" href={"/profile"}>My Profile</Link></li>
            {/* <li><Link className="flex items-center capitalize w-full h-full align-middle hover:underline" href={"/help"}>Help</Link></li> */}
          </ul>
          <div className="flex no-wrap items-center gap-5">
              <UserCircle size={32} />
              <LogoutButton />
          </div>
      </div>
    )
  }
};

export default NavbarUser;
