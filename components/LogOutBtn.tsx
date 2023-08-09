"use client";
import React from "react";
import { signOut } from "next-auth/react";

type Props = {};

const LogOutBtn = (props: Props) => {
  return (
    <button
      onClick={() => signOut()}
      className="inline-block w-[100px] tablet:w-[200px] h-[40px] tablet:h-[50px] justify-self-end text-skin-danger
               bg-semitransparent rounded-[15px] font-bold text-[1.6rem] tablet:text-[2.2rem] 
               text-center leading-[4rem] tablet:leading-[5rem]"
    >
      Logout
    </button>
  );
};

export default LogOutBtn;
