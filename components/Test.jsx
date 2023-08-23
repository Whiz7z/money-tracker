import React from "react";

const Test = () => {
  return (
    <div>
      <div
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
      ></div>
    </div>
  );
};

export default Test;
