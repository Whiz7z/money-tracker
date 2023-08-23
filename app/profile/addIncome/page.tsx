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
      <div className="relative self-center w-[640px] h-[620px]">
        <div className="block-shadow-addRecord"></div>
        <div
          className="absolute grid bg-[#000] grid-rows-blockTypesGrid text-skin-ordinary 
      w-[640px] self-center h-[620px]"
        >
          <div
            className="relative top-[6px] text-skin-basecursor-pointer 
      h-[40px] w-[120px] bg-danger justify-self-start text-skin-ordinary 
               font-medium text-[1.6rem] 
               text-center leading-[4rem] cursor-pointer"
          >
            <MoveBack />
          </div>
          <p
            className="absolute text-[2.4rem] self-start justify-self-center 
          text-skin-danger mt-[50px]"
          >
            New income record
          </p>
          <Types type="incomes"></Types>
          <Input type="income" />
        </div>
      </div>
    </>
  );
};

export default addIncome;
