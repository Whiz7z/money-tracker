"use client";

import React, { useRef, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
type Props = {};

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

console.log(new Date().getMonth());

const MonthPicker: any = (props: Props) => {
  const router = useRouter();
  const pickerRef = useRef<any>();
  const [date, setDate] = useState<any>(new Date());

  const nextMonthHandler = () => {
    if (date.getMonth() == 11) {
      setDate((prev) => new Date(prev.getFullYear() + 1, 0, 1));
    } else {
      setDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
    }
  };

  const prevMonthHandler = () => {
    if (date.getMonth() == 0) {
      setDate((prev) => new Date(prev.getFullYear() - 1, 11, 1));
    } else {
      setDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
    }
  };

  const setDateHandler = (e) => {
    setDate(new Date(e.target.value));

    const searchParams = new URLSearchParams(window.location.search);
    console.log("searchparams", window.location.pathname);

    searchParams.set("month", String(new Date(e.target.value).getMonth()));
    searchParams.set("year", String(new Date(e.target.value).getFullYear()));
    console.log("search params", searchParams.toString());

    if (window.location.pathname.includes("?")) {
      const newPathname = `${
        window.location.pathname
      }&${searchParams.toString()}`;
      router.push(newPathname);
    } else {
      const newPathname = `${
        window.location.pathname
      }?${searchParams.toString()}`;
      router.push(newPathname);
    }
    // const newPathname = `${searchParams.toString()}`;
    // router.push(newPathname);
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    console.log("searchparams", window.location.pathname);

    searchParams.set("month", String(new Date(date).getMonth()));
    searchParams.set("year", String(new Date(date).getFullYear()));
    console.log("search params", searchParams.toString());

    if (window.location.pathname.includes("?")) {
      const newPathname = `${
        window.location.pathname
      }&${searchParams.toString()}`;
      router.push(newPathname);
    } else {
      const newPathname = `${
        window.location.pathname
      }?${searchParams.toString()}`;
      router.push(newPathname);
    }
  }, [date]);
  return (
    <div
      className="grid phone:w-[280px] tablet:w-[340px] laptop:w-[440px]  gap-[20px] 
            justify-self-center items-center"
    >
      <div
        className="grid grid-cols-[1fr_3fr_1fr] phone:w-[200px] tablet:w-[280px] h-[50px] px-[20px] 
      rounded-[15px] bg-input items-center justify-self-center"
      >
        <FaArrowLeft
          color="#64aa75"
          className="justify-self-start cursor-pointer"
          onClick={() => prevMonthHandler()}
        />

        <p
          className="text-skin-good cursor-pointer tiny:text-[1.8rem] telaptop:text-[2.4rem]"
          onClick={() => pickerRef.current.showPicker()}
        >
          {months[date.getMonth()]}
        </p>
        <input
          ref={pickerRef}
          id="monthPicker"
          name="monthPicker"
          type="month"
          value={`${date.getFullYear()}-${
            date.getMonth() + 1 < 10
              ? "0" + (date.getMonth() + 1).toString()
              : date.getMonth() + 1
          }`}
          onChange={setDateHandler}
          className=" absolute w-[0px] h-[0px] bg-transparent"
        />

        <FaArrowRight
          color="#64aa75"
          className="justify-self-end cursor-pointer"
          onClick={() => nextMonthHandler()}
        />
      </div>

      {/* <div className="grid w-[100px] h-[50px] rounded-[15px] bg-input justify-self-end cursor-pointer">
        <p className="text-skin-good self-center">{date.getFullYear()}</p>
      </div> */}

      {/* <div
        onClick={() => prevMonthHandler()}
        className="w-[30px] h-[30px] arrow-clip-left bg-accent col-1 self-end 
              relative bottom-[5px] cursor-pointer hover:w-[35px] hover:h-[35px] justify-self-end"
      ></div>
      <div className="self-end w-[120px] tablet:w-[180px] ">
        <label
          className="grid cursor-pointer"
          htmlFor="monthPicker"
          onClick={() => pickerRef.current.showPicker()}
        >
          <p className="phone:text-[1.8rem] tablet:text-[2rem] text-skin-accent leading-4">
            {date.getFullYear()}
          </p>
          <p className="text-[1.8rem] tablet:text-[2.4rem] laptop:text-[2.8rem] text-skin-accent">
            {months[date.getMonth()]}
          </p>
        </label>
        <input
          ref={pickerRef}
          id="monthPicker"
          name="monthPicker"
          type="month"
          value={`${date.getFullYear()}-${
            date.getMonth() + 1 < 10
              ? "0" + (date.getMonth() + 1).toString()
              : date.getMonth() + 1
          }`}
          onChange={setDateHandler}
          className=" absolute w-[0px] h-[0px] bg-transparent"
        />
      </div>
      <div
        onClick={() => nextMonthHandler()}
        className="w-[30px] h-[30px] arrow-clip-right bg-accent col-3 justify-self-start self-end
               relative bottom-[5px] cursor-pointer  hover:w-[35px] hover:h-[35px]"
      ></div> */}
    </div>
  );
};

export default MonthPicker;
