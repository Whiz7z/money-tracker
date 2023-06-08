"use client";
import React from "react";
import { signOut } from "next-auth/react";

type Props = {};

const SignOut = (props: Props) => {
  return (
    <button
      className="text-skin-base"
      onClick={() => signOut({ callbackUrl: "/" })}
    >
      SignOut
    </button>
  );
};

export default SignOut;
