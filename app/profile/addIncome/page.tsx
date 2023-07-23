import React, { useState, useEffect } from "react";
import Types from "@/components/serverComponents/Types";
import Input from "@/components/Input";
import MoveBack from "@/components/navigation/MoveBack";
type Props = {};

const addIncome = (props: Props) => {
  // const session = await getServerSession<unknown, any>(authOption);

  return (
    <>
      {/* <SignOut /> */}
      <div className="absolute w-[100%] text-skin-ordinary grid grid-cols-1 top-[60px]">
        <div className="absolute text-skin-base left-[123px] bg-muted p-[20px] rounded-[5px] cursor-pointer">
          <MoveBack />
        </div>
      </div>
      <div className="grid grid-rows-blockTypesGrid text-skin-ordinary w-[655px]  h-[860px] mt-[50px]">
        <p
          className=" text-[3.2rem]  self-start justify-self-center 
          text-skin-good bg-muted p-[20px] rounded-[5px] "
        >
          New Income
        </p>

        <Types type="incomes"></Types>

        <Input type="income" />
      </div>
    </>
  );
};

export default addIncome;
