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
    dispatch(resetCurrentOrigin());
  };

  useEffect(() => {
    console.log(startDate);
  }, [startDate]);

  return (
    <div className="grid gap-[20px] w-[300px] tablet:w-[400px] laptop:w-[100%]">
      <div
        className="grid justify-self-center h-[95px] 
      grid-cols-calendarInput  bg-muted p-[20px] rounded-[5px] overflow-hidden"
      >
        <div onClick={(e) => openDatePicker()}>
          <CalendarSvg
            w="55px"
            h="55px"
            className="justify-self-start cursor-pointer"
          />
        </div>
        <label
          htmlFor="date"
          className="self-center cursor-pointer text-[1.8rem] laptop:text-[2.2rem]"
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
      <div className="grid gap-[20px] w-[300px] tablet:w-[400px] laptop:w-[100%]">
        <div className="flex bg-muted p-[20px] rounded-[5px] w-[300px] tablet:w-[400px] laptop:w-[100%]">
          <input
            type="text"
            placeholder="Add new origin"
            value={newOriginValue}
            onChange={newOriginChangeHandler}
            className="block font-bold w-[140px] tablet:w-[200px] laptop:w-[400px] bg-transparent pl-[10px] tablet:pl-[25px]
             border-t-[3px] border-b-[3px] border-l-[3px] text-skin-ordinary
              border-ordinary rounded-tl-[25px] rounded-bl-[25px] text-[1.4rem] tablet:text-[1.6rem] laptop:text-[2.6rem] 
              tablet:h-[40px] laptop:h-[60px] placeholder:text-skin-ordinary"
          />
          <button
            className="h-[40px] laptop:h-[60px] bg-good text-skin-muted font-bold  
            tablet:pl-[25px] tablet:pr-[25px] self-start text-center
            border-t-[3px] border-b-[3px] border-r-[3px] border-ordinary rounded-tr-[25px] 
            rounded-br-[25px] text-[1.2rem] tablet:text-[1.6rem] laptop:text-[2.6rem] w-[50px]  tablet:w-[110px]"
            type="button"
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
              className="tablet:h-[40px] laptop:h-[60px] w-[50px] h-[40px] tablet:w-[50px] laptop:w-[70px] border-[3px] border-ordinary  rounded-[20px] cursor-pointer"
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
        <div
          className="grid justify-self-center tablet:grid-cols-2 justify-items-start bg-muted w-[300px] tablet:w-[400px] laptop:w-[100%]
        p-[20px] rounded-[5px]"
        >
          <div className="justify-self-center tablet:justify-self-start self-center text-center font-bold phone:text-[1.8rem] laptop:text-[3rem]">
            {currentOrigin.name
              ? currentOrigin.name
              : `${type === "expense" ? "Expense" : "Income"} Origin`}
          </div>
          <div className="justify-self-center tablet:justify-self-end self-center">
            <span className="font-bold phone:text-[2.4rem] laptop:text-[3rem] mr-[20px]">
              $
            </span>
            <input
              className="text-center font-bold w-[120px] laptop:w-[200px] bg-transparent 
              border-[3px]  text-skin-ordinary placeholder:text-skin-ordinary 
              border-ordinary rounded-[25px] h-[40px] tablet:h-[60px] text-[1.8rem] tablet:text-[2.2rem]"
              placeholder="00.00"
              value={amount}
              type="number"
              onChange={changeAmountHandler}
            />
          </div>
        </div>

        <div className="bg-muted p-[20px] rounded-[5px] w-[300px] tablet:w-[400px] laptop:w-[100%]">
          <button
            onClick={() => {
              createNewExpenseIncomeHandler();
            }}
            className="inline-block w-[140px] tablet:w-[220px] h-[50px] tablet:h-[60px] 
            justify-self-center self-end
               bg-accent rounded-[15px] font-bold tablet:text-[2.8rem] text-[2.4rem] 
               text-skin-muted text-center leading-[5rem] tablet:leading-[6rem]"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Input;
