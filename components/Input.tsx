"use client";

import React, { useState, useRef, useEffect } from "react";
import CalendarSvg from "@/svgComponents/CalendarSvg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type Props = {};

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

function Input({}: Props) {
  const [showCalendar, setShowCalendar] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const inputRef: any = useRef();

  const openDatePicker = () => {
    setShowCalendar((prev) => !prev);
  };

  useEffect(() => {
    console.log(startDate);
  }, [startDate]);

  return (
    <div className="grid">
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
    </div>
  );
}

export default Input;
