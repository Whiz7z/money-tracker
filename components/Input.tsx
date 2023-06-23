"use client";

import React, { useState, useRef, useEffect } from "react";
import CalendarSvg from "@/svgComponents/CalendarSvg";
import DatePicker from "react-datepicker";
import { SketchPicker } from "react-color";
import { getSession } from "next-auth/react";
import InputColor from "react-input-color";
import { getToken } from "next-auth/jwt";
import Router from "next/router";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from "react-redux/es/exports";

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
      console.log(name, color, "new origin values");

      await fetch(
        `http://localhost:3000/api/${
          type === "expense" ? "expenseOrigins" : "incomeOrigins"
        }`,
        {
          method: "POST",
          body: JSON.stringify({ name: name, color: color }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      router.refresh();

      // await fetch("http://localhost:3000/api/revalidate", {
      //   method: "GET",
      // });
    });
  };

  const newOriginChangeHandler = (e) => {
    setNewOriginValue(e.target.value);
  };

  const createNewExpenseIncomeHandler = () => {
    fetch(
      `http://localhost:3000/api/${
        type === "expense" ? "expenses" : "incomes"
      }`,
      {
        method: "POST",
        body: JSON.stringify({
          origin: currentOrigin,
          amount: amount,
          date: startDate,
        }),
      }
    );

    router.refresh();
  };

  useEffect(() => {
    console.log(startDate);
  }, [startDate]);

  return (
    <div className="grid gap-[60px]">
      <div className="grid justify-self-center grid-cols-calendarInput h-[55px]">
        <div onClick={(e) => openDatePicker()}>
          <CalendarSvg
            w="55px"
            h="55px"
            className="justify-self-start cursor-pointer"
          />
        </div>
        <label
          htmlFor="date"
          className="self-center cursor-pointer"
          onClick={(e) => openDatePicker()}
        >
          {`${weekday[startDate.getDay()]}, ${startDate.getDate()} ${
            months[startDate.getMonth()]
          }`}
        </label>{" "}
        <DatePicker
          id="date"
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          onClickOutside={() => openDatePicker()}
          open={showCalendar}
          className="hidden"
        />
      </div>
      <div className="grid gap-[80px]">
        <div className="flex">
          <input
            type="text"
            placeholder="Add new origin"
            value={newOriginValue}
            onChange={newOriginChangeHandler}
            className="block font-bold w-[400px] bg-transparent pl-[25px]
             border-t-[3px] border-b-[3px] border-l-[3px] text-skin-base  border-base rounded-tl-[25px] rounded-bl-[25px] h-[60px]"
          />
          <button
            className="h-[60px]  pl-[25px] pr-[25px] self-start border-t-[3px] border-b-[3px] border-r-[3px] border-base rounded-tr-[25px] rounded-br-[25px]"
            type="button"
            style={{ backgroundColor: `#168B45` }}
            onClick={() => createNewOrigin(newOriginValue, color)}
          >
            Add
          </button>
          {/* onMouseOut={() => setShowColorPicker(false)} */}
          <div
            className="ml-[25px]"
            style={{ justifySelf: "flex-end" }}
            onMouseLeave={() => setShowColorPicker(false)}
          >
            <div
              className="h-[60px] w-[70px] border-[3px] rounded-[20px] cursor-pointer"
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
        </div>
        <div className="grid grid-cols-2 justify-between">
          <div className="justify-self-start self-center text-center font-bold text-[3rem]">
            {currentOrigin.name
              ? currentOrigin.name
              : `${type === "expense" ? "Expense" : "Income"} Origin`}
          </div>
          <div className="justify-self-end self-center">
            <span className="font-bold text-[3rem] mr-[20px]">$</span>
            <input
              className="text-center font-bold w-[200px] bg-transparent
              border-[3px]  text-skin-base  border-base rounded-[25px] h-[60px]"
              placeholder="00.00"
              value={amount}
              type="number"
              onChange={changeAmountHandler}
            />
          </div>
        </div>

        <button
          onClick={() => {
            createNewExpenseIncomeHandler();
          }}
          className="inline-block w-[220px] h-[60px] justify-self-center self-end
               bg-accent rounded-[15px] font-bold text-[2.8rem] text-skin-muted text-center leading-[6rem]	"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default Input;
