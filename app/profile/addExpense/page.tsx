import React, { useState, useEffect } from "react";
import Types from "@/components/serverComponents/Types";
import Input from "@/components/Input";
import MoveBack from "@/components/navigation/MoveBack";
type Props = {};

const addExpense = (props: Props) => {
  // const session = await getServerSession<unknown, any>(authOption);

  return (
    <>
      {/* <SignOut /> */}
      <div className="absolute w-[100%] grid grid-cols-2 top-[80px]">
        <div className="absolute text-skin-ordinary left-[100px] cursor-pointer">
          <MoveBack />
        </div>
      </div>
      <div className="grid grid-rows-blockTypesGrid text-skin-ordinary w-[655px]  h-[860px] mt-[70px]">
        <p className=" text-[3.2rem] h-[40px] self-start justify-self-center text-skin-danger">
          New Expense
        </p>
        <Types type="expenses"></Types>
        <Input type="expense" />
      </div>
    </>
  );
};

export default addExpense;
