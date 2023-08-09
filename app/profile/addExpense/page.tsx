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
      <div className=" w-[100%] grid grid-cols-1">
        <div className="w-[70px] h-[70px] text-skin-base bg-muted p-[20px] rounded-[5px] cursor-pointer">
          <MoveBack />
        </div>
      </div>
      <div
        className="grid grid-rows-blockTypesGrid text-skin-ordinary 
      w-[300px] tablet:w-[400px] laptop:w-[655px]  max-h-[860px]"
      >
        <p
          className=" text-[3.2rem] self-start justify-self-center 
          text-skin-danger bg-muted p-[20px] rounded-[5px]"
        >
          New Expense
        </p>
        <Types type="expenses"></Types>
        <Input type="expense" />
      </div>
    </>
  );
};

export default addExpense;
