"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react";
type Props = {
  searchParams: any;
};
const activeClassInc = "bg-good text-skin-ordinary";
const activeClassExp = "bg-danger text-skin-ordinary";
const activeClassP = "text-skin-ordinary";
const Switch: any = ({ searchParams: initialParams }: Props) => {
  const router = useRouter();
  const [active, setActive] = useState(initialParams.type || "expenses");

  const switchHandler = (type: string): void => {
    const searchParams = new URLSearchParams(window.location.search);
    console.log("searchparams", window.location.pathname);
    if (type) {
      searchParams.set("type", type);
      setActive(type);
    } else {
      searchParams.delete("type");
    }

    const newPathname = `${
      window.location.pathname
    }?${searchParams.toString()}`;

    router.push(newPathname);
  };

  return (
    <div className="phone:w-[280px] tablet:w-[340px] laptop:w-[440px] h-[40px] font-regular  self-start  grid grid-cols-2 items-center justify-self-center   text-[1.6rem] mt-[25px] rounded-[5px] border-[1px] border-border">
      <div
        className={`grid cursor-pointer h-[100%]	text-skin-danger rounded-l-[4px] ${
          (active === "incomes" || active == undefined) && activeClassInc
        }`}
        onClick={() => switchHandler("incomes")}
      >
        <div
          className={`grid items-center text-skin-good align-center ${
            (active === "incomes" || active == undefined) && activeClassP
          }`}
        >
          Incomes
        </div>
      </div>
      <div
        className={`grid cursor-pointer h-[100%]	 text-skin-good rounded-r-[4px] ${
          active === "expenses" && activeClassExp
        }`}
        onClick={() => switchHandler("expenses")}
      >
        <div
          className={` grid items-center text-skin-danger align-center ${
            (active === "expenses" || active == undefined) && activeClassP
          }`}
        >
          Expenses
        </div>
      </div>
    </div>
  );
};

export default Switch;
