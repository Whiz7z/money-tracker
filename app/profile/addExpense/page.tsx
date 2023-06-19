import React, { useState, useEffect } from "react";
import Types from "@/components/serverComponents/Types";
import Input from "@/components/Input";
import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOption } from "@/app/api/auth/[...nextauth]/route";
type Props = {};

const addExpense = (props: Props) => {
  // const session = await getServerSession<unknown, any>(authOption);

  return (
    <>
      {/* <SignOut /> */}

      <div
        className="grid grid-rows-blockTypesGrid text-skin-base w-[655px]  h-[860px] mt-[70px] 
        outline-1 outline outline-white outline-offset-1"
      >
        <p className=" text-[3.2rem] h-[40px] self-start justify-self-center text-skin-danger">
          New Expense
        </p>
        <Types type="expenses"></Types>
        <Input />
      </div>
    </>
  );
};

export default addExpense;
