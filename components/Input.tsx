"use client";

import React, { useState, useEffect } from "react";
import CalendarSvg from "@/svgComponents/CalendarSvg";
import DatePicker from "react-datepicker";
import { SketchPicker } from "react-color";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { resetCurrentOrigin } from "@/Redux/expensesOrigin";

type Props = {
  type: string;
};

const weekday = new Array(7);
weekday[0] = "Monday";
weekday[1] = "Tuesday";
weekday[2] = "Wednesday";
weekday[3] = "Thursday";
weekday[4] = "Friday";
weekday[5] = "Saturday";
weekday[6] = "Sunday";

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

const Input = ({ type }: Props) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [color, setColor] = useState("#D92F2F");
  const [newOriginValue, setNewOriginValue] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [amount, setAmount] = useState("00.00");
  const { currentOrigin } = useSelector((state: any) => state.expensesOrigin);
  const dispatch = useDispatch();
  let [isPending, startTransition] = useTransition();

  const router = useRouter();

  const openDatePicker = () => {
    setShowCalendar((prev) => !prev);
  };

  const changeAmountHandler = (e: any) => {
    console.log(this);
    setAmount(e.target.value);
  };

  const createNewOrigin = (name, color) => {
    startTransition(async () => {
      // console.log(name, color, "new origin values");

      await fetch(
        `/api/${type === "expense" ? "expenseOrigins" : "incomeOrigins"}`,
        {
          method: "POST",
          body: JSON.stringify({ name: name, color: color }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      router.refresh();

      // await fetch("${process.env.BASE_URL}api/revalidate", {
      //   method: "GET",
      // });
    });
  };

  const newOriginChangeHandler = (e) => {
    setNewOriginValue(e.target.value);
  };

  const createNewExpenseIncomeHandler = () => {
    fetch(`/api/${type === "expense" ? "expenses" : "incomes"}`, {
      method: "POST",
      body: JSON.stringify({
        origin: currentOrigin,
        amount: amount,
        date: startDate,
      }),
    });

    router.refresh();
    dispatch(resetCurrentOrigin());
  };

  useEffect(() => {
    console.log(startDate);
  }, [startDate]);

  return (
    <div className="grid gap-[20px] w-[300px] tablet:w-[440px] justify-self-center mt-[15px]">
      <div className="flex w-[300px] tablet:w-[400px] justify-self-center ">
        <input
          type="text"
          placeholder="Add new origin"
          value={newOriginValue}
          onChange={newOriginChangeHandler}
          className="block font-light w-[140px] tablet:w-[220px] bg-input
             border-[1px] text-skin-muted
              border-border text-[1.4rem]
              h-[40px] placeholder:text-skin-muted pl-[15px]"
        />
        <div
          className="ml-[25px]"
          style={{ justifySelf: "flex-end" }}
          onMouseLeave={() => setShowColorPicker(false)}
        >
          <div
            className="tablet:h-[40px]  w-[50px] h-[40px] tablet:w-[50px] border-[1px] border-border
              cursor-pointer"
            style={{ backgroundColor: `${color}` }}
            onClick={() => setShowColorPicker(true)}
          ></div>
          <div
            className={`absolute`}
            style={{ display: `${!showColorPicker ? "none" : "block"}` }}
          >
            {/* <InputColor
                initialValue={"#D92F2F"}
                onChange={setColor}
                placement="right"
              /> */}
            <SketchPicker
              color={color}
              onChange={(color: any) => {
                setColor(color.hex);
              }}
            />
          </div>
        </div>
        <button
          className="h-[40px] ml-[40px] bg-good text-skin-ordinary font-bold  
            px-[10px] self-start text-center
           text-[1.4rem] w-[80px]"
          type="button"
          onClick={() => createNewOrigin(newOriginValue, color)}
        >
          Add tag
        </button>
        {/* onMouseOut={() => setShowColorPicker(false)} */}
      </div>

      <div
        className="grid justify-self-center h-[50px] w-[200px]
      bg-input overflow-hidden rounded-[15px]"
      >
        {/* <div onClick={(e) => openDatePicker()}>
          <CalendarSvg
            w="55px"
            h="55px"
            className="justify-self-start cursor-pointer"
          />
        </div> */}
        <p
          className={`relative top-[13px] self-center cursor-pointer text-[1.6rem] ${
            type === "expense" ? "text-skin-danger" : "text-skin-good"
          }`}
          onClick={(e) => openDatePicker()}
        >
          {`${weekday[startDate.getDay()]}, ${startDate.getDate()} ${
            months[startDate.getMonth()]
          }`}
        </p>
        <div className="w-[200px] justify-self-center">
          <DatePicker
            id="date"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            onClickOutside={() => openDatePicker()}
            open={showCalendar}
            className="hidden absolute"
          />
        </div>
      </div>
      <div className="grid gap-[20px] w-[300px] tablet:w-[440px] mt-[50px]">
        <div
          className="grid justify-self-center tablet:grid-cols-2 justify-items-start w-[300px] tablet:w-[440px] 
        "
        >
          <div
            className={`justify-self-center tablet:justify-self-start self-center text-center font-regular phone:text-[1.8rem] laptop:text-[2.4rem] ${
              type === "expense" ? "text-skin-danger" : "text-skin-good"
            }`}
          >
            {currentOrigin.name
              ? currentOrigin.name
              : `${type === "expense" ? "Expense" : "Income"} origin`}
          </div>
          <div className="justify-self-center tablet:justify-self-end self-center">
            <span className="font-regular text-[2.4rem] mr-[20px] text-skin-muted">
              $
            </span>
            <input
              className="text-center font-regular w-[120px] laptop:w-[160px] bg-input 
              text-skin-muted placeholder:text-skin-muted h-[40px] text-[1.8rem] tablet:text-[2.4rem]"
              placeholder="00.00"
              value={amount}
              type="number"
              onChange={changeAmountHandler}
            />
          </div>
        </div>

        <div className="p-[20px] w-[300px] tablet:w-[440px]">
          <button
            onClick={() => {
              createNewExpenseIncomeHandler();
            }}
            className={`inline-block w-[120px] h-[40px] 
            justify-self-center self-end
                font-bold text-[2.4rem] 
               text-skin-ordinary text-center ${
                 type === "expense" ? "bg-danger" : "bg-good"
               }`}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Input;
