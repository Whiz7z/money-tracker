"use client";
import React from "react";
import { signOut } from "next-auth/react";

type Props = {};

const LogOutBtn = (props: Props) => {
  return (
    <button
      onClick={() => signOut()}
      className="absolute right-[-6px] top-[6px] inline-block w-[120px] h-[40px] justify-self-end text-skin-ordinary bg-danger
               font-medium text-[1.6rem] 
               text-center leading-[4rem] cursor-pointer"
    >
      Logout
    </button>
  );
};

export default LogOutBtn;
