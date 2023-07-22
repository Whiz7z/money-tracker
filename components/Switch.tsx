"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react";
type Props = {
  searchParams: any;
};
const activeClass = "border-b-4 border-accent";
const Switch: any = async ({ searchParams: initialParams }: Props) => {
  const router = useRouter();
  const [active, setActive] = useState(initialParams.type);

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
    <div className="max-w-[240px] self-start  grid grid-cols-switch justify-self-center gap-[5px] text-[2.8rem] mt-[25px]">
      <p
        className={`cursor-pointer	text-skin-danger self-start ${
          (active === "expenses" || active == undefined) && activeClass
        }`}
        onClick={() => switchHandler("expenses")}
      >
        Expenses
      </p>
      <p className="text-skin-accent self-start">/</p>
      <p
        className={`cursor-pointer text-skin-good self-start ${
          active === "incomes" && activeClass
        }`}
        onClick={() => switchHandler("incomes")}
      >
        Incomes
      </p>
    </div>
  );
};

export default Switch;
