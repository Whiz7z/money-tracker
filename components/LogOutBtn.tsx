"use client";
import React from "react";
import { signOut } from "next-auth/react";

type Props = {};

const LogOutBtn = (props: Props) => {
  return (
    <button
      onClick={() => signOut()}
      className="inline-block w-[200px] h-[50px] justify-self-end text-skin-danger
               bg-semitransparent rounded-[15px] font-bold text-[2.2rem] text-center leading-[5rem]"
    >
      Logout
    </button>
  );
};

export default LogOutBtn;
